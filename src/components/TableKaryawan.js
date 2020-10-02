import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from "react-redux";

import { CreateButton } from "../components/elements";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const { SearchBar } = Search;

const doDeleteData = (nik) => {
  const data = JSON.parse(localStorage.reactData);
  for (let i = 0; i < data.length; i++) {
    let x = data[i]
    if (x.nik === nik) {
      data.splice(i, 1)
      localStorage.reactData = JSON.stringify(data)
      // window.location.reload()
      return
    }
  }
}
const doDeleteUser = (nik) => {
  const user = JSON.parse(localStorage.reactUser);
  for (let i = 0; i < user.length; i++) {
    let y = user[i]
    if (y.nik === nik) {
      user.splice(i, 1)
      localStorage.reactUser = JSON.stringify(user)

      return
    }
  }
}
const columns = [
  {
    dataField: "nik",
    text: "NIK",
    headerClasses: 'bg-info',
    headerStyle: () => {
      return { width: '10%' };
    },
  },
  {
    dataField: "nama",
    text: "Nama",
    sort: true,
    headerClasses: 'bg-info'
  },
  {
    dataField: "alamat",
    text: "Alamat",
    headerClasses: 'bg-info'
  },
  {
    dataField: "kontak",
    text: "Kontak",
    headerClasses: 'bg-info'
  },
  {
    dataField: "email",
    text: "Email",
    headerClasses: 'bg-info'
  },
  {
    dataField: "divisi",
    text: "Divisi",
    headerClasses: 'bg-info'
  },
  {
    dataField: 'link',
    text: 'Aksi',
    headerClasses: 'bg-info',
    headerStyle: () => {
      return { width: '20%' };
    },
    formatter: (rowContent, row) => {
      // console.log(row);
      return (
        <div>
          <Link to={'divisi/' + row.nik}>
            <Button className='mr-1'>Divisi</Button>
          </Link>
          <Link to={'edit/' + row.nik}>
            <Button className='mr-1'>Edit</Button>
          </Link>
          <Button onClick={() => doDeleteData(row.nik, doDeleteUser(row.nik), window.location.reload())}>Hapus</Button>
        </div>

      )
    }
  }
];

const defaultSorted = [
  {
    dataField: "nama",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getUsersList: state.data.getUsersList,
    errorUsersList: state.data.errorUsersList,
  }
}

const TableComponent = (props) => {
  return (
    <div>

      { props.getUsersList ?
        <ToolkitProvider
          bootstrap4
          keyField="nik"
          data={props.getUsersList}
          columns={columns}
          search
        >
          {(props) => (
            <div>
              <CreateButton />
              <div className="float-right">
                <SearchBar {...props.searchProps} placeholder="Cari .." />
              </div>
              <BootstrapTable {...props.baseProps} defaultSorted={defaultSorted} pagination={paginationFactory()} striped />
            </div>
          )}
        </ToolkitProvider> : null}
    </div>
  );
};

export default connect(mapStateToProps, null)(TableComponent);
