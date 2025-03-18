"use client"

import { Filter, Search, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TaskFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortOption,
  setSortOption,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks..."
          className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("todo")}>To Do</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>In Progress</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setPriorityFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter("low")}>Low</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>Medium</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter("high")}>High</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter("critical")}>Critical</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[130px]">
            <SortAsc className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="due-date">Due Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

