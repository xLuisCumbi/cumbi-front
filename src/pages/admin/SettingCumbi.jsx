import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from "../../services/ApiService";

function SettingCumbi() {
    const [setting, setSetting] = useState({
        trm: 0,
        perc_buy_house: 0,
        perc_cumbi: 0,
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        Alert("success", "loading", 30);
        ApiService.postSetting("/update", { ...setting }).then(
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

    function getSettingCumbi() {
        ApiService.getSetting("").then(
            (response) => {
                if (response.status === "success")
                    setSetting(response.setting)
            },
            (err) => {
                console.log('err', err);
                console.log('err.stack', err.stack);
            }
        )
    }


    useEffect(() => {
        getSettingCumbi()
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
                            <label className="form-label">TRM [COP]</label>
                            <input
                                type="number"
                                className="form-control"
                                value={setting.trm}
                                readOnly
                                required
                            />
                        </div>

                        <div className="col-md-6 mt-3">
                            <label className="form-label">Comisión Casa de Compra para TRM [%]</label>
                            <input
                                type="number"
                                className="form-control"
                                value={setting.perc_buy_house}

                                onChange={(e) => {
                                    if (e.target.value <= 0 || e.target.value >= 100) {
                                        Alert("failed", "Comisión Casa inválida", 1)
                                        return
                                    }
                                    setSetting({
                                        ...setting,
                                        perc_buy_house: e.target.value,
                                    })
                                }

                                }
                                required
                            />
                        </div>

                        <div className="col-md-6 mt-3">
                            <label className="form-label">Comisión Cumbi para cambio FIAT [%]</label>
                            <input
                                type="number"
                                className="form-control"
                                value={setting.perc_cumbi}

                                onChange={(e) => {
                                    if (e.target.value <= 0 || e.target.value >= 100) {
                                        Alert("failed", "Comisión Cumbi inválida", 1)
                                        return
                                    }
                                    setSetting({
                                        ...setting,
                                        perc_cumbi: e.target.value,
                                    })
                                }

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
            </div>
        </div>
    );
}

export default SettingCumbi;
