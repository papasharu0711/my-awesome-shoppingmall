# Color Palette Library 🎨

웹 기반 컬러 팔레트 라이브러리 관리 시스템입니다. 폴더별로 컬러를 분류하고, 이미지나 RGB/CMYK 값으로 컬러를 관리할 수 있습니다.

## ✨ 주요 기능

- **폴더 관리**: 컬러를 카테고리별로 분류 (예: 목재, 패브릭, 메탈 등)
- **이미지 업로드**: 목재 표면재 등의 이미지 업로드 및 붙여넣기 지원
- **컬러 생성**: RGB/CMYK 슬라이더로 단색 생성
- **상세 정보**: 각 컬러에 이름과 설명 추가
- **실시간 편집**: 컬러 정보 수정 및 삭제
- **로컬 저장**: localStorage를 활용한 데이터 영구 보존

## 🚀 시작하기

### 설치

```bash
cd COLOR_PALETTE
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 📦 Vercel 배포

### 1. GitHub 저장소 연결

```bash
# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit: Color Palette Library"

# GitHub 저장소 생성 후
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Vercel 배포

1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 import
4. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `COLOR_PALETTE` (또는 프로젝트 루트)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
5. "Deploy" 클릭

배포 완료 후 `your-project.vercel.app` 형태의 URL이 생성됩니다!

## 🎯 사용 방법

### 1. 폴더 만들기
- 우측 상단 "새 폴더" 버튼 클릭
- 폴더명 입력 (예: "목재 컬러", "패브릭", "메탈" 등)

### 2. 컬러 추가

#### 이미지로 추가
1. 폴더 선택 후 "컬러 추가" 클릭
2. "이미지" 탭 선택
3. 파일 업로드 또는 이미지 붙여넣기 (Ctrl+V)
4. 컬러명과 설명 입력

#### 단색으로 추가
1. 폴더 선택 후 "컬러 추가" 클릭
2. "단색" 탭 선택
3. RGB 또는 CMYK 슬라이더로 색상 조정
4. 컬러명과 설명 입력

### 3. 컬러 관리
- **편집**: 컬러 카드의 연필 아이콘 클릭
- **삭제**: 컬러 카드의 휴지통 아이콘 클릭

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: localStorage (브라우저 로컬 저장)

## 📁 프로젝트 구조

```
COLOR_PALETTE/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 글로벌 스타일
├── components/
│   ├── FolderList.tsx      # 폴더 목록
│   ├── ColorGrid.tsx       # 컬러 그리드
│   ├── ColorCard.tsx       # 컬러 카드
│   ├── AddFolderModal.tsx  # 폴더 추가 모달
│   ├── AddColorModal.tsx   # 컬러 추가 모달
│   └── ColorPicker.tsx     # RGB/CMYK 컬러 피커
├── package.json
└── README.md
```

## 💡 팁

- **이미지 붙여넣기**: 스크린샷이나 복사한 이미지를 Ctrl+V로 바로 붙여넣을 수 있습니다
- **데이터 백업**: localStorage 사용으로 데이터가 브라우저에 저장됩니다. 브라우저 캐시 삭제 시 데이터가 사라질 수 있으니 주의하세요
- **RGB ↔ CMYK**: 슬라이더 조정 시 RGB와 CMYK 값이 자동으로 변환됩니다

## 🔄 데이터 백업 (향후 기능)

현재는 localStorage를 사용하여 로컬에만 저장됩니다. 
향후 업데이트에서 다음 기능을 추가할 수 있습니다:
- JSON 파일로 내보내기/가져오기
- 클라우드 데이터베이스 연동
- 여러 기기 간 동기화

## 📄 라이선스

MIT License

## 🤝 기여

이슈와 PR은 언제나 환영합니다!

---

Made with ❤️ for color management
