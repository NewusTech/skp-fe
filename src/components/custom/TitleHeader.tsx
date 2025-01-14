"use client"
import { CircleChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

interface TitleHeaderProps {
    label?: string;
}
const TitleLabel = (props: TitleHeaderProps) => {
    const router = useRouter();
    return (
        <div className="flex items-center md:gap-3 gap-2">
            <div onClick={() => router.back()} className="cursor-pointer">
                <CircleChevronLeft size={28} color="#80AC6C" />
            </div>
            <div className="font-semibold text-primary-800 text-xl md:text-2xl">{props.label}</div>
        </div>
    )
}

export default TitleLabel