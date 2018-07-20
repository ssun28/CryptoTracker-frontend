import React from 'react';
import axios from 'axios';

import { Table } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './static/css/welcome.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';


class Welcome extends React.Component {
    constructor() {
        super();
        this.coinsArray = new Array();
        this.rowid = 1;
        this.state = {
                "coinsInfo": []
        }

        this.getCoinlist = this.getCoinlist.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }

    componentDidMount() {
        this.getCoinlist();
    }

    getCoinlist() {
      axios.get('https://api.coinmarketcap.com/v2/ticker/')
      .then((results) => {
         var data = results.data.data;
         for(var pro in data){
           const id = data[pro].id;
           const coinName = data[pro].name;
           const coinSymbol = data[pro].symbol;
           const coinCirculatingSupply = data[pro].circulating_supply;
           const quotes = data[pro].quotes;
           //const websiteSlug = data[pro].website_slug;
           //const rank = data[pro].rank;
           //const totalSupply = data[pro].total_supply;

           for(var quote in quotes){
             const price = quotes[quote].price;
             //const marketCap = quotes[quote].market_cap;
             //const percentChange1h = quotes[quote].percent_change_1h;
            //const percentChange24h = quotes[quote].percent_change_24h

             var coinInfo = {
                             'rowid': this.rowid,
                             'id': id,
                             'coinName': coinName,
                             'coinSymbol': coinSymbol,
                             'coinCirculatingSupply': coinCirculatingSupply,
                             'price': price
                             //'websiteSlug': websiteSlug,
                             //'rank': rank,
                             //'totalSupply': totalSupply,
                             //'marketCap': marketCap,
                             //'percentChange1h': percentChange1h,
                             //'percentChange24h': percentChange24h
                            };
                            this.rowid = this.rowid + 1;
           }

           this.coinsArray.push(coinInfo);
         }

      }).then(()=> this.setState({coinsInfo: this.coinsArray}));

    }

    onRowClick(row, columnIndex, rowIndex, e) {
      this.props.history.push({pathname:'/coinInfo', search: '?query='+row.coinName,
        state:{ param:{'id': row.id,
                       'coinName': row.coinName,
                       'coinSymbol': row.coinSymbol
                       // 'coinCirculatingSupply' : row.coinCirculatingSupply,
                       // 'price': row.price,
                       // 'rank' : row.rank,
                       //'totalSupply': row.totalSupply,
                       //'marketCap': row.marketCap,
                       //'percentChange1h': row.percentChange1h,
                       //'percentChange24h': row.percentChange24h
                      } }
      });
    }

    render() {
        const options = {
          onRowClick: this.onRowClick
        };

        return (
          <div>
            <BootstrapTable
              tableStyle={{ border: 'black 2px solid', background: '#FFFFFF' } }
              data={ this.state.coinsInfo }
              options={ options }
              pagination
              >
              <TableHeaderColumn width="3%" dataField="rowid" headerAlign='center' dataAlign='center' isKey={true}>#</TableHeaderColumn>
              <TableHeaderColumn width="10%" dataField="coinName" headerAlign='center' dataAlign='center'>CoinName</TableHeaderColumn>
              <TableHeaderColumn width="10%" dataField="coinSymbol" headerAlign='center' dataAlign='center'>CoinSymbol</TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="coinCirculatingSupply">Circulating Supply</TableHeaderColumn>
              <TableHeaderColumn width="10%" dataField="price">Price(USD)</TableHeaderColumn>
              <TableHeaderColumn dataField="id" hidden={true}></TableHeaderColumn>
            </BootstrapTable>
          </div>
        );
    }

}

export default Welcome
