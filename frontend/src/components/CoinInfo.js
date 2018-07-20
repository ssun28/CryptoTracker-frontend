import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './requireAuth';
import { FormGroup, FormControl, ControlLabel, HelpBlock, ButtonGroup, Button, Alert} from 'react-bootstrap';

import './static/css/coinInfo.css';

var CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();


class CoinInfo extends Component {
  constructor(props, context) {
   super(props, context);
   this.state = {
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
   const coinName= this.props.location.state.param.coinName;

   coinmarketcap.get(coinName, coin => {
     this.setState({coinSymbol: coin.symbol});
     this.setState({rank: coin.rank});
     this.setState({price_usd: coin.price_usd});
     this.setState({market_cap_usd: coin.market_cap_usd});
     this.setState({total_supply: coin.total_supply});
     this.setState({available_supply: coin.available_supply});
     this.setState({percent_change_1h: coin.percent_change_1h});
     this.setState({percent_change_24h: coin.percent_change_24h});
   
//   console.log("symbol: "+coin.symbol);
//   console.log("rank: "+coin.rank);
//   console.log("market_cap_usd: "+coin.market_cap_usd);
//   console.log("total_supply: "+coin.total_supply);
//   console.log("available_supply: "+coin.available_supply);
//   console.log("percent_change_1h: "+coin.percent_change_1h);
//   console.log("percent_change_24h: "+coin.percent_change_24h); // Prints the price in USD of BTC at the moment.
//   console.log(coin.price_usd);
//
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

  render() {
    const { handleSubmit } = this.props;
    const param = this.props.location.state.param;

    return (
      <div>
        <div className="coinInfo-header">
          <div className="coinInco-sidebar">
            <div className="coin-logo">
              {/* <img src={"https://s2.coinmarketcap.com/static/img/coins/128x128/"+param.id+".png"} /> */}
              <img src={"https://www.coinratecap.com/assets/images/coins/"+param.coinSymbol.toLowerCase()+".png"} />
            </div>
            <div className="coin-name">
              <h4>{param.coinName}
                <span>
                  （{this.state.coinSymbol}）
                </span>
              </h4>
              <h4>#Rank:{this.state.rank}</h4>
            </div>
          </div>
          <div>
            <div className="main-header">
              <h1>{this.state.price_usd}</h1>
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
