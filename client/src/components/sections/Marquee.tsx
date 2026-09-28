import React from 'react'
import { MARQUEE_ITEMS } from '@/lib/constants'

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="bg-white border-y border-gray-200 overflow-hidden group">
      <div
        className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]"
        style={{ width: 'max-content' }}
      >
        {doubled.map((text, i) => (
          <div key={i} className="inline-flex items-center gap-4 px-8 py-[17px]">
            <span className="text-[11px] font-bold tracking-[0.13em] text-gray-900 uppercase">
              {text}
            </span>
            <span className="text-blue-500 text-base select-none">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
