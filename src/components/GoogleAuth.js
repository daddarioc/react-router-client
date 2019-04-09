import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '984130497676-fg4a1485uod0qp609402bebabhigm0s6.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          console.log(`in GoogleAuth, this.auth:`);
          console.log(this.auth);
          this.onAuthChange(this.auth.isSignedIn.get());
          //old component level state mgmt, replaced by above
          //this.setState({ isSignedIn: this.auth.isSignedIn.get() });

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    console.log(`in onAuthChange, isSignedIn local: ${isSignedIn}`);
    console.log(
      `in onAuthChange, auth.isSignedIn: ${JSON.stringify(
        this.auth.isSignedIn.get()
      )}`
    );

    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
    //non-redux component level version
    //this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className='ui red google button' onClick={this.onSignOutClick}>
          <i className='google icon' />
          Sign out
        </button>
      );
    } else {
      return (
        <button className='ui red google button' onClick={this.onSignInClick}>
          <i className='google icon' />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
