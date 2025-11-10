"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/footer"

// 제품 타입 정의
interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
}

// 샘플 제품 데이터
const products: Product[] = [
  {
    id: 1,
    name: "클래식 실크 블라우스",
    category: "상의",
    price: 289000,
    image: "/products/blouse.jpg",
    description: "고급 실크 소재의 우아한 블라우스"
  },
  {
    id: 2,
    name: "프리미엄 캐시미어 코트",
    category: "아우터",
    price: 1290000,
    image: "/products/coat.jpg",
    description: "100% 캐시미어 원단의 프리미엄 코트"
  },
  {
    id: 3,
    name: "테일러드 울 팬츠",
    category: "하의",
    price: 389000,
    image: "/products/pants.jpg",
    description: "완벽한 핏의 테일러드 울 팬츠"
  },
  {
    id: 4,
    name: "미니멀 레더 재킷",
    category: "아우터",
    price: 890000,
    image: "/products/jacket.jpg",
    description: "세련된 디자인의 레더 재킷"
  },
  {
    id: 5,
    name: "실크 미디 스커트",
    category: "하의",
    price: 329000,
    image: "/placeholder.svg?height=400&width=300&query=silk-midi-skirt",
    description: "우아한 실루엣의 실크 스커트"
  },
  {
    id: 6,
    name: "린넨 셔츠 드레스",
    category: "원피스",
    price: 459000,
    image: "/placeholder.svg?height=400&width=300&query=linen-shirt-dress",
    description: "편안하면서도 세련된 린넨 드레스"
  },
  {
    id: 7,
    name: "니트 터틀넥",
    category: "상의",
    price: 259000,
    image: "/placeholder.svg?height=400&width=300&query=knit-turtleneck",
    description: "부드러운 니트 터틀넥"
  },
  {
    id: 8,
    name: "와이드 데님 팬츠",
    category: "하의",
    price: 299000,
    image: "/placeholder.svg?height=400&width=300&query=wide-denim-pants",
    description: "편안한 핏의 프리미엄 데님"
  },
  {
    id: 9,
    name: "벨벳 이브닝 드레스",
    category: "원피스",
    price: 690000,
    image: "/placeholder.svg?height=400&width=300&query=velvet-evening-dress",
    description: "고급스러운 벨벳 드레스"
  },
  {
    id: 10,
    name: "더블 브레스트 블레이저",
    category: "아우터",
    price: 590000,
    image: "/placeholder.svg?height=400&width=300&query=double-breasted-blazer",
    description: "클래식한 더블 브레스트 블레이저"
  },
  {
    id: 11,
    name: "플리츠 맥시 스커트",
    category: "하의",
    price: 429000,
    image: "/placeholder.svg?height=400&width=300&query=pleated-maxi-skirt",
    description: "우아한 플리츠 디테일의 맥시 스커트"
  },
  {
    id: 12,
    name: "실크 캐미솔",
    category: "상의",
    price: 189000,
    image: "/placeholder.svg?height=400&width=300&query=silk-camisole",
    description: "고급 실크 캐미솔"
  }
]

// 제품 카드 컴포넌트
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 rounded-sm">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={product.id <= 4}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <h3 className="text-lg font-medium group-hover:text-accent transition-colors">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <p className="text-lg font-semibold">{product.price.toLocaleString()}원</p>
      </div>
    </div>
  )
}

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000])
  const [selectedCategory, setSelectedCategory] = useState<string>("전체")

  // 카테고리 목록
  const categories = ["전체", ...Array.from(new Set(products.map(p => p.category)))]

  // 필터링된 제품
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesCategory = selectedCategory === "전체" || product.category === selectedCategory
      
      return matchesSearch && matchesPrice && matchesCategory
    })
  }, [searchQuery, priceRange, selectedCategory])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 헤더 */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-serif tracking-wider hover:text-accent transition-colors">
              LUXE
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link href="/" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
                홈
              </Link>
              <Link href="/collections" className="text-sm uppercase tracking-wider text-accent">
                컬렉션
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 페이지 타이틀 */}
      <section className="py-16 md:py-24 text-center border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-accent text-sm tracking-widest uppercase font-light mb-4">2025 Collection</p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">프리미엄 컬렉션</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            장인정신과 현대적 미학이 만나 탄생한 엄선된 의류 컬렉션
          </p>
        </div>
      </section>

      {/* 필터 섹션 */}
      <section className="py-8 border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* 검색 */}
            <div>
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider">제품 검색</label>
              <input
                type="text"
                placeholder="제품명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider">카테고리</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* 가격 범위 */}
            <div>
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                가격 범위: {priceRange[0].toLocaleString()}원 - {priceRange[1].toLocaleString()}원
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-accent"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setPriceRange([0, 500000])}
                    className="px-3 py-1 text-xs border border-border rounded hover:bg-accent hover:text-black hover:border-accent transition-all"
                  >
                    ~50만원
                  </button>
                  <button
                    onClick={() => setPriceRange([0, 1000000])}
                    className="px-3 py-1 text-xs border border-border rounded hover:bg-accent hover:text-black hover:border-accent transition-all"
                  >
                    ~100만원
                  </button>
                  <button
                    onClick={() => setPriceRange([0, 2000000])}
                    className="px-3 py-1 text-xs border border-border rounded hover:bg-accent hover:text-black hover:border-accent transition-all"
                  >
                    전체
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 제품 목록 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              총 <span className="font-semibold text-foreground">{filteredProducts.length}</span>개의 제품
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-lg text-muted-foreground mb-4">검색 결과가 없습니다</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setPriceRange([0, 2000000])
                  setSelectedCategory("전체")
                }}
                className="px-6 py-3 bg-accent text-black font-semibold hover:bg-accent/90 transition-colors uppercase tracking-wider"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
