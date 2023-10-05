import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from "../../services/ApiService";
import PageLoading from "../../components/PageLoading";
import "../../assets/vendor/bootstrap/js/bootstrap.bundle.js";
import { useTable } from "react-table";

function ListUser() {
    const reqRef = useRef(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (reqRef.current) return;
        reqRef.current = true;
        getUsers()
    });

    const getUsers = () => {
        ApiService.get('')
            .then((response) => {
                if (response.status === "success") {
                    setUsers(response.users || []);
                    setLoadingStatus(false);
                }
            })
            .catch((err) => {
                console.log("err", err);
                console.log("stack", err.stack);
                Alert("failed", "Error in fetching users", 3);
                setLoadingStatus(false);
            });
    }

    const editUser = (id) => {
        props.editUser(id)
    }

    const blockUser = (id) => {
        ApiService.put("/block/" + id)
            .then((response) => {
                if (response.status === "success") {
                    Alert('success', 'User updated', 3);
                    getUsers()
                }
            })
            .catch((err) => {
                console.log('err', err);
                console.log('stack', err.stack);
                Alert('failed', 'Error in fetching users', 3);
            });
    }

    const deleteUser = (id) => {
        return;
        ApiService.delete(id)
            .then((response) => {
                if (response.status === "success") {
                    Alert('success', 'User Deleted', 3);
                    getUsers()
                }
            })
            .catch((err) => {
                console.log('err', err);
                console.log('stack', err.stack);
                Alert('failed', 'Error in fetching users', 3);
            });
    }

    // Use react-table to define the columns and data for the table
    const columns = React.useMemo(
        () => [
            {
                Header: "Username",
                accessor: "username",
            },
            {
                Header: 'Business',
                accessor: 'business',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: "Role",
                accessor: "role",
            },
            {
                Header: "Action",
                Cell: ({ row }) => (
                    <>
                        <a className="btn" onClick={() => editUser(row.original._id)}>
                            <i className="bi bi-pencil"></i>
                        </a>
                        <a className="btn" onClick={() => blockUser(row.original._id)}>
                            <i className="bi bi-person-dash"></i>
                        </a>
                        <a className="btn" style={{ color: "red" }} onClick={() => deleteUser(row.original._id)}>
                            <i className="bi bi-trash3"></i>
                        </a>
                    </>
                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: users });

    // Access the table instance properties
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    if (loadingStatus) {
        return <PageLoading />;
    }

    if (!users || !Array.isArray(users)) {
        return <div>No data available</div>; // Display a message if the data is not available or not an array
    }

    return (
        loadingStatus ? <PageLoading /> :
            <>
                <PageTitle title="List Users by Business" />
                <section id="list_user" className="card bg-white p-4">
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
                    <div className="modal fade" id="largeModal" tabIndex="-1">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Modal title</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div></div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}

export default ListUser;
