import React from 'react'
import { useParams } from 'react-router-dom'

export function TodoItemPage() {
  const params = useParams<{ id: string }>()
  return <p>Details of item {params.id}!</p>
}
