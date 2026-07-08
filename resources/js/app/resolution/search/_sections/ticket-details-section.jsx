import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StepperSection from './stepper-section';
import moment from 'moment';
import UploadLackingInformationSection from './upload-lacking-information-section';

export default function TicketDetailsSection() {
    const { ticket: ticket_info } = useSelector((store) => store.app);
    // Managing our interactive tabs
    const [activeTab, setActiveTab] = useState('overview');
    const url = new URL(window.location.href);

    // Get the value of the 'tab' parameter
    const tabValue = url.searchParams.get("tab");

    useEffect(() => {
        setActiveTab(tabValue ?? 'overview')
    }, [])
    // Using the data from your previous JSON payload as default state
    const ticket = {
        id: ticket_info?.ticket_id,
        status: ticket_info?.status,
        decision: ticket_info?.decision_status ?? 'Pending Decision',
        customer: {
            name: `${ticket_info?.fname ?? ''} ${ticket_info?.lname ?? ''}`,
            phone: `${ticket_info?.phone ?? ''}`,
            email: `${ticket_info?.email ?? ''}`,
            address: `${ticket_info?.address ?? ''} ${ticket_info?.city ?? ''} ${ticket_info?.state ?? ''} ${ticket_info?.country ?? ''}  ${ticket_info?.zip_code ?? ''}`,
            address2: `${ticket_info?.address2 ?? 'N/A'}`,
        },
        product: {
            brand: `${ticket_info?.brand}`,
            item: `${ticket_info?.item_number}`,
            serial: `${ticket_info?.serial_number}`,
            purchased: `${moment(ticket_info?.purchase_date).format('LL')}`
        },
        issue: ticket_info?.detailed_explanation_issue ?? ticket_info?.issue
    };

    // Helper for tab styling
    const tabClass = (tabName) => `
    px-4 py-2 font-medium text-sm rounded-t-lg transition-colors duration-200
    ${activeTab === tabName
            ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }
  `;

    return (
        <>

            {/* 1. Header Section */}
            <div className="flex justify-between flex-col items-start ">

                <div className="flex space-x-3 py-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold tracking-wide">
                        {ticket_info?.call_type}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold tracking-wide">
                        {ticket.decision}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold tracking-wide">
                        {ticket.status}
                    </span>
                </div>
            </div>

            {/* 2. Interactive Tab Navigation */}
            <div className="flex space-x-2 border-b border-gray-200 mb-4">
                <button onClick={() => setActiveTab('overview')} className={tabClass('overview')}>
                    Overview & Issue
                </button>
                <button onClick={() => setActiveTab('upload')} className={tabClass('upload')}>
                    Files
                </button>
                <button onClick={() => setActiveTab('customer')} className={tabClass('customer')}>
                    Customer Details
                </button>
                <button onClick={() => setActiveTab('product')} className={tabClass('product')}>
                    Product Info
                </button>
            </div>

            {/* 3. Dynamic Content Area */}
            <div className="bg-white p-5 rounded-b-lg rounded-tr-lg border border-gray-200 shadow-sm min-h-[250px] flex flex-col gap-3">
                <div className='bg-green-50 text-green-900 p-2 rounded-md border border-green-100 leading-relaxed'>
                    <p className="text-gray-800 font-black">CASE FILE: {ticket_info?.ticket_id}</p>
                </div>
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="animate-fade-in">
                        <div className="bg-red-50 text-red-900 p-4 rounded-md border border-red-100 text-sm leading-relaxed">
                            Customer detailed explanation / Issue: <br />"{ticket.issue}"
                        </div>
                        <div className="mt-6 flex gap-4">
                            <StepperSection />
                        </div>
                    </div>
                )}


                {
                    activeTab === 'upload' && <UploadLackingInformationSection />
                }
                {/* CUSTOMER TAB */}
                {activeTab === 'customer' && (
                    <div className="grid grid-cols-1 gap-3 animate-fade-in">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Full Name</p>
                            <p className="text-gray-800 font-medium">{ticket.customer.name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Phone</p>
                            <p className="text-gray-800 font-medium">{ticket.customer.phone}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email</p>
                            <a href={`mailto:${ticket.customer.email}`} className="text-blue-600 hover:underline font-medium">
                                {ticket.customer.email}
                            </a>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Address</p>
                            <p className="text-gray-800 font-medium">{ticket.customer.address}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Mailing Address</p>
                            <p className="text-gray-800 font-medium">{ticket.customer.address2}</p>
                        </div>
                    </div>
                )}

                {/* PRODUCT TAB */}
                {activeTab === 'product' && (
                    <div className="grid grid-cols-2 gap-3 animate-fade-in">

                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Case File</p>
                            <p className="text-gray-800 font-medium">{ticket_info?.ticket_id}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Brand</p>
                            <p className="text-gray-800 font-medium">{ticket.product.brand}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Item Number</p>
                            <p className="text-gray-800 font-medium">{ticket.product.item}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Serial Number</p>
                            <p className="text-gray-800 font-medium font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                                {ticket.product.serial}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Purchase Date</p>
                            <p className="text-gray-800 font-medium">{ticket.product.purchased}</p>
                        </div>




                    </div>
                )}

            </div>
        </>
    );
}