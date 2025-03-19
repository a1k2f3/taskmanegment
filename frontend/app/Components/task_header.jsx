import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TaskHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Task Assignments</h1>
        <p className="text-muted-foreground">Manage and track assigned tasks</p>
      </div>
      
    </div>
  )
}

