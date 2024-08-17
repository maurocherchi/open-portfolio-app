'use client';

import {mockTransactions, Transaction} from "@/app/_mockData/transactions";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useEffect, useRef, useState} from "react";
import AlertDialog from "@/app/_components/AlertDialog";

export default function ManagePortfolio() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const selectedTransactionRef = useRef<Transaction | undefined>();

    useEffect(() => {
        // TODO load real data
        setTransactions(mockTransactions);
    }, []);

    const handleClickDelete = () => {
        setAlertOpen(true);
    }

    const handleConfirmDelete = () => {
        setTransactions(transactions.filter(t => t !== selectedTransactionRef.current));
        setAlertOpen(false);
    }

    const handleCancelDelete = () => {
        setAlertOpen(false);
    }

    const prettyPrintTransaction = () => {
        if (selectedTransactionRef.current === undefined)
            return "";

        const t = selectedTransactionRef.current;
        return `${t.type} ${t.amount} ${t.amountCurrency} of ${t.ticker} from ${t.date.toLocaleDateString()} `;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Transactions</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the transactions.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Transaction
                    </button>
                </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        <th scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Date
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                        >
                            Type
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                        >
                            Ticker
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                            Description
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            Quantity
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-right"
                        >
                            Amount
                        </th>
                        <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                {transaction.date.toLocaleDateString()}
                                <dl className="font-normal md:hidden">
                                    <dt className="sr-only">Type</dt>
                                    <dd className="mt-1 truncate text-gray-700">{transaction.type}</dd>
                                    <dt className="sr-only">Ticker</dt>
                                    <dd className="mt-1 truncate text-gray-500">{transaction.ticker}</dd>
                                </dl>
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{transaction.type}</td>
                            <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{transaction.ticker}</td>
                            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{transaction.description}</td>
                            <td className="px-3 py-4 text-sm text-gray-500">{transaction.quantity}</td>
                            <td className="px-3 py-4 text-sm text-gray-500 text-right">{`${transaction.amount} ${transaction.amountCurrency}`}</td>
                            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <div className="flex flex-row justify-end gap-3">
                                    <button
                                        type="button"
                                        aria-label="Edit transaction"
                                        onClick={() => {
                                            selectedTransactionRef.current = transaction;
                                        }}
                                    >
                                        <PencilSquareIcon className="size-4 text-gray-500"/>
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Delete transaction"
                                        onClick={() => {
                                            selectedTransactionRef.current = transaction;
                                            handleClickDelete();
                                        }}
                                    >
                                        <TrashIcon className="size-4 text-gray-500"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <AlertDialog
                open={alertOpen}
                setOpen={setAlertOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                title="Delete transaction"
                message={`Are you sure you want to delete the transaction ${prettyPrintTransaction()}`}
                actionLabel="Delete"
            />
        </div>
    );
}
