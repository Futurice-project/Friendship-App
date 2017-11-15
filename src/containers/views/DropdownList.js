import React from 'react';
import { View, Text } from 'react-native';
import data from '../../../assets/misc/municipalities.json';
import MultiSelect from '../../utils/react-native-multiple-select';
class DropdownList extends React.Component {
  state = {
    selectedItems: [],
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 100, width: 300 }} />
        <MultiSelect
          style={{ borderRadius: 27, backgroundColor: '#faf5f0' }}
          hideTags
          items={data}
          uniqueKey="id"
          ref={component => {
            multiSelect = component;
          }}
          hideSubmitButton={true}
          fixedHeight={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="REGION*"
          searchInputPlaceholderText="Search municipalities..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#fff"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          searchInputStyle={{ color: '#000' }}
        />
        <View>
          <Text>{this.state.selectedItems}</Text>
        </View>
      </View>
    );
  }
}
export default DropdownList;
