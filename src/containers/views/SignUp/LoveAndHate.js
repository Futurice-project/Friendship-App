import React from 'react';
import rest from '../../../utils/rest';
import { Text } from '../../../components/Layout/TextLayout';
import { Padding, ViewContainer } from '../../../components/Layout/Layout';
import styled from 'styled-components/native';
import { ActivityIndicator, View } from 'react-native';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import RoundTab from '../../../components/RoundTab';
import { connect } from 'react-redux';
import { INTERESTS } from '../../../components/SignUp/ProgressSteps';
import { Field, reduxForm, submit } from 'redux-form';
import YeahAndNaahList from '../../../components/SignUp/YeahAndNaahList';
import { validateLoveAndHate } from '../../../state/validate';

const mapStateToProps = state => ({
  activities: state.activities,
  interests: state.interests,
});

const mapDispatchToProps = dispatch => ({
  getActivities: () => {
    dispatch(rest.actions.activities()).catch(err => console.log(err));
  },
  getInterests: () => {
    dispatch(rest.actions.interests()).catch(err => console.log(err));
  },
});

export class SignUpLoveAndHate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      page: 1,
      category: 1,
      selectedYeahs: [],
      selectedNahs: [],
    };
  }

  componentWillMount() {
    this.props.getActivities();
    this.props.getInterests();
  }

  updateYeahsAndNahs(state, input, actionType, tag) {
    let yeahs = this.state.selectedYeahs;
    let nahs = this.state.selectedNahs;

    switch (actionType) {
      case 'YEAH':
        yeahs.push(tag);
        break;
      case 'NAH':
        nahs.push(tag);
        break;
      default:
        let pos = yeahs.indexOf(tag);
        if (pos > -1) {
          yeahs.splice(pos, 1);
        } else {
          pos = nahs.indexOf(tag);
          nahs.splice(pos, 1);
        }
        break;
    }
    input.onChange({ yeahs, nahs });
    this.setState({ selectedYeahs: yeahs, selectedNahs: nahs });
  }

  renderPage() {
    let tags =
      this.state.category === 1
        ? this.props.activities.data
        : this.props.interests.data;
    tags = tags.slice(this.state.index, this.state.index + 4);

    return (
      <Field
        name={'yeahsAndNaahs'}
        component={YeahAndNaahList}
        tags={tags}
        updateYeahsAndNahs={(input, actionType, tag) =>
          this.updateYeahsAndNahs(this.state, input, actionType, tag)}
      />
    );
  }

  renderTitle() {
    return (
      this.state.page +
      '/ ' +
      this.getNumberOfPages() +
      (this.state.category === 1 ? ' Activities' : ' Interests')
    );
  }

  handleClick = () => {
    switch (this.state.category) {
      case 1:
        if (this.state.index + 5 <= this.props.activities.data.length - 1) {
          this.setState(prevState => ({
            index: prevState.index + 5,
            page: prevState.page + 1,
          }));
        } else {
          this.setState(prevState => ({
            index: 0,
            category: prevState.category + 1,
            page: 1,
          }));
        }
        break;
      case 2:
        if (this.state.index + 5 <= this.props.interests.data.length - 1) {
          this.setState(prevState => ({
            index: prevState.index + 5,
            page: prevState.page + 1,
          }));
        } else {
          this.props.dispatch(submit('signup'));
        }
        break;
      default:
        console.log('DEFAULT ...');
    }
  };

  render() {
    if (
      !this.props.activities.sync ||
      this.props.activities.loading ||
      !this.props.interests.sync ||
      this.props.interests.loading
    ) {
      return <ActivityIndicator />;
    }

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

  getNumberOfPages() {
    let nbOfPage;
    let remainder;
    switch (this.state.category) {
      case 1:
        remainder = this.props.activities.data.length % 5;
        nbOfPage = Math.floor(this.props.activities.data.length / 5);
        return remainder > 0 ? nbOfPage + 1 : nbOfPage;
      case 2:
        remainder = this.props.interests.data.length % 5;
        nbOfPage = Math.floor(this.props.interests.data.length / 5);
        return remainder > 0 ? nbOfPage + 1 : nbOfPage;
    }
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
  onSubmit: validateLoveAndHate,
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.onSubmitSucceeded);
  },
})(connect(mapStateToProps, mapDispatchToProps)(SignUpLoveAndHate));
