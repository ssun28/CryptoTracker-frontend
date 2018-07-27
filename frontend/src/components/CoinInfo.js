import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { FormGroup, FormControl, ControlLabel, HelpBlock, ButtonGroup, Button, Alert, DropdownButton, MenuItem} from 'react-bootstrap';

import 'font-awesome/css/font-awesome.min.css';
import './static/css/coinInfo.css';

var CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();
var oxr = require('open-exchange-rates');
var currencyFormatter = require('currency-formatter');
var fx = require('money');


class CoinInfo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      "price": '',
      "currencyType": 'USD',
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
  //  this.currencyClick = this.currencyClick.bind(this);

 

    // fx.base = "USD";
    // fx.rates = {
    //     "USD" : 1, 
    //     "EUR" : 0.855939,
    //     "GBP" : 0.760848,
    //     "CNY" : 6.78965,
    //     "CAD" : 1.315771,
    //     "AUD" : 1.347365,
    //     "JPY" : 111.20630435
    // }
    // const currencyPrice = fx(1000).from("USD").to("CNY");
    // console.log('currencyPrice'+currencyPrice);


    // oxr.set({ app_id: '40957c78b3cd4a20b9858149433d216d' })

    // console.log('123123123123123123123123');
    // // oxr.latest(function() {

    // //   fx.rates = oxr.rates;
    // //   fx.base = oxr.base;

    // //   var cash = fx(100).from('USD').to('CNY'); // ~8.0424
    // //   console.log('cash' + cash);
    // // });
  }

  componentWillMount() {
    const coinSymbol= this.props.location.state.param.coinSymbol;
   
    coinmarketcap.multi(coins => {
      if(coins.get(coinSymbol) === undefined){
        alert("There is no information about this coin now!");
      }else {
        // console.log("11111111111",coins.get(coinSymbol).price_usd);
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
        //this.setState({rank: coins.get(coinSymbol).rank});
        // this.setState({price_usd: coins.get(coinSymbol).price_usd});
        // this.setState({market_cap_usd: coins.get(coinSymbol).market_cap_usd});
        // this.setState({total_supply: coins.get(coinSymbol).total_supply});
        // this.setState({available_supply: coins.get(coinSymbol).available_supply});
        // this.setState({percent_change_1h: coins.get(coinSymbol).percent_change_1h});
        // this.setState({percent_change_24h: coins.get(coinSymbol).percent_change_24h});
        // this.setState({price: coins.get(coinSymbol).price_usd});
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

  componentWillUpdate() {
    this.currencyClick();
  }

  doCheck() {
    // if(!this.props.authenticated){
    //   return(
    //     <Alert bsStyle="danger">
    //       <strong>You have to SIGN IN FIRST!</strong>
    //     </Alert>
    //   );
    // }
  }

  // currencyFormatter(amount, currency) {
  //   var currencyResult = currencyFormatter.format(amount, { code: currency });
  //   return currencyResult;
  // }

  currencyClick(currencyType){
    fx.base = "USD";
    fx.rates = {
        "USD" : 1, 
        "EUR" : 0.855939,
        "GBP" : 0.760848,
        "CNY" : 6.78965,
        "CAD" : 1.315771,
        "AUD" : 1.347365,
        "JPY" : 111.20630435
    }
    var priceUsd = '1000';
    // console.log('######');
    // console.log('priceUSD:=========='+this.state.price_usd);
    // console.log('type', currencyType);
    if(priceUsd !== ''){
      const currencyPrice = fx(priceUsd).from("USD").to(currencyType);
      console.log('currencyPrice'+currencyPrice);
      this.setState({price: currencyPrice});
    }

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
          <div>
            <div className="main-header">
              <div className="main-header-currency">
                <DropdownButton title='Currency'>
                <MenuItem onClick={this.currencyClick('USD')} >USD</MenuItem>
                <MenuItem onClick={this.currencyClick('EUR')} >EUR</MenuItem>
                <MenuItem onClick={this.currencyClick('GBP')} >GBP</MenuItem>
                <MenuItem onClick={this.currencyClick('CNY')} >CNY</MenuItem>
                <MenuItem onClick={this.currencyClick('CAD')} >CAD</MenuItem>
                <MenuItem onClick={this.currencyClick('AUD')} >AUD</MenuItem>
                <MenuItem onClick={this.currencyClick('JPY')} >JPY</MenuItem>
                  {/* {
                    CURRENCIES.map((currencyType) =>
                      <MenuItem onClick={this.currencyClick(currencyType)} >{currencyType}</MenuItem>)
                  } */}
                </DropdownButton>
              </div>
              <div className="main-header-price">
                <h1>{this.state.price_usd}</h1>
                {/* <ExchangeRate from='USD' to='CNY' val={this.state.price}/> */}
                {/* <h1>{this.currencyFormatter(this.state.price, this.state.currencyType)}</h1> */}
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
