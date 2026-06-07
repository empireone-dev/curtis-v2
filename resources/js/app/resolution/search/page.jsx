import React, { useEffect } from 'react'
import Layout from '../layout'
import store from '@/app/store/store'
import { get_ticket_by_serial_number_thunk } from '@/app/_redux/app-thunk'
import TicketDetailsSection from './_sections/ticket-details-section'

export default function Page() {
    const serial_number = window.location.pathname.split('/')[3]

    useEffect(() => {
        store.dispatch(get_ticket_by_serial_number_thunk(serial_number))
    }, [])

    return (
        <Layout>
            <TicketDetailsSection />
        </Layout>
    )
}
