import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from "../../services/ApiService";

function Mnemonic() {
    const [setting, setSetting] = useState({
        _id: '',
        perc_buy_house: 0,
        perc_cumbi: 0,
        passphrase: ''
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        Alert("success", "loading", 30);

        console.log('setting.passphrase', setting)
        ApiService.updateMnemonic("/update-mnemonic", { ...setting }).then(
            (response) => {
                if (response.status === "success") {
                    Alert("success", "Settings Successfully Updated", 3);
                }
            },
            (err) => {
                Alert("failed", "Error in updating mnemonic", 3);
            }
        );
    };

    useEffect(() => {
        // Carga los datos iniciales o realiza otras acciones necesarias
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

                        <div className="col-md-12 mt-4 text-center">
                            <button className="btn btn-primary text-white">
                                Update Mnemonic
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Mnemonic;
