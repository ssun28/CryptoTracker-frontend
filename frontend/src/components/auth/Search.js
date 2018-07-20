// import React from 'react';
// import { reduxForm, Field } from 'redux-form';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import * as actions from '../../actions';
// import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
// import { bootstrapUtils } from 'react-bootstrap/lib/utils';
// import cryptoSearch from '../../crypto-search/search';
// import '../static/css/search.css';
// import { BootstrapTable, TableHeaderColumn, TableDataSet } from 'react-bootstrap-table';

// import '../static/css/search.css';
// import '../static/css/components.css';

// bootstrapUtils.addStyle(Button, 'custom');

// class Search extends React.Component {
//   constructor() {
//     super();

//     this.dataSet = new Array();
//     this.id = 1;
//     this.state = {

//       sr: [],
//       srList: [],

//     }

//     this.onSubmit = this.onSubmit.bind(this);
//     this.setState = this.setState.bind(this);
//     this.handleChange = this.handleChange.bind(this);

//   }

//   onSubmit = formProps => {
//     this.clearData();
//     this.id = 1;
//     cryptoSearch.searchSymbols(formProps.searchItem)
//       .then((names) => {
//         for (var searchresults in names) {
//           const singleName = names[searchresults];
//           var singledata = {
//             "id": this.id,
//             "single": singleName
//           }
//           this.id = this.id + 1;
//           this.dataSet.push(singledata);
//         }
//         // this.setState({ srList: {}, sr: names }, () => {
//         //   this.state.sr.map((element, index) => {
//         //     this.setData({ index: index, element: element });
//         //   });
//         // })
//       }).then(() => this.setState({ sr: this.dataSet })); // [ 'BTC Lite', 'BTCMoon' ]
//     //.catch(err => console.log(err))

//   }


//   setData(data) {
//     this.dataSet.push(data);
//     console.log(this.dataSet);
//   }

//   clearData() {
//     this.dataSet = new Array();
//   }


//   doCheck() {
//     console.log(this.dataSet.length)
//     if (this.dataSet.length > 0) {
//       return (
//         <BootstrapTable data={this.dataSet} trClassName="tableStyle">

//           <TableHeaderColumn dataField='id' isKey><p id="title">Index</p></TableHeaderColumn>
//           <TableHeaderColumn dataField='single'><p id="title">Search Result</p></TableHeaderColumn>

//         </BootstrapTable>

//       )
//     }

//   }

//   handleChange() {
//     console.log("after: " + this.dataSet);
//   }

//   render() {
//     const { handleSubmit } = this.props;
//     console.log("before: " + this.dataSet);

//     return (
//       <div className="overall">

//         <div>
//           <center>
//             <form className="form" onSubmit={handleSubmit(this.onSubmit)}>

//               <div>
//                 <FormGroup>
//                   <Field name="searchItem" component="FormControl">
//                     <ControlLabel className="cl">Search</ControlLabel>
//                     <FormControl
//                       type="text"
//                       onChange={this.handleChange}
                      
//                     />
//                   </Field>

//                 </FormGroup>

//                 <Button bsStyle="warning" type="submit" bsSize="medium" block> Start </Button>
//               </div>

//             </form>

//           </center>
//           <div>
//             {this.doCheck()}
//           </div>
//         </div>

//       </div>

//     );
//   }
// }

// function mapStateToProps(state) {
//   return { errorMessage: state.auth.errorMessage };
// }

// export default compose(
//   connect(mapStateToProps, actions),
//   reduxForm({ form: 'search' })
// )(Search);
