import { useEffect, useState } from 'react';

type Project = {
  id: string;
  title: string;
  status: string;
  category: string;
  summary: string;
  tags: string[];
  repository?: string;
  notes: string[];
};

const projects: Project[] = [
  {
    id: 'property',
    title: 'AI Property Sales & Lead Management',
    status: 'In progress',
    category: 'Workflow automation',
    summary: 'An AI-assisted lead workflow for qualifying property enquiries, matching inventory, and handing qualified conversations to a human team.',
    tags: ['n8n', 'LLM workflows', 'Google Calendar', 'Messaging APIs'],
    repository: 'https://github.com/Derick-UX-rbg/RicoBuildsAI',
    notes: ['Capture and classify an inbound enquiry', 'Extract preferences and route uncertain cases to a person', 'Prepare a follow-up and inspection handoff'],
  },
  {
    id: 'boutique',
    title: 'Boutique Sales & Fulfilment System',
    status: 'Core pipeline',
    category: 'Multi-agent AI',
    summary: 'A focused-agent workflow for product questions, delivery context, and payment-review handoff in a busy commerce inbox.',
    tags: ['n8n', 'Supabase', 'PostgreSQL', 'Tool calling'],
    repository: 'https://github.com/Derick-UX-rbg/RicoBuildsAI',
    notes: ['Route each request to a narrow specialist role', 'Persist useful order context safely', 'Keep payment and inventory changes behind human-approved tools'],
  },
  {
    id: 'counterfeit',
    title: 'Counterfeit Drink Detection Concept',
    status: 'Research & testing',
    category: 'Computer vision',
    summary: 'A computer-vision concept for assessing bottle-label evidence and guiding consumers toward an appropriate official verification route.',
    tags: ['TypeScript', 'OCR', 'Vision models', 'PostgreSQL'],
    repository: 'https://github.com/Derick-UX-rbg/RicoBuildsAI',
    notes: ['Read evidence from a supplied label image', 'Flag uncertainty instead of making a safety claim', 'Direct the user to official verification where available'],
  },
];

const filters = ['All', ...new Set(projects.map((project) => project.category))];

const bubbles = [
  ['b1', '9%', '13%', '4.5rem', '19s', '0s'],
  ['b2', '78%', '8%', '7rem', '25s', '-8s'],
  ['b3', '89%', '55%', '3.4rem', '17s', '-4s'],
  ['b4', '12%', '68%', '6rem', '23s', '-12s'],
  ['b5', '53%', '78%', '3.2rem', '20s', '-6s'],
  ['b6', '42%', '22%', '2.5rem', '15s', '-2s'],
] as const;

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top" className="portfolio-shell">
      <style>{styles}</style>
      <div className="bubble-field" aria-hidden="true">
        {bubbles.map(([key, left, top, size, duration, delay]) => (
          <span key={key} className="bubble" style={{ left, top, width: size, height: size, animationDuration: duration, animationDelay: delay }} />
        ))}
      </div>

      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Back to the top">DF <span>Derek Fwanten Yigo</span></a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? 'Close' : 'Menu'}</button>
        <nav id="site-nav" className={menuOpen ? 'site-nav open' : 'site-nav'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a><a href="#now" onClick={closeMenu}>Now</a><a href="#about" onClick={closeMenu}>About</a><a href="#connect" onClick={closeMenu}>Connect</a>
        </nav>
      </header>

      <section className="hero section">
        <p className="eyebrow"><span /> Based in Nigeria</p>
        <h1>AI automation &amp; software, built for real problems.</h1>
        <p className="lede">I’m Derek Fwanten Yigo. I build practical AI-powered systems, automations, and software experiments—and share what I learn along the way.</p>
        <div className="actions"><a className="button primary" href="#work">View my work <span aria-hidden="true">→</span></a><a className="button" href="#connect">Let’s connect</a></div>
      </section>

      <section id="work" className="section">
        <p className="eyebrow">Selected work</p><h2>Systems I’m building</h2>
        <p className="section-intro">Practical AI, automation, and software projects—focused on useful workflows rather than inflated case studies.</p>
        <div className="filter-row" aria-label="Filter projects">{filters.map((item) => <button type="button" key={item} className={filter === item ? 'filter active' : 'filter'} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="project-grid">{visibleProjects.map((project) => <article className="project-card" key={project.id}>
          <div><p className="status">{project.status}</p><p className="category">{project.category}</p><h3>{project.title}</h3><p>{project.summary}</p></div>
          <div><ul className="tags" aria-label="Technology used">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="card-actions"><button type="button" className="text-button" onClick={() => setSelectedProject(project)}>View approach <span aria-hidden="true">→</span></button>{project.repository && <a className="repo" href={project.repository} target="_blank" rel="noreferrer">Repository <span className="sr-only">(opens in a new tab)</span> ↗</a>}</div></div>
        </article>)}</div>
      </section>

      <section id="now" className="section split"><div><p className="eyebrow">Right now</p><h2>Building, shipping, and learning in public.</h2></div><ul className="focus-list"><li><b>01</b> AI workflow orchestration and reliable handoffs</li><li><b>02</b> Agent systems with constrained tools and clear boundaries</li><li><b>03</b> Practical databases, APIs, and software foundations</li></ul></section>

      <section id="about" className="section about"><p className="eyebrow">About</p><h2>Useful systems over flashy promises.</h2><p>I’m interested in the gap between an impressive AI demo and an actually useful product: the data, APIs, error handling, human handoffs, and product decisions that make automation dependable.</p></section>

      <section id="connect" className="section connect"><p className="eyebrow">Connect</p><h2>Let’s build, collaborate, or compare notes.</h2><p>For work, collaboration, or a conversation about AI, automation, and software:</p><div className="link-row"><a href="mailto:derekyigo128@gmail.com">Email me</a><a href="https://x.com/derekfwantenyigo" target="_blank" rel="noreferrer">X <span className="sr-only">(opens in a new tab)</span> ↗</a><a href="https://linkedin.com/in/derekfwantenyigo" target="_blank" rel="noreferrer">LinkedIn <span className="sr-only">(opens in a new tab)</span> ↗</a><a href="https://github.com/Derick-UX-rbg/RicoBuildsAI" target="_blank" rel="noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span> ↗</a></div></section>
      <footer>© {new Date().getFullYear()} Derek Fwanten Yigo</footer>

      {selectedProject && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><button className="close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">×</button><p className="eyebrow">{selectedProject.category}</p><h2 id="project-title">{selectedProject.title}</h2><p>{selectedProject.summary}</p><h3>Approach</h3><ol>{selectedProject.notes.map((note) => <li key={note}>{note}</li>)}</ol>{selectedProject.repository && <a className="button primary" href={selectedProject.repository} target="_blank" rel="noreferrer">Open repository <span aria-hidden="true">↗</span></a>}</section></div>}
    </main>
  );
}

const styles = `
  :root { color-scheme: dark; --ink:#10181b; --paper:#edf0ea; --muted:#aec0bd; --amber:#df9545; --line:rgba(237,240,234,.18); }
  :focus-visible { outline:3px solid #f6c27f; outline-offset:3px; }
  * { box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { margin:0; background:var(--ink); }
  button,a { font:inherit; }
  button { cursor:pointer; }
  a { color:inherit; }
  .portfolio-shell { min-height:100vh; overflow:hidden; position:relative; background:radial-gradient(circle at 80% -10%,#274438 0,transparent 34rem),var(--ink); color:var(--paper); font-family:Inter,ui-sans-serif,system-ui,sans-serif; line-height:1.55; }
  .bubble-field { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
  .bubble { position:absolute; border:1px solid rgba(223,149,69,.5); border-radius:50%; background:radial-gradient(circle at 31% 26%,rgba(255,255,255,.28),rgba(223,149,69,.1) 35%,rgba(16,24,27,.08) 70%); box-shadow:inset 0 0 18px rgba(255,255,255,.08),0 0 32px rgba(223,149,69,.12); animation:float ease-in-out infinite; }
  @keyframes float { 50% { transform:translate3d(14px,-32px,0) scale(1.06); } }
  .site-header,.section,footer { width:min(1120px,calc(100% - 2rem)); margin:auto; position:relative; z-index:1; }
  .site-header { min-height:5rem; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--line); }
  .brand { text-decoration:none; font-weight:750; letter-spacing:-.03em; display:flex; align-items:center; gap:.7rem; }
  .brand::first-letter { color:var(--amber); }
  .site-nav { display:flex; gap:1.5rem; font-size:.93rem; }
  .site-nav a,.repo { text-decoration:none; color:var(--muted); }
  .site-nav a:hover,.repo:hover { color:var(--paper); }
  .menu-button { display:none; background:none; border:1px solid var(--line); color:var(--paper); border-radius:.45rem; padding:.4rem .7rem; }
  .section { padding:6.5rem 0; border-bottom:1px solid var(--line); }
  .hero { padding:8.5rem 0 9rem; max-width:1120px; }
  .eyebrow,.status,.category { margin:0 0 1rem; color:var(--amber); font-size:.75rem; font-weight:750; letter-spacing:.11em; text-transform:uppercase; }
  .eyebrow span { display:inline-block; width:.55rem; height:.55rem; margin-right:.45rem; border-radius:50%; background:#60c995; box-shadow:0 0 0 .25rem rgba(96,201,149,.15); }
  h1,h2,h3,p { margin-top:0; }
  h1,h2,h3 { line-height:1.03; letter-spacing:-.055em; }
  h1 { max-width:900px; margin-bottom:1.5rem; font-size:clamp(3.2rem,9vw,7.6rem); }
  h2 { font-size:clamp(2.25rem,5vw,4rem); max-width:700px; }
  h3 { font-size:1.45rem; }
  .lede { max-width:650px; color:var(--muted); font-size:clamp(1.05rem,2vw,1.25rem); }
  .actions,.link-row,.card-actions { display:flex; flex-wrap:wrap; gap:.8rem; align-items:center; }
  .actions { margin-top:2rem; }
  .button { display:inline-flex; gap:.5rem; align-items:center; padding:.8rem 1.1rem; border:1px solid var(--line); border-radius:.5rem; color:var(--paper); text-decoration:none; font-weight:700; }
  .button:hover { border-color:var(--amber); }
  .button.primary { color:#171411; background:var(--amber); border-color:var(--amber); }
  .section-intro,.about>p,.connect>p { max-width:640px; color:var(--muted); }
  .filter-row { display:flex; flex-wrap:wrap; gap:.55rem; margin:2rem 0; }
  .filter { border:1px solid var(--line); color:var(--muted); background:rgba(255,255,255,.03); border-radius:99px; padding:.48rem .76rem; font-size:.85rem; }
  .filter:hover,.filter.active { color:#161411; border-color:var(--amber); background:var(--amber); }
  .project-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
  .project-card { min-height:370px; display:flex; flex-direction:column; justify-content:space-between; gap:2rem; padding:1.45rem; background:rgba(12,20,21,.76); border:1px solid var(--line); border-radius:.85rem; backdrop-filter:blur(10px); transition:transform .2s ease,border-color .2s ease; }
  .project-card:hover { transform:translateY(-5px); border-color:rgba(223,149,69,.8); }
  .category { color:var(--muted); letter-spacing:.07em; }
  .project-card>div>p:not(.status):not(.category),.modal>p { color:var(--muted); }
  .tags { list-style:none; display:flex; flex-wrap:wrap; padding:0; gap:.4rem; }
  .tags li { color:#d8e2da; border:1px solid var(--line); border-radius:99px; padding:.23rem .55rem; font-size:.75rem; }
  .text-button { padding:0; border:0; background:none; color:var(--amber); font-weight:750; }
  .split { display:grid; grid-template-columns:1fr 1fr; gap:4rem; }
  .focus-list { margin:0; padding:0; list-style:none; border-top:1px solid var(--line); }
  .focus-list li { display:flex; gap:1rem; padding:1.1rem 0; border-bottom:1px solid var(--line); color:var(--muted); }
  .focus-list b { color:var(--amber); }
  .connect { padding-bottom:7rem; }
  .link-row { margin-top:1.5rem; }
  .link-row a { color:var(--paper); text-underline-offset:.25rem; }
  footer { padding:1.5rem 0 3rem; color:var(--muted); font-size:.85rem; }
  .modal-backdrop { position:fixed; z-index:5; inset:0; display:grid; place-items:center; padding:1rem; background:rgba(0,0,0,.65); backdrop-filter:blur(8px); }
  .modal { width:min(620px,100%); position:relative; padding:2rem; background:#182325; border:1px solid var(--line); border-radius:1rem; box-shadow:0 1.5rem 5rem rgba(0,0,0,.45); }
  .modal h3 { margin-top:2rem; font-size:1.2rem; }
  .modal ol { padding-left:1.2rem; color:var(--muted); }
  .modal li { margin-bottom:.6rem; }
  .close { position:absolute; top:1rem; right:1rem; width:2rem; height:2rem; border:1px solid var(--line); border-radius:50%; background:transparent; color:var(--paper); font-size:1.35rem; line-height:1; }
  .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
  @media (max-width:800px) {
    .site-nav { display:none; position:absolute; top:4.5rem; right:0; flex-direction:column; padding:1rem; background:#182325; border:1px solid var(--line); border-radius:.6rem; box-shadow:0 1rem 2rem rgba(0,0,0,.3); }
    .site-nav.open { display:flex; }
    .menu-button { display:block; }
    .brand span { font-size:.85rem; }
    .section { padding:4.5rem 0; }
    .hero { padding:6rem 0 6.5rem; }
    h1 { font-size:clamp(2.8rem,13vw,5rem); }
    .project-grid,.split { grid-template-columns:1fr; gap:1rem; }
    .project-card { min-height:0; }
  }
  @media (prefers-reduced-motion:reduce) {
    html { scroll-behavior:auto; }
    .bubble { animation:none; }
    .project-card { transition:none; }
  }
`;
