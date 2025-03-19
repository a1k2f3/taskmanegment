"use client"
import { useState, useMemo } from "react"
import  tasks  from "./data/data"
import TaskHeader from "./task_header"
import TaskTabs from "./task_tab"

export default function TaskDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortOption, setSortOption] = useState("newest")

  // Ensure tasks is always an array
  const safeTasks = Array.isArray(tasks) ? tasks : []

  // Filter tasks using useMemo
  const filteredTasks = useMemo(() => {
    return safeTasks.filter((task) => {
      if (!task || typeof task !== "object") return false
      const matchesSearch =
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = statusFilter === "all" || task.status === statusFilter
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchQuery, statusFilter, priorityFilter, safeTasks])

  // Sort tasks using useMemo
  const sortedTasks = useMemo(() => {
    if (!Array.isArray(filteredTasks)) return [] // Prevents the TypeError

    return [...filteredTasks].sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        case "oldest":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case "priority": {
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
          return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
        }
        case "due-date":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        default:
          return 0
      }
    })
  }, [filteredTasks, sortOption])

  return (
    <div className="space-y-6">
      <TaskHeader />
      <TaskTabs
        filteredTasks={sortedTasks}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        searchHandler={setSearchQuery}
        statusFilterHandler={setStatusFilter}
        priorityFilterHandler={setPriorityFilter}
        sortHandler={setSortOption}
        sortOption={sortOption}
      />
      {
        console.log(tasks)
      }
    </div>
  )
}
