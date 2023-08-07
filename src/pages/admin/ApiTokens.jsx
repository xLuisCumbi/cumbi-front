import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';
import PageLoading from "../../components/PageLoading";
import { useTable } from 'react-table';

function ApiTokens() {
    const reqRef = useRef(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        if (reqRef.current) return;
        reqRef.current = true;

        ApiService.post('/fetch-tokens')
            .then((response) => {
                console.log('response', response);
                if (response.status === "success") {
                    setTokens(response.tokens || []);
                    setLoadingStatus(false);
                }
            })
            .catch((err) => {
                console.log('err', err);
                console.log('stack', err.stack);
                Alert('failed', 'Error in fetching token', 3);
                setLoadingStatus(false); // Set loading status to false even in case of an error
            });
    }, []);

    const handleTokenDelete = (token_id) => {
        if (confirm('Are you sure you want to delete token? Click OK to confirm')) {
            ApiService.post('/delete-token', { token_id })
                .then((response) => {
                    if (response.status === "success") {
                        setTokens(tokens.filter(t => t.id !== token_id));
                        Alert('success', 'Token Successfully deleted', 3);
                    }
                })
                .catch((err) => {
                    Alert('failed', 'Error deleting token', 3);
                });
        }
    };

    const handleTokenCopy = (token) => {
        navigator.clipboard.writeText(token);
        Alert('success', 'Token copied successfully', 2);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Token Name',
                accessor: 'token_name',
            },
            {
                Header: 'Token',
                accessor: 'token',
                Cell: ({ cell }) => (
                    cell.value ? cell.value.substr(0, 30) + '...' : ''
                ),
            },
            {
                Header: 'Action',
                Cell: ({ row }) => (
                    <>
                        <button
                            onClick={() => handleTokenCopy(row.original.token)}
                            className="btn btn-primary btn-sm m-1 text-white"
                        >
                            Copy Token
                        </button>
                        <button
                            onClick={() => handleTokenDelete(row.original.id)}
                            className="btn btn-danger btn-sm m-1 text-white"
                        >
                            Delete
                        </button>
                    </>
                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: tokens });

    // Access the table instance properties
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        loadingStatus ? <PageLoading /> :
            <>
                <PageTitle title="API Tokens" />

                <section id="api_tokens" className="card bg-white p-4">

                    <div className="col-md-12">
                        <table style={{ fontSize: '90%' }} {...getTableProps()} className="table datatable">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()} scope="col">
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()} scope="row">
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </section>
            </>
    );
}

export default ApiTokens;
