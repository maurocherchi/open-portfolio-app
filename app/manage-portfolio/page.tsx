"use client";

import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/20/solid';
import {useEffect, useState} from "react";
import AlertDialog from "@/app/_components/AlertDialog";
import {Transaction} from "@/app/_domain/Transaction";
import TransactionDialog from "@/app/manage-portfolio/TransactionDialog";
import {loadTransactions, storeTransactions} from "@/app/_repositories/TransactionRepo";

export default function ManagePortfolio() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [trDialogOpen, setTrDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, transactions.length);
    const visibleTransactions = transactions.slice(startIndex, endIndex);
    const paginationNumbers = calculatePageNumbers();

    function calculatePageNumbers() {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        if (totalPages > 3) {
            if (currentPage === 1) {
                endPage = Math.min(3, totalPages);
            } else if (currentPage === totalPages) {
                startPage = Math.max(1, totalPages - 2);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    }

    useEffect(() => {
        async function loadAndSetTrans() {
            const loadedTrans = await loadTransactions();
            setTransactions(loadedTrans);
        }

        loadAndSetTrans().catch(
            reason => console.log(`There was a problem loading the transactions. Reason: ${reason}`)
        );
    }, []);

    useEffect(() => {
        if (transactions.length > 0 && currentPage > Math.ceil(transactions.length / itemsPerPage)) {
            setCurrentPage(Math.ceil(transactions.length / itemsPerPage));
        }
    }, [currentPage, transactions]);

    function nextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleClickDelete = () => {
        setAlertOpen(true);
    }

    const handleConfirmDelete = () => {
        const newList = transactions.filter(t => t.id !== selectedTransaction?.id);
        setTransactions(newList);
        storeTransactions(newList);
        setAlertOpen(false);
    }

    const handleCancelDelete = () => {
        setAlertOpen(false);
    }

    const prettyPrintTransaction = () => {
        if (selectedTransaction === undefined)
            return "";

        const t = selectedTransaction;
        return `${t.type} ${t.amount} ${t.amountCurrency} of ${t.ticker} from ${t.date.toLocaleString()} `;
    }

    const handleClickAdd = () => {
        setTrDialogOpen(true);
    }

    const handleClickEdit = () => {
        setTrDialogOpen(true);
    }

    const handleDialogConfirm = (transaction: Transaction) => {
        setTrDialogOpen(false);
        let newList = [];
        if (transaction.id === undefined) {
            newList = [...transactions, transaction];
        } else {
            newList = transactions.map(t => t.id === transaction.id ? transaction : t);
        }
        setTransactions(newList);
        storeTransactions(newList);
        setSelectedTransaction(undefined);
    }

    const handleDialogCancel = () => {
        setTrDialogOpen(false);
        setSelectedTransaction(undefined);
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
                        onClick={handleClickAdd}
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
                    {visibleTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                {transaction.date.toUTCString()}
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
                                            setSelectedTransaction({...transaction});
                                            handleClickEdit();
                                        }}
                                    >
                                        <PencilSquareIcon className="size-4 text-gray-500"/>
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Delete transaction"
                                        onClick={() => {
                                            setSelectedTransaction({...transaction});
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

            {/* pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
                <div className="flex flex-1 justify-between items-center sm:hidden">
                    <button
                        type="button"
                        onClick={prevPage}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <p className="text-sm text-gray-700">
                        {currentPage}/{totalPages}
                    </p>
                    <button
                        type="button"
                        onClick={nextPage}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{startIndex + 1}</span> to <span
                            className="font-medium">{endIndex}</span> of{' '}
                            <span className="font-medium">{transactions.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                            <button
                                type="button"
                                onClick={() => setCurrentPage(1)}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">First page</span>
                                <ChevronDoubleLeftIcon aria-hidden="true" className="h-5 w-5"/>
                            </button>
                            <button
                                type="button"
                                onClick={prevPage}
                                className="relative inline-flex w-12 justify-center items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5"/>
                            </button>
                            {!paginationNumbers.includes(1) &&
                                <span
                                    className="relative inline-flex w-12 justify-center items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                    ...
                                </span>
                            }
                            {paginationNumbers.map((index) => {
                                const inactiveClassNames = "relative inline-flex w-12 justify-center items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";
                                const activeClassNames = "relative z-10 inline-flex w-12 justify-center items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
                                const buttonClasses = index === currentPage ? activeClassNames : inactiveClassNames;
                                return <button
                                    key={index}
                                    type="button"
                                    onClick={() => setCurrentPage(index)}
                                    aria-current="page"
                                    className={buttonClasses}
                                >
                                    {index}
                                </button>
                            })}
                            {!paginationNumbers.includes(totalPages) &&
                                <span
                                    className="relative inline-flex w-12 justify-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                    ...
                                </span>
                            }
                            <button
                                type="button"
                                onClick={nextPage}
                                className="relative inline-flex w-12 justify-center items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon aria-hidden="true" className="h-5 w-5"/>
                            </button>
                            <button
                                type="button"
                                onClick={() => setCurrentPage(totalPages)}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Last page</span>
                                <ChevronDoubleRightIcon aria-hidden="true" className="h-5 w-5"/>
                            </button>
                        </nav>
                    </div>
                </div>
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
            <TransactionDialog
                key={selectedTransaction?.id}
                open={trDialogOpen}
                setOpen={setTrDialogOpen}
                onConfirm={handleDialogConfirm}
                onCancel={handleDialogCancel}
                initialTransaction={selectedTransaction}
            />
        </div>
    );
}
