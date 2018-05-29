import React from 'react';
import { StackNavigator } from 'react-navigation';
// ## View Imports ##
import Tabs from './Tabs';
import WelcomeView from '../views/WelcomeView';
import SignInView from '../views/SignIn/SignInView';
import ChatView from '../views/Chat/ChatView';
import ChatRequest from '../views/Chat/ChatRequest';
import UsersForTagView from '../views/UsersForTagView';
import EventDetailView from '../views/EventDetailView';
import EventCreateView from '../views/EventCreateView';
import EventEditView from '../views/EventEditView';
import Report from '../views/Report/Report';
import Feedback from '../views/Feedback/Feedback';
import Signup from '../views/SignUp/Signup';
import PeopleProfileView from '../views/PeopleProfileView';
import MyProfileView from '../views/MyProfileView';
import HeaderContainer from '../HeaderContainer/HeaderContainer';
import UpdateUserInformationScreen from '../views/UpdateUserInformationScreen';
import EditForm from '../../components/Profile/EditForm';
import CardStackStyleInterpolator from 'react-navigation/lib-rn/views/CardStackStyleInterpolator';

const StackNavigatorConfig = {
  transitionConfig: () => ({
    screenInterpolator: screenProps => {
      // Disable the transition animation when resetting to the welcome screen.
      if (
        screenProps.index === 0 &&
        screenProps.scene.route.routeName !== 'Welcome' &&
        screenProps.scenes.length > 2
      ) {
        return null;
      }
      // Otherwise, use the usual horizontal animation.
      return CardStackStyleInterpolator.forHorizontal(screenProps);
    },
  }),
};

//props => (<Header title='Welcome' {...props}/>)
export default StackNavigator(
  {
    Welcome: {
      screen: WelcomeView,
      navigationOptions: { header: null },
    },
    EditUserProfile: {
      screen: UpdateUserInformationScreen,
      navigationOptions: {
        header: props => <HeaderContainer left="back" {...props} />,
      },
    },
    EditForm: {
      screen: EditForm,
      navigationOptions: {
        header: props => (
          <HeaderContainer
            left="cancel"
            right="edit-more"
            color="light"
            {...props}
          />
        ),
      },
    },
    SignUp: {
      screen: Signup,
      navigationOptions: {
        // header: props => (
        //   <HeaderContainer left="cancel" color="light" {...props} />
        // ),
        header: null,
      },
    },
    Tabs: {
      screen: Tabs,
      navigationOptions: { header: null },
    },
    UsersForTag: {
      screen: UsersForTagView,
      navigationOptions: {
        header: props => (
          <HeaderContainer left="white-back" color="light" {...props} />
        ),
      },
    },
    SignIn: {
      screen: SignInView,
      navigationOptions: {
        header: props => (
          <HeaderContainer left="cancel" right="join" {...props} />
        ),
      },
    },
    ChatView: {
      screen: ChatView,
    },
    ChatRequest: {
      screen: ChatRequest,
      navigationOptions: { header: null },
    },
    EventDetailView: {
      screen: EventDetailView,
      navigationOptions: { header: null },
    },
    EventCreateView: {
      screen: EventCreateView,
      navigationOptions: { header: null },
    },
    EventEditView: {
      screen: EventEditView,
      navigationOptions: { header: null },
    },
    Report: {
      screen: Report,
      navigationOptions: { header: null },
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: { header: null },
    },
    PeopleProfileView: {
      screen: PeopleProfileView,
      navigationOptions: { header: null },
    },
    MyProfileView: {
      screen: MyProfileView,
      navigationOptions: { header: null },
    },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
