import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';
import { Routes } from '../../../Constants';
import {
  BackgroundLeft,
  BackgroundRight,
  PageWrapper,
  ContentLeft,
  LogoWrapper,
  TitleWrapper,
  ContentRight,
  NavBar,
  NavbarBackIcon,
  NavbarButton,
  ContentRightTitle,
  FormWrapper,
  ActionLinks,
  ContentRightFooter,
  FormWrapperTitle,
  InputsWrapper,
  PasswordInput,
  UsernameInput,
  SubmitButton,
  SubmitArrow,
  PersonIcon,
  Input,
  LockIcon,
  CircularProgress,
  Circles,
  Obj,
  SignInWrapper,
  LightButton,
} from './styles/sign_in_styles';
import { SignUpForm } from './sign-up-form';
import { withCookies } from 'react-cookie';

class SignInPage extends React.Component {
  state = {
    username: '',
    password: '',
    isUsernameFocused: true,
    isPasswordFocused: false,
    loading: false,
    showSignUpForm: false,
    loginError: false,
  };

  focusElement = (e) => {
    let usrFocus = false;
    let pasFocus = false;
    if (e.target.id === 'username') {
      usrFocus = true;
      document.getElementById('username').focus();
      document.getElementById('password').blur();
    } else if (e.target.id === 'password') {
      pasFocus = true;
      document.getElementById('password').focus();
      document.getElementById('username').blur();
    }
    this.setState({
      isUsernameFocused: usrFocus,
      isPasswordFocused: pasFocus,
    });
  };

  handleSubmit = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        const { cookies, history } = this.props;
        const { username, password } = this.state;
        const data = {
          user: {
            email: username,
            password: password
          }
        };
        axios.post(`${ApiServer}/users/login`, data).then(
          (data) => {
            const token = data.headers['authorization'];
            if (!!token) {
              cookies.set('token', token);
            
              this.setState(
                {
                  loading: false,
                  loginError: false,
                },
                () => {
                  this.props.handleSignIn(data.data);
                  setTimeout(() => {
                    this.props.history.push(Routes.homePage);
                  }, 1000);
                },
              );
            }
          },
          (err) => {
            // Set invalid inputs states
            this.setState({
              loading: false,
              loginError: true,
            });
          },
        );
      },
    );
  };

  showSignUpForm = (value) => {
    this.setState({
      showSignUpForm: value,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const {
      isUsernameFocused,
      isPasswordFocused,
      loading,
      showSignUpForm,
      loginError,
    } = this.state;
    return (
      <SignInWrapper>
        <PageWrapper>
          <BackgroundLeft>
            <ContentLeft>
              <div>
                <LogoWrapper>
                  <img
                    src="/images/logotype.png"
                    alt="PrestaCloud, Inc"
                  />
                </LogoWrapper>
                <TitleWrapper>
                  <h2>Presta Cloud</h2>
                </TitleWrapper>
              </div>
            </ContentLeft>
            <Circles>
              <Obj />
              <Obj />
              <Obj />
              <Obj />
              <Obj />
              <Obj />
              <Obj />
              <Obj />
              <Obj />
              <Obj />
            </Circles>
          </BackgroundLeft>
          <BackgroundRight>
            <ContentRight>
              <NavBar>
                <LightButton
                  active={!showSignUpForm}
                  onClick={() => this.showSignUpForm(false)}
                >
                  Login
                </LightButton>
                
              </NavBar>
              {showSignUpForm ? (
                <SignUpForm />
              ) : (
                <FormWrapper>
                  <FormWrapperTitle>
                    {loginError ? (
                      <>
                        <span>
                          Ups! Your username or password is wrong. Please, try
                          again
                        </span>
                      </>
                    ) : null}
                  </FormWrapperTitle>
                  <InputsWrapper>
                    <Input>
                      <PersonIcon
                        loginError={loginError}
                        isFocused={isUsernameFocused}
                      />
                      <UsernameInput
                        loginError={loginError}
                        id="username"
                        isFocused={isUsernameFocused}
                        placeholder="Your username"
                        type="text"
                        autoFocus
                        onChange={this.handleChange}
                        onFocus={this.focusElement}
                      />
                    </Input>
                    <Input>
                      <LockIcon
                        loginError={loginError}
                        isFocused={isPasswordFocused}
                      />
                      <PasswordInput
                        loginError={loginError}
                        id="password"
                        isFocused={isPasswordFocused}
                        placeholder="Your password"
                        type="password"
                        onChange={this.handleChange}
                        onFocus={this.focusElement}
                      />
                    </Input>
                    <SubmitButton
                      style={{ width: '100%' }}
                      onClick={this.handleSubmit}
                    >
                      Login
                      {loading ? <CircularProgress /> : <SubmitArrow />}
                    </SubmitButton>
                  </InputsWrapper>
                </FormWrapper>
              )}
              <ActionLinks />
              <ContentRightFooter>
                <span>
                  Copyright &copy; 2019 PrestaCloud, Inc. All rights
                  reserved.
                </span>
              </ContentRightFooter>
            </ContentRight>
          </BackgroundRight>
        </PageWrapper>
      </SignInWrapper>
    );
  }
}

export default withRouter(withCookies(SignInPage));
