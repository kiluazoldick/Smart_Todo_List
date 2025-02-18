"use client"

import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { useState } from "react"
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
  const [columns, setColumns] = useState({
    todo: todos.filter((t) => !t.completed),
    done: todos.filter((t) => t.completed),
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId as keyof typeof columns]
      const newItems = Array.from(column)
      const [reorderedItem] = newItems.splice(result.source.index, 1)
      newItems.splice(destination.index, 0, reorderedItem)

      setColumns({
        ...columns,
        [source.droppableId]: newItems,
      })
    } else {
      const sourceColumn = columns[source.droppableId as keyof typeof columns]
      const destColumn = columns[destination.droppableId as keyof typeof columns]
      const sourceItems = Array.from(sourceColumn)
      const destItems = Array.from(destColumn)
      const [removedItem] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removedItem)

      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      })

      // Toggle the completed status of the todo
      onToggle(removedItem.id)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} className="flex-1">
            <h2 className="text-lg font-semibold mb-2 capitalize">{columnId}</h2>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {column.map((todo, index) => (
                    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

