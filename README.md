# 전화번호 관리 시스템

웹 기반 전화번호 CRUD 애플리케이션 (Next.js + Supabase + Vercel)

## 배포 절차

### 1. Supabase 설정

1. [supabase.com](https://supabase.com) 에서 새 프로젝트 생성
2. **SQL Editor** 에서 `supabase_setup.sql` 내용을 실행하여 테이블 생성
3. **Project Settings > API** 에서 아래 값 복사
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. 로컬 개발

```bash
# .env.local 파일에 환경변수 입력
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

npm run dev
# http://localhost:3000
```

### 3. Vercel 배포

1. GitHub 저장소에 push
2. [vercel.com](https://vercel.com) 에서 해당 저장소 import
3. **Environment Variables** 에 아래 두 값 등록
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## 프로젝트 구조

```
phonebook/
├── app/
│   ├── api/
│   │   └── contacts/
│   │       ├── route.ts          # GET, POST
│   │       └── [id]/route.ts     # PUT, DELETE
│   ├── layout.tsx
│   └── page.tsx                  # 메인 페이지
├── components/
│   ├── ContactForm.tsx           # 추가 폼
│   ├── ContactTable.tsx          # 목록 테이블
│   └── EditModal.tsx             # 수정 모달
├── lib/
│   └── supabase.ts               # Supabase 클라이언트
├── types/
│   └── contact.ts                # Contact 타입
└── supabase_setup.sql            # DB 초기화 SQL
```
