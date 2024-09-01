"use client";

import {StockTimelineChart} from "@/app/_components/StockTimelineChart";

export default function Home() {

    return (
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <main>
                <StockTimelineChart/>
            </main>
        </div>
    );
}
