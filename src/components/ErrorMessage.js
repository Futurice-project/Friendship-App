import React from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const mapStateToProps = state => ({
  error: state.errorState,
});

class ErrorMessage extends React.Component {
  showError = error => <Error>Error: {error}</Error>;

  render = () => {
    const { error } = this.props.error;
    // TO DO : finish the error message
    return null;
    return <Message>{error ? this.showError(error) : null}</Message>;
  };
}

const Message = styled.View`
  position: absolute;
  top: 50%;
  left: 20%;
`;

const Error = styled.Text`font-size: 20px;`;

export default connect(mapStateToProps)(ErrorMessage);
