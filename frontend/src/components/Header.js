import React, { Component } from 'react';
import { connect } from 'react-redux';
import './static/css/headerStyle.css';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'font-awesome/css/font-awesome.min.css';


class Header extends Component {
    renderLinks() {
      console.log('authenticated:'+this.props.authenticated);
        if (this.props.authenticated) {
            return (
                <div>
                  <Navbar>
                    <Navbar.Header>
                      <Navbar.Brand>
                        <a href="#home"><font size="6">Crypto Tracker</font></a>
                      </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                      <LinkContainer to="/">
                        <NavItem eventKey={1}>
                          Home
                        </NavItem>
                      </LinkContainer>
                      <LinkContainer to="/feature">
                        <NavItem eventKey={2}>
                          Feature
                        </NavItem>
                      </LinkContainer>
                      <LinkContainer to="/signout">
                        <NavItem eventKey={3}>
                          Sign Out
                        </NavItem>
                      </LinkContainer>
                    { /*<i className="fa fa-user-circle"></i> */}
                      <NavDropdown eventKey={4} title="User" id="basic-nav-dropdown">
                          <LinkContainer to="/user/portfolio">
                            <MenuItem eventKey={4.1}>Portfolio</MenuItem>
                          </LinkContainer>
                          <LinkContainer to="/user/transaction">
                            <MenuItem eventKey={4.2}>Transaction</MenuItem>
                          </LinkContainer>
                          <LinkContainer to="/user/setting">
                            <MenuItem eventKey={4.3}>Security Setting</MenuItem>
                          </LinkContainer>
                          <LinkContainer to="/user/profile">
                            <MenuItem eventKey={4.4}>Profile Information</MenuItem>
                          </LinkContainer>
                      </NavDropdown>
                    </Nav>
                  </Navbar>
                </div>
            );
        } else {
            return (
              <div>
                <Navbar>
                  <Navbar.Header>
                    <Navbar.Brand>
                      <a href="#home"><font size="6">Crypto Tracker</font></a>
                    </Navbar.Brand>
                  </Navbar.Header>
                  <Nav pullRight>
                    <LinkContainer to="/">
                      <NavItem eventKey={1}>
                        Home
                      </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                      <NavItem eventKey={2}>
                        Sign Up
                      </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/signin">
                      <NavItem eventKey={3}>
                        Log In
                      </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/search">
                      <NavItem eventKey={5}>
                        Search
                      </NavItem>
                    </LinkContainer>
                  </Nav>
                </Navbar>
              </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div> {this.renderLinks()}</div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
