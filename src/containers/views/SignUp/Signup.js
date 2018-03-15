import React from 'react';
import UserInformation from './UserInformation';
import SignUpPersonality from './SignUpPersonality';
import SignUpLocation from './SignUpLocation';
import SignUpYeahAndNaah from './SignUpYeahAndNaah';
import SignUpMatching from './SignUpMatching';
import rest from '../../../utils/rest';

const mapDispatchToProps = dispatch => ({
  getLocations: () => {
    dispatch(rest.actions.locations());
  },
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }

  nextPage(page) {
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
          <SignUpLocation
            onSubmitSucceeded={() => this.nextPage(this.state.page)}
          />
        );
      case 3:
        return (
          <SignUpPersonality
            onSubmitSucceeded={() => this.nextPage(this.state.page)}
          />
        );
      case 4:
        return (
          <SignUpYeahAndNaah
            onSubmitSucceeded={() => this.nextPage(this.state.page)}
          />
        );
      case 5:
        return <SignUpMatching />;
    }
  }
}

export default Signup;
