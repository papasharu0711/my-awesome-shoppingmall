"use client"

export default function Values() {
  const values = [
    {
      number: "01",
      title: "최고의 품질",
      description: "엄격한 품질 관리를 통해 완벽한 제품만을 선보입니다.",
    },
    {
      number: "02",
      title: "윤리적 생산",
      description: "모든 제조 과정에서 노동자 권리와 환경을 존중합니다.",
    },
    {
      number: "03",
      title: "시대를 초월한 디자인",
      description: "트렌드를 넘어 세대를 거쳐 사랑받을 수 있는 디자인을 지향합니다.",
    },
  ]

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">우리의 가치</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            우리가 매일 실천하는 핵심 가치들이 제품의 모든 순간을 정의합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value) => (
            <div key={value.number} className="space-y-4 group">
              <div className="text-5xl md:text-6xl font-serif text-accent/30 group-hover:text-accent/50 transition-colors duration-300">
                {value.number}
              </div>
              <h3 className="text-2xl font-serif text-foreground">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
