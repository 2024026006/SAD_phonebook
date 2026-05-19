import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[GET /api/contacts]', error)
      return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (e) {
    console.error('[GET /api/contacts] unexpected', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, memo } = body

    if (!name || !phone) {
      return NextResponse.json({ error: '이름과 전화번호는 필수입니다.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, phone, memo: memo || null }])
      .select()
      .single()

    if (error) {
      console.error('[POST /api/contacts]', error)
      return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
    }
    return NextResponse.json(data, { status: 201 })
  } catch (e) {
    console.error('[POST /api/contacts] unexpected', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
