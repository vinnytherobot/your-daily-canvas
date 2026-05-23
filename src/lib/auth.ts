import { redirect } from "@tanstack/react-router";

type AuthProvider = "google" | "github";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  provider: "email" | AuthProvider;
  createdAt: string;
};

type SessionRecord = {
  token: string;
  userId: string;
  expiresAt: number;
  createdAt: number;
};

export type SafeUser = Pick<UserRecord, "id" | "name" | "email" | "provider" | "createdAt">;

const USERS_KEY = "thesius:auth:users:v1";
const SESSIONS_KEY = "thesius:auth:sessions:v1";
const RESET_KEY = "thesius:auth:reset:v1";
const ACTIVE_SESSION_KEY = "thesius:auth:active-session:v1";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function inBrowser(): boolean {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!inBrowser()) return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!inBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

function sanitizeUser(user: UserRecord): SafeUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    createdAt: user.createdAt,
  };
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function randomToken(bytes = 32): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return [...arr].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function validateEmail(email: string): string | null {
  const normalized = email.trim().toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
  return isValid ? null : "E-mail inválido.";
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return "A senha deve ter ao menos 8 caracteres.";
  if (!/[A-Z]/.test(password)) return "A senha precisa de ao menos 1 letra maiúscula.";
  if (!/[a-z]/.test(password)) return "A senha precisa de ao menos 1 letra minúscula.";
  if (!/\d/.test(password)) return "A senha precisa de ao menos 1 número.";
  return null;
}

function getUsers(): UserRecord[] {
  return readJson<UserRecord[]>(USERS_KEY, []);
}

function setUsers(users: UserRecord[]) {
  writeJson(USERS_KEY, users);
}

function getSessions(): SessionRecord[] {
  return readJson<SessionRecord[]>(SESSIONS_KEY, []);
}

function setSessions(sessions: SessionRecord[]) {
  writeJson(SESSIONS_KEY, sessions);
}

function cleanupSessions() {
  const now = Date.now();
  const clean = getSessions().filter((s) => s.expiresAt > now);
  setSessions(clean);
}

export async function registerWithEmail(input: {
  name: string;
  email: string;
  password: string;
}): Promise<{ ok: true; user: SafeUser } | { ok: false; error: string }> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (name.length < 2) return { ok: false, error: "Nome deve ter ao menos 2 caracteres." };
  const emailError = validateEmail(email);
  if (emailError) return { ok: false, error: emailError };
  const passwordError = validatePassword(password);
  if (passwordError) return { ok: false, error: passwordError };

  const users = getUsers();
  const existing = users.find((u) => u.email === email);
  if (existing) return { ok: false, error: "Este e-mail já está cadastrado." };

  const salt = randomToken(16);
  const passwordHash = await sha256Hex(`${salt}:${password}`);

  const user: UserRecord = {
    id: randomToken(12),
    name,
    email,
    passwordHash,
    salt,
    provider: "email",
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  setUsers(users);
  return { ok: true, user: sanitizeUser(user) };
}

export async function loginWithEmail(input: {
  email: string;
  password: string;
  rememberMe?: boolean;
}): Promise<{ ok: true; user: SafeUser } | { ok: false; error: string }> {
  cleanupSessions();
  const email = input.email.trim().toLowerCase();
  const user = getUsers().find((u) => u.email === email);
  if (!user) return { ok: false, error: "Credenciais inválidas." };
  const passwordHash = await sha256Hex(`${user.salt}:${input.password}`);
  if (passwordHash !== user.passwordHash) return { ok: false, error: "Credenciais inválidas." };

  const ttl = input.rememberMe ? SESSION_TTL_MS : 1000 * 60 * 60 * 12;
  const session: SessionRecord = {
    token: randomToken(24),
    userId: user.id,
    expiresAt: Date.now() + ttl,
    createdAt: Date.now(),
  };
  setSessions([...getSessions(), session]);
  if (inBrowser()) localStorage.setItem(ACTIVE_SESSION_KEY, session.token);
  return { ok: true, user: sanitizeUser(user) };
}

export async function loginWithSocial(
  provider: AuthProvider,
): Promise<{ ok: true; user: SafeUser } | { ok: false; error: string }> {
  const email = provider === "google" ? "google.user@thesius.dev" : "github.user@thesius.dev";
  const name = provider === "google" ? "Usuário Google" : "Usuário GitHub";
  let users = getUsers();
  let user = users.find((u) => u.email === email);
  if (!user) {
    user = {
      id: randomToken(12),
      name,
      email,
      passwordHash: "",
      salt: "",
      provider,
      createdAt: new Date().toISOString(),
    };
    users = [...users, user];
    setUsers(users);
  }

  const session: SessionRecord = {
    token: randomToken(24),
    userId: user.id,
    expiresAt: Date.now() + SESSION_TTL_MS,
    createdAt: Date.now(),
  };
  setSessions([...getSessions(), session]);
  if (inBrowser()) localStorage.setItem(ACTIVE_SESSION_KEY, session.token);
  return { ok: true, user: sanitizeUser(user) };
}

export async function requestPasswordReset(email: string): Promise<{ ok: true }> {
  const normalized = email.trim().toLowerCase();
  const user = getUsers().find((u) => u.email === normalized);
  if (!user) return { ok: true };
  const token = randomToken(24);
  const records = readJson<Record<string, { userId: string; expiresAt: number }>>(RESET_KEY, {});
  records[token] = {
    userId: user.id,
    expiresAt: Date.now() + 1000 * 60 * 30,
  };
  writeJson(RESET_KEY, records);
  sessionStorage.setItem("thesius:last-reset-token", token);
  return { ok: true };
}

export async function resetPassword(input: {
  token: string;
  newPassword: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const passwordError = validatePassword(input.newPassword);
  if (passwordError) return { ok: false, error: passwordError };

  const records = readJson<Record<string, { userId: string; expiresAt: number }>>(RESET_KEY, {});
  const target = records[input.token];
  if (!target || target.expiresAt < Date.now()) {
    return { ok: false, error: "Token de recuperação inválido ou expirado." };
  }

  const users = getUsers();
  const idx = users.findIndex((u) => u.id === target.userId);
  if (idx < 0) return { ok: false, error: "Usuário não encontrado." };

  const salt = randomToken(16);
  const passwordHash = await sha256Hex(`${salt}:${input.newPassword}`);
  users[idx] = { ...users[idx], salt, passwordHash };
  setUsers(users);
  delete records[input.token];
  writeJson(RESET_KEY, records);
  return { ok: true };
}

export function getCurrentUser(): SafeUser | null {
  cleanupSessions();
  if (!inBrowser()) return null;
  const token = localStorage.getItem(ACTIVE_SESSION_KEY);
  if (!token) return null;
  const session = getSessions().find((s) => s.token === token && s.expiresAt > Date.now());
  if (!session) return null;
  const user = getUsers().find((u) => u.id === session.userId);
  return user ? sanitizeUser(user) : null;
}

export function hasValidSession(): boolean {
  return getCurrentUser() !== null;
}

export function logout() {
  if (!inBrowser()) return;
  const token = localStorage.getItem(ACTIVE_SESSION_KEY);
  if (!token) return;
  localStorage.removeItem(ACTIVE_SESSION_KEY);
  setSessions(getSessions().filter((s) => s.token !== token));
}

export function requireAuthOrRedirect(currentPath: string) {
  if (!inBrowser()) return;
  if (!hasValidSession()) {
    throw redirect({
      to: "/login",
      search: { redirect: currentPath },
    });
  }
}
