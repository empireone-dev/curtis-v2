
import React from "react";
import Layout from './../../layout'
import CardSection from "./_sections/card-section";
export default function Page() {
    return (
        <Layout>
            <div className="mx-auto transition-all duration-500 px-3 sm:px-5 py-2.5 sm:py-3 max-w-[95vw] sm:max-w-7xl  flex items-center justify-center">
                <CardSection />
            </div>

        </Layout>
    );
}
