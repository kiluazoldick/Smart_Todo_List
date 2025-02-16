import TodoList from "@/components/todo-list"

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Smart Todo List</h1>
      <TodoList />
    </main>
  )
}

