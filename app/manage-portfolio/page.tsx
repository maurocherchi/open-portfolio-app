'use client';

import AppHeader, {NavButton} from "@/app/_components/AppHeader";
import {mockTransactions} from "@/app/_mock_data/transactions";
// import plus icon from react icons
import {FaPlusCircle, FaPen, FaTrash} from "react-icons/fa";

const navButtons: NavButton[] = [
    {label: 'Home', href: '/'},
];

const rowActionsElement = (elementId: number) => {
    return (
        <div className={"flex gap-2"}>
            <FaPen/>
            <FaTrash/>
        </div>
    );
}

export default function ManagePortfolio() {
    return (
        <>
            <AppHeader navButtons={navButtons}/>
            <main>
                <h2 className="text-lg text-gray-500 px-4 py-2">Manage Portfolio</h2>
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-right"><FaPlusCircle/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {mockTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{transaction.date.toLocaleDateString()}</td>
                            <td className="px-4 py-2">{transaction.type}</td>
                            <td className="px-4 py-2">{transaction.description}</td>
                            <td className="px-4 py-2">{transaction.quantity}</td>
                            <td className="px-4 py-2">{transaction.amount}</td>
                            <td className="px-4 py-2"><FaPen/><FaTrash/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </main>
        </>
    )
}