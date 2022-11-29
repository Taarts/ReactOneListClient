import axios from 'axios'
import React, { useEffect, useState } from 'react'
import logo from './images/sdg-logo.png'

type TodoItemType = {
  id: number
  text: string
  complete: boolean
  updated_at: Date
  created_at: Date
}

export function App() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  function loadAllTheItems() {
    async function fetchListOfItems() {
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=cohort24'
      )

      if (response.status === 200) {
        setTodoItems(response.data)
      }
    }
    fetchListOfItems()
  }

  useEffect(loadAllTheItems, [])
  // async function inside useEffect

  async function handleCreateNewTodoItem() {
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=cohort24',
      { item: { text: newTodoText } }
    )
    if (response.status === 201) {
      loadAllTheItems()
    }
  }
  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <ul>
          {todoItems.map(function (todoItem) {
            return (
              <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                reloadItems={loadAllTheItems}
              />
            )
          })}
        </ul>
        <form
          onSubmit={function (event) {
            event.preventDefault()
            handleCreateNewTodoItem()
          }}
        >
          <input
            type="text"
            placeholder="Whats up?"
            value={newTodoText}
            onChange={(event) => {
              setNewTodoText(event.target.value)
            }}
          />
        </form>
      </main>
      <footer>
        <p>
          <img src={logo} height="42" alt="logo" />
        </p>
        <p>&copy; 2020 Suncoast Developers Guild</p>
      </footer>
    </div>
  )
}

type TodoItemProps = { todoItem: TodoItemType; reloadItems: () => void }

function TodoItem({
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
