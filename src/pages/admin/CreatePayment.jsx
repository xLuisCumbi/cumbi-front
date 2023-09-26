import { useEffect, useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from "../../services/ApiService";

function CreatePayment() {
    // Get the user data from local storage
    const userLocal = JSON.parse(localStorage.getItem('user'));

    const [user, setUser] = useState({
        payment_fee: 0
    })
    const [business, setBusiness] = useState({
        payment_fee: 0
    })
    const [setting, setSetting] = useState({
        trm: 0,
        perc_buy_house: 0,
        perc_cumbi: 0
    })
    const [paymentFormData, setPaymentFormData] = useState({
        title: "Título",
        amount: 0,
        network: "TRON",
        coin: "USDT",
        description: "Descripción corta de la cuenta de cobro",
        user: userLocal.id, // use the user's ID from local storage
        trm: 0,
        trm_house: 0,
        amount_fiat: 0,
        coin_fiat: "COP",
        payment_fee: 0,
        type_payment_fee: "cumbi"
    });
    const [paymentCreated, setPaymentCreated] = useState({
        value: false,
        link: "",
    });
    const [percUser, typePercUser] = useMemo(() => getPercUser(), [user, business, setting]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        for (let i in paymentFormData) {
            if (paymentFormData[i] === "") {
                Alert("failed", `input ${i} is required`, 3);
                return;
            }
        }

        Alert("success", "loading", 30);
        ApiService.post("/create-invoice", { ...paymentFormData }).then(
            (response) => {
                if (response.status === "success") {
                    setPaymentCreated({
                        value: true,
                        link: response.invoiceObj.invoice_url,
                    });
                    console.log('payment', paymentCreated.link);
                    Alert("success", "Invoice created", 3);
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
        if (newAmount <= 0) {
            Alert("failed", "El valor debe ser positivo", 2);
            return;
        }

        // Calcular el valor de amountBankFiat
        const amountHouseFiat = paymentFormData.trm_house * newAmount;
        const calculatedAmountBankFiat = amountHouseFiat * value2Perc(percUser);

        setPaymentFormData({
            ...paymentFormData,
            amount: newAmount,
            amount_fiat: calculatedAmountBankFiat,
            payment_fee: percUser,
            type_payment_fee: typePercUser
        });
    };

    const handleLinkCopy = () => {
        navigator.clipboard.writeText(paymentCreated.link);
        Alert("success", "Link copied successfully", 2);
    };

    function getSettingCumbi() {
        ApiService.getSetting("").then(
            (response) => {
                if (response.status === "success") {
                    setSetting(response.setting)
                    setPaymentFormData({
                        ...paymentFormData,
                        trm: response.setting.trm,
                        trm_house: response.setting.trm * value2Perc(response.setting.perc_buy_house),
                    })
                }
            },
            (err) => {
                console.log('err', err);
                console.log('err.stack', err.stack);
            }
        )
    }

    function getBusiness(id) {

        ApiService.getBusiness(`/${id}`).then(
            (response) => {
                if (response.status === "success") {
                    setBusiness(response.business)
                }

            },
            (err) => {
                console.log('err', err);
                console.log('err.stack', err.stack);
            }
        )
    }

    function getCurrentUser() {
        ApiService.get(userLocal.id).then(
            (response) => {
                if (response.status === "success") {
                    setUser(response.user)
                    if (response.user.role !== "person" && response.user.business)
                        getBusiness(response.user.business)
                }

            },
            (err) => {
                console.log('err', err);
                console.log('err.stack', err.stack);
            }
        )
    }

    /**
     *
     * @returns This function gets the percentage fee that the user/business has
     */
    function getPercUser() {
        let payment_fee = 0, type_payment_fee = ""
        if (user && user.payment_fee && user.payment_fee > 0) {
            payment_fee = user.payment_fee
            type_payment_fee = "person"
        } else if (business && business.payment_fee && business.payment_fee > 0) {
            payment_fee = business.payment_fee
            type_payment_fee = "business"
        } else {
            payment_fee = setting.perc_cumbi
            type_payment_fee = "cumbi"
        }
        return [payment_fee, type_payment_fee]
    }

    function value2Perc(value) {
        return (100 - value) / 100
    }

    useEffect(() => {
        getSettingCumbi()
        getCurrentUser()
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
                                    <label className="form-label">
                                        Monto en USD
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder={paymentFormData.amount}
                                        value={paymentFormData.amount} // Usar el valor actual de amount
                                        onChange={handleAmountChange} // Usar la nueva función de cambio
                                        required
                                        min={0}
                                    />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label>
                                        <p>
                                            TRM: <b>${(paymentFormData.trm_house).toLocaleString()}</b><br />
                                            Recibirá: <b>${paymentFormData.amount_fiat.toLocaleString()}</b> COP en su cuenta de banco.<br />
                                            Comisión a cobrar: <b>${(paymentFormData.trm_house * paymentFormData.amount - paymentFormData.amount_fiat).toLocaleString()}</b> COP ({paymentFormData.payment_fee}%).
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Título</label>
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
                    </div >
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
                )
                }
            </div >
        </>
    );
}

export default CreatePayment;
