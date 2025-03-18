export interface Assignee {
    name: string
    avatar: string
    initials: string
  }
  
  export interface Task {
    id: number
    title: string
    description: string
    status: "todo" | "in-progress" | "completed"
    priority: "low" | "medium" | "high" | "critical"
    dueDate: string
    assignee: Assignee
    tags: string[]
  }
  
  export const tasks: Task[] = [
    {
      id: 1,
      title: "Redesign homepage",
      description: "Update the homepage design to match new brand guidelines",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-03-25",
      assignee: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      tags: ["design", "frontend"],
    },
    {
      id: 2,
      title: "Fix login bug",
      description: "Users are experiencing issues with social login functionality",
      status: "todo",
      priority: "critical",
      dueDate: "2025-03-20",
      assignee: {
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ST",
      },
      tags: ["bug", "backend"],
    },
    {
      id: 3,
      title: "Implement analytics dashboard",
      description: "Create a dashboard to display user engagement metrics",
      status: "completed",
      priority: "medium",
      dueDate: "2025-03-15",
      assignee: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      tags: ["analytics", "dashboard"],
    },
    {
      id: 4,
      title: "Optimize database queries",
      description: "Improve performance of slow-running database queries",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-03-22",
      assignee: {
        name: "Morgan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ML",
      },
      tags: ["database", "performance"],
    },
    {
      id: 5,
      title: "Write API documentation",
      description: "Document all API endpoints for developer reference",
      status: "todo",
      priority: "medium",
      dueDate: "2025-03-28",
      assignee: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      tags: ["documentation", "api"],
    },
    {
      id: 6,
      title: "Implement user feedback form",
      description: "Add a form to collect user feedback on new features",
      status: "todo",
      priority: "low",
      dueDate: "2025-04-01",
      assignee: {
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ST",
      },
      tags: ["feedback", "frontend"],
    },
  ]
  
  