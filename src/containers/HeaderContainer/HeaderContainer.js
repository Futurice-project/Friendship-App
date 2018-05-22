import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(NavigationActions.back()),
  navigateTo: (screen, args = {}) =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: screen,
            params: args,
          }),
        ],
      }),
    ),
});

class HeaderContainer extends Component {
  render() {
    return (
      <Header
        leftComponent={this.getLeftComponent(this.props.left)}
        rightComponent={this.getRightComponent(this.props.right)}
        title={this.props.title}
      />
    );
  }

  getLeftComponent(type) {
    switch (type) {
      case 'cancel':
        return <Button text="Cancel" header onPress={this.props.back} />;
    }
  }

  getRightComponent(type) {
    switch (type) {
      case 'join':
        return (
          <Button
            text="Join"
            header
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        );
    }
  }
}

HeaderContainer.propTypes = {};

export default connect(null, mapDispatchToProps)(HeaderContainer);
