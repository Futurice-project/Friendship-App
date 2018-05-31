import React from 'react';
import MultiSelect from '../../utils/react-native-multiple-select/lib/react-native-multi-select';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

const mapStateToProps = state => ({
  locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
  getLocations: () => {
    dispatch(rest.actions.locations());
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

    if (
      !this.props.locations.data ||
      this.props.locations.syncing ||
      this.props.locations.loading ||
      !this.props.locations.sync
    ) {
      return <ActivityIndicator />;
    }

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
