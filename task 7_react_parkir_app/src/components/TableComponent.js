import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from "react-redux";

const { SearchBar } = Search;

const columns = [
  {
    dataField: "plat_nomor",
    text: "Plat Nomor",   
    headerClasses: 'bg-info'
  },
  {
    dataField: "jenis_kendaraan",
    text: "Jenis Kendaraan",
    headerClasses: 'bg-info'
  },
  {
    dataField: "waktu_masuk",
    text: "Waktu Masuk",
    sort: true,
    headerClasses: 'bg-info'
  },
  {
    dataField: "waktu_keluar",
    text: "Waktu Keluar",
    sort: true,
    headerClasses: 'bg-info'
  },
  {
    dataField: "lama_parkir",
    text: "Lama Parkir",
    sort: true,
    headerClasses: 'bg-info'
  },
  {
    dataField: "biaya",
    text: "Biaya",
    sort: true,
    headerClasses: 'bg-danger'
  },
];

const defaultSorted = [
  {
    dataField: "waktu_keluar",
    order: "desc",
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
        keyField="waktu_keluar"
        data={props.getUsersList}
        columns={columns}                
        search
      >
        {(props) => (
          <div>
            <div className="float-right">
              <SearchBar {...props.searchProps} placeholder="Cari .." />
            </div>
            <BootstrapTable {...props.baseProps} defaultSorted={defaultSorted} pagination={ paginationFactory() } striped />
          </div>
        )}
      </ToolkitProvider> : null }
      </div>
  );
};

export default connect(mapStateToProps, null)(TableComponent);
