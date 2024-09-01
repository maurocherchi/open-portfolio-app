const mockDailyChartEod = {
    "symbol": "AAPL",
    "historical": [
        {
            "date": "2023-10-06",
            "open": 173.8,
            "high": 176.61,
            "low": 173.18,
            "close": 176.53,
            "adjClose": 176.53,
            "volume": 21712747,
            "unadjustedVolume": 21712747,
            "change": 2.73,
            "changePercent": 1.57077,
            "vwap": 175.44,
            "label": "October 06, 23",
            "changeOverTime": 0.0157077
        },
        {
            "date": "2023-10-05",
            "open": 173.79,
            "high": 175.45,
            "low": 172.68,
            "close": 174.91,
            "adjClose": 174.91,
            "volume": 48251046,
            "unadjustedVolume": 47369743,
            "change": 1.12,
            "changePercent": 0.64446,
            "vwap": 174.23,
            "label": "October 05, 23",
            "changeOverTime": 0.0064446
        },
        // more data
        {
            "date": "2023-10-04",
            "open": 174.04,
            "high": 174.04,
            "low": 172.68,
            "close": 173.75,
            "adjClose": 173.75,
            "volume": 34978986,
            "unadjustedVolume": 34091881,
            "change": -0.29,
            "changePercent": -0.16714,
            "vwap": 173.08,
            "label": "October 04, 23",
            "changeOverTime": -0.0016714
        },
        {
            "date": "2023-10-03",
            "open": 173.84,
            "high": 174.04,
            "low": 172.68,
            "close": 173.68,
            "adjClose": 173.68,
            "volume": 34091881,
            "unadjustedVolume": 34091881,
            "change": -0.16,
            "changePercent": -0.092,
            "vwap": 172.95,
            "label": "October 03, 23",
            "changeOverTime": -0.0009209
        },
        // more data
        {
            "date": "2023-10-02",
            "open": 173.84,
            "high": 174.04,
            "low": 172.68,
            "close": 173.68,
            "adjClose": 173.68,
            "volume": 34091881,
            "unadjustedVolume": 34091881,
            "change": -0.16,
            "changePercent": -0.092,
            "vwap": 172.95,
            "label": "October 02, 23",
            "changeOverTime": -0.0009209
        },
        // more data
        {
            "date": "2023-10-01",
            "open": 173.84,
            "high": 174.04,
            "low": 172.68,
            "close": 173.68,
            "adjClose": 173.68,
            "volume": 34091881,
            "unadjustedVolume": 34091881,
            "change": -0.16,
            "changePercent": -0.092,
            "vwap": 172.95,
            "label": "October 01, 23",
            "changeOverTime": -0.0009209
        },
        // more data
        {
            "date": "2023-09-30",
            "open": 173.84,
            "high": 174.04,
            "low": 172.68,
            "close": 173.68,
            "adjClose": 173.68,
            "volume": 34091881,
            "unadjustedVolume": 34091881,
            "change": -0.16,
            "changePercent": -0.092,
            "vwap": 172.95,
            "label": "September 30, 23",
            "changeOverTime": -0.0009209
        },
    ]
}

const mockSimpleQuote = [
    {
        "symbol": "AAPL",
        "price": 145.85,
        "volume": 42822124
    }
]

export async function testApiKey(apiKey: string): Promise<"valid" | "invalid"> {
    console.log("Testing API key:", apiKey);
    return "valid";
}

export async function getHistoricalData(symbol: string, startDate: Date, endDate: Date): Promise<any> {
    console.log("Getting historical data for symbol:", symbol);
    return mockDailyChartEod;
}

export async function getSimpleQuote(symbol: string): Promise<any> {
    console.log("Getting simple quote for symbol:", symbol);
    return mockSimpleQuote;
}