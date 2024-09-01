"use client";

import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {getHistoricalData} from "@/app/_service/FmpService";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr: false});
import {ApexOptions} from "apexcharts";


interface Point {
    x: number; // unix epoch time
    y: number;
}

export function StockTimelineChart() {
    const ticker = 'AAPL';
    const quantity = 10;
    const [data, setData] = useState<Point[]>([]);

    useEffect(() => {
        const fetchStockData = async () => {
            // const apiKey = 'YOUR_API_KEY';
            // const currentDate = new Date().toISOString().split('T')[0];
            //
            // // Fetch historical data
            // const response = await axios.get(
            //     `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?from=${purchaseDate}&to=${currentDate}&apikey=${apiKey}`
            // );
            //

            const today: Date = new Date();
            const oneMonthAgo: Date = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

            const mockResponse = await getHistoricalData(ticker, today, oneMonthAgo);
            console.log(mockResponse);
            const historicalData: Point[] = mockResponse.historical.map((entry: any) => ({
                x: (new Date(entry.date)).getTime(),
                y: entry.close * quantity,
            }));

            setData(historicalData);
        };

        fetchStockData();
    }, []);

    const options: ApexOptions = {
        title: {
            text: "Portfolio value over time"
        },
        chart: {
            type: 'line',
            toolbar: {
                tools: {
                    download: false,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                }
            }
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            labels: {
                formatter: function(val) {
                    return val.toFixed(2);
                }
            },
        }
    }
    const series = [{
        name: 'sales',
        data: data
    }]

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="line"
            height="400px"
            // width="500"
        />
    );
}
