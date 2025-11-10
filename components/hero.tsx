"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=luxury-fashion-clothing-collection)",
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 text-center px-4 md:px-8 max-w-3xl">
        <div className="mb-6 text-accent text-sm tracking-widest uppercase font-light">새로운 컬렉션 2025</div>
        <h1 className="text-5xl md:text-7xl font-serif mb-6 text-white text-balance">Elegance Redefined</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed text-balance">
          정성 들인 장인정신과 현대적 미학이 만나 탄생한 프리미엄 의류 컬렉션
        </p>
        <Link href="/collections" className="inline-block px-8 py-4 bg-accent text-black font-semibold hover:bg-accent/90 transition-colors uppercase tracking-wider">
          컬렉션 보기
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  )
}
