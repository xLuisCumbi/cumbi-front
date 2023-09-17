import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';
import PageLoading from "../../components/PageLoading";
import "../../assets/vendor/bootstrap/js/bootstrap.bundle.js";

// Import react-table and its required components
import { useTable } from 'react-table';

function ListUserBusiness(props) {
    const reqRef = useRef(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [users, setUsers] = useState([]);

    const editUser = (user) => {
        props.editUser(user)
    }

    const blockUser = (_id, status) => {
        let newStatus = "active"
        if (!status || status === "active")
            newStatus = "blocked"

        ApiService.put('/block/' + _id, { status: newStatus }).then(
            (response) => {
                if (response.status === 'success') {
                    Alert('success', 'User status updated', 3);
                }
            },
            (err) => {
                console.log('err', err);
                console.log('stack', err.stack);
                Alert('failed', 'Error updating user', 3);
            }
        );
    }

    useEffect(() => {
        if (reqRef.current) return;
        reqRef.current = true;

        const user = JSON.parse(localStorage.getItem('user'));
        ApiService.post('/business', user)
            .then((response) => {
                if (response.status === "success") {
                    setUsers(response.users || []);
                    setLoadingStatus(false);
                }
            })
            .catch((err) => {
                console.log('err', err);
                console.log('stack', err.stack);
                Alert('failed', 'Error in fetching users', 3);
                setLoadingStatus(false);
            });

    });




    // Use react-table to define the columns and data for the table
    const columns = React.useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Role',
                accessor: 'role',
            },
            {
                Header: 'Action',
                Cell: ({ row }) => (
                    row.original.role !== "superadmin" &&
                    <>
                        <a className="btn" onClick={() => editUser(row.original)}>
                            <i className="bi bi-pencil"></i>
                        </a>
                        <a className="btn" onClick={() => blockUser(row.original._id, row.original.status)}>
                            {(!row.original.status || row.original.status === "active") &&
                                <i className="bi bi-person-fill-slash"></i>
                            }
                            {row.original.status && row.original.status === "blocked" &&
                                <i className="bi bi-person-fill-check"></i>
                            }
                        </a>
                        {/* <a className="btn" style={{ color: "red" }} onClick={() => navigate('/admin/create-user')}>
                            <i className="bi bi-trash3"></i>
                        </a> */}
                    </>

                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: users });

    // Access the table instance properties
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

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
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div></div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}

export default ListUserBusiness;
