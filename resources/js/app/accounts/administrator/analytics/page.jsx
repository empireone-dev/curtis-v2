
import React, { useEffect } from "react";
import Layout from './../../layout'
import TabsSection from "./_sections/tabs-section";
import store from "@/app/store/store";
import { get_analytics_thunk } from "@/app/_redux/analytics-thunk";
import SearchSection from "./_sections/search-section"
export default function Page() {


    useEffect(() => {
        store.dispatch(get_analytics_thunk())
    }, [window.location.search])


    return (
        <Layout>
            <SearchSection />
            <TabsSection />
        </Layout>
    );
}
