import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

import { History } from '../api/history.js';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { Container, Menu, Button, Icon } from 'semantic-ui-react';

@autobind
class FixedMenu extends Component{
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: true,
    };
  }
  
  render() {
    return (
      <Container className="headerMenu">
      { this.state.menuVisible ?
      (<Menu size='large'>
          <Menu.Item>
            <Icon className='hvr-buzz' name='eye' size='large' color='grey'/>
          </Menu.Item>
          <Menu.Item as='a' href={'/'}>Home</Menu.Item>
          <Menu.Item as='a' href={'/profile/'}>Profile</Menu.Item>
          <Menu.Item as='a'>Genre</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item className='item'>
              <AccountsUIWrapper />
            </Menu.Item>
          </Menu.Menu>
      </Menu>)
      : ''
      }
      </Container>
    );
  }
}

FixedMenu.propTypes = {};

export default createContainer((props) => {
  return {};
}, FixedMenu)