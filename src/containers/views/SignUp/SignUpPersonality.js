import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import rest from '../../../utils/rest';
import TwoPersonalities from '../../../components/SignUp/TwoPersonalities';
import validate from '../../../components/SignUp/validate';
import { Field, reduxForm, submit } from 'redux-form';
import { PERSONALITIES } from '../../../components/SignUp/Constants';
import SignupHeader from '../../../components/SignUp/SignupHeader';
import {
  Container,
  LabelText,
  Part,
} from '../../../components/Layout/SignupLayout';

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
      <View
        style={{ display: 'flex', height: '100%', flexDirection: 'column' }}
      >
        <SignupHeader
          processStage={PERSONALITIES}
          headerTitle={'PERSONALITY'}
          backgroundStyle={'darkblue'}
        />
        <Container style={{ flex: 1 }}>
          <Part style={{ flex: 1, backgroundColor: '#2a343c' }}>
            <LabelText
              style={{ marginTop: 21, marginLeft: 30, marginRight: 30 }}
            >
              {this.renderProgress()}
              <Text
                style={{
                  fontFamily: 'NunitoSans-Regular',
                  fontSize: 20,
                  color: '#efebe9',
                }}
              >
                {' '}
                Lifestyle
              </Text>
            </LabelText>
          </Part>
          <Part style={{ flex: 15, backgroundColor: '#2a343c' }}>
            <Text
              style={{
                fontFamily: 'NunitoSans-Light',
                fontSize: 16,
                color: '#efebe9',
                marginTop: 21,
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 30,
              }}
            >
              Are you more ...
            </Text>
            {this.renderTwoPersonalities()}
          </Part>
        </Container>
      </View>
    );
  }
}

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: validate,
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.onSubmitSucceeded);
  },
})(connect(mapStateToProps, mapDispatchToProps)(SignUpPersonality));
