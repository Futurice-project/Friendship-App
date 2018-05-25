import React, { Component } from 'react';
import Background from '../../../components/Background';
import Footer from '../../../components/Footer';
import { Text } from 'react-native';
import EditPersonalitiesScreen from '../EditPersonalitiesScreen';
import rest from '../../../utils/rest';
import { connect } from 'react-redux';
import EditYeahsAndNahsScreen from '../EditYeahsAndNahsScreen/EditYeahsAndNahsScreen';

const mapDispatchToProps = dispatch => ({
  updateUserPersonalities: credentials =>
    dispatch(
      rest.actions.updateUserPersonalities(
        {},
        { body: JSON.stringify({ ...credentials }) },
      ),
    ),
  updateUserTags: credentials =>
    dispatch(
      rest.actions.updateUserTags(
        {},
        { body: JSON.stringify({ ...credentials }) },
      ),
    ),
});

class UpdateUserInformationScreen extends Component {
  state = {
    selectedPersonalities: [],
    selectedYeahs: [],
    selectedNahs: [],
  };

  updatePersonalities = newSelectedPersonalities => {
    this.setState({ selectedPersonalities: newSelectedPersonalities });
  };

  updateTags = (newYeahs, newNahs) => {
    this.setState({ selectedYeahs: newYeahs, selectedNahs: newNahs });
  };

  render() {
    const { updateUserPersonalities, updateUserTags } = this.props;
    const { selectedPersonalities, selectedYeahs, selectedNahs } = this.state;

    let screen;
    let updateMethod;
    switch (this.props.navigation.state.params.updateScreen) {
      case 'personalities':
        screen = (
          <EditPersonalitiesScreen
            updatePersonalities={this.updatePersonalities}
            userId={this.props.navigation.state.params.userId}
          />
        );
        updateMethod = () => {
          updateUserPersonalities({
            userId: this.props.navigation.state.params.userId,
            personalities: selectedPersonalities,
          });
        };
        break;
      case 'tags':
        screen = (
          <EditYeahsAndNahsScreen
            updateTags={this.updateTags}
            userId={this.props.navigation.state.params.userId}
          />
        );
        updateMethod = () => {
          updateUserTags({
            yeahs: selectedYeahs,
            nahs: selectedNahs,
          });
        };
        break;
    }

    return (
      <Background>
        {screen}
        <Footer secondary onPress={updateMethod}>
          <Text>SAVE</Text>
        </Footer>
      </Background>
    );
  }
}

UpdateUserInformationScreen.propTypes = {};

export default connect(null, mapDispatchToProps)(UpdateUserInformationScreen);
