import React from 'react';
import {
  FormWrapper,
  FormWrapperTitle,
  InputsWrapper,
  Input,
  UsernameInput,
  PasswordInput,
  PersonIcon,
  LockIcon,
  SubmitArrow,
  CircularProgress,
  EmailIcon,
  TermsOfUse,
  SubmitButton,
} from './styles/sign_up_styles';

class SignUpForm extends React.Component {
  state = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    isUsernameFocused: false,
    isPasswordFocused: false,
    isFullnameFocused: true,
    isEmailFocused: false,
    loading: false,
  };

  focusElement = (e) => {
    let usrFocus = false;
    let pasFocus = false;
    let nameFocus = false;
    let emailFocus = false;
    if (e.target.id === 'username') {
      usrFocus = true;
      // document.getElementById('username').focus();
      document.getElementById('password').blur();
      document.getElementById('fullname').blur();
      document.getElementById('email').blur();
    } else if (e.target.id === 'password') {
      pasFocus = true;
      document.getElementById('password').focus();
      // document.getElementById('username').blur();
      document.getElementById('fullname').blur();
      document.getElementById('email').blur();
    } else if (e.target.id === 'fullname') {
      nameFocus = true;
      document.getElementById('fullname').focus();
      // document.getElementById('username').blur();
      document.getElementById('password').blur();
      document.getElementById('email').blur();
    } else if (e.target.id === 'email') {
      emailFocus = true;
      document.getElementById('email').focus();
      // document.getElementById('username').blur();
      document.getElementById('password').blur();
      document.getElementById('fullname').blur();
    }
    this.setState({
      isUsernameFocused: usrFocus,
      isPasswordFocused: pasFocus,
      isFullnameFocused: nameFocus,
      isEmailFocused: emailFocus,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 3000);
      },
    );
  };

  render() {
    const {
      isFullnameFocused,
      isUsernameFocused,
      isPasswordFocused,
      isEmailFocused,
      loading,
    } = this.state;
    return (
      <FormWrapper>
        <FormWrapperTitle>
          <span>Create an account</span>
        </FormWrapperTitle>
        <InputsWrapper>
          <Input>
            <PersonIcon isFocused={isFullnameFocused} />
            <UsernameInput
              id="fullname"
              isFocused={isFullnameFocused}
              placeholder="Your full name"
              type="text"
              autoFocus
              onChange={this.handleChange}
              onFocus={this.focusElement}
            />
          </Input>
          {/* <Input>
            <PersonIcon isFocused={isUsernameFocused} />
            <UsernameInput id="username" isFocused={isUsernameFocused} placeholder="Your username" type="text" onChange={this.handleChange} onFocus={this.focusElement} />
          </Input> */}
          <Input>
            <EmailIcon isFocused={isEmailFocused} />
            <UsernameInput
              id="email"
              isFocused={isEmailFocused}
              placeholder="Your email"
              type="email"
              onChange={this.handleChange}
              onFocus={this.focusElement}
            />
          </Input>
          <Input>
            <LockIcon isFocused={isPasswordFocused} />
            <PasswordInput
              id="password"
              isFocused={isPasswordFocused}
              placeholder="Your password"
              type="password"
              onChange={this.handleChange}
              onFocus={this.focusElement}
            />
          </Input>
          <SubmitButton style={{ width: '100%' }} onClick={this.handleSubmit}>
            Register
            {loading ? <CircularProgress /> : <SubmitArrow />}
          </SubmitButton>
          <TermsOfUse>
            <span>
              By clicking &quot;Register&quot; you accept our terms and
              conditions.
            </span>
          </TermsOfUse>
        </InputsWrapper>
      </FormWrapper>
    );
  }
}

export default SignUpForm;
