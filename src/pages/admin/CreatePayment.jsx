import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';

function CreatePayment() {

    const [paymentFormData, setpaymentFormData] = useState({
        title: 'Titulo',
        amount: 0,
        network: 'ETHEREUM',
        coin: 'USDT',
        description: 'Descripcion corta de la cuenta de cobro',
    });

    const [payementCreated, setPaymentCreated] = useState({ value: false, link: '' });

    const handleFormSubmit = e => {

        e.preventDefault();

        for (let i in paymentFormData) {

            if (paymentFormData[i] === '') {

                Alert('failed', `input ${i} is required`, 3);
                return;
            }
        }

        Alert('success', 'loading', 30);
        console.log('paymentFormData', paymentFormData);
        ApiService.post('/create-invoice', { ...paymentFormData })
            .then((response) => {

                if (response.status === "success") {

                    setPaymentCreated({ value: true, link: response.invoiceObj.invoice_url });
                    Alert('success', '', 0);

                }

            }, err => {

                Alert('failed', 'Error in creating invoice', 3);

            });

    }

    const handleLinkCopy = () => {

        navigator.clipboard.writeText(payementCreated.link);
        Alert('success', 'Link copied successfully', 2);
    }


    return (


        <>
            <div>

                <PageTitle title="Create Payment / Invoice" />

                {!payementCreated.value ?

                    <div className="col-12 mb-3">
                        <form className="row g-3 needs-validation" noValidate onSubmit={handleFormSubmit}>
                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={paymentFormData.title}
                                        onChange={(e) => setpaymentFormData({ ...paymentFormData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">
                                        Amount COP
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder={paymentFormData.amount}
                                        onChange={(e) => setpaymentFormData({ ...paymentFormData, amount: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">
                                        Crypto Network
                                    </label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        value={paymentFormData.network}
                                        onChange={(e) => setpaymentFormData({ ...paymentFormData, network: e.target.value })}
                                        required
                                    >
                                        <option>TRON</option>
                                        <option>ETHEREUM</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">
                                        Crypto Coin
                                    </label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        value={paymentFormData.coin}
                                        onChange={(e) => setpaymentFormData({ ...paymentFormData, coin: e.target.value })}
                                        required
                                    >
                                        <option>USDT</option>
                                        <option>USDC</option>
                                    </select>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder={paymentFormData.description}
                                        onChange={(e) => setpaymentFormData({ ...paymentFormData, description: e.target.value })}
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-md-12 mt-4 text-center">

                                    <button className="btn btn-primary text-white"> Create Invoice </button>

                                </div>

                            </div>
                        </form>
                    </div>

                    :

                    <div className="col-md-8 m-auto mb-3 mt-5 text-center ">


                        <i style={{fontSize: '70px'}} className="bi bi-check-circle text-success"></i>

                        <p>Invoice Successfully Created</p>
                        <p> Kindy copy the invoice link below to share</p>

                        <div onClick={handleLinkCopy} className="bg-success text-white p-3 ">
                            { payementCreated.link }
                        </div>

                        <small style={{fontSize: '80%'}}  className="small">kinldy click on the green box to copy</small>

                    </div>

                }


            </div>


        </>

    );
}

export default CreatePayment;