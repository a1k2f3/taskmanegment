import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import TaskFilters from "@/components/task-filters"
// import TaskList from "@/components/task-list"
// import EmptyState from "@/components/empty-state"
import TaskFilters from "./task_filter"
import TaskList from "./task_list"
import EmptyState from "./empty_state"
export default function TaskTabs({
  filteredTasks,
  searchQuery,
  statusFilter,
  priorityFilter,
  searchHandler,
  statusFilterHandler,
  priorityFilterHandler,
  sortHandler,
  sortOption,
}) {
  const myTasks = filteredTasks.filter((task) => task.assignee.name === "Alex Johnson")
  const completedTasks = filteredTasks.filter((task) => task.status === "completed")

  const hasFilters = searchQuery || statusFilter !== "all" || priorityFilter !== "all"

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <TabsList className="mb-2 sm:mb-0">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TaskFilters
          searchQuery={searchQuery}
          setSearchQuery={searchHandler}
          statusFilter={statusFilter}
          setStatusFilter={statusFilterHandler}
          priorityFilter={priorityFilter}
          setPriorityFilter={priorityFilterHandler}
          sortOption={sortOption}
          setSortOption={sortHandler}
        />
      </div>

      <TabsContent value="all" className="mt-0">
        {filteredTasks.length > 0 ? (
          <TaskList tasks={filteredTasks} />
        ) : (
          <EmptyState hasFilters={hasFilters} searchQuery={searchQuery} />
        )}
      </TabsContent>

      <TabsContent value="my-tasks" className="mt-0">
        {myTasks.length > 0 ? (
          <TaskList tasks={myTasks} />
        ) : (
          <EmptyState hasFilters={hasFilters} searchQuery={searchQuery} customMessage="No tasks assigned to you" />
        )}
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        {completedTasks.length > 0 ? (
          <TaskList tasks={completedTasks} />
        ) : (
          <EmptyState hasFilters={hasFilters} searchQuery={searchQuery} customMessage="No completed tasks" />
        )}
      </TabsContent>
    </Tabs>
  )
}

