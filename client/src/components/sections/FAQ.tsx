import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQItem { q: string; a: string }

const FAQS: FAQItem[] = [
  {
    q: 'How long does a typical project take?',
    a: 'It depends on the scope. A landing page or simple web app typically takes 1–2 weeks. A full MERN stack application with admin dashboard and integrations takes 4–6 weeks. AI automation systems range from 3–8 weeks. I give a detailed timeline estimate after our initial discovery call.',
  },
  {
    q: 'Do you work with startups and small businesses?',
    a: "Absolutely. Some of my best work has been with early-stage startups that needed to move fast without sacrificing quality. I understand that budgets are often tight early on, which is why I offer flexible pricing and can help you prioritise what to build first for maximum impact.",
  },
  {
    q: "What's your revision policy?",
    a: 'Every plan includes multiple rounds of revisions. Starter includes 2 rounds, Growth includes 4, and Enterprise has unlimited revisions. A "revision round" means you review the work, send feedback, and I implement all changes at once. I aim to get it right before that point through clear communication.',
  },
  {
    q: 'Do you sign NDAs?',
    a: "Yes, absolutely. Client confidentiality is something I take seriously. I'm happy to sign an NDA before we discuss any sensitive project details. Just mention it when you reach out and I'll have one ready for review.",
  },
  {
    q: 'What technologies do you work with?',
    a: 'My primary stack is MERN (MongoDB, Express, React, Node.js). I also work with Next.js, TypeScript, PostgreSQL, Python (for AI/ML), Docker, AWS, and many third-party APIs. If you have a specific tech requirement, ask me — I have likely worked with it or can learn it quickly.',
  },
  {
    q: 'Can you maintain the project after launch?',
    a: "Yes. I offer monthly retainer packages for ongoing maintenance, feature additions, and performance monitoring. Many clients continue working with me after launch because they value the consistency of having the original developer who knows the codebase deeply.",
  },
  {
    q: 'How do payments work?',
    a: 'For project-based work, I typically require 50% upfront to begin and 50% upon delivery. For larger projects, we can split into milestones. I accept bank transfers, PayPal, and Wise. Payment terms are always agreed upon in writing before any work begins.',
  },
  {
    q: 'What if I need changes after the project is delivered?',
    a: 'Minor changes and bug fixes within the first 30 days are covered at no extra cost. Larger feature additions or scope changes after delivery are quoted separately. I always want you to be 100% satisfied with the result.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-[#0d1525] py-20">
      <div className="site-container">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 items-start">

          {/* Left — sticky heading */}
          <motion.div
            initial={{ opacity:0, x:-28 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7 }}
            className="md:sticky md:top-28"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-0.5 bg-blue-400 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-400 uppercase">FAQ</span>
            </div>
            <h2 className="text-[clamp(26px,3.6vw,46px)] font-bold leading-[1.1] mb-4">
              Frequently Asked <span className="text-white/22">Questions</span>
            </h2>
            <p className="text-gray-400 text-[14px] leading-relaxed mb-6">
              Everything you need to know before reaching out. Can't find an answer?
            </p>
            <a href="/book-call"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                         text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all">
              Ask me directly →
            </a>
          </motion.div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-30px' }}
                transition={{ duration:0.5, delay:i*0.05, ease:[0.16,1,0.3,1] }}
                className={`border rounded-xl overflow-hidden transition-colors duration-200
                  ${open === i ? 'border-blue-500/30 bg-white/[0.04]' : 'border-white/[0.07] bg-white/[0.02]'}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={`text-[15px] font-semibold transition-colors
                    ${open === i ? 'text-white' : 'text-white/80'}`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                                  transition-colors duration-200
                                  ${open === i ? 'bg-blue-600 text-white' : 'bg-white/[0.08] text-gray-400'}`}>
                    {open === i ? <Minus className="w-3 h-3"/> : <Plus className="w-3 h-3"/>}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
                    >
                      <p className="px-6 pb-5 text-gray-400 text-[14px] leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
