"use client"

export default function Collections() {
  const collections = [
    {
      id: 1,
      name: "우먼 컬렉션",
      description: "세련된 여성을 위한 현대적이고 우아한 디자인",
      image: "/womens-fashion-clothing-collection.jpg",
    },
    {
      id: 2,
      name: "맨 컬렉션",
      description: "클래식한 스타일과 혁신적 디자인의 조화",
      image: "/mens-fashion-clothing-collection.jpg",
    },
    {
      id: 3,
      name: "시즈널 컬렉션",
      description: "계절을 담은 한정판 의류와 액세서리",
      image: "/seasonal-fashion-collection.jpg",
    },
  ]

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="text-sm tracking-widest uppercase text-gray-500 mb-4 block">컬렉션</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">시그니처 컬렉션</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div key={collection.id} className="group cursor-pointer">
              <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg mb-6">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif mb-2 group-hover:opacity-70 transition-opacity">
                {collection.name}
              </h3>
              <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">{collection.description}</p>
              <div className="inline-flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                <span className="text-sm uppercase tracking-widest">보기</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
