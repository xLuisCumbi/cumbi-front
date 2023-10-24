import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import ApiService from '../../services/ApiService';
import PageLoading from "../../components/PageLoading";
import "../../assets/vendor/bootstrap/js/bootstrap.bundle.js";

// Import react-table and its required components
import { useTable, usePagination } from 'react-table';

function ListUserBusiness(props) {
    const user = JSON.parse(localStorage.getItem('user'));

    const reqRef = useRef(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [users, setUsers] = useState([]);

    // Nuevo estado para manejar la URL de la imagen y la visibilidad de la modal
    const [modalImage, setModalImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Nueva función para manejar la apertura de la modal
    const openModalWithImage = (imageUrl) => {
        setModalImage(imageUrl);
        setShowModal(true);
    };

    /**
     * Calls a props function for edit the user
     * @param {*} user
     */
    const editUser = (user) => {
        props.editUser(user)
    }

    /**
     * Block or active an user
     * @param {*} _id ID from User
     * @param {*} status Current status of user
     */
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

    /**
     * Delete an user from Database
     * @param {*} _id
     */
    const deleteUser = (_id) => {
        if (confirm('Are you sure you want to delete the user? Click OK to confirm')) {
            // ApiService.delete('/' + _id).then(
            //     (response) => {
            //         if (response.status === 'success') {
            //             Alert('success', 'User deleted', 3);
            //         }
            //     },
            //     (err) => {
            //         console.log('err', err);
            //         console.log('stack', err.stack);
            //         Alert('failed', 'Error updating user', 3);
            //     }
            // );
        }
    }

    useEffect(() => {
        if (reqRef.current) return;
        reqRef.current = true;

        ApiService.get('business/' + user.id)
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
        () => {
            const commonColumns = [
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
                            <a className="btn" onClick={() => openModalWithImage(row.original.document)}>
                                <i className="bi bi-person-vcard"></i>
                            </a>
                        </>
                    ),
                },
            ]
            if (user.role == 'superadmin') {
                commonColumns.push(
                    {
                        Header: 'Business',
                        accessor: 'business.name',
                    },
                    {
                        Header: 'KYC',
                        accessor: 'kyc',
                    },
                )
            }

            // Agrega más columnas según las condiciones necesarias

            return commonColumns;
        },
        []
    );

    const tableInstance = useTable({ columns, data: users }, usePagination);

    // Access the table instance properties
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Cambia 'rows' a 'page'
        prepareRow,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageCount,
        state: { pageIndex }, // Agrega esta línea para obtener el índice de la página actual
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
                                {page.map((row) => {
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
                            <tfoot>
                                <tr>
                                    <td colSpan={columns.length}>
                                        <div className="pagination d-flex justify-content-between align-items-center">
                                            <div className="pagination-navigation">
                                                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-light btn-sm">
                                                    Previous
                                                </button>
                                                <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-light btn-sm">
                                                    Next
                                                </button>
                                            </div>
                                            <div className="pagination-info">
                                                Page {pageIndex + 1} of {pageCount}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className={`modal fade ${showModal ? 'd-block show' : 'd-none'}`} tabIndex="-1" style={{ backgroundColor: `${showModal ? 'rgba(0,0,0,0.5)' : 'transparent'}` }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Document</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <img src={modalImage} alt="Document" className="img-fluid" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}

export default ListUserBusiness;
