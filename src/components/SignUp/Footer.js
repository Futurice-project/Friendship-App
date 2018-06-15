import React from 'react';
import { Part } from '../Layout/SignupLayout';
import RoundTab from '../RoundTab';
import styled from 'styled-components/native/index';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

/**
 * Renders the NEXT button aka footer for all the sign up process
 * @param {boolean} blue – Determine the color of the text and thus, the color of the RoundTab
 * */
class Footer extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Part style={[this.props.style, { paddingBottom: 0 }]}>
        <RoundTab
          titleColor={this.props.textColor === 'blue' ? '#2d4359' : '#ffffff'}
          tint={this.props.textColor === 'blue' ? '#ff8a65' : '#2d4359'}
          title="Next"
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
          onPress={() => dispatch(submit('signup'))}
        />
      </Part>
    );
  }
}

const RoundTabContainer = styled.View`margin-top: auto;`;

export default connect()(Footer);
