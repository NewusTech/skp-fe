"use client"
import { BarChartDashboard } from '@/components/(admin)/dashboard/barChart';
import { PieChartDashboard } from '@/components/(admin)/dashboard/pieChart';
import { RadialChart } from '@/components/(admin)/dashboard/radialChart';
import { DatePickerRangeFilter } from '@/components/ui/dateRangeFilter';
import { useState } from 'react';

const DashboardPage = () => {
    const [StartDate, setStartDate] = useState<any>("");
    const [EndDate, setEndDate] = useState<any>("");
    const handleDateChange = (startDate: string, endDate: string) => {
        setStartDate(startDate);
        setEndDate(endDate);
        // console.log("Start Date:", startDate)
        // console.log("End Date:", endDate)
    }
    return (
        <div className='flex flex-col gap-7'>
            <div className="flex justify-between gap-3 items-center">
                <div className="font-semibold text-primary-800 text-2xl">Dashboard</div>
                <DatePickerRangeFilter
                    className="border-primary-700 w-1/2"
                    onDateChange={handleDateChange}
                />
            </div>
            {/* grafik */}
            <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/2">
                        <RadialChart />
                    </div>
                    <div className="w-full md:w-1/2">
                        <PieChartDashboard />
                    </div>
                </div>
                {/*  */}
                <div className="">
                <BarChartDashboard />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage