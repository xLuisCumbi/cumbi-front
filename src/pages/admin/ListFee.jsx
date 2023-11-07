import React, { useEffect, useRef, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import PageLoading from '../../components/PageLoading';
import '../../assets/vendor/bootstrap/js/bootstrap.bundle.js';

// Import react-table and its required components
import { useTable } from 'react-table';

function ListFee(props) {
  // const reqRef = useRef(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    // if (reqRef.current) {
    //     return;
    // }
    // reqRef.current = true;
    console.log(props.fees);
    if (props.fees) setFees(props.fees);
    setLoadingStatus(false);
  }, [props.fees]);

  // Use react-table to define the columns and data for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        // accessor: 'name',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'From',
        accessor: 'value_from',
      },
      {
        Header: 'To',
        accessor: 'value_to',
      },
      {
        Header: 'Commission',
        accessor: 'perc_commission',
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <>
            {/* <button
                            className="btn btn-primary text-white btn-sm"
                            onClick={() => handleShowPaymentDetails(row.index)}
                        >
                            <i className="bi bi-person"></i>
                        </button> */}
            <a className="btn" onClick={() => navigate('/admin/create-user')}>
              <i className="bi bi-pencil" />
            </a>
            <a className="btn" style={{ color: 'red' }} onClick={() => navigate('/admin/create-user')}>
              <i className="bi bi-trash3" />
            </a>
          </>
        ),
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data: fees });

  if (!fees || !Array.isArray(fees) || fees.length === 0) {
    return <div>No fee available</div>; // Display a message if the data is not available or not an array
  }

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

  return (
    loadingStatus ? <PageLoading />
      : (
        <>
          <PageTitle title="List Fees" />
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

export default ListFee;
