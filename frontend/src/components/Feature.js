import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
  render() {
    return <div>String:</div>;
  }
}

export default requireAuth(Feature);
