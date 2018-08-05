import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import TextField from '@material-ui/core/TextField';

import '../static/css/portfolio.css';


var CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();

class Portfolio extends Component {
    constructor() {
      super();
      this.totalValue = 0;
      this.costUsd = 0;
      this.portfolioArray = new Array();
      this.state = {
              "portfolio": [],
              "totalPortfolioValue": 0,
              "profitOrLoss": 0
      }
    }

    componentDidMount() {
      axios.get('http://localhost:8000/user/asset',
        { headers: { "authorization": `${localStorage.getItem('jwttoken')}` } })
        .then(async response => {
          var data = response.data;

          coinmarketcap.multi(coins => {
            for(var i = 0; i < data.length; i++) {
              if(data[i].type === "USD"){
                this.costUsd = data[i].amount;
                continue;
              }
              var symbol = data[i].type;
              var amount = data[i].amount;

              this.totalValue = this.totalValue + coins.get(symbol).price_usd * amount; 
              this.portfolioArray.push(data[i]);
            }

            this.setState({portfolio: this.portfolioArray, totalPortfolioValue: this.totalValue, profitOrLoss: this.totalValue+this.costUsd});
          });
        });
    }

    
    render() {


      const options = {
        defaultSortName: 'type',
        defaultSortOrder: 'asc'
      };

      return (
        <div className="portfoliooverall">
          
          <div className="portfolio-table-header">
            <p1>Here are the coins you have<br /></p1>
            <p2>Total Portfolio Value in USD : {Number(this.state.totalPortfolioValue).toFixed(2)}<br /></p2>
            <p3>Profit/Loss in USD: {Number(this.state.profitOrLoss).toFixed(2)}</p3>
          </div>
          <BootstrapTable className=""
            tableStyle={{ border: '0px' } }
            data={ this.state.portfolio }
            pagination
            options={ options }
            >
            <TableHeaderColumn width="50%" dataField="type" headerAlign='center' dataAlign='center' dataSort={true} isKey={true}> Coin </TableHeaderColumn>
            <TableHeaderColumn width="50%" dataField="amount" headerAlign='center' dataAlign='center'> Amount </TableHeaderColumn>
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
    reduxForm({ form: 'portfolio' })
  )(Portfolio);
