import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';
import PageLoading from "../../components/PageLoading";
import "../..//assets/vendor/bootstrap/js/bootstrap.bundle.js";

// Import react-table and its required components
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table';

function PaymentHistory() {
    // const reqRef = useRef(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [deposits, setDeposits] = useState([]);
    const [selectedDeposit, setSelectedDeposit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Use react-table to define the columns and data for the table
    // Define las columnas de la tabla
    const columns = React.useMemo(
        () => [
            {
                Header: 'Invoice/Deposit ID',
                accessor: '_id',
                Filter: DefaultColumnFilter, // Componente de filtro predeterminado
            },
            {
                Header: 'Type',
                accessor: 'type',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Amount',
                accessor: 'amount',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Network',
                accessor: 'network',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Coin',
                accessor: 'coin',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Status',
                accessor: 'status',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Consolidation',
                accessor: 'consolidation_status',
                Filter: DefaultColumnFilter,
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
                accessor: 'createdAt',
                Filter: DateColumnFilter, // Renderiza el filtro solo si 'canFilter' está habilitado
                Cell: ({ row }) => timestampToDate(row.original.createdAt), // Convierte el timestamp a una fecha legible
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
        ],
        [] // No es necesario pasar "deposits" aquí
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageCount,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data: deposits,
        },
        useFilters,
        useGlobalFilter,
        usePagination
    );

    useEffect(() => {
        // if (reqRef.current) return;
        // reqRef.current = true;
        getDeposits()
        setIsModalOpen(false);
        setSelectedDeposit(null);
    }, []);

    const handleShowPaymentDetails = async (i) => {
        console.log('deposits get', deposits);
        try {
            // Esperar a que getDeposits se complete antes de continuar
            //const d = await getDeposits()[i];
            await getDeposits();
            const d = deposits[i];
            console.log('i', i);
            console.log('d', d);
            console.log('deposits', deposits);
            if (d) {
                setSelectedDeposit(d);
                setIsModalOpen(true);
                new bootstrap.Modal(document.getElementById('largeModal')).show();
            }
        } catch (error) {
            console.error('Error al obtener los depósitos', error);
        }
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

    async function getDeposits() {
        setSelectedDeposit(null); // Establece selectedDeposit en null al iniciar la carga de datos.

        const user = JSON.parse(localStorage.getItem('user'));
        // setTest("success")
        ApiService.post('/fetch-deposits', { user }) // Pass the user
            .then((response) => {
                if (response.status === "success") {
                    setDeposits(response.deposits);
                    console.log('response', response);

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

    // Componente de filtro predeterminado
    function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
        return (
            <input
                type="text"
                value={filterValue || ''}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
                className="form-control"
                placeholder="Filter..."
            />
        );
    }

    // Componente de filtro personalizado para columnas de fecha
    function DateColumnFilter({ column: { filterValue, setFilter } }) {
        return (
            <input
                type="date"
                value={filterValue || ''}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
                placeholder="Filter..."
            />
        );
    }

    function timestampToDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Puedes personalizar el formato según tus necesidades
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
                        {/* Barra de búsqueda global */}
                        <input
                            type="text"
                            value={state.globalFilter || ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                        />
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
                                                Page {state.pageIndex + 1} of {pageCount}
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
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)}></button>
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
