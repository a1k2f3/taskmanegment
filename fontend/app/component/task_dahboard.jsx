"use client"

import { useState } from "react"
// import { tasks } from "@/data/tasks"
import { tasks } from "./type"

import TaskHeader from "./task_header"

import TaskTabs from "./tasktabs"


export default function TaskDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortOption, setSortOption] = useState("newest")

  // Filter tasks based on search query and filters
  const filteredTasks = tasks.filter((task) => {
    // Search filter
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Status filter
    const matchesStatus = statusFilter === "all" || task.status === statusFilter

    // Priority filter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Sort tasks based on sort option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      case "oldest":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      case "priority": {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      case "due-date":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      default:
        return 0
    }
  })

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
    </div>
  )
}

