import { Centered } from '../Layout/Layout';
import React from 'react';
import styled from 'styled-components/native/index';
import YeahAndNaah from './Tag';

export default class YeahAndNaahList extends React.Component {
  render() {
    const { tags, updateYeahsAndNahs, input } = this.props;

    function renderList() {
      return tags.map(tag => (
        <YeahAndNaah
          key={tag.id}
          activityName={tag.name}
          activityId={tag.id}
          updateYeahsAndNahs={(tagType, tag) =>
            updateYeahsAndNahs(input, tagType, tag)}
        />
      ));
    }

    return (
      <Centered>
        <Activities>{renderList()}</Activities>
      </Centered>
    );
  }
}

const Activities = styled.View`
  align-items: center;
  justify-content: center;
`;
