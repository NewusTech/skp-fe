"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Dummy data for survey counts from January to December
const dummyData = [
    { month: "Jan", ASN: 50, NonASN: 30 },
    { month: "Feb", ASN: 45, NonASN: 25 },
    { month: "Mar", ASN: 60, NonASN: 40 },
    { month: "Apr", ASN: 55, NonASN: 35 },
    { month: "May", ASN: 70, NonASN: 50 },
    { month: "Jun", ASN: 65, NonASN: 45 },
    { month: "Jul", ASN: 80, NonASN: 60 },
    { month: "Aug", ASN: 75, NonASN: 55 },
    { month: "Sep", ASN: 90, NonASN: 70 },
    { month: "Oct", ASN: 85, NonASN: 65 },
    { month: "Nov", ASN: 100, NonASN: 80 },
    { month: "Dec", ASN: 95, NonASN: 75 },
];

export function BarChartDashboard() {
    const chartConfig = {
        ASN: {
            label: "ASN",
            color: "#80AC6C",
        },
        NonASN: {
            label: "Non-ASN",
            color: "#456237",
        },
    } satisfies ChartConfig;

    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("ASN");

    const total = React.useMemo(() => {
        return dummyData.reduce(
            (acc, curr) => {
                acc.ASN += curr.ASN;
                acc.NonASN += curr.NonASN;
                return acc;
            },
            { ASN: 0, NonASN: 0 }
        );
    }, []);

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Jumlah Survey Perbulan</CardTitle>
                    <CardDescription>Periode: Januari 2025 - Desember 2025</CardDescription>
                </div>
                <div className="flex">
                    {["ASN", "NonASN"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-10 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-primary/20 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="font-semibold">{chartConfig[chart].label}</span>
                                <div className="text-xs text-[#9D8C8C]">Total Survey</div>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[chart].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[350px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={dummyData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="month"
                                    labelFormatter={(value) => `${value}`}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <div className="md:p-6 p-3">
                <div className="md:mb-4 mb-2 md:text-base text-sm">Keterangan</div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    {dummyData.map((data) => (
                        <div className="flex items-center gap-3" key={data.month}>
                            <div className="flex items-center gap-2 md:text-base text-sm">
                                <div className="w-3 h-3 rounded-full bg-primary-700"></div>
                                <div className="font-semibold w-[60px]">{data.month}</div>
                                <div>
                                    : ASN {data.ASN}, Non-ASN {data.NonASN}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
