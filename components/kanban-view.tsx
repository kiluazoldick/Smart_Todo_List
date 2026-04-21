"use client"

import TodoItem from "./todo-item"

type Importance = "low" | "medium" | "high"

type Todo = {
  id: number
  text: string
  completed: boolean
  datetime: Date | null
  importance: Importance
}

type KanbanViewProps = {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, newText: string, newDatetime: Date | null, newImportance: Importance) => void
}

export default function KanbanView({ todos, onToggle, onDelete, onUpdate }: KanbanViewProps) {
  const todoItems = todos.filter((t) => !t.completed)
  const doneItems = todos.filter((t) => t.completed)

  return (
    <div className="flex gap-4">
      <div className="flex-1 bg-muted/30 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">To Do</h2>
        <ul className="space-y-2 min-h-64">
          {todoItems.map((todo) => (
            <li key={todo.id}>
              <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 bg-muted/30 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Done</h2>
        <ul className="space-y-2 min-h-64">
          {doneItems.map((todo) => (
            <li key={todo.id}>
              <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

