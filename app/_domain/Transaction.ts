import {Currency} from "@/app/_domain/Currency";
import {TransactionType} from "@/app/_domain/TransactionType";

export interface Transaction {
    id?: string;
    date: Date;
    type: TransactionType;
    ticker: string;
    description: string;
    quantity: number;
    amount: number;
    amountCurrency: Currency;
}

export const emptyTransaction: Transaction = {
    id: undefined,
    date: new Date(),
    type: TransactionType.BUY,
    ticker: "",
    description: "",
    quantity: 1,
    amount: 1,
    amountCurrency: Currency.USD
}