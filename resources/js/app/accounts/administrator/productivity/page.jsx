import React, { useEffect, useState } from 'react'
import Layout from './../../layout'
import store from '@/app/store/store'
import { get_users_thunk } from '@/app/_redux/users-thunk'
import ProductivityTabsSection from './_sections/productivity-tabs-section'
import LoadingPage from '@/app/_components/loading-page'
export default function Page() {

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function get_data(params) {
            try {
                setLoading(true)
                await store.dispatch(get_users_thunk())
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        get_data()
    }, [])
    return (
        <Layout>
            {loading ? (
                <LoadingPage />
            ) : (
                <ProductivityTabsSection />
            )}

        </Layout>
    )
}
