import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Personality from '../SignUp/Personality';

class EditTwoPersonalities extends Component {
  componentWillMount() {
    this.setState({ selected: this.props.currentSelected === 'first' });
  }

  render() {
    const { item, updatePersonalities } = this.props;
    const { selected } = this.state;

    return (
      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Personality
          edit
          profile
          title={item.firstPersonality.name}
          image={item.firstPersonality.name}
          onPress={() => {
            if (!selected) {
              updatePersonalities(
                item.secondPersonality.id,
                item.firstPersonality.id,
              );
              this.setState(({ selected }) => ({ selected: !selected }));
            }
          }}
          selected={selected}
        />
        <Text>or</Text>
        <Personality
          edit
          profile
          title={item.secondPersonality.name}
          image={item.secondPersonality.name}
          onPress={() => {
            if (selected) {
              updatePersonalities(
                item.firstPersonality.id,
                item.secondPersonality.id,
              );
              this.setState(({ selected }) => ({ selected: !selected }));
            }
          }}
          selected={!selected}
        />
      </View>
    );
  }
}

EditTwoPersonalities.propTypes = {};

export default EditTwoPersonalities;
