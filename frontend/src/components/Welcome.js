import React from 'react';
import axios from 'axios';

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
           const rank = data[pro].rank;
           const coinCirculatingSupply = data[pro].circulating_supply;
           const quotes = data[pro].quotes;

           for(var quote in quotes){
             const price = quotes[quote].price;
             var coinInfo = {
                             'rowid': this.rowid,
                             'id': id,
                             'coinName': coinName,
                             'coinSymbol': coinSymbol,
                             'rank': rank,
                             'coinCirculatingSupply': coinCirculatingSupply,
                             'price': price,
                             'priceGraph7d': '<img src=https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/'+id+'.png />',
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
                      } 
                    }
      });
    }

    imageFormatter(cell, row){
      return "<img src='https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/"+row.id+".png' />";
    }

    render() {
        const options = {
          onRowClick: this.onRowClick,
          defaultSortName: 'rank',
          defaultSortOrder: 'asc'
        };

        return (
          <div>
            <BootstrapTable
              tableStyle={{ border: 'black 2px solid', background: '#FFFFFF' } }
              data={ this.state.coinsInfo }
              options={ options }
              pagination
              >
              <TableHeaderColumn dataField="rowid" headerAlign='center' dataAlign='center' hidden={true}>#</TableHeaderColumn>
              <TableHeaderColumn width="3%" dataField="rank" headerAlign='center' dataAlign='center' dataSort={true} isKey={true}>Rank</TableHeaderColumn>
              <TableHeaderColumn width="10%" dataField="coinName" headerAlign='center' dataAlign='center'>CoinName</TableHeaderColumn>
              <TableHeaderColumn width="10%" dataField="coinSymbol" headerAlign='center' dataAlign='center'>CoinSymbol</TableHeaderColumn>
              <TableHeaderColumn width="15%" dataField="coinCirculatingSupply">Circulating Supply</TableHeaderColumn>
              <TableHeaderColumn width="10%" dataField="price">Price(USD)</TableHeaderColumn>
              <TableHeaderColumn width="9%" dataField="priceGraph7d" dataFormat={this.imageFormatter}>Price Graph (7d)</TableHeaderColumn>
              <TableHeaderColumn dataField="id" hidden={true}></TableHeaderColumn>
            </BootstrapTable>
          </div>
        );
    }

}

export default Welcome
