"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, CheckCircle, X, File, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function AddTaskForm({ onClose }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [date, setDate] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [id, setId] = useState("")
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)  

    const formData = new FormData()
    formData.append("title", title)
    formData.append("detail", description)
    formData.append("priority", priority)
    formData.append("date", date ? format(date, "yyyy-MM-dd") : "")
    formData.append("user", id)

    files.forEach((file, index) => {
      formData.append(`file-${index}`, file)
    })

    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        alert("Task assigned successfully")
        setTitle("")
        setDescription("")
        setPriority("")
        setDate(null)
        setId("")
        setFiles([])
        setIsSuccess(true)

        setTimeout(() => {
          setIsSuccess(false)
        }, 2000)
      } else {
        const data = await response.json()
        alert(`Error: ${data.message || "Task assignment failed"}`)
      }
    } catch (error) {
      console.error("Error submitting task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Task</CardTitle>
        <CardDescription>Create a new task with details and due date</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input id="title" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter task description" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[100px]" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="id">User ID</Label>
            <Input id="id" placeholder="Enter user ID" value={id} onChange={(e) => setId(e.target.value)} required />
          </div>

          {/* File Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <div className={cn("border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors", isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50")} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={openFileDialog}>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
              <Paperclip className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Drag and drop files here or click to browse</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting || isSuccess}>{isSubmitting ? "Saving..." : isSuccess ? "Task Added" : "Add Task"}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
