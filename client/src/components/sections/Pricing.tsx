import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Zap, Shield, Crown, ArrowRight } from 'lucide-react'

type Billing = 'monthly' | 'project'

interface Plan {
  name:       string
  icon:       React.ReactNode
  price:      { monthly: string; project: string }
  description:string
  features:   string[]
  cta:        string
  highlighted:boolean
  badge?:     string
}

const PLANS: Plan[] = [
  {
    name:        'Starter',
    icon:        <Zap className="w-5 h-5"/>,
    price:       { monthly: 'Rs 1000', project: 'Rs 20,000' },
    description: 'Perfect for small businesses and MVPs that need a solid foundation fast.',
    features: [
      'Up to 5 pages / screens',
      'Responsive design',
      'Basic animations',
      'Contact form integration',
      'SEO optimisation',
      '2 rounds of revisions',
      '2 weeks delivery',
    ],
    cta:         'Get Started',
    highlighted: false,
  },
  {
    name:        'Growth',
    icon:        <Shield className="w-5 h-5"/>,
    price:       { monthly: 'Rs 20,000', project: 'Rs 50,000' },
    description: 'Full-stack web app with backend, database, auth, and deployment.',
    badge:       'Most Popular',
    features: [
      'Everything in Starter',
      'Full MERN stack backend',
      'MongoDB database design',
      'Authentication system',
      'Admin dashboard',
      'API development',
      '3rd party integrations',
      '4 rounds of revisions',
      '4 weeks delivery',
    ],
    cta:         'Book a Call',
    highlighted: true,
  },
  {
    name:        'Enterprise',
    icon:        <Crown className="w-5 h-5"/>,
    price:       { monthly: 'Custom', project: 'Custom' },
    description: 'AI-powered systems, automation pipelines, and scalable enterprise architecture.',
    features: [
      'Everything in Growth',
      'AI / ML integration',
      'Automation workflows',
      'Multi-tenant architecture',
      'Cloud infrastructure (AWS)',
      'CI/CD pipelines',
      'Performance optimisation',
      'Unlimited revisions',
      'Dedicated support',
      'NDA available',
    ],
    cta:         "Let's Talk",
    highlighted: false,
  },
]

const VP = { once: true, margin: '-50px' } as const

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('project')

  return (
    <section id="pricing" className="bg-[#111827] py-20">
      <div className="site-container">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={VP}
            transition={{ duration:0.6 }}
          >
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="w-7 h-0.5 bg-blue-400 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-400 uppercase">Pricing</span>
              <div className="w-7 h-0.5 bg-blue-400 rounded"/>
            </div>
            <h2 className="text-[clamp(26px,3.6vw,46px)] font-bold leading-[1.1] mb-4">
              Transparent <span className="text-white/22">Pricing</span>
            </h2>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              No hidden fees. No surprises. Pick a plan or book a call for a custom quote.
            </p>
          </motion.div>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity:0, y:12 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={VP}
            transition={{ duration:0.5, delay:0.15 }}
            className="flex items-center justify-center gap-3 mt-7"
          >
            <span className={`text-sm font-medium transition-colors ${billing==='monthly' ? 'text-white' : 'text-gray-500'}`}>
              Monthly Retainer
            </span>
            <button
              onClick={() => setBilling(b => b==='monthly' ? 'project' : 'monthly')}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300
                ${billing==='project' ? 'bg-blue-600' : 'bg-white/20'}`}
            >
              <motion.div
                animate={{ x: billing==='project' ? 26 : 2 }}
                transition={{ type:'spring', stiffness:500, damping:35 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${billing==='project' ? 'text-white' : 'text-gray-500'}`}>
              Per Project
            </span>
          </motion.div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity:0, y:32 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={VP}
              transition={{ duration:0.65, delay:i*0.1, ease:[0.16,1,0.3,1] }}
              whileHover={{ y:-6 }}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300
                ${plan.highlighted
                  ? 'bg-blue-600 border-2 border-blue-500 shadow-2xl shadow-blue-600/30'
                  : 'bg-white/[0.03] border border-white/[0.08] hover:border-white/20'}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2
                               bg-white text-blue-600 text-[11px] font-black px-4 py-1
                               rounded-full shadow-lg uppercase tracking-wider whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              {/* Icon + name */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                  ${plan.highlighted ? 'bg-white/20 text-white' : 'bg-white/[0.07] text-blue-400'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-[clamp(32px,4vw,44px)] font-black text-white leading-none">
                    {plan.price[billing]}
                  </span>
                  {plan.price[billing] !== 'Custom' && (
                    <span className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>
                      /{billing==='monthly' ? 'mo' : 'project'}
                    </span>
                  )}
                </div>
              </div>

              <p className={`text-[13px] leading-relaxed mb-6 ${plan.highlighted ? 'text-white/80' : 'text-gray-400'}`}>
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0
                      ${plan.highlighted ? 'text-white' : 'text-blue-400'}`}/>
                    <span className={`text-[13px] ${plan.highlighted ? 'text-white/85' : 'text-gray-300'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="/book-call"
                className={`w-full py-3.5 rounded-xl font-semibold text-sm
                           flex items-center justify-center gap-2 transition-all duration-200
                           ${plan.highlighted
                             ? 'bg-white text-blue-600 hover:bg-white/90'
                             : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.4 }}
          className="text-center text-gray-600 text-[13px] mt-8"
        >
          All prices in USD. Need something custom?{' '}
          <a href="/book-call" className="text-blue-400 hover:underline">Book a free call</a>{' '}
          and we'll figure it out together.
        </motion.p>
      </div>
    </section>
  )
}
