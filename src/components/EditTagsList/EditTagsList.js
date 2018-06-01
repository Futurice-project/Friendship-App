import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rest from '../../utils/rest';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Tags from '../Tags';
import { connect } from 'react-redux';
import { paddings } from '../../styles';

const mapStateToProps = state => ({
  activities: state.activities,
  interests: state.interests,
});

const mapDispatchToProps = dispatch => ({
  getActivities: () => dispatch(rest.actions.activities()),
  getInterests: () => dispatch(rest.actions.interests()),
});

class EditTagsList extends Component {
  componentWillMount() {
    this.props.getActivities();
    this.props.getInterests();
  }

  isTagSelected = tagToLookFor => {
    const { selectedYeahs, selectedNahs } = this.props;
    for (let index = 0; index < selectedYeahs.length; index++) {
      if (selectedYeahs[index] === tagToLookFor.id) {
        return 1;
      }
    }

    for (let index = 0; index < selectedNahs.length; index++) {
      if (selectedNahs[index] === tagToLookFor.id) {
        return -1;
      }
    }

    return 0;
  };

  render() {
    const { activities, interests } = this.props;

    if (
      activities.loading ||
      !activities.sync ||
      interests.loading ||
      !interests.sync
    ) {
      return <ActivityIndicator />;
    }

    /*<View>
      {activities.data.map(tag => {
        return <Tags key={tag.id} data={tag}/>
      })}
    </View>*/

    return (
      <ScrollView
        style={{
          width: '100%',
          marginBottom: paddings.SM,
          marginTop: 60,
        }}
      >
        <Text style={styles.tagCategoriesLove}>ACTIVITIES</Text>
        <View style={styles.tagList}>
          {activities.data.map(tag => (
            <Tags
              key={tag.id}
              data={tag}
              edit
              selected={this.isTagSelected(tag)}
              updateTags={this.props.updateTags}
              style={{ marginRight: paddings.XL }}
            />
          ))}
        </View>
        <Text style={styles.tagCategoriesHate}>INTERESTS</Text>
        <View style={styles.tagList}>
          {interests.data.map(tag => (
            <Tags
              key={tag.id}
              data={tag}
              edit
              dark
              selected={this.isTagSelected(tag)}
              updateTags={this.props.updateTags}
              style={{ marginRight: paddings.XL }}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

EditTagsList.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditTagsList);

const styles = StyleSheet.create({
  tagList: {
    marginVertical: 15,
    marginHorizontal: 22,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'NunitoSans-Bold',
  },
  tagCategoriesLove: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: '#ff8a65',
    fontSize: 13,
  },
  tagCategoriesHate: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: '#6eb1ea',
    fontSize: 13,
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
  },
  tabLabel: {
    fontFamily: 'Friendship_version_2',
    fontSize: 30,
    letterSpacing: 3,
  },
  ButtonOption: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
});
