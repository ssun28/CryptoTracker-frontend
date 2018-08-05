import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Alert} from 'react-bootstrap';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import '../static/css/setting.css';

class Setting extends Component {

    onSubmit = formProps => {
        this.props.setting(formProps, () => {
            this.props.history.push('/signout');
        });
    };

    render() {

        const { handleSubmit } = this.props;
        return (
            <div className="overall-setting">
            <div id="settingbgoverlay">
            
              <div>
                <Alert bsStyle="warning">
                  <strong>For the security reason, you will be automatically logout when you update the setting!</strong>
                </Alert>
              </div>
            <div className="col-md-6 col-md-offset-3 setting">
              <form onSubmit={handleSubmit(this.onSubmit)}>

              <FormGroup>
                <Field name="email" component="FormControl" componentClass="select">
                  <ControlLabel className="control-label">Your New Email</ControlLabel>
                  <FormControl
                    type="text"
                  />
                </Field>
              </FormGroup>
                  
              <FormGroup>
                <Field name="username" component="FormControl" componentClass="select">
                  <ControlLabel className="control-label">Your New Username</ControlLabel>
                  <FormControl
                    type="text"
                  />
                </Field>
              </FormGroup>
                 
              <FormGroup>
                <Field name="password" component="FormControl" componentClass="select">
                  <ControlLabel className="control-label">Your New Password</ControlLabel>
                  <FormControl
                    type="password"
                  />
                </Field>
              </FormGroup>
                  <div>{this.props.errorMessage}</div>
                  <Button bsStyle="info" type="submit" bsSize="large" block>Update Settings!</Button>
              </form>
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
    reduxForm({ form: 'setting' })
)(Setting);
