import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from "../../services/ApiService";
import ListFee from './ListFee';

function SettingCumbi() {
    const [trm, setTrm] = useState(0)
    const [setting, setSetting] = useState({
        _id: '',
        perc_buy_house: 0,
        perc_cumbi: 0,
    });
    const [fee, setFee] = useState({
        name: '',
        value_from: 0,
        value_to: 0,
        perc_commission: 0
    })

    const handleFormSubmit = (e) => {
        e.preventDefault();
        Alert("success", "loading", 30);
        ApiService.post("/update-setting", { ...setting, trm: trm }).then(
            (response) => {
                if (response.status === "success") {
                    Alert("success", "Settings Successfully Updated", 3);
                }
            },
            (err) => {
                Alert("failed", "Error in creating invoice", 3);
            }
        );
    };

    const handleFormSubmitFee = (e) => {
        e.preventDefault();
        let fees = [...setting.fees, fee]
        setSetting({
            ...setting,
            fees: fees,
        })
    };

    function getTRM() {
        ApiService.get("/trm").then(
            (response) => {
                if (response.status === "success")
                    setTrm(response.value)
            },
            (err) => {
                console.log('err', err);
                console.log('err.stack', err.stack);
            }
        )
    }


    useEffect(() => {
        ApiService.get("/fetch-setting").then(
            (response) => {
                if (response.status === "success") {
                    setSetting(response.setting)
                    getTRM()
                }
            },
            (err) => {
                console.log('err', err);
                console.log('err.stack', err.stack);
            }
        )

    }, []);

    return (
        <div>
            <PageTitle title="Settings Cumbi" />

            <div className="col-12 mb-3">
                <form
                    className="row g-3 needs-validation"
                    noValidate
                    onSubmit={handleFormSubmit}
                >
                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <label className="form-label">TRM</label>
                            <input
                                type="number"
                                className="form-control"
                                value={trm}
                                readOnly
                                required
                            />
                        </div>

                        <div className="col-md-6 mt-3">
                            <label className="form-label">Comisión Casa de Compra</label>
                            <input
                                type="number"
                                className="form-control"
                                value={setting.perc_buy_house}

                                onChange={(e) =>
                                    setSetting({
                                        ...setting,
                                        perc_buy_house: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="col-md-6 mt-3">
                            <label className="form-label">Comisión Cumbi</label>
                            <input
                                type="number"
                                className="form-control"
                                value={setting.perc_cumbi}

                                onChange={(e) =>
                                    setSetting({
                                        ...setting,
                                        perc_cumbi: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="col-md-12 mt-4 text-center">
                            <button className="btn btn-primary text-white">
                                {" "}
                                Update Setting{" "}
                            </button>
                        </div>
                    </div>
                </form>

                <ListFee fees={setting.fees} />

                <div className="col-12 mb-3">
                    <form
                        className="row g-3 needs-validation"
                        noValidate
                        onSubmit={handleFormSubmitFee}
                    >
                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={fee.name}
                                    onChange={(e) =>
                                        setFee({
                                            ...fee,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label className="form-label">Commission</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={fee.perc_commission}
                                    onChange={(e) =>
                                        setFee({
                                            ...fee,
                                            perc_commission: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label className="form-label">Value from</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={fee.value_from}
                                    onChange={(e) =>
                                        setFee({
                                            ...fee,
                                            value_from: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label className="form-label">Value to</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={fee.value_to}
                                    onChange={(e) =>
                                        setFee({
                                            ...fee,
                                            value_to: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="col-md-12 mt-4 text-center">
                                <button className="btn btn-primary text-white">
                                    {" "}
                                    Add Fee{" "}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default SettingCumbi;
