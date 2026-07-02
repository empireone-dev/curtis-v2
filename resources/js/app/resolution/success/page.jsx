import React from 'react';
import Layout from '../layout';
import Button from '@/app/_components/button';
import { router } from '@inertiajs/react';

export default function Page() {
    return (
        <Layout>
            <div className=" flex items-start justify-center  bg-gray-50/50">
                <div className="rounded-3xl max-w-lg w-full text-center">

                    {/* Success Text */}
                    <h2 className="text-3xl font-extrabold text-gray-900  tracking-tight">
                        Success!
                    </h2>
                    <p className="text-gray-500 mb-8 leading-relaxed px-4">
                        Your form has been successfully submitted. You will receive an email confirmation shortly. 🛠️
                    </p>
                    {/* Illustration Container */}
                    <div className=" flex items-center justify-center w-full">
                        <img
                            src="/images/success.png"
                            alt="Success Illustration"
                            className='w-96'
                        />
                    </div>

                    <Button
                        variant='primary'
                        onClick={()=>router.visit(`/resolution/search/${window.location.pathname.split('/')[3]}`)}
                    >
                        TRACK CLAIM STATUS
                    </Button>
                </div>
            </div>
        </Layout>
    );
}