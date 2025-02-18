"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import TodoItem from "./todo-item"
import { DateTimePicker } from "./date-time-picker"

type Todo = {
  id: number
  text: string
  completed: boolean
  datetime: Date | null
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [newTodoDate, setNewTodoDate] = useState<Date | null>(null)

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
          datetime: newTodoDate,
        },
      ])
      setNewTodo("")
      setNewTodoDate(null)
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const updateTodo = (id: number, newText: string, newDatetime: Date | null) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText, datetime: newDatetime } : todo)))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <DateTimePicker date={newTodoDate} setDate={setNewTodoDate} />
        <Button onClick={addTodo}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Todo
        </Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
        ))}
      </ul>
    </div>
  )
}

