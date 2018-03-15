import React from 'react';
import { Part } from '../Layout/SignupLayout';
import RoundTab from '../RoundTab';
import styled from 'styled-components/native/index';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

/**
 * Renders the NEXT button aka footer for all the sign up process
 * */
class Footer extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Part style={{ paddingBottom: 0 }}>
        <RoundTabContainer>
          <RoundTab
            titleColor={this.props.blue ? '#2d4359' : '#ffffff'}
            tint={this.props.blue ? '#ff8a65' : '#2d4359'}
            title="Next"
            style={{ flex: 1 }}
            onPress={() => dispatch(submit('signup'))}
          />
        </RoundTabContainer>
      </Part>
    );
  }
}

const RoundTabContainer = styled.View`margin-top: auto;`;

export default connect()(Footer);
