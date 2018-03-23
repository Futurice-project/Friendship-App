import React from 'react';
import rest from '../../../utils/rest';
import { Text } from '../../../components/Layout/TextLayout';
import {
  Centered,
  Padding,
  ViewContainer,
} from '../../../components/Layout/Layout';
import YeahAndNaah from '../../../components/SignUp/YeahAndNaah';
import styled from 'styled-components/native';
import { View } from 'react-native';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import RoundTab from '../../../components/RoundTab';
import { connect } from 'react-redux';
import { INTERESTS } from '../../../components/SignUp/Constants';
import { Field, reduxForm } from 'redux-form';
import YeahAndNaahList from '../../../components/SignUp/YeahAndNaahList';
import validate from '../../../components/SignUp/validate';

const mapStateToProps = state => ({
  yeahs: state.yeahs,
  nahs: state.nahs,
});

const mapDispatchToProps = dispatch => ({
  getYeahs: () => {
    dispatch(rest.actions.yeahs()).catch(err => console.log(err));
  },
  getNahs: () => {
    dispatch(rest.actions.nahs()).catch(err => console.log(err));
  },
});

export class SignUpLoveAndHate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      selectedYeahs: [],
      selectedNahs: [],
      category: 1,
    };
  }

  componentWillMount() {
    this.props.getYeahs();
    this.props.getNahs();
  }

  renderFiveLoveAndHateActivities = () => {
    if (!this.props.yeahs.data.data) {
      return;
    }

    let activities = [];

    console.log(this.state.index);
    console.log(this.props.yeahs.data.data.length);

    for (
      let i = this.state.index;
      i <= this.props.yeahs.data.data.length - 1 && i < this.state.index + 5;
      i++
    ) {
      activities.push(
        <YeahAndNaah
          key={this.props.yeahs.data.data[i].id}
          activityName={this.props.yeahs.data.data[i].name}
          activityId={this.props.yeahs.data.data[i].id}
        />,
      );
    }

    return <Activities>{activities}</Activities>;
  };

  renderPage() {
    if (!this.props.yeahs.data.data) {
      return;
    }

    const yeahsAndNaahs =
      this.state.category === 1
        ? this.props.yeahs.data.data
        : this.props.nahs.data.data;
    let array = [];

    for (
      let i = this.state.index;
      i <= yeahsAndNaahs.length - 1 && i < this.state.index + 5;
      i++
    ) {
      array.push(
        <YeahAndNaah
          key={yeahsAndNaahs[i].id}
          activityName={yeahsAndNaahs[i].name}
          activityId={yeahsAndNaahs[i].id}
        />,
      );
    }

    return (
      <Field name={'yeahsAndNaahs'} component={YeahAndNaahList} list={array} />
    );
  }

  renderTitle() {
    return this.state.category + '/2 Activities';
  }

  handleClick = () => {
    switch (this.state.category) {
      case 1:
        if (this.state.index + 5 <= this.props.yeahs.data.data.length - 1) {
          console.log('Continuing cat 1');
          this.setState(prevState => ({ index: prevState.index + 5 }));
        } else {
          console.log('Changing cat');
          this.setState(prevState => ({
            index: 0,
            category: prevState.category + 1,
          }));
        }
        break;
      case 2:
        if (this.state.index + 5 <= this.props.nahs.data.data.length - 1) {
          console.log('Continuing cat 2');
          this.setState(prevState => ({ index: prevState.index + 5 }));
        } else {
          console.log('Submit');
        }
        break;
      default:
        console.log('DEFAULT ...');
    }
  };

  render() {
    return (
      <View>
        <ViewContainer>
          <ProgressBar steps={INTERESTS} />
          <Padding>
            <View style={{ flexDirection: 'row' }}>
              <Title style={{ color: '#ff8a65' }}>YEAH </Title>
              <Title>&</Title>
              <Title style={{ color: '#99ccff' }}> NAAH</Title>
            </View>
            <SubTitle>
              <Text
                style={{
                  fontFamily: 'NunitoSans-Regular',
                  fontSize: 20,
                  color: '#efebe9',
                }}
              >
                {this.renderTitle()}
              </Text>
            </SubTitle>
          </Padding>
          <Padding
            style={{
              flex: 1,
              paddingTop: -16,
              paddingLeft: -16,
              paddingRight: -16,
            }}
          >
            {this.renderPage()}
          </Padding>
          <RoundTab
            title="NEXT"
            tint="#faf5f0"
            onPress={() => this.handleClick()}
          />
        </ViewContainer>
      </View>
    );
  }
}

const SubTitle = styled.View`
  margin-top: 10;
  margin-bottom: 10;
  display: flex;
  flex-direction: row;
`;

const Title = styled.Text`
  margin-top: 50;
  font-size: 40;
  fontFamily: 'Friendship_version_2';
  color: #faf5f0;
`;

const Activities = styled.View`
  align-items: center;
  justify-content: center;
`;

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: validate,
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.onSubmitSucceeded);
  },
})(connect(mapStateToProps, mapDispatchToProps)(SignUpLoveAndHate));
