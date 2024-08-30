import {Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
import {emptyTransaction, Transaction} from "@/app/_domain/Transaction";
import {SimpleDateTimePicker} from "@/app/_components/SimpleDateTimePicker";
import React, {useState} from "react";
import {Currency} from "@/app/_domain/Currency";

interface TransactionDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirm: (transaction: Transaction) => void;
    onCancel: () => void;
    initialTransaction?: Transaction;
}

export default function TransactionDialog({
    open,
    setOpen,
    onConfirm,
    onCancel,
    initialTransaction
}: TransactionDialogProps) {
    const [transaction, setTransaction] = useState<Transaction>(initialTransaction !== undefined ? initialTransaction : emptyTransaction);
    const actionText = initialTransaction?.id ? "Update" : "Add";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setTransaction({...transaction, [name]: value});
    };

    function handleConfirm() {
        onConfirm(transaction);
        setTransaction(emptyTransaction);
    }

    function handleCancel() {
        onCancel();
        setTransaction(emptyTransaction);
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                {actionText} transaction details
                            </h2>

                            <div className="mt-10 flex flex-col gap-y-6">
                                <div className="flex flex-col">
                                    <label htmlFor="date"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Date and time (UTC)
                                    </label>
                                    <div className="mt-2">
                                        <SimpleDateTimePicker
                                            value={transaction?.date}
                                            onChange={(utcDateTime: string) => {
                                                const isoUtcDateTime = new Date(`${utcDateTime}:00Z`);
                                                setTransaction({...transaction, date: isoUtcDateTime});
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="type"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Type
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        defaultValue={transaction?.id ? undefined : "Buy"}
                                        value={transaction.id ? transaction?.type : undefined}
                                        onChange={handleChange}
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option>Buy</option>
                                        <option>Sell</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="ticker"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Ticker
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="ticker"
                                            name="ticker"
                                            type="text"
                                            value={transaction?.ticker}
                                            autoComplete="family-name"
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="quantity"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Quantity
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            value={transaction?.quantity}
                                            autoComplete="family-name"
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="amount"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Amount
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            value={transaction?.amount}
                                            autoComplete="family-name"
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="amount"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Currency
                                    </label>
                                    <select
                                        id="amountCurrency"
                                        name="amountCurrency"
                                        defaultValue={transaction?.id ? undefined : "USD"}
                                        value={transaction?.id ? transaction?.amountCurrency : undefined}
                                        onChange={handleChange}
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        {
                                            Object.values(Currency).map(currency => (
                                                <option key={currency}>{currency}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                            >
                                {actionText}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
