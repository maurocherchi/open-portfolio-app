'use client';

import {mockTransactions, Transaction} from "@/app/_mock_data/transactions";
import {DataTable, DataTableRowEditCompleteEvent} from 'primereact/datatable';
import {Column, ColumnEditorOptions} from 'primereact/column';
import {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";

export default function ManagePortfolio() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        // TODO load real data
        setTransactions(mockTransactions);
    }, []);

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let _transactions = [...transactions];
        let {newData, index} = e;

        _transactions[index] = newData as Transaction;

        // TODO store transactions
        setTransactions(_transactions);
    };

    const dateTemplate = (transaction: Transaction) => {
        return transaction.date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    }

    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)}/>;
    };

    return (
        <DataTable value={transactions}
                   stripedRows tableStyle={{minWidth: '50rem'}}
                   paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                   editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete}>
            <Column field="date" header="Date" body={dateTemplate}></Column>
            <Column field="type" header="Type"></Column>
            <Column field="description" header="Description" editor={(options) => textEditor(options)}></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column field="amount" header="Amount"></Column>
            <Column rowEditor={true} headerStyle={{width: '10%', minWidth: '8rem'}}
                    bodyStyle={{textAlign: 'center'}}></Column>
        </DataTable>
    )
}
