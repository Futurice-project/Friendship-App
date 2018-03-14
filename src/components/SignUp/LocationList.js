import React from 'react';
import MultiSelect from '../../utils/react-native-multiple-select/lib/react-native-multi-select';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
  getLocations: () => {
    dispatch(rest.actions.locations());
  },

  postUserLocations: locationsObject => {
    dispatch(
      rest.actions.createUserLocations(
        {},
        { body: JSON.stringify(locationsObject) },
      ),
    );
  },

  openSignUpPersonality: () => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpPersonality',
        params: { index: 0 },
      }),
    );
  },
});

class LocationList extends React.Component {
  initialState = {
    selectedLocations: [],
  };

  constructor(props) {
    super(props);
    this.state = this.props.input.value
      ? { selectedLocations: this.props.input.value }
      : this.initialState;
  }

  componentWillMount() {
    this.props.getLocations();
  }

  render() {
    const { input } = this.props;
    const { selectedLocations } = this.state;

    return (
      <MultiSelect
        hideTags
        items={this.props.locations.data}
        uniqueKey="id"
        hideSubmitButton={true}
        fixedHeight={true}
        onSelectedItemsChange={locations => {
          input.onChange(locations);
          this.setState({ selectedLocations: locations });
        }}
        selectedItems={selectedLocations}
        selectText="REGION*"
        searchInputPlaceholderText="Search municipalities..."
        selectedItemTextColor="#ff8a65"
        selectedItemIconColor="#ff8a65"
        title="YOUR LOCATION"
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
