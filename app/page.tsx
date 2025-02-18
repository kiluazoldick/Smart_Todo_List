"use client";

import { useState } from "react";
import TodoList from "@/components/todo-list";
import KanbanView from "@/components/kanban-view";
import { Button } from "@/components/ui/button";
import { ListIcon, ColumnsIcon } from "lucide-react";
import { useTheme } from "next-themes";

type Importance = "low" | "medium" | "high";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  datetime: Date | null;
  importance: Importance;
};

export default function Home() {
  const [view, setView] = useState<"list" | "kanban">("list");
  const [todos, setTodos] = useState<Todo[]>([]);
  useTheme();

  const addTodo = (newTodo: Omit<Todo, "id">) => {
    setTodos([...todos, { ...newTodo, id: Date.now() }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (
    id: number,
    newText: string,
    newDatetime: Date | null,
    newImportance: Importance
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
              datetime: newDatetime,
              importance: newImportance,
            }
          : todo
      )
    );
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-64 bg-background/95 p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Views</h2>
        <div className="space-y-2">
          <Button
            variant={view === "list" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setView("list")}
          >
            <ListIcon className="mr-2 h-5 w-5" />
            List View
          </Button>
          <Button
            variant={view === "kanban" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setView("kanban")}
          >
            <ColumnsIcon className="mr-2 h-5 w-5" />
            Kanban View
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Smart Todo List</h1>
        {view === "list" ? (
          <TodoList
            todos={todos}
            onAddTodo={addTodo}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onUpdateTodo={updateTodo}
          />
        ) : (
          <KanbanView
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        )}
      </main>
    </div>
  );
}
