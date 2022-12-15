import React from 'react'
import { Route, Routes } from 'react-router'
import logo from './images/sdg-logo.png'
import { TodoItemPage } from './pages/TodoItemPage'
import { TodoList } from './pages/TodoList'

export type TodoItemType = {
  id: number
  text: string
  complete: boolean
  updated_at: Date
  created_at: Date
}

export function App() {
  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TodoList />}></Route>
          <Route path="/items/:id" element={<TodoItemPage />}></Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
        </Routes>
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
