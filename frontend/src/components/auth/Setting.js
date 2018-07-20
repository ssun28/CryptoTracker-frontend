import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Alert} from 'react-bootstrap';
import { Button, ControlLabel } from 'react-bootstrap';

class Setting extends Component {

    onSubmit = formProps => {
        this.props.setting(formProps, () => {
            this.props.history.push('/signout');
        });
    };

    render() {

        const { handleSubmit } = this.props;
        return (
            <div className="in">
              <div>
                <Alert bsStyle="warning">
                  <strong>For the security reason, you will be automatically logout when you update the setting!</strong>
                </Alert>
              </div>
            <div className="col-md-6 col-md-offset-3 signin">
              <form onSubmit={handleSubmit(this.onSubmit)}>
                  <fieldset>
                  <ControlLabel className="control-label"><label>New Email:  </label></ControlLabel>
                      <Field
                          name="email"
                          type="text"
                          component="input"
                          autoComplete="none"
                      />
                  </fieldset>
                  <fieldset>
                  <ControlLabel className="control-label"><label>New Username:  </label></ControlLabel>
                      <Field
                          name="username"
                          type="text"
                          component="input"
                          autoComplete="none"
                      />
                  </fieldset>
                  <fieldset>
                  <ControlLabel className="control-label"><label>New Password:  </label></ControlLabel>
                      <Field
                          name="password"
                          type="password"
                          component="input"
                          autoComplete="none"
                      />
                  </fieldset>
                  <div>{this.props.errorMessage}</div>
                  <Button bsStyle="custom" type="submit" bsSize="large" block>Update Settings!</Button>
              </form>
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
