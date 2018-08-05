import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../static/css/transaction.css';


class Transaction extends Component {
  constructor() {
    super();
    this.transactionsArray = new Array();
    this.state = {
            "transactions": []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/user/transactions',
      { headers: { "authorization": `${localStorage.getItem('jwttoken')}` } })
      .then(response => {
        var data = response.data;
        for(var trans in data) {
          console.log("transactions response: "+data[trans].income_type);
          this.transactionsArray.push(data[trans]);
        }
      }).then(()=> this.setState({transactions: this.transactionsArray}));
  }

  render() {
    const options = {
      defaultSortName: 'id',
      defaultSortOrder: 'asc'
    };

    return (
      <div className="transactionoverall">
        <div className="transaction-table-header">
          <p1>Transaction Records</p1>
        </div>
        <BootstrapTable className="transaction-table"
          tableStyle={{ border: '0px' } }
          data={ this.state.transactions }
          options={options}
          pagination
          >
          <TableHeaderColumn width="3%" dataField="id" headerAlign='center' dataAlign='center' dataSort={true} isKey={true}>#</TableHeaderColumn>
          <TableHeaderColumn width="12%" dataField="sell_type" headerAlign='center' dataAlign='center' dataSort={true}>Sell Type</TableHeaderColumn>
          <TableHeaderColumn width="15%" dataField="sell_price" headerAlign='center' dataAlign='center'>Sell Price</TableHeaderColumn>
          <TableHeaderColumn width="12%" dataField="sell_amount" headerAlign='center' dataAlign='center'>Sell Amount</TableHeaderColumn>
          <TableHeaderColumn width="12%" dataField="income_type" headerAlign='center' dataAlign='center'>Income Type</TableHeaderColumn>
          <TableHeaderColumn width="15%" dataField="income_price" headerAlign='center' dataAlign='center'>Income Price</TableHeaderColumn>
          <TableHeaderColumn width="12%" dataField="income_amount" headerAlign='center' dataAlign='center'>Income Amount</TableHeaderColumn>
          <TableHeaderColumn width="19%" dataField="createdAt" dataSort={true}>Time</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'transaction' })
)(Transaction);
