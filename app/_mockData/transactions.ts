export interface Transaction {
    id: string;
    date: Date;
    type: string;
    ticker: string;
    description: string;
    quantity: number;
    amount: number;
    amountCurrency: string;
}

export const mockTransactions: Transaction[] = [
    ...Array.from({length: 30}, (_, i) => ({
        id: `transaction-${i}`,
        date: new Date(2023, 5, i + 1),
        type: i % 2 === 0 ? 'Buy' : 'Sell',
        ticker: `TICKER${i}`,
        description: `Stock ${i}`,
        quantity: Math.floor(Math.random() * 100),
        amount: Math.floor(Math.random() * 1000),
        amountCurrency: 'USD'
    }))
];