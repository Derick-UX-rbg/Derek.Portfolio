import React, { useState } from 'react';
import {
  Terminal,
  Cpu,
  Workflow,
  Code2,
  Database,
  Mail,
  Check,
  Copy,
  ExternalLink,
  Github,
  Twitter,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  ShoppingBag,
  Building2,
  Sparkles,
  MapPin,
  Bot,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = "derekyigo128@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Subtle Mesh Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* Header & Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0e17]/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all">
              DFY
            </div>
            <span className="font-semibold text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors">
              Derek Fwanten Yigo
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills & Tech</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
            >
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-[#0d1322] px-4 pt-3 pb-6 space-y-3">
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-cyan-400 font-medium"
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-cyan-400 font-medium"
            >
              Skills & Tech
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-cyan-400 font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-cyan-400 font-medium"
            >
              Contact
            </a>
            <div className="pt-2 border-t border-slate-800">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950 block"
              >
                Get In Touch
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
          <div className="max-w-3xl">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Freelance Automation & Engineering Roles
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.15] mb-6">
              AI automation & software, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                built for real problems.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              I’m <strong className="text-slate-100">Derek Fwanten Yigo</strong>, an AI automation and software developer based in Nigeria. I specialize in designing n8n workflows, custom API integrations, and practical web software that eliminate manual operational bottlenecks.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                View Selected Work
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-sm font-medium transition-all flex items-center gap-2"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
              </button>
            </div>

            {/* Quick Metadata Badges */}
            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Based in Nigeria (Remote Ready)</span>
              </div>
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-cyan-400" />
                <span>n8n & Webhook Architecture</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>React, Node & Python</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-800/80">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              Featured Engineering & Automation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Selected Projects & Systems
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Focusing on measurable operational impact, clear architecture pipelines, and software reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Project 1 */}
            <div className="group relative rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
                    Automation Workflow
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Real Estate & Sales</span>
                </div>
                <Building2 className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">
                AI Property Sales & Lead Management
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Replaces manual lead processing delays for real estate inquiries. Captures inbound web leads, evaluates lead intent and budget criteria using OpenAI API via n8n, and automatically dispatches prioritized buyer notifications to WhatsApp and sales CRM.
              </p>

              {/* Architecture Pipeline Layer */}
              <div className="mb-6 p-4 rounded-xl bg-[#060911] border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> System Architecture Pipeline
                </div>
                <div className="flex flex-wrap items-center gap-2 text-slate-300">
                  <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300">Inbound Webhook</span>
                  <span className="text-slate-600">→</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300">n8n Engine</span>
                  <span className="text-slate-600">→</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300">OpenAI Intent Scoring</span>
                  <span className="text-slate-600">→</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300">WhatsApp & CRM Alert</span>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">n8n</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">OpenAI API</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">Webhooks</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">WhatsApp API</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">Supabase</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono font-medium">
                    Production System
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Retail & Operations</span>
                </div>
                <ShoppingBag className="w-5 h-5 text-slate-500 group-hover:text-teal-400 transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Boutique Sales & Fulfilment System
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Eliminates fragmented sales tracking and manual inventory counts for retail businesses. Provides a central web interface to manage stock, issue digital customer receipts, and trigger automated order dispatch notifications via integrated messaging APIs.
              </p>

              {/* Architecture Pipeline Layer */}
              <div className="mb-6 p-4 rounded-xl bg-[#060911] border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-teal-400" /> System Architecture Pipeline
                </div>
                <div className="flex flex-wrap items-center gap-2 text-slate-300">
                  <span className="px-2 py-1 rounded bg-slate-800 text-teal-300">Order Trigger</span>
                  <span className="text-slate-600">→</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-teal-300">Inventory DB Sync</span>
                  <span className="text-slate-600">→</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-teal-300">Receipt Generator</span>
                  <span className="text-slate-600">→</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300">Telegram Admin Alert</span>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">React</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">Node.js</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">PostgreSQL</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">Tailwind CSS</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">REST APIs</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium">
                    Concept Architecture
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Product Security</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Counterfeit Drink Detection Concept
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                An architectural concept designed to tackle product verification in retail supply chains. Combines unique serial scanning with computer vision/OCR modeling to verify product authenticity badges and protect consumers from counterfeit beverages.
              </p>

              {/* Architecture Pipeline Layer */}
              <div className="mb-6 p-4 rounded-xl bg-[#060911] border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Proposed Pipeline Flow
                </div>
                <div className="flex flex-wrap items-center gap-2 text-slate-300">
                  <span className="px-2 py-1 rounded bg-slate-800 text-amber-300">Serial / QR Scan</span>
                  <span className="text-slate-600">→</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-amber-300">Verification API</span>
                  <span className="text-slate-600">→</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-amber-300">OCR / Vision Check</span>
                  <span className="text-slate-600">→</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300">Instant Status Screen</span>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">Python</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">FastAPI</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">Computer Vision Concept</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">React</span>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-800/80">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4" />
              Technical Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Skills & Stack Breakdown
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Engineered around modern visual automation engines, API backends, and responsive web frontends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-3">AI & Automation</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Building automated pipelines that connect external webhooks, LLM APIs, messaging platforms, and internal business logic.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center justify-between"><span>n8n Workflow Automation</span> <span className="text-cyan-400">Advanced</span></li>
                <li className="flex items-center justify-between"><span>OpenAI API / Prompt Eng.</span> <span className="text-cyan-400">Proficient</span></li>
                <li className="flex items-center justify-between"><span>Webhooks & Custom APIs</span> <span className="text-cyan-400">Advanced</span></li>
                <li className="flex items-center justify-between"><span>Telegram & WhatsApp Bots</span> <span className="text-cyan-400">Proficient</span></li>
                <li className="flex items-center justify-between"><span>Python Scripting</span> <span className="text-cyan-400">Core</span></li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-5">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-3">Full-Stack Software</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Developing clean, responsive, and accessible user interfaces paired with structured backend services.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center justify-between"><span>React & TypeScript</span> <span className="text-teal-400">Advanced</span></li>
                <li className="flex items-center justify-between"><span>Vite & Modern Tooling</span> <span className="text-teal-400">Proficient</span></li>
                <li className="flex items-center justify-between"><span>Tailwind CSS & Styling</span> <span className="text-teal-400">Advanced</span></li>
                <li className="flex items-center justify-between"><span>Node.js & Express</span> <span className="text-teal-400">Proficient</span></li>
                <li className="flex items-center justify-between"><span>Framer Motion / Lucide</span> <span className="text-teal-400">Proficient</span></li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-3">Data & Infrastructure</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Managing persistent datastores, environment configurations, versioning, and continuous delivery deployments.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center justify-between"><span>PostgreSQL & SQL</span> <span className="text-purple-400">Proficient</span></li>
                <li className="flex items-center justify-between"><span>Supabase & Firebase</span> <span className="text-purple-400">Proficient</span></li>
                <li className="flex items-center justify-between"><span>Git & GitHub Workflows</span> <span className="text-purple-400">Advanced</span></li>
                <li className="flex items-center justify-between"><span>Render Cloud Hosting</span> <span className="text-purple-400">Proficient</span></li>
                <li className="flex items-center justify-between"><span>Postman API Testing</span> <span className="text-purple-400">Proficient</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-800/80">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Bot className="w-4 h-4" />
              Background & Approach
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6">
              Engineering with Pragmatism & Authenticity
            </h2>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                I am an emerging software developer based in Nigeria, dedicated to bridging the gap between cutting-edge AI capability and practical everyday operations.
              </p>
              <p>
                Rather than treating AI as a buzzword, I focus on building practical workflow pipelines—using tools like n8n, OpenAI APIs, custom Python scripts, and web interfaces—that solve real administrative, lead handling, and operational inefficiencies for businesses.
              </p>
              <p>
                I am continuously expanding my experience across full-stack engineering and automated systems, committed to clean code, accessible UI standards, and transparent collaboration with teams worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-800/80">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0d1322] to-slate-900 border border-slate-800 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-6">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 mb-3">
              Let's Build Something Practical
            </h2>

            <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8">
              Whether you need an automated n8n workflow, an AI assistant integration, or a full-stack web application, feel free to reach out.
            </p>

            {/* Direct Email Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <a
                href={`mailto:${email}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                Send Email Directly
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copiedEmail ? "Copied to Clipboard!" : email}</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-800/80 text-slate-400">
              <a
                href="https://github.com/Derick-UX-rbg"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <Twitter className="w-4 h-4" />
                X (Twitter)
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-8 bg-[#070a11]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Derek Fwanten Yigo. All rights reserved.
          </div>
          <div>
            Built with React, Vite, Tailwind CSS & Framer Motion
          </div>
        </div>
      </footer>
    </div>
  );
}
