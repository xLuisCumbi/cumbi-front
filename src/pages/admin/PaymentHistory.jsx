import { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';
import PageLoading from "../../components/PageLoading";
import "../../assets/js/Datatable";
import "../../assets/css/Datatables.css";
import "../..//assets/vendor/bootstrap/js/bootstrap.bundle.js"


function PaymentHistory() {

    const reqRef = useRef(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [deposits, setDeposits] = useState(false);
    const [selectedDeposit, setSelectedDeposit] = useState(false);

    useEffect(() => {

        if (reqRef.current) return;
        reqRef.current = true;

        ApiService.post('/fetch-deposits')
            .then((response) => {

                if (response.status === "success") {

                    setDeposits(response.deposits);
                    setLoadingStatus(false);

                    setTimeout(() => {
                        new DataTable('#paymentHistoryTable');
                    }, 10);
                }

            }, err => {

                Alert('failed', 'Error in fetching deposits', 3);

            });

    }, []);

    const handleShowPaymentDetails = i => {
        const d = deposits[i];
        setSelectedDeposit(d);
        new bootstrap.Modal(document.getElementById('largeModal')).show();
    }

    const handlePaymentConsolidation = deposit_id => {
        Alert('success', 'loading', 30);
        ApiService.post('/consolidate-payment', {deposit_id})
            .then((response) => {

                if (response.status === "success") {
                    Alert('success', 'Success: payment set for consolidation within a minute', 3);
                }

            }, err => {

                Alert('failed', 'Error in sending request', 3);

            });

    }

    return (

        loadingStatus ? <PageLoading /> :

            <>
                <PageTitle title="Payment History" />

                <section id="payment_history" className="card bg-white p-4">

                    <div className="col-md-12">
                        <table style={{ fontSize: '90%' }} id="paymentHistoryTable" className="table datatable">
                            <thead>
                                <tr>
                                    <th scope="col">Invoice/Deposit ID</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Network</th>
                                    <th scope="col">Coin</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Consolidation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    deposits.map((d, i) => {

                                        return (

                                            <tr key={i}>
                                                <td scope="row">{d.deposit_id}</td>
                                                <td>{d.type}</td>
                                                <td>{d.amount}</td>
                                                <td>{d.network}</td>
                                                <td>{d.coin}</td>
                                                <td>{d.status}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary text-white btn-sm w-100"
                                                        onClick={() => handleShowPaymentDetails(i)}
                                                    >
                                                        View More
                                                    </button>
                                                </td>
                                                <td>
                                                    {
                                                        d.consolidation_status != 'success' && d.status == 'success' ?
                                                            <button
                                                                className="btn btn-info text-white btn-sm w-100"
                                                                onClick={() => handlePaymentConsolidation(d.deposit_id)}
                                                            >
                                                                consolidate
                                                            </button>
                                                            :
                                                            <p>{d.status}</p>
                                                    }
                                                </td>
                                            </tr>

                                        )
                                    })
                                }
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
                                    <div className="col-12 mb-5 p-3">
                                        <div className="row">
                                            <div className="col-12 col-sm-4 mt-3">
                                                <strong>Payment ID</strong>
                                                <div>{selectedDeposit.deposit_id}</div>
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
                                </div>
                            </div>
                        </div>
                    </div>

                </section>


            </>
    );
}

export default PaymentHistory;

