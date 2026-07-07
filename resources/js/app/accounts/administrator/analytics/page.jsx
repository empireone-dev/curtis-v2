
import React from "react";
import Layout from './../../layout'
import CreatedTicketStatsSection from "./_sections/created-ticket-stats-section";
import ProcessedTicketStatsSection from "./_sections/processed-ticket-stats-section";
export default function Page() {
    return (
        <Layout>
            <div className="flex flex-col gap-3">
                <CreatedTicketStatsSection />
                <ProcessedTicketStatsSection />
            </div>
        </Layout>
    );
}
