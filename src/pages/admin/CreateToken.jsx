import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';
import ApiTokens from "./ApiTokens";

function CreateToken() {

    const [tokenFormData, setTokenFormData] = useState({
        token_name: 'API Token',
    });

    const handleFormSubmit = e => {
        e.preventDefault();
        for (let i in tokenFormData) {
            if (tokenFormData[i] === '') {
                Alert('failed', `input ${i} is required`, 3);
                return;
            }
        }

        // Retrieve user data from localStorage (or your chosen storage)
        const user = JSON.parse(localStorage.getItem('user'));
        Alert('success', 'loading', 30);
        // Include user data in your API call
        ApiService.post('/create-token', { ...tokenFormData, user: user.id })
            .then((response) => {
                if (response.status === "success") {
                    Alert('success', 'token successfully created', 3);
                    setTokenFormData({ ...tokenFormData, token_name: '' });
                } else {
                    Alert('failed', response.message, 3);
                }
            }, err => {
                Alert('failed', 'Error in creating token', 3);
            });
    }

    return (
        <div>
            <PageTitle title="Create API Token" />
            <div className="col-12 mb-3">
                <form className="row g-3 needs-validation" noValidate onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <label className="form-label">
                                Token Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={tokenFormData.token_name}
                                onChange={(e) => setTokenFormData({ ...tokenFormData, token_name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-12 mt-4 text-center">
                            <button className="btn btn-primary text-white"> Create Token </button>
                        </div>
                    </div>
                </form>
            </div>
            <ApiTokens></ApiTokens>
        </div>

    );
}

export default CreateToken;
