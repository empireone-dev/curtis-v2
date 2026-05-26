import React, { useEffect, useState } from 'react'
import HeaderSection from './../_sections/header-section'
import FormSection from './_sections/form-section'
import store from '@/app/store/store'
import { get_product_registration_by_id_thunk, get_products_thunk } from '@/app/_redux/app-thunk'
import LoadingSection from '../_sections/loading-section'

export default function Page() {

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function get_data(params) {
            await store.dispatch(get_product_registration_by_id_thunk(window.location.pathname.split('/')[3]))
            await store.dispatch(get_products_thunk())
            setLoading(false)
        }
        get_data()
    }, [])
    return (
        <div className="min-h-screen bg-gray-200 flex items-start justify-center sm:p-8 font-sans">
            {/* Main Card Container (Forced Vertical) */}
            {
                loading ? <LoadingSection /> : <div className="flex flex-col w-full bg-white overflow-hidden rounded-none shadow-none sm:max-w-4xl sm:h-full sm:rounded-[2rem] sm:shadow-2xl">
                    <HeaderSection />
                    {/* Bottom Panel (White Form) */}
                    <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white z-10">
                        <FormSection />
                    </div>
                </div>
            }

        </div>
    )
}
