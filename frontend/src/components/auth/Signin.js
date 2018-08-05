import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

import '../static/css/signin.css';
import '../static/css/components.css';
bootstrapUtils.addStyle(Button, 'custom');

class Signin extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/');
    });
  };

  handleChange(e) {
    this.setState({ errorMessage: '' });
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div id="bg">
        <div id="bgoverlay">
          <center>
            <form className="form" onSubmit={handleSubmit(this.onSubmit)}>
              <div>
                <FormGroup>
                  <Field name="email" component="FormControl">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      autocomplete="off"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </Field>
                  <Field name="password" component="FormControl">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      autocomplete="off"
                      type="password"
                      onChange={this.handleChange}
                    />
                  </Field>
                </FormGroup>
              </div>
              <div id="errorStyle">{this.props.errorMessage}</div>
              <div>
                <Button bsStyle="primary" type="submit" bsSize="medium" block>
                  Log In
                </Button>
              </div>
            </form>
          </center>
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
  reduxForm({ form: 'signin' })
)(Signin);
