-- 1. contacts 테이블 생성
create table contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  memo text,
  created_at timestamptz default now()
);

-- 2. RLS 활성화 및 공개 접근 허용 (로그인 불필요)
alter table contacts enable row level security;

create policy "public access"
  on contacts
  for all
  using (true)
  with check (true);
