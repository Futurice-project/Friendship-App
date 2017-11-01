import React from 'react';
import { View, Text } from 'react-native';
import data from '../../../assets/misc/municipalities.json';
import MultiSelect from 'react-native-multiple-select';
class DropdownList extends React.Component {
  state = {
    selectedItems: [],
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
  items = [
    {
      id: '92iijs7yta',
      name: 'Ondo',
    },
    {
      id: 'a0s0a8ssbsd',
      name: 'Ogun',
    },
    {
      id: '16hbajsabsd',
      name: 'Calabar',
    },
    {
      id: 'nahs75a5sg',
      name: 'Lagos',
    },
    {
      id: '667atsas',
      name: 'Maiduguri',
    },
    {
      id: 'hsyasajs',
      name: 'Anambra',
    },
    {
      id: 'djsjudksjd',
      name: 'Benue',
    },
    {
      id: 'sdhyaysdj',
      name: 'Kaduna',
    },
    {
      id: 'suudydjsjd',
      name: 'Abuja',
    },
  ];
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
          selectText="Region*"
          searchInputPlaceholderText="Search municipalities..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          searchInputStyle={{ color: '#fff' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
        <View>
          <Text>{this.state.selectedItems}</Text>
        </View>
      </View>
    );
  }
}
export default DropdownList;
