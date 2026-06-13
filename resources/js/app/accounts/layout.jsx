import React from 'react'
import TopbarSection from './_sections/topbar-section'

export default function Layout({ children }) {
    return (
        <div>
            <TopbarSection />
            <div className="mt-24 mx-12">
                {children}
            </div>
        </div>
    )
}
