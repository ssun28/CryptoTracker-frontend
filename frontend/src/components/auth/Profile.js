import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, ControlLabel } from 'react-bootstrap';
import axios from 'axios';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      profiles: {
        "github": '',
        "interest": '',
        "investment": ''
      }
    }
  }

  onSubmit = formProps => {
    this.props.profile(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  componentDidMount() {
    axios.get('http://localhost:8000/user/profile',
      { headers: { "authorization": `${localStorage.getItem('jwttoken')}` } })
      .then(response => this.setState(
        {
          github: response.data.github,
          interest: response.data.interest,
          investment: response.data.investment
        }
      ))
  }

  render() {
    const { handleSubmit } = this.props;



    return (
      <div className="in">
        <div className="col-md-6 col-md-offset-3 signin">

          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <ControlLabel className="control-label"><label>Github:  </label></ControlLabel>
              <Field
                name="github"
                type="text"
                component="input"
                autoComplete="none"
                placeholder={this.state.github}
              />
            </fieldset>
            <fieldset>
              <ControlLabel className="control-label"><label>Interest:  </label></ControlLabel>
              <Field
                name="interest"
                type="text"
                component="input"
                autoComplete="none"
                placeholder={this.state.interest}
              />
            </fieldset>
            <fieldset>
              <ControlLabel className="control-label"><label>Investment:  </label></ControlLabel>
              <Field
                name="investment"
                type="text"
                component="input"
                autoComplete="none"
                placeholder={this.state.investment}
              />
            </fieldset>
            <div>{this.props.errorMessage}</div>
            <Button bsStyle="custom" type="submit" bsSize="large" block>Update Profile!</Button>
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
  reduxForm({ form: 'profile' })
)(Profile);