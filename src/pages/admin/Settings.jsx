import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from "../../services/ApiService";

function Settings() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [settingsFormData, setSettingsFormData] = useState({
        username: user.username,
        email: user.email,
        passphrase: "****************",
        password: "****************",
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const data = {};

        for (let i in settingsFormData) {
            if (
                settingsFormData[i] !== "****************" &&
                settingsFormData[i] != ""
            ) {
                data[i] = settingsFormData[i];
            }
        }

        Alert("success", "loading", 30);
        ApiService.post("/update", { ...data }).then(
            (response) => {
                if (response.status === "success") {
                    Alert("success", "Admin Settings Successfully Updated", 3);
                    const up_user = {
                        ...user,
                        email: settingsFormData.email,
                        username: settingsFormData.username,
                    };
                    localStorage.setItem("user", JSON.stringify(up_user));
                }
            },
            (err) => {
                Alert("failed", "Error in creating invoice", 3);
            }
        );
    };

    return (
        <div>
            <PageTitle title="Settings" />

            <div className="col-12 mb-3">
                <form
                    className="row g-3 needs-validation"
                    noValidate
                    onSubmit={handleFormSubmit}
                >
                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={settingsFormData.username}
                                onChange={(e) =>
                                    setSettingsFormData({
                                        ...settingsFormData,
                                        username: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={settingsFormData.email}
                                onChange={(e) =>
                                    setSettingsFormData({
                                        ...settingsFormData,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label className="form-label">Passphrase/Mnemonic</label>
                            <input
                                type="text"
                                className="form-control"
                                value={settingsFormData.passphrase}
                                onChange={(e) =>
                                    setSettingsFormData({
                                        ...settingsFormData,
                                        passphrase: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label className="form-label">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                value={settingsFormData.password}
                                onChange={(e) =>
                                    setSettingsFormData({
                                        ...settingsFormData,
                                        password: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="col-md-12 mt-4 text-center">
                            <button className="btn btn-primary text-white">
                                {" "}
                                Update Admin Data{" "}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Settings;
