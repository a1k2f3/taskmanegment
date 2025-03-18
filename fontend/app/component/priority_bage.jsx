import { Badge } from "@/components/ui/badge"

export default function PriorityBadge({ priority }) {
  switch (priority) {
    case "low":
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
          Low
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Medium
        </Badge>
      )
    case "high":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          High
        </Badge>
      )
    case "critical":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Critical
        </Badge>
      )
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

