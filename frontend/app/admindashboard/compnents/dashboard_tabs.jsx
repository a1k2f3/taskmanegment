import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskFilters from "./Taskfilters"
import TaskList from "@/app/Components/task_list"
import EmptyState from "@/app/Components/empty_states"
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
  const completedTasks = filteredTasks.filter((task) => task.status === "Senior_Employee")
  const hasFilters = searchQuery || statusFilter !== "all" || priorityFilter !== "all"
  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <TabsList className="mb-2 sm:mb-0">
          <TabsTrigger value="all">All Employees</TabsTrigger>
          <TabsTrigger value="Senior_Employee">Seneior Employee</TabsTrigger>
          <TabsTrigger value="junior_employee">Junnior  Employee</TabsTrigger>
          <TabsTrigger value="display_task">Display Task</TabsTrigger>
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
      <TabsContent value="junior_employee" className="mt-0">
        {myTasks.length > 0 ? (
          <TaskList tasks={myTasks} />
        ) : (
          <EmptyState hasFilters={hasFilters} searchQuery={searchQuery} customMessage="no employee" />
        )}
      </TabsContent>
      <TabsContent value="Senior_Employee" className="mt-0">
        {completedTasks.length > 0 ? (
          <TaskList tasks={completedTasks} />
        ) : (
          <EmptyState hasFilters={hasFilters} searchQuery={searchQuery} customMessage="No Employee" />
        )}
      </TabsContent>
      <TabsContent value="display_task" className="mt-0">
        {completedTasks.length > 0 ? (
          <TaskList tasks={completedTasks} />
        ) : (
          <EmptyState hasFilters={hasFilters} searchQuery={searchQuery} customMessage="No task" />
        )}
      </TabsContent>
    </Tabs>
  )
}

