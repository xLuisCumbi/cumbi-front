import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from "../../services/ApiService";

function SettingCumbi() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [fee, setFee] = useState([
        { value_from: 100, value_to: 200, perc_commission: 0.2 }
    ])
    const [settings, setSettings] = useState({
        trm: 0,
        perc_buy_house: 0,
        perc_cumbi: 0,
        fee: fee,
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const data = {};


        Alert("success", "loading", 30);
        ApiService.post("/update", { ...data }).then(
            (response) => {
                if (response.status === "success") {
                    Alert("success", "Settings Successfully Updated", 3);
                    const up_user = {
                        ...user,
                        email: settingsFormData.email,
                        username: settingsFormData.username,
                    };
                }
            },
            (err) => {
                Alert("failed", "Error in creating invoice", 3);
            }
        );
    };

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
                                value={settings.trm}
                                readOnly
                                // onChange={(e) =>
                                //     setSettings({
                                //         ...settingsFormData,
                                //         username: e.target.value,
                                //     })
                                // }
                                required
                            />
                        </div>

                        <div className="col-md-6 mt-3">
                            <label className="form-label">Comisión Casa de Compra</label>
                            <input
                                type="number"
                                className="form-control"
                                value={settings.perc_buy_house}

                                onChange={(e) =>
                                    setSettings({
                                        ...setSettings,
                                        perc_buy_house: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="col-md-6 mt-3">
                            <label className="form-label">Comisión Casa de Compra</label>
                            <input
                                type="number"
                                className="form-control"
                                value={settings.perc_buy_house}

                                onChange={(e) =>
                                    setSettings({
                                        ...setSettings,
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
                                value={settings.perc_cumbi}

                                onChange={(e) =>
                                    setSettings({
                                        ...setSettings,
                                        perc_cumbi: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div>
                            {
                                fee.map((fee) => (
                                    <>
                                        <span>{fee.value_from}<br /></span>
                                        <span>{fee.value_to}<br /></span>
                                        <span>{fee.perc_commission}<br /></span>
                                    </>
                                ))
                            }
                        </div>

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
