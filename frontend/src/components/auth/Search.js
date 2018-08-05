import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import { BootstrapTable, TableHeaderColumn, TableDataSet } from 'react-bootstrap-table';
import cryptoSearch from '../../crypto-search/search';

import '../static/css/search.css';
import '../static/css/components.css';

bootstrapUtils.addStyle(Button, 'custom');

class Search extends React.Component {
  constructor() {
    super();

    this.dataSet = new Array();
    this.index = 1;
    this.state = {
      sr: [],
      srList: [],
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onSubmit = formProps => {
    this.clearData();
    this.index = 1;
    cryptoSearch.partialNameSearchCoins(formProps.searchItem)
      .then((res) => {
        // console.log(res);
        for (var searchresults in res) {
          console.log(res[searchresults])
          // const singlecoin = res[searchresults];
          var singledata = {
            "index": this.index,
            "id": res[searchresults].id,
            "name": res[searchresults].name,
            "symbol": res[searchresults].symbol
          }
          this.index = this.index + 1;
          this.dataSet.push(singledata);
        }

      }).then(() => this.setState({ sr: this.dataSet })); // [ 'BTC Lite', 'BTCMoon' ]
    //.catch(err => console.log(err))
  }

  setData(data) {
    this.dataSet.push(data);
    // console.log(this.dataSet);
  }

  clearData() {
    this.dataSet = new Array();
  }

  onRowClick(row, columnIndex, rowIndex, e) {
    this.props.history.push({pathname:'/coinInfo', search: '?query='+row.coinName,
        state:{ param:{'id': row.id,
                       'coinName': row.name,
                       'coinSymbol': row.symbol
                      } }
      });
  }

  doCheck() {
    console.log(this.dataSet.length)

    const options = {
      onRowClick: this.onRowClick
    };

    if (this.dataSet.length > 0) {
      return (
        <BootstrapTable data={this.dataSet}
        options={ options }
        tableStyle={{ border: '0px' }}
        pagination
        >
          <TableHeaderColumn dataField='index' isKey={true}><p id="title">Index</p></TableHeaderColumn>
          <TableHeaderColumn dataField='id'><p id="title">ID Result</p></TableHeaderColumn>
          <TableHeaderColumn dataField='name'><p id="title">Name Result</p></TableHeaderColumn>
          <TableHeaderColumn dataField='symbol'><p id="title">Symbol Result</p></TableHeaderColumn>
        </BootstrapTable>
      )
    }
  }

  handleChange() {
    console.log("after: " + this.dataSet);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="overall">
        <div className="searchposition">
            <form className="searchform" onSubmit={handleSubmit(this.onSubmit)}>
              <div>
                <FormGroup>
                  <Field name="searchItem" component="FormControl">
                    <ControlLabel className="cl">Search</ControlLabel>
                    <FormControl
                      type="text"
                      onChange={this.handleChange}
                    />
                  </Field>
                </FormGroup>
                <Button bsStyle="warning" type="submit" bsSize="medium" block> Start </Button>
              </div>
            </form>
          <div>
            {this.doCheck()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'search' })
)(Search);
