import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import autobind from 'autobind-decorator';

import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

@autobind
export default class CustomSidebar extends Component {
  constructor(props){
    super(props);

    this.state = { visible: false };
  }

  toggleVisibility(){
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleVisibility()}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='uncover' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='/assets/images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}