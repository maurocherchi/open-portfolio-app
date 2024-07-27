interface Transaction {
    id: string;
    date: Date;
    type: 'Buy' | 'Sell';
    description: string;
    quantity: number;
    amount: number;
}

export const mockTransactions: Transaction[] = [
    {
        id: '1',
        date: new Date('2023-01-01'),
        type: 'Buy',
        description: 'Stock A',
        quantity: 100,
        amount: 1000,
    },
    {
        id: '2',
        date: new Date('2023-01-02'),
        type: 'Sell',
        description: 'Stock B',
        quantity: 50,
        amount: 500,
    },
];