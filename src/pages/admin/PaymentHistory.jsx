import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';
import PageLoading from "../../components/PageLoading";
import "../..//assets/vendor/bootstrap/js/bootstrap.bundle.js";
import { config } from '../../config/default';

// Import react-table and its required components
import { useTable, usePagination } from 'react-table';

function PaymentHistory() {
    // const reqRef = useRef(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [deposits, setDeposits] = useState([]);
    const [selectedDeposit, setSelectedDeposit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Use react-table to define the columns and data for the table
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: '_id',
            },
            {
                Header: 'Invoice/Deposit ID',
                accessor: 'deposit_id',
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
            {
                Header: 'Date',
                Cell: ({ row }) => string2date(row.original.createdAt),
            },
            {
                Header: 'Actions', // Empty header for the icon button
                accessor: 'action',
                Cell: ({ row }) => (
                    <div className="d-flex justify-content-between align-items-center">
                        <a
                            className="btn"
                            onClick={() => handleShowPaymentDetails(row.index)}
                            title="View Payment Details"
                        >
                            <i className="bi bi-info-circle"></i>
                        </a>
                        <a
                            className="btn"
                            href={`${config.paymentBaseUrl}/invoice/${row.original._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Payment Page"
                        >
                            <i className="bi bi-link"></i>
                        </a>
                        <a
                            className="btn"
                            href={`https://tronscan.org/#/address/${row.original.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Transaction Page"
                        >
                            <i className="bi bi-database-lock"></i>
                        </a>
                    </div>
                ),

            },
        ],
        [deposits]
    );

    const tableInstance = useTable(
        { columns, data: deposits },
        usePagination);

    useEffect(() => {
        getDeposits()
    }, []);


    const handleShowPaymentDetails = (i) => {
        const d = deposits[i];
        setSelectedDeposit(d);
        setIsModalOpen(true);
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

    function string2date(date) {
        const fecha = new Date(date);

        // Obtiene los componentes de fecha (día, mes, año, hora, minutos, segundos)
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; // Los meses se indexan desde 0
        const anno = fecha.getFullYear();
        const hora = fecha.getHours();
        const minutos = fecha.getMinutes();
        const segundos = fecha.getSeconds();

        // Formatea la fecha en un formato legible por humanos
        const fechaLegible = `${anno}/${mes}/${dia} ${hora}:${minutos}:${segundos}`;
        return fechaLegible;
    }

    function getDeposits() {
        const user = JSON.parse(localStorage.getItem('user'));
        // setTest("success")
        ApiService.post('/fetch-deposits', { user }) // Pass the user
            .then((response) => {
                if (response.status === "success") {
                    setDeposits(response.deposits);
                    setLoadingStatus(false);
                    // setTest("success")
                }
            })
            .catch((err) => {
                console.log('err', err);
                console.log('stack', err.stack);
                Alert('failed', 'Error in fetching deposits', 3);
                setLoadingStatus(false); // Set loading status to false even in case of an error
            });
    }

    // Access the table instance properties
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Cambia 'rows' a 'page'
        prepareRow,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageCount,
        state: { pageIndex },
    } = tableInstance;

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
                                {page.map((row) => {
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
                            <tfoot>
                                <tr>
                                    <td colSpan={columns.length}>
                                        <div className="pagination d-flex justify-content-between align-items-center">
                                            <div className="pagination-navigation">
                                                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-light btn-sm">
                                                    Previous
                                                </button>
                                                <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-light btn-sm">
                                                    Next
                                                </button>
                                            </div>
                                            <div className="pagination-info">
                                                Page {pageIndex + 1} of {pageCount}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="modal fade" id="largeModal" tabIndex="-1" style={{ display: isModalOpen ? 'block' : 'none' }}>
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Payment Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {selectedDeposit ? ( // Verifica si selectedDeposit no es null

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
                                                    <div>{selectedDeposit.amount.toLocaleString()} {selectedDeposit.coin} </div>
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
                                                    <div>{string2date(selectedDeposit.createdAt)}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Description</strong>
                                                    <div>{selectedDeposit.description}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>TRM</strong>
                                                    <div>{selectedDeposit?.trm_house?.toLocaleString()} {selectedDeposit.coin_fiat}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Fiat</strong>
                                                    <div>{selectedDeposit?.amount_fiat?.toLocaleString()} {selectedDeposit.coin_fiat}</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Payment Fee</strong>
                                                    <div>{selectedDeposit.payment_fee} %</div>
                                                </div>
                                                <div className="col-12 col-sm-4 mt-3">
                                                    <strong>Type Payment Fee</strong>
                                                    <div>{selectedDeposit.type_payment_fee}</div>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <strong> <a
                                                    href={`${config.paymentBaseUrl}/invoice/${selectedDeposit._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <i className="bi bi-info-circle"></i> Open The Payment Page
                                                </a></strong>

                                            </div>
                                            <div className="col-12 mt-3">
                                                <strong><a
                                                    href={`https://tronscan.org/#/address/${selectedDeposit.address}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <i className="bi bi-database-lock"></i> Open Transaction Page
                                                </a>
                                                </strong>
                                            </div>

                                        </div>
                                    ) : (
                                        <p>No payment selected.</p>
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
