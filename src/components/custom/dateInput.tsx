"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    selectedDate: Date | undefined
    onChange: (date: Date | undefined) => void
    placeholder: string
    className?: string
}

export function DatePicker({ selectedDate, onChange, placeholder,  className, }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full text-xs md:text-base justify-between text-left font-normal",className,
                        !selectedDate && "text-muted-foreground"
                    )}
                >
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span>{placeholder}</span>}
                    <CalendarIcon size={20} color="#80AC6C"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={onChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
