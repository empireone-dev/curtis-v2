import React, { useState } from 'react';

// --- IMPORTS ---
// Assuming all these files are in the same _sections folder
import CreatedTicketStatsSection from './created-ticket-stats-section';
import ProcessedTicketStatsSection from './processed-ticket-stats-section';
import OpenVsCloseSection from './open-vs-close-section';

import CompanyResponseTimeSection from './company-response-time-section';
import CustomerResponseTimeSection from './customer-response-time-section';

import PerformanceMetrixSection from './performance-metrix-section';
import TicketAgeSection from './ticket-age-section';

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // --- TABS CONFIGURATION ---
  const tabs = [
    {
      id: 'tab-volume-status',
      label: 'Volume & Status',
      content: (
        <div className="flex flex-col gap-8">
          <CreatedTicketStatsSection />
          <ProcessedTicketStatsSection />
          <OpenVsCloseSection />
        </div>
      ),
    },
    {
      id: 'tab-response',
      label: 'Response Times',
      content: (
        <div className="flex flex-col gap-8">
          <CompanyResponseTimeSection />
          <CustomerResponseTimeSection />
        </div>
      ),
    },
    {
      id: 'tab-performance',
      label: 'Performance Metrics',
      content: (
        <div className="flex flex-col gap-8">
          <PerformanceMetrixSection />
          <TicketAgeSection />
        </div>
      ),
    },
  ];

  // --- TAB SWITCH HANDLER ---
  const handleTabChange = (index) => {
    if (index === activeTab) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(index);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="w-full font-sans">
      
      {/* --- TAB HEADERS --- */}
      <div className="flex overflow-x-auto border-b border-gray-200 no-scrollbar">
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(index)}
              className={`
                whitespace-nowrap py-4 px-8 text-sm font-medium transition-all duration-200 focus:outline-none
                ${isActive 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-2 border-transparent'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* --- TAB CONTENT PANEL --- */}
      <div 
        className={`
          mt-6 min-h-[400px]
          transition-opacity duration-150 ease-in-out
          ${isAnimating ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {tabs[activeTab].content}
      </div>

    </div>
  );
}