"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "./ui/input"

export function DateTimePicker({
  date,
  setDate,
}: {
  date: Date | null
  setDate: (date: Date | null) => void
}) {
  const [selectedTime, setSelectedTime] = React.useState(date ? format(date, "HH:mm") : "")

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const [hours, minutes] = selectedTime.split(":").map(Number)
      selectedDate.setHours(hours || 0, minutes || 0, 0, 0)
      setDate(selectedDate)
    } else {
      setDate(null)
    }
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value)
    if (date) {
      const [hours, minutes] = event.target.value.split(":").map(Number)
      const newDate = new Date(date)
      newDate.setHours(hours || 0, minutes || 0, 0, 0)
      setDate(newDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date || undefined} onSelect={handleDateSelect} initialFocus />
        <div className="p-3 border-t border-border">
          <Input type="time" value={selectedTime} onChange={handleTimeChange} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

