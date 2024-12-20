import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SurveyTab from '@/components/(user)/history/surveyTab/SurveyTab'
import ComplaintTab from '@/components/(user)/history/complaintTab/ComplaintTab'

const History = () => {
    return (
        <div>
            <Tabs defaultValue="survei" className="w-full">
                <TabsList>
                    <TabsTrigger value="survei">Survei</TabsTrigger>
                    <TabsTrigger value="pengaduan">Pengaduan</TabsTrigger>
                </TabsList>
                <TabsContent value="survei">
                    <SurveyTab />
                </TabsContent>
                <TabsContent value="pengaduan">
                    <ComplaintTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default History