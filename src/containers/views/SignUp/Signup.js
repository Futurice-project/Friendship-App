import React from 'react';
import UserInformation from './UserInformation';
import Locations from './Locations';
import Personalities from './Personalities';
import LoveAndHate from './LoveAndHate';
import MatchingAgreement from './MatchingAgreement';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }

  nextPage(page) {
    console.log('Changing page ...');
    this.setState({ page: page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    switch (this.state.page) {
      case 1:
        return (
          <UserInformation
            onSubmitSucceeded={() => this.nextPage(this.state.page)}
          />
        );
      case 2:
        return (
          <Locations
            previousPage={this.previousPage}
            onSubmitSucceeded={() => this.nextPage(this.state.page)}
          />
        );
      case 3:
        return (
          <Personalities
            onSubmitSucceeded={() => this.nextPage(this.state.page)}
          />
        );
      case 4:
        return (
          <LoveAndHate
            onSubmitSucceeded={() => this.nextPage(this.state.page)}
          />
        );
      case 5:
        return <MatchingAgreement />;
    }
  }
}

export default Signup;
