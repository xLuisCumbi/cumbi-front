import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from "../../services/ApiService";
import ListFee from './ListFee';


function SettingCumbi() {
    // const user = JSON.parse(localStorage.getItem("user"));
    // const [fees, setFees] = useState([
    //     { value_from: 100, value_to: 999, perc_commission: 2 },
    //     { value_from: 1000, value_to: 4999, perc_commission: 1.5 },
    //     { value_from: 5000, value_to: 19999, perc_commission: 1.2 },
    //     { value_from: 20000, value_to: 1000000, perc_commission: 0.85 }
    // ])
    const [trm, setTrm] = useState(0)
    const [setting, setSetting] = useState({
        _id: '',
        perc_buy_house: 0,
        perc_cumbi: 0,
        passphrase: ''
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(setting)
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
                    console.log(response.setting)
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
                        <div className="col-md-6 mt-3">
                            <label className="form-label">Passphrase</label>
                            <input
                                type="text"
                                className="form-control"
                                value={setting.passphrase}

                                onChange={(e) =>
                                    setSetting({
                                        ...setting,
                                        passphrase: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <ListFee fees={setting.fees} />

                        <div className="col-md-12 mt-4 text-center">
                            <button className="btn btn-primary text-white">
                                {" "}
                                Update Setting{" "}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SettingCumbi;
