"use client"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddTaskForm from "./Addtask"
export default function TaskHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task Assignments</h1>
          <p className="text-muted-foreground">Manage and track assigned tasks</p>
        </div>
        <Button className="shrink-0" onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>
      {isDialogOpen && <AddTaskForm onClose={() => setIsDialogOpen(false)} />}
    </>
  )
}

