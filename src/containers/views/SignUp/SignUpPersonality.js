import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import rest from '../../../utils/rest';
import { Padding, ViewContainer } from '../../../components/Layout/Layout';
import TwoPersonalities from '../../../components/SignUp/TwoPersonalities';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import validate from '../../../components/SignUp/validate';
import { Field, reduxForm, submit } from 'redux-form';

const mapStateToProps = state => ({
  personalities: state.personalities,
});

const mapDispatchToProps = dispatch => ({
  getPersonalities: () => {
    dispatch(rest.actions.personalities());
  },
});

class SignUpPersonality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      selectedPersonalities: [],
    };
  }

  componentWillMount() {
    this.props.getPersonalities();
  }

  handleClick = (personalityId, input) => {
    const { personalities } = this.props;

    if (this.state.index + 2 >= personalities.data.length) {
      const tmp = [...this.state.selectedPersonalities, personalityId];
      input.onChange(tmp);
      this.props.dispatch(submit('signup'));
    } else {
      this.setState(prevState => {
        const tmp = [...prevState.selectedPersonalities, personalityId];
        input.onChange(tmp);
        return {
          index: prevState.index + 2,
          selectedPersonalities: tmp,
        };
      });
    }
  };

  /**
   * Renders personalities with personality component according to
   * the list from the personality state
   * @returns {XML}
   */
  renderTwoPersonalities() {
    if (
      !this.props.personalities.data ||
      this.props.personalities.syncing ||
      this.props.personalities.loading ||
      !this.props.personalities.sync
    ) {
      return <ActivityIndicator />;
    }

    let index = this.state.index;
    let personalities = this.props.personalities.data;

    return (
      <Field
        name={'personalities'}
        component={TwoPersonalities}
        id={[personalities[index].id, personalities[index + 1].id]}
        personality={[personalities[index].name, personalities[index + 1].name]}
        // image={[personalities[index].name, personalities[index + 1].name]}
        onPress={(personalityId, input) =>
          this.handleClick(personalityId, input)}
      />
    );
  }

  /**
   * Render a text component containing the progress of the
   * steps in this view
   * Example: (1/4, 2/4)
   * @returns {XML}
   */
  renderProgress() {
    if (!this.props.personalities.data) {
      return null;
    }

    return (
      <Text
        style={{
          fontFamily: 'NunitoSans-Bold',
          fontSize: 20,
          color: '#efebe9',
        }}
      >
        {this.state.index / 2 + 1}/{this.props.personalities.data.length / 2}
      </Text>
    );
  }

  /**
   * Render the component
   * @returns {XML}
   */
  render() {
    return (
      <View>
        <ViewContainer>
          <ProgressBar steps={3} />
          <Padding style={{ flex: 1 }}>
            <Title>PERSONALITY</Title>
            <SubTitle>
              {this.renderProgress()}
              <Text
                style={{
                  fontFamily: 'NunitoSans-Regular',
                  fontSize: 20,
                  color: '#efebe9',
                }}
              >
                Lifestyle
              </Text>
            </SubTitle>
            <Text
              style={{
                fontFamily: 'NunitoSans-Light',
                fontSize: 16,
                color: '#efebe9',
              }}
            >
              Are you more..
            </Text>
            {this.renderTwoPersonalities()}
          </Padding>
        </ViewContainer>
      </View>
    );
  }
}

const PersonalityText = styled.Text`
  margin-top: 15;
  margin-bottom: 15;
  font-size: 16;
  color: #efebe9;
  font-family: 'NunitoSans-Light';
`;

const Title = styled.Text`
  margin-top: 50;
  font-size: 40;
  font-family: 'Friendship_version_2';
  color: #faf5f0;
`;

const SubTitle = styled.View`
  margin-top: 10;
  margin-bottom: 10;
  display: flex;
  flex-direction: row;
`;

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: validate,
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.onSubmitSucceeded);
  },
})(connect(mapStateToProps, mapDispatchToProps)(SignUpPersonality));
