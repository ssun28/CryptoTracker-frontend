import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';
import jsxToString from 'jsx-to-string';
import cryptoSearch from '../cryto-search/search';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:8000/register',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.jwttoken });
    localStorage.setItem('jwttoken', response.data.jwttoken);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: e.response.data.error });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:8000/login',
      formProps
    );

    console.log(response.data);
    dispatch({ type: AUTH_USER, payload: response.data.jwttoken });
    localStorage.setItem('jwttoken', response.data.jwttoken);
    callback();
  } catch (e) {
    console.log(e.response.data);
    dispatch({ type: AUTH_ERROR, payload: e.response.data.error});
  }
};

export const profile = (formProps, callback) => async dispatch => {

  axios.post('http://localhost:8000/user/profile', formProps,
    { headers: { "authorization": `${localStorage.getItem('jwttoken')}` } })
    .then((response) => {
      console.log(response.json);
      callback();
    });
};

export const setting = (formProps, callback) => async dispatch => {
  try{
    axios.put('http://localhost:8000/user/setting', formProps,
    { headers: { "authorization": `${localStorage.getItem('jwttoken')}` } })
    .then((response) => {
      console.log(response.json);
      callback();
    });
  }catch (e) {
    dispatch({ payload: e.response.data.error });
  }
};

export const makeTransaction = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8000/user/make-transaction', formProps,
    { headers: { "authorization": `${localStorage.getItem('jwttoken')}` } });
    console.log("token:"+ `${localStorage.getItem('jwttoken')}`);
    console.log(response.data);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: e.response.data.error });
  }
};

export const search = (formProps, callback) => async dispatch => {

    //searchNames(prefix): Return all the cryptocurrencies' name whose name starts with the given prefix
    console.log(formProps.searchItem);
    cryptoSearch.searchNames(formProps.searchItem)
    .then(names => console.log(names)) // [ 'BTC Lite', 'BTCMoon' ]
    .catch(err => console.log(err))
}

export const signout = () => {
  console.log('signout1:', `${localStorage.getItem('jwttoken')}`);
  localStorage.removeItem('jwttoken');
  console.log('signout2:', `${localStorage.getItem('jwttoken')}`);


  return {
    type: AUTH_USER,
    payload: ''
  };
};
