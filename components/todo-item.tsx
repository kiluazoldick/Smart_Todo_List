"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Edit2, Check } from "lucide-react"
import { motion } from "framer-motion"
import { DateTimePicker } from "./date-time-picker"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Importance = "low" | "medium" | "high"

type TodoItemProps = {
  todo: {
    id: number
    text: string
    completed: boolean
    datetime: Date | null
    importance: Importance
  }
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, newText: string, newDatetime: Date | null, newImportance: Importance) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editDate, setEditDate] = useState<Date | null>(todo.datetime)
  const [editImportance, setEditImportance] = useState<Importance>(todo.importance)

  const handleUpdate = () => {
    if (editText.trim() !== "") {
      onUpdate(todo.id, editText.trim(), editDate, editImportance)
      setIsEditing(false)
    }
  }

  const importanceColors = {
    low: "bg-green-50 border-green-200",
    medium: "bg-yellow-50 border-yellow-200",
    high: "bg-red-50 border-red-200",
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col p-3 bg-white rounded-lg shadow-sm border ${importanceColors[todo.importance]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-grow">
          <Checkbox
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            disabled={isEditing}
            className="border-2 border-gray-300 rounded-full w-5 h-5"
          />
          {isEditing ? (
            <Input value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-grow" autoFocus />
          ) : (
            <label
              htmlFor={`todo-${todo.id}`}
              className={`text-sm ${todo.completed ? "line-through text-gray-500" : "text-gray-700"}`}
            >
              {todo.text}
            </label>
          )}
        </div>
        <div className="flex space-x-1">
          {isEditing ? (
            <Button variant="ghost" size="sm" onClick={handleUpdate} className="text-blue-500 hover:text-blue-600">
              <Check className="h-4 w-4" />
            </Button>
          ) : (
            isHovered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )
          )}
          {isHovered && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(todo.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="mt-2 flex space-x-2">
          <DateTimePicker date={editDate} setDate={setEditDate} />
          <Select value={editImportance} onValueChange={(value: Importance) => setEditImportance(value)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="flex justify-between items-center mt-1">
          {todo.datetime && <span className="text-xs text-gray-500">{format(todo.datetime, "PPP 'at' HH:mm")}</span>}
          <span
            className="text-xs font-medium capitalize px-2 py-1 rounded-full bg-opacity-20"
            style={{
              backgroundColor:
                todo.importance === "low"
                  ? "rgba(34, 197, 94, 0.2)"
                  : todo.importance === "medium"
                    ? "rgba(234, 179, 8, 0.2)"
                    : "rgba(239, 68, 68, 0.2)",
              color:
                todo.importance === "low"
                  ? "rgb(21, 128, 61)"
                  : todo.importance === "medium"
                    ? "rgb(161, 98, 7)"
                    : "rgb(185, 28, 28)",
            }}
          >
            {todo.importance}
          </span>
        </div>
      )}
    </motion.li>
  )
}

