'use client'

import { useEffect, useState } from 'react'
import { Contact } from '@/types/contact'
import ContactForm from '@/components/ContactForm'
import ContactTable from '@/components/ContactTable'
import EditModal from '@/components/EditModal'

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [editTarget, setEditTarget] = useState<Contact | null>(null)

  async function fetchContacts() {
    const res = await fetch('/api/contacts')
    const data = await res.json()
    setContacts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  async function handleAdd(name: string, phone: string, memo: string) {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, memo }),
    })
    const newContact = await res.json()
    setContacts((prev) => [newContact, ...prev])
  }

  async function handleSave(id: string, name: string, phone: string, memo: string) {
    const res = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, memo }),
    })
    const updated = await res.json()
    setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)))
    setEditTarget(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">전화번호 관리</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <ContactForm onAdd={handleAdd} />
          {loading ? (
            <p className="text-center text-gray-400 py-10">불러오는 중...</p>
          ) : (
            <ContactTable
              contacts={contacts}
              onEdit={setEditTarget}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
      {editTarget && (
        <EditModal
          contact={editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
        />
      )}
    </main>
  )
}
