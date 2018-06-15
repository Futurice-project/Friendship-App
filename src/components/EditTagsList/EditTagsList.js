import React, { Component } from 'react';
import rest from '../../utils/rest';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { fonts, paddings } from '../../styles';
import Tag from '../SignUp/Tag';

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
            <Tag
              key={tag.id}
              activityId={tag.id}
              activityName={tag.name}
              edit
              selected={this.isTagSelected(tag)}
              updateYeahsAndNahs={this.props.updateTags}
            />
          ))}
        </View>
        <Text style={styles.tagCategoriesHate}>INTERESTS</Text>
        <View style={styles.tagList}>
          {interests.data.map(tag => (
            <Tag
              key={tag.id}
              activityId={tag.id}
              activityName={tag.name}
              edit
              dark
              selected={this.isTagSelected(tag)}
              updateYeahsAndNahs={this.props.updateTags}
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
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: fonts.BOLD,
  },
  tagCategoriesLove: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: fonts.REGULAR,
    color: '#ff8a65',
    fontSize: 20,
  },
  tagCategoriesHate: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: fonts.REGULAR,
    color: '#6eb1ea',
    fontSize: 20,
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
    fontFamily: fonts.title,
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
