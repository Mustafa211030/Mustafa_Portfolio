import React, { useContext } from 'react'
import { motion, Variants } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useTypewriter } from '@/hooks/useTypewriter'
import { OWNER, HERO_ROLES, HERO_STATS, FEATURED_ON } from '@/lib/constants'
import { ResumeCtx } from '@/App'

/* ─── Social SVG icons — exact originals, unchanged ─────────────────── */
const SocialIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    LinkedIn: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    GitHub: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    Upwork: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
      </svg>
    ),
    Fiverr: (
      <svg viewBox="0 0 100 100" className="w-[18px] h-[18px] fill-current">
        <text y=".9em" fontSize="80" fontWeight="900">fi</text>
      </svg>
    ),
    WhatsApp: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  }
  return <>{icons[name] || null}</>
}

/* ─── Animation helper ───────────────────────────────────────────────── */
const fu = (delay: number): Variants => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] } },
})

/* ─── Inline colour tokens — always dark-bg values, immune to light-mode ── */
const C = {
  white:       '#ffffff',
  white90:     'rgba(255,255,255,0.90)',
  white70:     'rgba(255,255,255,0.70)',
  white50:     'rgba(255,255,255,0.50)',
  white25:     'rgba(255,255,255,0.25)',
  white14:     'rgba(255,255,255,0.14)',
  white12:     'rgba(255,255,255,0.12)',
  white08:     'rgba(255,255,255,0.08)',
  white06:     'rgba(255,255,255,0.06)',
  white05:     'rgba(255,255,255,0.05)',
  gray400:     '#9ca3af',
  gray500:     '#6b7280',
  blue400:     '#60a5fa',
  yellow400:   '#facc15',
  green500:    '#22c55e',
  bgDark:      '#080c14',
  borderLine:  'rgba(255,255,255,0.12)',
}

export default function Hero() {
  const roleText = useTypewriter(HERO_ROLES)
  const resumeCtx = useContext(ResumeCtx)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: C.bgDark }}
    >
      {/* Background photo — always stays dark */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1920&auto=format&fit=crop')",
          opacity: 0.20,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, #080c14 0%, rgba(8,12,20,0.75) 55%, rgba(8,12,20,0.10) 100%)',
        }}
      />

      {/* ── Right-side social column (desktop) ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        className="absolute right-5 bottom-12 z-10 flex-col items-center gap-2.5 hidden lg:flex"
      >
        {/* Top line */}
        <div style={{ width: 1, height: 48, background: C.borderLine, marginBottom: 4 }} />

        {FEATURED_ON.map((item, i) => (
          <motion.a
            key={item.name}
            href={item.href}
            aria-label={item.name}
            title={item.name}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.5 + i * 0.08 }}
            whileHover={{ scale: 1.12, x: -2 }}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: C.white05,
              border: `1px solid rgba(255,255,255,0.12)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: item.color,
              transition: 'background 0.2s, border-color 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = C.white12
              el.style.borderColor = 'rgba(255,255,255,0.28)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = C.white05
              el.style.borderColor = 'rgba(255,255,255,0.12)'
            }}
          >
            <SocialIcon name={item.name} />
          </motion.a>
        ))}

        {/* Bottom line */}
        <div style={{ width: 1, height: 32, background: C.borderLine, marginTop: 4 }} />
      </motion.div>

      {/* ── Main content ────────────────────────────────────────────── */}
      <div className="site-container relative z-10 w-full pt-28 pb-20">
        <div style={{ maxWidth: 560 }}>

          {/* Hi, I'm */}
          <motion.p
            variants={fu(0.22)} initial="initial" animate="animate"
            style={{ fontSize: 14, color: C.gray400, letterSpacing: '0.05em', marginBottom: 8 }}
          >
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fu(0.36)} initial="initial" animate="animate"
            style={{ fontWeight: 900, lineHeight: 0.92, marginBottom: 16 }}
          >
            <span
              className="block"
              style={{ fontSize: 'clamp(62px,9vw,100px)', color: C.blue400 }}
            >
              {OWNER.firstName}
            </span>
            <span
              className="block"
              style={{ fontSize: 'clamp(62px,9vw,100px)', color: C.white }}
            >
              {OWNER.lastName}
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={fu(0.52)} initial="initial" animate="animate"
            style={{
              fontWeight: 600,
              color: C.white90,
              marginBottom: 20,
              minHeight: 34,
              display: 'flex',
              alignItems: 'center',
              fontSize: 'clamp(17px,2.2vw,24px)',
            }}
          >
            {roleText}
            <span
              style={{
                display: 'inline-block',
                width: 3,
                height: 24,
                background: C.blue400,
                marginLeft: 4,
                animation: 'pulse 1s cubic-bezier(0.4,0,0.6,1) infinite',
              }}
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fu(0.66)} initial="initial" animate="animate"
            style={{
              color: C.gray400,
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 490,
            }}
          >
            {OWNER.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fu(0.78)} initial="initial" animate="animate"
            style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}
          >
            {HERO_STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  paddingRight: i < HERO_STATS.length - 1 ? 28 : 0,
                  marginRight:  i < HERO_STATS.length - 1 ? 28 : 0,
                  borderRight:  i < HERO_STATS.length - 1 ? `1px solid ${C.white14}` : 'none',
                }}
              >
                <span style={{ fontSize: 26, fontWeight: 700, color: C.white, display: 'block', lineHeight: 1 }}>
                  {s.num}
                </span>
                <span style={{ fontSize: 12, color: C.gray400, display: 'block', marginTop: 4 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fu(0.9)} initial="initial" animate="animate"
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}
          >
            <a
              href="/book-call"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#2563eb', color: C.white,
                padding: '12px 24px', borderRadius: 8,
                fontWeight: 600, fontSize: 14, textDecoration: 'none',
                transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#1d4ed8'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 24px rgba(37,99,235,0.35)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#2563eb'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              Book Free 30-Min Consultation
            </a>

            <a
              href="#projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: `1px solid ${C.white25}`, color: C.white,
                padding: '12px 24px', borderRadius: 8,
                fontWeight: 500, fontSize: 14, textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = C.white50
                el.style.background = C.white06
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = C.white25
                el.style.background = 'transparent'
              }}
            >
              View My Work
            </a>

            <button
              onClick={() => resumeCtx?.open?.()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: `1px solid ${C.white25}`, color: C.white,
                padding: '12px 24px', borderRadius: 8, background: 'transparent',
                fontWeight: 500, fontSize: 14, cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = C.white50
                el.style.background = C.white06
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = C.white25
                el.style.background = 'transparent'
              }}
            >
              📄 View Resume
            </button>
          </motion.div>

          {/* Availability indicator */}
          <motion.div
            variants={fu(1.04)} initial="initial" animate="animate"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, color: C.gray400, marginBottom: 32,
            }}
          >
            {/* Ping rings */}
            <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
              <span
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: C.green500, opacity: 0.75,
                  animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite',
                }}
              />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.green500, display: 'inline-block' }} />
            </span>
            <Zap style={{ width: 14, height: 14, color: C.yellow400, flexShrink: 0, marginLeft: 4 }} />
            <span style={{ color: C.gray400 }}>Usually responds within 2 hours</span>
          </motion.div>

          {/* Mobile socials row */}
          <motion.div
            variants={fu(1.14)} initial="initial" animate="animate"
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            className="lg:hidden"
          >
            <span style={{ fontSize: 10, color: C.gray500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Find me on
            </span>
            {FEATURED_ON.map(item => (
              <a
                key={item.name}
                href={item.href}
                aria-label={item.name}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: C.white06,
                  border: `1px solid ${C.white08}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, textDecoration: 'none',
                }}
              >
                <SocialIcon name={item.name} />
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}