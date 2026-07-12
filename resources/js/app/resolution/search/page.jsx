import React, { useEffect, useState } from 'react'
import Layout from '../layout'
import store from '@/app/store/store'
import { get_ticket_by_serial_number_thunk } from '@/app/_redux/app-thunk'
import TicketDetailsSection from './_sections/ticket-details-section'
import LoadingSection from '../_sections/loading-section'

export default function Page() {
    const serial_number = window.location.pathname.split('/')[3]
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function fetch_data(params) {
            await store.dispatch(get_ticket_by_serial_number_thunk(serial_number))
            setLoading(false)
        }
        fetch_data()
    }, [])

    return loading ? <LoadingSection />
        : <Layout>
            <TicketDetailsSection />
        </Layout>



}
