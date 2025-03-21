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
export default function AddTaskForm({
         onClose 
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [date, setDate] = useState()
  const [title, settitle] = useState()
  const [description, setdescription] = useState()
  const [priority, setpriority] = useState()
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [id,setid] = useState()
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }
  const handletitle = (e) => {
    settitle(e.target.value)
  }
  const handledescription = (e) => {
    setdescription(e.target.value)
  }
  const handledlepriority = (e) => {
    setpriority(e.target.value)
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


    // Get form data
    const formData = new FormData()
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priority", priority);
    formData.append("dueDate", date);
    formData.append("dueDate", date);
    console.log(formData)
    // Add files to form data
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file)
    })

    try{
      const response = await fetch("http://localhost:3001/tasks",
         { method: "POST", body: formData });
         const data = await response.json();
    if(response.ok){
alert("task asgined successfuly")
    }
    else{
alert(`Error: ${data.message || "task asgined failed "}`)
    }

      }catch(error){
      console.log(error)
      }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSuccess(false)
        setFiles([])
        // Optionally redirect to tasks list
        // router.push('/tasks')
      }, 2000)
    }, 1000)
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
            <Input id="title" placeholder="Enter task title" value={title} onChange={handletitle} required  />
          </div>
{console.log(title)}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter task description" className="min-h-[100px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
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
              <Select>
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
            <Label htmlFor="ID">Task Title</Label>
            <Input id="ID" placeholder="Enter user Id" value={id} onChange={(e) => setid(e.target.value)} required  />
          </div>
          {/* File Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer text-center",
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={openFileDialog}
            >
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />

              <Paperclip className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Drag and drop files here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supports images, documents, and other file types</p>
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Selected Files:</p>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <File className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile(index)
                        }}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => console.log("hello")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || isSuccess}>
            {isSubmitting ? (
              <>
                <span className="mr-2">Saving...</span>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Task Added
              </>
            ) : (
              "Add Task"
            )}
          </Button>
        </CardFooter>
      </form>
      <Button onClick={onClose} className="mt-4 w-30">Close</Button>
    </Card>
  )
}