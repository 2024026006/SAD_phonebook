import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, phone, memo } = body

    if (!name || !phone) {
      return NextResponse.json({ error: '이름과 전화번호는 필수입니다.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('contacts')
      .update({ name, phone, memo: memo || null })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('[PUT /api/contacts]', error)
      return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (e) {
    console.error('[PUT /api/contacts] unexpected', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { error } = await supabase.from('contacts').delete().eq('id', id)

    if (error) {
      console.error('[DELETE /api/contacts]', error)
      return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[DELETE /api/contacts] unexpected', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
