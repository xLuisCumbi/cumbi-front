import { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';
import PageLoading from "../../components/PageLoading";
import "../../assets/js/Datatable";
import "../../assets/css/Datatables.css";


function ApiTokens() {

    const reqRef = useRef(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [tokens, setTokens] = useState(false);

    useEffect(() => {

        if (reqRef.current) return;
        reqRef.current = true;
        ApiService.post('/fetch-tokens')
            .then((response) => {

                if (response.status === "success") {

                    setTokens(response.tokens);
                    setLoadingStatus(false);

                    setTimeout(() => {
                        new DataTable('#ApiTokensTable');
                    }, 10);
                }

            }, err => {

                Alert('failed', 'Error in fetching token', 3);

            });

    }, []);

    const handleTokenDelete = (token_id) => {

        if (confirm('Are you sure you want to delete token ? Click OK to confirm')) {

            ApiService.post('/delete-token', { token_id })
                .then((response) => {

                    if (response.status === "success") {

                        setTokens(tokens.filter(t => t.id != token_id));
                        Alert('success', 'Token Successfully deleted', 3);
                        setTimeout(() => {
                            new DataTable('#ApiTokensTable');
                        }, 10);
                    }

                }, err => {

                    Alert('failed', 'Error deleting token', 3);

                });

        }

    }

    const handleTokenCopy = token => {

        navigator.clipboard.writeText(token);
        Alert('success', 'Token copied successfully ', 2);
    }

    return (

        loadingStatus ? <PageLoading /> :

            <>
                <PageTitle title="API Tokens" />

                <section id="api_tokens" className="card bg-white p-4">

                    <div className="col-md-12">
                        <table style={{ fontSize: '90%' }} id="ApiTokensTable" className="table datatable">
                            <thead>
                                <tr>
                                    <th scope="col">Token Name</th>
                                    <th scope="col">Token</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tokens.map((d, i) => {

                                        return (

                                            <tr key={i}>
                                                <td>{d.token_name}</td>
                                                <td>{d.token.substr(0, 30) + '...'}</td>
                                                <td>
                                                    <button onClick={() => handleTokenCopy(d.token)} className="btn btn-primary btn-sm m-1 text-white">Copy Token</button>
                                                    <button onClick={() => handleTokenDelete(d.id)} className="btn btn-danger btn-sm m-1 text-white">Delete</button>
                                                </td>
                                            </tr>

                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </section>


            </>
    );
}

export default ApiTokens;

