import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace")({
  head: () => ({ meta: [{ title: "Thesius | Workspace" }] }),
  component: Workspace,
});

const Icon = ({ name, className = "", fill, style }: { name: string; className?: string; fill?: boolean; style?: React.CSSProperties }) => (
  <span className={`material-symbols-outlined ${className}`} style={{ ...(fill ? { fontVariationSettings: "'FILL' 1" } : {}), ...style }}>{name}</span>
);

function Workspace() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-body-md text-on-surface">
      {/* LEFT */}
      <aside className="w-64 flex-shrink-0 bg-surface-container-low flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] z-30">
        <div className="px-lg py-lg">
          <Link to="/" className="flex items-center gap-sm mb-xl">
            <Icon name="auto_stories" className="text-primary" fill />
            <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Thesius</h1>
          </Link>
          <button className="w-full flex items-center justify-center gap-xs py-sm bg-primary text-on-primary rounded-lg font-label-md active:scale-95 transition-transform mb-lg">
            <Icon name="add" className="text-[20px]" /> New Project
          </button>
          <nav className="space-y-1">
            <Link to="/dashboard" className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant cursor-pointer">
              <Icon name="dashboard" /> <span className="font-label-md">Dashboard</span>
            </Link>
            <div className="flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold border-r-2 border-primary bg-surface-variant/30">
              <Icon name="edit_note" fill /> <span className="font-label-md">Workspace</span>
            </div>
            <Link to="/advisor" className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant cursor-pointer">
              <Icon name="book_4" /> <span className="font-label-md">Library</span>
            </Link>
          </nav>
          <div className="mt-xl">
            <h3 className="font-label-sm text-on-surface-variant/60 uppercase tracking-widest mb-md">Document Structure</h3>
            <div className="space-y-sm custom-scrollbar max-h-[409px] overflow-y-auto">
              <div className="flex items-center gap-xs py-xs text-on-surface hover:text-secondary cursor-pointer">
                <Icon name="expand_more" className="text-[18px]" />
                <span className="font-label-md truncate">Abstract & Keywords</span>
              </div>
              <div className="flex items-center gap-xs py-xs text-on-surface hover:text-secondary cursor-pointer">
                <Icon name="expand_more" className="text-[18px]" />
                <span className="font-label-md truncate">1. Introduction</span>
              </div>
              <div className="ml-lg py-xs text-on-surface-variant/70 border-l border-outline-variant pl-md hover:text-secondary cursor-pointer">
                <span className="font-label-md">1.1 Theoretical Basis</span>
              </div>
              <div className="flex items-center gap-xs py-xs font-semibold text-secondary cursor-pointer">
                <Icon name="expand_more" className="text-[18px]" />
                <span className="font-label-md truncate">2. Methodology</span>
              </div>
              <div className="flex items-center gap-xs py-xs text-on-surface-variant hover:text-secondary cursor-pointer">
                <Icon name="chevron_right" className="text-[18px]" />
                <span className="font-label-md truncate">3. Data Analysis</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto p-lg border-t border-outline-variant/10">
          <div className="flex items-center gap-md">
            <img alt="User" className="w-10 h-10 rounded-full border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh0qnx7qPLRAd1ZdcpgOoNf6zaLtrsJq-muWJsF_iS4YEWrahccQB0Ggkoh3XOZsIwuyy20uKkCEDUEWcEwUFex5mFPSxLi8neI_TCIFtoy3Fb6XcFbadc-6p3aTJR9bTxNdeTShlAWKC56WVNBkqXvo-Zj5LOLoSQGcr5FF3LwDRkCPB4Bb7oCUo1m7CR5n3JRwnbYURRl5K2Kez1-aJyArHrB_OrK9_ZpxxEGSVmZ1m4-eeR78ZNhuevc39LxGBQxqQ2Lg0w9bn8" />
            <div className="overflow-hidden">
              <p className="font-label-md text-primary font-bold truncate">Academic Pro</p>
              <p className="font-label-sm text-on-surface-variant/60 truncate">Researcher</p>
            </div>
            <Icon name="settings" className="ml-auto text-on-surface-variant cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* CENTER */}
      <main className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-xl border-b border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-lg">
            <div className="flex items-center gap-sm bg-surface-container-low rounded-full px-md py-xs border border-outline-variant/10">
              <Icon name="search" className="text-[18px] text-on-surface-variant" />
              <input className="bg-transparent border-none focus:ring-0 text-label-md w-48 outline-none" placeholder="Search in paper..." />
            </div>
            <div className="h-6 w-[1px] bg-outline-variant/30"></div>
            <div className="flex items-center gap-md text-on-surface-variant">
              {["format_bold", "format_italic", "format_quote", "link"].map((i) => (
                <button key={i} className="p-xs hover:bg-surface-variant rounded transition-colors"><Icon name={i} /></button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-md">
            <div className="flex -space-x-2 mr-md">
              <img alt="" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqo6qdf6hR-FxPUUY6bUxb4JVSmy9DD7-P4zVT3T6SQ7mzlo9RE9tYtjtnrkQqynVHnWJc0TxY9zJ1QAwOjx0UpUvbSSyjnqXTpw0SHTWmsxvpf_gMkL3wh-G3yRvWzJCmlsVrK6h7uyqcS_UJlgANbAainwt-1dMWMcaZg1ko_aEgfFSwrAXX-8R6ScXCQuw9koHSZyqa70YDyUERaTjs8rbg7RNQGEuZQ69bW8sPPatCjX_JDPuJdazPZm3qKjp9JHIzkdr4bKxZ" />
              <img alt="" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApZO6Dz6c8DuWQpLtb3Iq44ULCSkYVuAA6BQML1qjaButhDslzZMGNmddE74fX63T8Ccu1Fe3IgwFFPO1JO7B5OKQKsMbO7DGRd0_TDaKNjGtsdProaL0DWAn5wWxkQIjnJb4KHR50siPyRti9BMj-IJKrIgDFU6CMd96Utd1u0rrHoNvyIp2d1dNh9OlQztixyAvw5jSdU8jRX45zAD6YVMwV8IygsyIAAKX4BDGGmDE3BrG74KiRRE5BVMppRwekcQUDbC5SWvo9" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-fixed-dim text-[10px] flex items-center justify-center font-bold text-on-primary-fixed">+3</div>
            </div>
            <button className="p-xs text-on-surface-variant hover:text-primary"><Icon name="history" /></button>
            <button className="p-xs text-on-surface-variant hover:text-primary"><Icon name="share" /></button>
            <button className="bg-secondary text-on-secondary px-md py-sm rounded-lg font-label-sm shadow-sm hover:opacity-90">Export PDF</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar pt-xl pb-32 px-xl">
          <div className="max-w-[800px] mx-auto bg-surface-container-lowest shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-outline-variant/10 rounded-xl p-24 min-h-[1200px]">
            <div className="flex items-center gap-xs mb-xl">
              <span className="font-label-sm text-on-surface-variant/40">My Projects</span>
              <Icon name="chevron_right" className="text-[14px] text-on-surface-variant/40" />
              <span className="font-label-sm text-on-surface-variant/40">Dissertation 2024</span>
              <Icon name="chevron_right" className="text-[14px] text-on-surface-variant/40" />
              <span className="font-label-sm text-secondary font-bold">Methodology Section</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary mb-xl outline-none" contentEditable suppressContentEditableWarning>2. Comprehensive Methodology</h1>
            <div className="space-y-lg text-body-lg leading-relaxed text-on-surface-variant">
              <p>
                This research utilizes a <span className="bg-secondary-container/10 border-b-2 border-secondary-container text-primary px-1 rounded-sm cursor-help relative group">mixed-methods approach
                  <span className="absolute bottom-full left-0 mb-2 w-64 p-sm glass-panel text-[12px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg rounded-lg">
                    <strong className="block mb-1">AI Suggestion:</strong> Consider clarifying if it's sequential or concurrent mixed methods.
                  </span>
                </span> to evaluate the impact of artificial intelligence on academic writing productivity. The quantitative phase involved a survey of 500 graduate students across diverse disciplines.
              </p>
              <div className="my-xl p-lg border-l-4 border-on-tertiary-container bg-tertiary-fixed rounded-r-xl">
                <div className="flex items-center gap-sm mb-xs">
                  <Icon name="auto_awesome" className="text-on-tertiary-fixed-variant text-[20px]" fill />
                  <span className="font-label-sm text-on-tertiary-fixed-variant uppercase">Contextual Insight</span>
                </div>
                <p className="text-body-md text-on-tertiary-fixed italic">"Your methodology aligns with the standards established by Creswell & Creswell (2018). Would you like to automatically insert the citation here?"</p>
              </div>
              <p>
                Data collection was conducted over a six-month period. For the qualitative component, semi-structured interviews were performed with leading experts in human-computer interaction. The results demonstrate a significant shift in <span className="editor-cursor">cognitive offloading strategies</span> among researchers utilizing modern LLM-based tools.
              </p>
              <div className="my-lg p-md glass-panel rounded-lg border border-outline-variant/20 flex gap-md items-start">
                <div className="bg-secondary-container text-on-secondary-container p-sm rounded-lg"><Icon name="menu_book" /></div>
                <div>
                  <h4 className="font-label-md text-primary">Source: "The Evolution of Digital Scaffolding"</h4>
                  <p className="text-[12px] text-on-surface-variant/70">Journal of Academic Technology, Vol. 45, 2023</p>
                  <button className="mt-xs text-secondary font-label-sm hover:underline">Link Citation</button>
                </div>
              </div>
              <p>Preliminary findings suggest that the precision of automated formatting (ABNT/APA) reduces administrative overhead by approximately 40%, allowing for deeper focus on theoretical development.</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-md left-1/2 -translate-x-1/2 flex items-center gap-lg glass-panel px-lg py-sm rounded-full border border-outline-variant/30 shadow-lg">
          <div className="flex items-center gap-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-label-sm text-on-surface-variant">Cloud Synced</span>
          </div>
          <div className="h-4 w-[1px] bg-outline-variant/30"></div>
          <span className="font-label-sm text-on-surface-variant">1,452 Words</span>
          <div className="h-4 w-[1px] bg-outline-variant/30"></div>
          <span className="font-label-sm text-on-surface-variant">Read Time: 6m</span>
        </div>
      </main>

      {/* RIGHT */}
      <aside className="w-80 flex-shrink-0 bg-surface-container-low border-l border-outline-variant/20 flex flex-col h-full z-10">
        <div className="p-lg flex flex-col h-full">
          <div className="flex items-center justify-between mb-xl">
            <h2 className="font-label-md font-bold text-primary flex items-center gap-sm">
              <Icon name="bolt" className="text-secondary" fill /> AI Assistant
            </h2>
            <Icon name="close" className="text-on-surface-variant text-[20px] cursor-pointer hover:text-primary" />
          </div>
          <div className="grid grid-cols-1 gap-sm mb-xl">
            {[
              { i: "magic_button", t: "Enhance Clarity", d: "Improve tone and flow", c: "bg-secondary/10 text-secondary", h: "hover:bg-secondary" },
              { i: "rule_folder", t: "Apply ABNT/APA", d: "Format citations automatically", c: "bg-on-tertiary-container/10 text-on-tertiary-container", h: "hover:bg-on-tertiary-container" },
              { i: "fact_check", t: "Verify Facts", d: "Scan for contradictions", c: "bg-error/10 text-error", h: "hover:bg-error" },
            ].map((a) => (
              <button key={a.t} className="flex items-center gap-md p-md bg-surface-container-lowest border border-outline-variant/10 rounded-xl hover:bg-surface-variant transition-all text-left group">
                <div className={`${a.c} p-sm rounded-lg ${a.h} group-hover:text-white transition-colors`}>
                  <Icon name={a.i} className="text-[20px]" />
                </div>
                <div>
                  <p className="font-label-md text-primary">{a.t}</p>
                  <p className="text-[11px] text-on-surface-variant/70">{a.d}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-md pr-xs mb-md">
              <div className="flex gap-sm">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="smart_toy" className="text-white text-[16px]" />
                </div>
                <div className="bg-surface-container-high p-md rounded-2xl rounded-tl-none">
                  <p className="text-[13px] text-primary leading-tight">I've noticed you're discussing "cognitive offloading". I found 3 recent papers from 2023 that could strengthen your argument. Would you like to see the abstracts?</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-xs ml-10">
                {["Show abstracts", "Find related authors"].map((c) => (
                  <span key={c} className="px-sm py-xs bg-surface-container-lowest border border-outline-variant/30 rounded-full text-[11px] text-on-surface-variant cursor-pointer hover:border-secondary transition-colors">{c}</span>
                ))}
              </div>
            </div>
            <div className="relative mt-auto">
              <textarea className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-md pr-12 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none resize-none text-[13px] custom-scrollbar" placeholder="Ask AI anything..." rows={2}></textarea>
              <button className="absolute right-md bottom-md text-secondary hover:scale-110 transition-transform">
                <Icon name="send" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
