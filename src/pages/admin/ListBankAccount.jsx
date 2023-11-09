import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import PageLoading from '../../components/PageLoading';
import '../../assets/vendor/bootstrap/js/bootstrap.bundle.js';

// Import react-table and its required components
import { usePagination, useTable } from 'react-table';

function ListBankAccount(props) {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [bankAccounts, setBankAccounts] = useState([]);

  const edit = (data) => {
    props.edit(data);
  };

  useEffect(() => {
    ApiService.getBankAccount('')
      .then((response) => {
        if (response.status === 'success') {
          setBankAccounts(response.bankAccounts);
          setLoadingStatus(false);
        }
      })
      .catch((err) => {
        console.log('err', err);
        console.log('stack', err.stack);
        Alert('failed', 'Error in fetching', 3);
        setLoadingStatus(false);
      });
  }, []);

  // Use react-table to define the columns and data for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Bank',
        accessor: 'bank.name',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Number',
        accessor: 'number',
      },
      {
        Header: 'Active',
        accessor: 'active',
        Cell: ({ row }) => (
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" defaultChecked={row.original.active} role="switch" disabled />
          </div>
        ),
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <a className="btn" onClick={() => edit(row.original)}>
            <i className="bi bi-pencil" />
          </a>
        ),
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data: bankAccounts }, usePagination);

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

  if (!bankAccounts || !Array.isArray(bankAccounts)) {
    return <div>No data available</div>; // Display a message if the data is not available or not an array
  }

  return (
    loadingStatus ? <PageLoading />
      : (
        <>
          <PageTitle title="List Bank Accounts" />
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
                          Page
                          {' '}
                          {pageIndex + 1}
                          {' '}
                          of
                          {pageCount}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="modal fade" id="largeModal" tabIndex="-1">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <div className="modal-body">
                    <div />
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
      )
  );
}

export default ListBankAccount;
