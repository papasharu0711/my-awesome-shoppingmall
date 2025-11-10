"use client"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-background/20">
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-widest text-sm">네비게이션</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  홈
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  컬렉션
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  연락처
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-widest text-sm">고객 서비스</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  반품 정책
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  배송 정보
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  사이즈 가이드
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-widest text-sm">회사</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  블로그
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  채용정보
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  지속성
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  언론
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-widest text-sm">팔로우</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm">
          <div>
            <p className="font-semibold mb-2 uppercase tracking-widest">LUXE</p>
            <p className="text-background/70">© 2025. 모든 권리 보유.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-6 text-background/70">
            <a href="#" className="hover:text-background transition-colors">
              개인정보 처리방침
            </a>
            <a href="#" className="hover:text-background transition-colors">
              이용약관
            </a>
            <a href="#" className="hover:text-background transition-colors">
              쿠키 설정
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
