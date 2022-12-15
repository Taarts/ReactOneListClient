import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TodoItem } from './components/TodoItem'
import { TodoItemType } from './App'

export function TodoList() {
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
    <>
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
    </>
  )
}
