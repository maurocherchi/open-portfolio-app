import {Transaction} from "@/app/_domain/Transaction";
import {Currency} from "@/app/_domain/Currency";
import {TransactionType} from "@/app/_domain/TransactionType";

const startDate = new Date("2024-01-01T00:00:00.000Z");

export const mockTransactions: Transaction[] = [
    ...Array.from({length: 300}, (_, i) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const randomTimeOfTheDay = Math.floor(Math.random() * oneDay);
        const utcDate = new Date(startDate.getTime() + (i * oneDay) + randomTimeOfTheDay);
        return {
        id: `transaction-${i}`,
        date: utcDate,
        type: i % 2 === 0 ? TransactionType.BUY : TransactionType.SELL,
        ticker: `TICKER${i}`,
        description: `Stock ${i}`,
        quantity: Math.floor(Math.random() * 100),
        amount: Math.floor(Math.random() * 1000),
        amountCurrency: Currency.USD
    }})
];