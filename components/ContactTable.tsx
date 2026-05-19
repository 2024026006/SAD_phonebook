'use client'

import { Contact } from '@/types/contact'

interface Props {
  contacts: Contact[]
  onEdit: (contact: Contact) => void
  onDelete: (id: string) => void
}

export default function ContactTable({ contacts, onEdit, onDelete }: Props) {
  if (contacts.length === 0) {
    return (
      <p className="text-center text-gray-400 py-10">저장된 연락처가 없습니다.</p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-3 font-semibold text-gray-600">이름</th>
            <th className="px-4 py-3 font-semibold text-gray-600">전화번호</th>
            <th className="px-4 py-3 font-semibold text-gray-600">메모</th>
            <th className="px-4 py-3 font-semibold text-gray-600 text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{c.name}</td>
              <td className="px-4 py-3">{c.phone}</td>
              <td className="px-4 py-3 text-gray-500">{c.memo ?? '-'}</td>
              <td className="px-4 py-3 text-center space-x-2">
                <button
                  onClick={() => onEdit(c)}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  수정
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
