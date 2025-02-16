"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Edit2, Check } from "lucide-react"
import { motion } from "framer-motion"

type TodoItemProps = {
  todo: {
    id: number
    text: string
    completed: boolean
  }
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, newText: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleUpdate = () => {
    if (editText.trim() !== "") {
      onUpdate(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-2 bg-card rounded-lg shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-2 flex-grow">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          disabled={isEditing}
        />
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
            className="flex-grow"
            autoFocus
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`text-sm ${todo.completed ? "line-through text-muted-foreground" : ""}`}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="flex space-x-1">
        {isEditing ? (
          <Button variant="ghost" size="icon" onClick={handleUpdate} className="text-green-500">
            <Check className="h-4 w-4" />
            <span className="sr-only">Save todo</span>
          </Button>
        ) : (
          isHovered && (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="text-blue-500">
              <Edit2 className="h-4 w-4" />
              <span className="sr-only">Edit todo</span>
            </Button>
          )
        )}
        {isHovered && !isEditing && (
          <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)} className="text-destructive">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete todo</span>
          </Button>
        )}
      </div>
    </motion.li>
  )
}

