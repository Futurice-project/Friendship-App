import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import Personality from '../SignUp/Personality';
import { colors, paddings } from '../../styles';
import EditTwoPersonalities from '../EditTwoPersonalities';

const mapStateToProps = state => ({
  personalities: state.personalities,
});

const mapDispatchToProps = dispatch => ({
  getPersonalities: () => dispatch(rest.actions.personalities()),
});

const renderItem = (item, updatePersonalities, selectedPersonalities) => {
  const pos = selectedPersonalities.indexOf(item.firstPersonality.id);
  return (
    <EditTwoPersonalities
      item={item}
      currentSelected={pos > -1 ? 'first' : 'second'}
      updatePersonalities={updatePersonalities}
    />
  );
};

const keyExtractor = (personality, index) => `personality-${index}`;

const prepareData = personalities => {
  let preparedData = [];
  for (let i = 0; i < personalities.length; i += 2) {
    preparedData.push({
      firstPersonality: personalities[i],
      secondPersonality: personalities[i + 1],
    });
  }
  return preparedData;
};

class EditPersonalitiesList extends Component {
  componentWillMount() {
    this.props.getPersonalities();
  }

  render() {
    const {
      personalities,
      updatePersonalities,
      selectedPersonalities,
    } = this.props;

    if (personalities.loading || !personalities.sync) {
      return <ActivityIndicator />;
    }

    const data = prepareData(personalities.data);

    return (
      <FlatList
        data={data}
        renderItem={({ item }) =>
          renderItem(item, updatePersonalities, selectedPersonalities)}
        keyExtractor={keyExtractor}
        style={{
          width: '100%',
          marginBottom: paddings.SM,
          marginTop: paddings.HEADER,
        }}
      />
    );
  }
}

EditPersonalitiesList.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditPersonalitiesList,
);
