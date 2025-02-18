"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, CalendarIcon } from "lucide-react"
import TodoItem from "./todo-item"
import { DateTimePicker } from "./date-time-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Importance = "low" | "medium" | "high"

type Todo = {
  id: number
  text: string
  completed: boolean
  datetime: Date | null
  importance: Importance
}

type TodoListProps = {
  todos: Todo[]
  onAddTodo: (newTodo: Omit<Todo, "id">) => void
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
  onUpdateTodo: (id: number, newText: string, newDatetime: Date | null, newImportance: Importance) => void
}

export default function TodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo, onUpdateTodo }: TodoListProps) {
  const [newTodo, setNewTodo] = useState("")
  const [newTodoDate, setNewTodoDate] = useState<Date | null>(null)
  const [newTodoImportance, setNewTodoImportance] = useState<Importance>("medium")

  const addTodo = () => {
    if (newTodo.trim()) {
      onAddTodo({
        text: newTodo.trim(),
        completed: false,
        datetime: newTodoDate,
        importance: newTodoImportance,
      })
      setNewTodo("")
      setNewTodoDate(null)
      setNewTodoImportance("medium")
    }
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 bg-background/95 dark:bg-background/20 p-2 rounded-lg shadow-sm border-2 border-gray-200 dark:border-gray-700">
        <Input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          className="flex-grow border-none shadow-none focus-visible:ring-0 bg-transparent"
        />
        <DateTimePicker date={newTodoDate} setDate={setNewTodoDate} className="w-auto">
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
            <CalendarIcon className="h-5 w-5" />
          </Button>
        </DateTimePicker>
        <Select value={newTodoImportance} onValueChange={(value: Importance) => setNewTodoImportance(value)}>
          <SelectTrigger className="w-[100px] border-none bg-transparent">
            <SelectValue placeholder="Importance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addTodo} variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggleTodo} onDelete={onDeleteTodo} onUpdate={onUpdateTodo} />
        ))}
      </ul>
    </div>
  )
}

