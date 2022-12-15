import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { TodoItemType } from './App'

export function TodoItemPage() {
  const history = useNavigate()
  const params = useParams<{ id: string }>()
  const [todoItem, setTodoItem] = useState<TodoItemType>({
    id: undefined,
    text: '',
    complete: false,
    updated_at: undefined,
    created_at: undefined,
  })

  useEffect(
    function () {
      async function loadItems() {
        const response = await axios.get(
          `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort24`
        )

        if (response.status === 200) {
          setTodoItem(response.data)
        }
      }

      loadItems()
    },
    [params.id]
  )

  async function deleteTodoItem() {
    await axios.delete(
      `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort24`
    )
    if (response.status === 204) {
      // send to homepage
      history('/')
    }
  }

  return (
    <div>
      <h2>
        {' '}
        <Link to="/">Home</Link>
      </h2>
      <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
      <p>Created: {todoItem.created_at}</p>
      <p>Updated: {todoItem.updated_at}</p>
      <button onClick={deleteTodoItem}>Delete</button>
    </div>
  )
}
