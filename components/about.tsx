"use client"

export default function About() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="text-sm tracking-widest uppercase text-muted-foreground mb-4 block">우리의 이야기</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">최고 품질의 자재와 가치</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            20년 이상의 경험을 바탕으로, 우리는 세계 최고의 패브릭과 장인정신으로 완성된 의류를 선보입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif mb-4">지속 가능성</h3>
              <p className="text-muted-foreground leading-relaxed">
                환경을 고려한 친환경 소재와 윤리적 생산 과정을 통해 미래 세대를 위한 책임 있는 패션을 추구합니다.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif mb-4">장인정신</h3>
              <p className="text-muted-foreground leading-relaxed">
                숙련된 장인들이 정성으로 제작한 각 제품은 수십 년을 함께할 수 있는 품질과 내구성을 자랑합니다.
              </p>
            </div>
          </div>

          <div className="relative h-96 md:h-auto rounded-lg overflow-hidden">
            <img src="/textile-fabric-detail-craftsmanship.jpg" alt="장인정신" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
