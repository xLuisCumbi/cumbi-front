import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from "../../services/ApiService";

function CreatePayment() {
    // Get the user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    const [paymentFormData, setPaymentFormData] = useState({
        title: "Título",
        amount: 0,
        network: "TRON",
        coin: "USDT",
        description: "Descripción corta de la cuenta de cobro",
        user: user.id, // use the user's ID from local storage
        trm: 0,
    });
    const [paymentCreated, setPaymentCreated] = useState({
        value: false,
        link: "",
    });

    const [amountBankFiat, setAmountBankFiat] = useState(0);


    const handleFormSubmit = (e) => {
        e.preventDefault();

        for (let i in paymentFormData) {
            if (paymentFormData[i] === "") {
                Alert("failed", `input ${i} is required`, 3);
                return;
            }
        }

        // Calcular el valor de amountBankFiat
        // const calculatedAmountBankFiat = paymentFormData.trm * 0.97 * paymentFormData.amount - (paymentFormData.trm * 0.97 * paymentFormData.amount * 0.03);
        const calculatedAmountBankFiat = paymentFormData.amount * paymentFormData.trm * (1 - 0.03);
        console.log('paymentFormData.amount', paymentFormData.amount);
        console.log('paymentFormData.trm', paymentFormData.trm);
        setAmountBankFiat(calculatedAmountBankFiat);

        Alert("success", "loading", 30);
        ApiService.post("/create-invoice", { ...paymentFormData }).then(
            (response) => {
                if (response.status === "success") {
                    setPaymentCreated({
                        value: true,
                        link: response.invoiceObj.invoice_url,
                    });
                    Alert("success", "", 0);
                }
            },
            (err) => {
                console.log('paymentFormData in response', paymentFormData);
                console.log('err', err);
                console.log('err.stack', err.stack);
                Alert("failed", "Error in creating invoice", 3);
            }
        );
    };

    // Función para actualizar paymentFormData.amount y calcular amountBankFiat
    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        const calculatedAmountBankFiat = ((paymentFormData.trm * 0.985) * newAmount) * (1 - 0.03);

        setAmountBankFiat(calculatedAmountBankFiat);

        setPaymentFormData({
            ...paymentFormData,
            amount: newAmount,
        });
    };

    const handleLinkCopy = () => {
        navigator.clipboard.writeText(paymentCreated.link);
        Alert("success", "Link copied successfully", 2);
    };


    useEffect(() => {
        ApiService.get("/trm").then(
            (response) => {
                if (response.status === "success")
                    setPaymentFormData({
                        ...paymentFormData,
                        trm: response.value,
                    })
            },
            (err) => {
                // console.log('paymentFormData in response', paymentFormData);
                console.log('err', err);
                console.log('err.stack', err.stack);
                // Alert("failed", "Error in creating invoice", 3);
            }
        )
    }, []);

    return (
        <>
            <div>
                <PageTitle title="Create Payment / Invoice" />

                {!paymentCreated.value ? (
                    <div className="col-12 mb-3">
                        <form
                            className="row g-3 needs-validation"
                            noValidate
                            onSubmit={handleFormSubmit}
                        >
                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Título</label><hr></hr>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={paymentFormData.title}
                                        onChange={(e) =>
                                            setPaymentFormData({
                                                ...paymentFormData,
                                                title: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Monto en USD <span> | (TRM: <b>${(paymentFormData.trm * 0.985).toLocaleString()} )</b></span> | <p>Recibirás: <b>${amountBankFiat.toLocaleString()}</b> COP en tu cuenta de banco</p>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder={paymentFormData.amount}
                                        value={paymentFormData.amount} // Usar el valor actual de amount
                                        onChange={handleAmountChange} // Usar la nueva función de cambio
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Crypto Network</label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        value={paymentFormData.network}
                                        onChange={(e) =>
                                            setPaymentFormData({
                                                ...paymentFormData,
                                                network: e.target.value,
                                            })
                                        }
                                        required
                                    >
                                        <option>TRON</option>
                                        {/* <option>ETHEREUM</option> */}
                                    </select>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Crypto Coin</label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        value={paymentFormData.coin}
                                        onChange={(e) =>
                                            setPaymentFormData({
                                                ...paymentFormData,
                                                coin: e.target.value,
                                            })
                                        }
                                        required
                                    >
                                        <option>USDT</option>
                                        <option>USDC</option>
                                    </select>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder={paymentFormData.description}
                                        onChange={(e) =>
                                            setPaymentFormData({
                                                ...paymentFormData,
                                                description: e.target.value,
                                            })
                                        }
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-md-12 mt-4 text-center">
                                    <button className="btn btn-primary text-white">
                                        {" "}
                                        Create Invoice{" "}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="col-md-8 m-auto mb-3 mt-5 text-center ">
                        <i
                            style={{ fontSize: "70px" }}
                            className="bi bi-check-circle text-success"
                        ></i>

                        <p>Link de pago creado correctamente</p>

                        <div
                            onClick={handleLinkCopy}
                            className="bg-success text-white p-3"
                        >
                            {paymentCreated.link}
                        </div>

                        <small style={{ fontSize: "80%" }} className="small">
                        <p> Clic en el link para copiar</p>
                        </small>
                    </div>
                )}
            </div>
        </>
    );
}

export default CreatePayment;
