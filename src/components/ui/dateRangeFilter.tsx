"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// Props untuk menangani perubahan tanggal
interface DatePickerRangeFilterProps {
    className?: string
    onDateChange: (startDate: string, endDate: string) => void
    placeholder?: string
}

export function DatePickerRangeFilter({
    placeholder = "Pilih Tanggal",
    className,
    onDateChange,
}: DatePickerRangeFilterProps) {
    const [date, setDate] = React.useState<DateRange | undefined>()

    // Mengirimkan data ke halaman setiap kali tanggal berubah
    React.useEffect(() => {
        if (date?.from && date?.to) {
            const startDate = format(date.from, "yyyy/MM/dd") // Format dd/MM/yyyy
            const endDate = format(date.to, "yyyy/MM/dd")     // Format dd/MM/yyyy
            onDateChange(startDate, endDate)
        }
    }, [date, onDateChange])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "w-full rounded-full justify-between text-left font-normal",
                        !date && "text-muted-foreground ", className
                    )}
                >
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "dd/MM/yyyy")} -{" "} {/* Format untuk ditampilkan */}
                                {format(date.to, "dd/MM/yyyy")}
                            </>
                        ) : (
                            format(date.from, "dd/MM/yyyy")
                        )
                    ) : (
                        <span>{placeholder}</span>
                    )}
                    <CalendarIcon size={20} color="#80AC6C" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    )
}
