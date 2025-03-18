import { Badge } from "@/components/ui/badge"

export default function StatusBadge({ status }) {
  switch (status) {
    case "todo":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          To Do
        </Badge>
      )
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          In Progress
        </Badge>
      )
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Completed
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

