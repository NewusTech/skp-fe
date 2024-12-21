"use client"
import React from 'react'

interface TitleHeaderProps {
    label?: string;
}
const Title = (props: TitleHeaderProps) => {
    return (
        <div className="flex items-center gap-3">
            <div className="font-semibold text-primary-800 text-2xl">{props.label}</div>
        </div>
    )
}

export default Title