import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { FormGroup, FormControl, ControlLabel, HelpBlock, ButtonGroup, Button, Alert, DropdownButton, MenuItem} from 'react-bootstrap';

import 'font-awesome/css/font-awesome.min.css';
import './static/css/coinInfo.css';
import PriceChart from './price_chart/PriceChart';

var CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();
var formatCurrency = require('format-currency')


class CoinInfo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      "price": '',
      "currencyType": 'USD',
      "currencyTitle": 'Currency',
      "coinSymbol": '',
      "rank": '',
      "price_usd": '',
      "market_cap_usd": '',
      "total_supply": '',
      "available_supply": '',
      "percent_change_1h": '',
      "percent_change_24h": ''
    }

   this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const coinSymbol= this.props.location.state.param.coinSymbol;
   
    coinmarketcap.multi(coins => {
      if(coins.get(coinSymbol) === undefined){
        alert("There is no information about this coin now!");
      }else {
        this.setState({coinSymbol: coins.get(coinSymbol).symbol, 
                       rank: coins.get(coinSymbol).rank,
                       price_usd: coins.get(coinSymbol).price_usd,
                       market_cap_usd: coins.get(coinSymbol).market_cap_usd,
                       total_supply: coins.get(coinSymbol).total_supply,
                       available_supply: coins.get(coinSymbol).available_supply,
                       percent_change_1h: coins.get(coinSymbol).percent_change_1h,
                       percent_change_24h: coins.get(coinSymbol).percent_change_24h,
                       price: coins.get(coinSymbol).price_usd
                      });
       }
     });
  }

  onSubmit = (type, formProps) => {
    if(formProps.price == null){
      formProps.price = this.state.price_usd;
    }
    switch(type){
      case 'buy':
        formProps['sell_type']= 'USD';
        formProps['sell_price']= 1;
        formProps['sell_amount']= formProps.price * formProps.amount;
        formProps['income_type']= this.state.coinSymbol;
        formProps['income_price']= formProps.price * 1;
        formProps['income_amount']= formProps.amount * 1;
        break;
      case 'sell':
        formProps['sell_type']= this.state.coinSymbol;
        formProps['sell_price']= formProps.price;
        formProps['sell_amount']= formProps.amount;
        formProps['income_type']= 'USD';
        formProps['income_price']= 1;
        formProps['income_amount']= formProps.price * formProps.amount;
        break;
      default:
        break;
    }
    this.props.makeTransaction(formProps, () => {
         alert("The transaction has been added to your portfolio successfully!");
    });
  }

  doCheck() {
    if(!this.props.authenticated){
      return(
        <Alert bsStyle="danger">
          <strong>You have to SIGN IN FIRST!</strong>
        </Alert>
      );
    }
  }

  currencyFormatter(amount) {
    let opts;
    var currencySymbols = {
      "USD" : '$', 
      "EUR" : '€',
      "GBP" : '£',
      "CNY" : '¥',
      "CAD" : '$',
      "AUD" : '$',
      "JPY" : '¥'
    }
    if(amount > 1){
      opts = { format: '%s %v%c',code: this.state.currencyType, symbol: currencySymbols[this.state.currencyType] }
    }else {
      opts = { format: '%s %v%c',maxFraction: 8,code: this.state.currencyType, symbol: currencySymbols[this.state.currencyType] }
    }
    var currencyResult = formatCurrency(amount, opts);
    return currencyResult;
  }

  currencyClick(currencyType){
    var currencyRates = {
        "USD" : 1, 
        "EUR" : 0.855939,
        "GBP" : 0.760848,
        "CNY" : 6.78965,
        "CAD" : 1.315771,
        "AUD" : 1.347365,
        "JPY" : 111.20630435
    }
    var priceUsd = this.state.price_usd;
    let currencyPrice = priceUsd * currencyRates[currencyType];
    this.setState({price: currencyPrice, currencyType: currencyType, currencyTitle: currencyType});
  }

  render() {
    const { handleSubmit } = this.props;
    const param = this.props.location.state.param;
    const CURRENCIES = ['USD', 'EUR',  'GBP', 'CNY', 'CAD', 'AUD', 'JPY'];

    return (
      <div>
        <div className="coinInfo-header">
          <div className="coinInco-sidebar">
            <div className="coin-logo">
              <img src={"https://s2.coinmarketcap.com/static/img/coins/128x128/"+param.id+".png"} />
            </div>
            <div className="coin-name">
              <h4>{param.coinName}
                <span>
                  （{param.coinSymbol}）
                </span>
              </h4>
              <h4><i className="fa fa-signal" aria-hidden="true" style={{fontSize:'28px'}}></i>  Rank: {this.state.rank}</h4>
            </div>
          </div>
          <div className="main-header-div">
            <div className="main-header">
              <div className="main-header-currency">
                <DropdownButton title={this.state.currencyTitle}>
                  {
                    CURRENCIES.map((currencyType) =>
                      <MenuItem onClick={() =>{this.currencyClick(currencyType)}} >{currencyType}</MenuItem>)
                  }
                </DropdownButton>
              </div>
              <div className="main-price">
                <h2 className="main-header-price">{this.currencyFormatter(this.state.price)}</h2>
              </div> 
            </div>
          </div>
          <div className="coin-user-amount">
            <div className="coin-user-warning">
              {this.doCheck()}
            </div>
            <form className="coin-user-input">
              <div>
                <FormGroup controlId="formValidationSuccess1" validationState="success">
                  <Field name="amount" component="FormControl" componentClass="select">
                  <ControlLabel><h2>amount</h2></ControlLabel>
                  <FormControl type="text" />
                  </Field>
                  <HelpBlock>Please enter an integer</HelpBlock>
                </FormGroup>
                <FormGroup controlId="formValidationSuccess2" validationState="success">
                  <Field name="price" component="FormControl" componentClass="select">
                  <FormControl type="text" placeholder={this.state.price_usd} />
                  </Field>
                  <HelpBlock>Trade Price</HelpBlock>
                </FormGroup>
              </div>
              <div className="coin-buy-sell-button">
                <ButtonGroup vertical>
                  <Button bsStyle="primary" onClick={handleSubmit(this.onSubmit.bind(this, 'buy'))} bsSize="lg" block>Buy</Button>
                  <Button bsStyle="primary" onClick={handleSubmit(this.onSubmit.bind(this, 'sell'))} bsSize="lg" block>Sell</Button>
                </ButtonGroup>
              </div>
            </form>
          </div>
        </div>
        <div className="coinInfo-details-pannel">
          <div className="coin-summary-item">
            <h5 className="coin-summary-item-header">Market Cap</h5>
            <div className="coin-summary-item-details">
              <h4>{this.state.market_cap_usd}</h4>
            </div>
          </div>
          <div className="coin-summary-item">
            <h5 className="coin-summary-item-header">Percent Change (1h)</h5>
            <div className="coin-summary-item-details">
              <h4>{this.state.percent_change_1h}</h4>
            </div>
          </div>
          <div className="coin-summary-item">
            <h5 className="coin-summary-item-header">Percent Change (24h)</h5>
            <div className="coin-summary-item-details">
              <h4>{this.state.percent_change_24h}</h4>
            </div>
          </div>
          <div className="coin-summary-item">
            <h5 className="coin-summary-item-header">Coin Circulating Supply</h5>
            <div className="coin-summary-item-details">
              <h4>{this.state.available_supply}</h4>
            </div>
          </div>
          <div className="coin-summary-item">
            <h5 className="coin-summary-item-header">Total Supply</h5>
            <div className="coin-summary-item-details">
              <h4>{this.state.total_supply}</h4>
            </div>
          </div>
        </div>


        <div>
          <PriceChart />
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'coinInfo' })
)(CoinInfo);
