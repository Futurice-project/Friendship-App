import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditPersonalitiesList from '../../../components/EditPersonalitiesList';
import rest from '../../../utils/rest';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  userPersonalities: state.personalitiesForUser,
});

const mapDispatchToProps = dispatch => ({
  getUserPersonalities: userId =>
    dispatch(rest.actions.personalitiesForUser.get({ userId })),
});

class EditPersonalitiesScreen extends Component {
  state = {
    selectedPersonalities: [],
  };

  componentWillMount() {
    const userId = this.props.userId;
    this.props
      .getUserPersonalities(userId)
      .then(data => this.prepareData(data));
  }

  prepareData = selectedPersonalities => {
    let data = [];
    selectedPersonalities.map(personality =>
      data.push(personality.personalityId),
    );
    this.props.updatePersonalities(data);
    this.setState({ selectedPersonalities: data });
  };

  updatePersonalities = (oldPersonality, newPersonality) => {
    let newSelectedPersonalities = this.state.selectedPersonalities;
    let pos = newSelectedPersonalities.indexOf(oldPersonality);
    if (pos > -1) {
      newSelectedPersonalities.splice(pos, 1, newPersonality);
    } else {
      newSelectedPersonalities.push(newPersonality);
    }
    newSelectedPersonalities.sort();
    this.props.updatePersonalities(newSelectedPersonalities);
    this.setState({ selectedPersonalities: newSelectedPersonalities });
  };

  render() {
    const { userPersonalities } = this.props;
    const { selectedPersonalities } = this.state;

    if (
      userPersonalities.loading ||
      !userPersonalities.sync ||
      !selectedPersonalities
    ) {
      return <ActivityIndicator />;
    }

    return (
      <EditPersonalitiesList
        updatePersonalities={this.updatePersonalities}
        selectedPersonalities={selectedPersonalities}
      />
    );
  }
}

EditPersonalitiesScreen.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditPersonalitiesScreen,
);
