import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import ProductivityCardsSection from './productivity-cards-section'

const AGENT_TYPES = ['Warranty', 'Safety Issue', 'Parts', 'Tech', 'CSR',]

export default function ProductivityTabsSection() {
    const { users } = useSelector((store) => store.users)
    const [selectedType, setSelectedType] = useState('Warranty')

    const filteredData = useMemo(() => {
        const rawData = users?.data || users
        if (!Array.isArray(rawData)) return []

        return rawData.filter(
            (user) => user.agent_type?.toLowerCase() === selectedType.toLowerCase()
        )
    }, [users, selectedType])

    console.log('users',users)
    const handleViewProfile = (user) => {
        console.log('View profile:', user)
    }

    return (
        <div className="space-y-6">
            {/* Agent Type Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
                {AGENT_TYPES.map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${selectedType === type
                            ? 'border-blue-600 text-blue-600 font-semibold'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Cards Grid Container */}
            <ProductivityCardsSection
                data={filteredData}
                onViewProfile={handleViewProfile}
            />
        </div>
    )
}