import React from 'react';
import Card from '@/app/_components/card';
import {
    FcApproval,
    FcSupport,
    FcHighPriority,
    FcOnlineSupport,
} from "react-icons/fc";

export default function CardSection() {
    return (
        <div className='flex items-center justify-center w-full'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6 w-full justify-items-center">

                <Card
                    icon={FcApproval}
                    title="Warranty Claim"
                    href='/accounts/administrator/ticket'
                    linkText='View Warranty'
                    variant="primary"
                    count={100}
                />

                <Card
                    icon={FcHighPriority}
                    title="Safety Concern"
                    href='/accounts/administrator/ticket'
                    linkText='Review Queue'
                    variant="danger"
                    count={100}
                />
                
                <Card
                    icon={FcSupport}
                    title="Parts"
                    href='/accounts/administrator/ticket'
                    linkText='View Parts'
                    variant="secondary"
                    count={100}
                />
                
                <Card
                    icon={FcOnlineSupport}
                    title="Tech Concern"
                    href='/accounts/administrator/ticket'
                    linkText='View Tech'
                    variant="success"
                    count={100}
                />
                
                <Card
                    icon={FcOnlineSupport}
                    title="General Inquiry"
                    href='/accounts/administrator/ticket'
                    linkText='View Inquiries'
                    variant="warning" 
                    count={100}
                />

                  <Card
                    icon={FcOnlineSupport}
                    title="Others Concern"
                    href='/accounts/administrator/ticket'
                    linkText='View Others'
                    variant="primary" 
                    count={100}
                />
            </div>
        </div>
    )
}