import axios from 'axios'
import React from 'react'
import { TodoItemType } from '../App'

export function TodoItem({
  todoItem: { id, text, complete },
  reloadItems,
}: TodoItemProps) {
  // destructuring props to treat them as local variables
  async function toggleCompleteStatus() {
    const response = await axios.put(
      `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort24`,
      { item: { complete: !complete } }
    )

    if (response.status === 200) {
      reloadItems()
    }
  }

  return (
    <li
      key={id}
      className={complete ? 'completed' : undefined}
      onClick={toggleCompleteStatus}
    >
      {text}
    </li>
  )
}
type TodoItemProps = { todoItem: TodoItemType; reloadItems: () => void }