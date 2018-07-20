import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

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

      // this.addToTotalValue = this.addToTotalValue.bind(this);
      this.getTotal = this.getTotalValue.bind(this);
      this.helper= this.helper.bind(this);
    }

    // componentDidMount() {
    //   axios.get('http://localhost:8000/user/asset',
    //     { headers: { "authorization": `${localStorage.getItem('jwttoken')}` } })
    //     .then(async response => {
    //       var data = response.data;

    //       console.log('==========:'+this.totalValue);

    //       console.log("data"+response);
    //       for(var folio in data) {
    //         if(data[folio].type === "USD"){
    //           this.costUsd = -data[folio].amount;
    //           continue;
    //         }
    //         await this.addToTotalValue(data[folio].type, data[folio].amount);

    //         this.portfolioArray.push(data[folio]);
    //       }
    //       console.log('==========:'+this.totalValue);
    //     })
    //     .then(()=> this.setState({portfolio: this.portfolioArray, totalPortfolioValue: this.totalValue, profitOrLoss: this.totalValue+this.costUsd}));
    // }

    // addToTotalValue(symbol, amount){
    //   coinmarketcap.multi(coins => {
    //     this.totalValue = this.totalValue + coins.get(symbol).price_usd * amount;
    //     console.log("price"+ coins.get(symbol).price_usd);
    //     console.log("totalPortfolioValue: "+this.totalValue); 
    //   });
    // }

   componentDidMount(){
    axios.get('http://localhost:8000/user/asset',
      { headers: { "authorization": `${localStorage.getItem('jwttoken')}` } })
      .then(response => {
        var data = response.data;
        coinmarketcap.multi( coins =>{
          var i = 0;
          this.getTotalValue(data, i, coins);
      });
    });
  }

  helper(data, i, coins, coinValue){
    this.totalValue += coinValue; 
    // console.log('totalValue :',this.totalValue);
    // console.log('i:',i);
    // console.log('length:', data.length);
    if(i == data.length - 1){
      this.setState({portfolio: this.portfolioArray, totalPortfolioValue: this.totalValue, profitOrLoss: this.totalValue+this.costUsd});
    }
    i++;
    this.getTotalValue(data, i, coins);
  }

   getTotalValue(data, i, coins){
      if(i >= data.length){
        return;
      }
      var symbol = data[i].type;
      var amount = data[i].amount;
      console.log('type: ', symbol);
      console.log('amount: ', amount);
      if(symbol !== 'USD'){
        console.log(coins.get(symbol) +'='+ coins.get(symbol).price_usd)
        var coinValue = coins.get(symbol).price_usd * amount;
        this.portfolioArray.push(data[i]);
        this.helper(data, i, coins, coinValue);
      } else {
        this.costUsd = data[i].amount;
        this.helper(data, i, coins, 0);
      }
   }



    render() {

      return (
        <div>
          <div className="transaction-table-header">
            <h1>Here are the coins you have</h1>
            <h1>Total Portfolio Value : {this.state.totalPortfolioValue}</h1>
            <h1>Profit/Loss : {this.state.profitOrLoss}</h1>
          </div>
          <BootstrapTable className=""
            tableStyle={{ border: 'black 2px solid', background: '#FFFFFF' } }
            data={ this.state.portfolio }
            pagination
            >
            <TableHeaderColumn width="50%" dataField="type" headerAlign='center' dataAlign='center' isKey={true}>Type</TableHeaderColumn>
            <TableHeaderColumn width="50%" dataField="amount" headerAlign='center' dataAlign='center'>Amount</TableHeaderColumn>
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
