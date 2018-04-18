import React from 'react';
import rest from '../../../utils/rest';
import { Text } from '../../../components/Layout/TextLayout';
import { Padding, ViewContainer } from '../../../components/Layout/Layout';
import styled from 'styled-components/native';
import { ActivityIndicator, View } from 'react-native';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import RoundTab from '../../../components/RoundTab';
import { connect } from 'react-redux';
import { INTERESTS } from '../../../components/SignUp/Constants';
import { Field, reduxForm, submit } from 'redux-form';
import YeahAndNaahList from '../../../components/SignUp/YeahAndNaahList';
import { validateLoveAndHate } from '../../../components/SignUp/validate';

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
      category: 1,
      selectedYeahs: [],
      selectedNahs: [],
    };
  }

  componentWillMount() {
    this.props.getYeahs();
    this.props.getNahs();
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
    this.setState({ yeahs, nahs });
  }

  renderPage() {
    let tags =
      this.state.category === 1 ? this.props.yeahs.data : this.props.nahs.data;
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
    return this.state.category + '/2 Activities';
  }

  handleClick = () => {
    switch (this.state.category) {
      case 1:
        if (this.state.index + 5 <= this.props.yeahs.data.length - 1) {
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
        if (this.state.index + 5 <= this.props.nahs.data.length - 1) {
          console.log('Continuing cat 2');
          this.setState(prevState => ({ index: prevState.index + 5 }));
        } else {
          console.log('Submit');
          this.props.dispatch(submit('signup'));
        }
        break;
      default:
        console.log('DEFAULT ...');
    }
  };

  render() {
    if (
      !this.props.yeahs.sync ||
      this.props.yeahs.loading ||
      !this.props.nahs.sync ||
      this.props.nahs.loading
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
