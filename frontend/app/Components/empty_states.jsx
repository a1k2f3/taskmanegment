import { CheckCircle2, Plus } from "lucide-react"


export default function EmptyState({ hasFilters, searchQuery, customMessage }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">No tasks found</h3>
      <p className="text-muted-foreground mt-1">
        {hasFilters
          ? "Try adjusting your filters or search query"
          : customMessage || "Create a new task to get started"}
      </p>
      
    </div>
  )
}

