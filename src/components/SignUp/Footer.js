import React from 'react';
import { Part } from './Layout';
import RoundTab from '../RoundTab';
import styled from 'styled-components/native/index';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

class Footer extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Part style={{ paddingBottom: 0 }}>
        <RoundTabContainer>
          <RoundTab
            titleColor="white"
            tint="#2d4359"
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
