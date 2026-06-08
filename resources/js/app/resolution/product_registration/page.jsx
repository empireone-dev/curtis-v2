import React, { useEffect } from 'react'
import HeaderSection from '../_sections/header-section'
import ProductRegistrationFormSection from './_sections/product-registration-form-section'
import store from '@/app/store/store'
import { get_products_thunk } from '@/app/_redux/app-thunk'

export default function Page() {

    useEffect(() => {
        store.dispatch(get_products_thunk())
    }, [])
    return (
        <div className="min-h-screen bg-gray-200 flex items-start justify-center sm:p-8 font-sans">
            <div className="flex flex-col w-full bg-white overflow-hidden rounded-none shadow-none sm:max-w-4xl sm:h-full sm:rounded-[2rem] sm:shadow-2xl">
                <HeaderSection />
                {/* Bottom Panel (White Form) */}
                <div className="w-full p-4 sm:p-10 flex flex-col justify-center bg-white z-10">
                    <ProductRegistrationFormSection />
                </div>
            </div>
        </div>
    )
}
