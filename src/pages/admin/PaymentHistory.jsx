import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';
import PageLoading from "../../components/PageLoading";
import "../..//assets/vendor/bootstrap/js/bootstrap.bundle.js";

// Import react-table and its required components
import { useTable } from 'react-table';

function PaymentHistory() {
    const reqRef = useRef(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [deposits, setDeposits] = useState([]);
    const [selectedDeposit, setSelectedDeposit] = useState(null);

    useEffect(() => {
        if (reqRef.current) return;
        reqRef.current = true;

        const user = JSON.parse(localStorage.getItem('user'));

        ApiService.post('/fetch-deposits', { user }) // Pass the user
            .then((response) => {
                if (response.status === "success") {
                    setDeposits(response.deposits || []);
                    setLoadingStatus(false);
                }
            })
            .catch((err) => {
                console.log('err', err);
                console.log('stack', err.stack);
                Alert('failed', 'Error in fetching deposits', 3);
                setLoadingStatus(false); // Set loading status to false even in case of an error
            });
    }, []);

    const handleShowPaymentDetails = (i) => {
        const d = deposits[i];
        setSelectedDeposit(d);
        new bootstrap.Modal(document.getElementById('largeModal')).show();
    };

    const handlePaymentConsolidation = (deposit_id) => {
        Alert('success', 'loading', 30);
        ApiService.post('/consolidate-payment', { deposit_id })
            .then((response) => {
                if (response.status === "success") {
                    Alert('success', 'Success: payment set for consolidation within a minute', 3);
                }
            })
            .catch((err) => {
                Alert('failed', 'Error in sending request', 3);
            });
    };

    // Use react-table to define the columns and data for the table
    const columns = React.useMemo(
        () => [
            {
                Header: 'Invoice/Deposit ID',
                accessor: '_id',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Network',
                accessor: 'network',
            },
            {
                Header: 'Coin',
                accessor: 'coin',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Action',
                Cell: ({ row }) => (
                    <button
                        className="btn btn-primary text-white btn-sm w-100"
                        onClick={() => handleShowPaymentDetails(row.index)}
                    >
                        View More
                    </button>
                ),
            },
            {
                Header: 'Consolidation',
                Cell: ({ row }) => (
                    <>
                        {row.original.consolidation_status !== 'success' && row.original.status === 'success' ? (
                            <button
                                className="btn btn-info text-white btn-sm w-100"
                                onClick={() => handlePaymentConsolidation(row.original.deposit_id)}
                            >
                                consolidate
                            </button>
                        ) : (
                            <p>{row.original.status}</p>
                        )}
                    </>
                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: deposits });

    // Access the table instance properties
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    if (loadingStatus) {
        return <PageLoading />;
    }

    if (!deposits || !Array.isArray(deposits)) {
        return <div>No data available</div>; // Display a message if the data is not available or not an array
    }

    return (
        loadingStatus ? <PageLoading /> :
            <>
                <PageTitle title="Payment History" />
                <section id="payment_history" className="card bg-white p-4">
                    <div className="col-md-12">
                        <table style={{ fontSize: '90%' }} {...getTableProps()} className="table datatable">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()} scope="col">
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()} scope="row">
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal fade" id="largeModal" tabIndex="-1">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Payment Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {selectedDeposit && (
                                        <div className="col-12 mb-5 p-3">
                                            <div className="row">
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment ID</strong>
                                                    <div>{selectedDeposit._id}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Type</strong>
                                                    <div>{selectedDeposit.type}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Title</strong>
                                                    <div>{selectedDeposit.title}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Network</strong>
                                                    <div>{selectedDeposit.network}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Coin</strong>
                                                    <div>{selectedDeposit.coin}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Address</strong>
                                                    <div>{selectedDeposit.address}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Amount</strong>
                                                    <div>{selectedDeposit.amount + selectedDeposit.coin} </div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Status</strong>
                                                    <div>{selectedDeposit.status}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Consolidation Status</strong>
                                                    <div>{selectedDeposit.consolidation_status}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Date Created</strong>
                                                    <div>{new Date(selectedDeposit.createdAt).toLocaleString()}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Consolidation Status</strong>
                                                    <div>{new Date(selectedDeposit.updatedAt).toLocaleString()}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Description</strong>
                                                    <div>{selectedDeposit.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}

export default PaymentHistory;
