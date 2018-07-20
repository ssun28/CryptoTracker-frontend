import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import CoinInfo from './components/CoinInfo';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Portfolio from './components/auth/Portfolio';
import Transaction from './components/auth/Transaction';
import Setting from './components/auth/Setting';
import Profile from './components/auth/Profile';
import Search from './components/auth/Search';


import 'bootstrap/dist/css/bootstrap.css';


const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/coinInfo" exact component={CoinInfo} />
        <Route path="/signup" component={Signup} />
        <Route path="/feature" component={Feature} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
        <Route path="/user/portfolio" component={Portfolio} />
        <Route path="/user/transaction" component={Transaction} />
        <Route path="/user/profile" component={Profile} />
        <Route path="/user/setting" component={Setting} />
        <Route path="/search" component={Search} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
