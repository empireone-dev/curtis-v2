import React, { useEffect, useState } from 'react'
import Layout from './../../layout'
import TicketCreationSection from './_sections/ticket-creation-section'
import store from '@/app/store/store'
import { get_products_thunk } from '@/app/_redux/app-thunk'
import LoadingPage from '@/app/_components/loading-page'

export default function Page() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function get_data(params) {
            await store.dispatch(get_products_thunk())
            setLoading(false)
        }
        get_data()
    }, [])
    return (
        <Layout>
         {
            loading?<LoadingPage />: <TicketCreationSection />
         }
           
        </Layout>
    )
}
