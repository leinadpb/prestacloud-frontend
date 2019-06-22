import styled from 'styled-components';
import BackIcon from '@material-ui/icons/ArrowBack';
import LockIconMui from '@material-ui/icons/Lock';
import PersonIconMui from '@material-ui/icons/Person';
import CircularProgressMui from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageWrapper = styled.div`
  width: 70vw;
  height: 70vh;
  min-height: 545px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.4);
  margin: auto;
  display: grid;
  grid-template-columns: 40% 60%;
  overflow: hidden !important;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 100%;
    width: 100vw !important;
    height: 100vh !important;
    border-radius: 0;
  }
`;

export const SignInWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #223944;
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

export const BackgroundLeft = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  background: #223944; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    92deg,
    #223944,
    #335666
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    92deg,
    #223944,
    #335666
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const ContentLeft = styled.div`
  width: 80%;
  height: 80%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -48px;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  height: 120px;
  text-align: center;
  & > img {
    height: 100px;
    width: 100px;
    background-position: cover;
    filter: brightness(0) invert(1);
  }
`;

export const TitleWrapper = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 16px;
  text-align: center;
  & > h2 {
    font-size: 2.0em;
    color: white;
    text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.25);
  }
  @media only screen and (max-width: 904px) {
    & > span {
      font-size: 1.5em;
    }
  }
`;

export const Circles = styled.ul`
  position: absolute;
  margin: 0px;
  padding: 0px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }
  li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }
  li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }
  li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }
  li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }
  li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }
  li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }
    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
`;

export const Obj = styled.li`
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
`;

export const BackgroundRight = styled.div`
  width: 100%;
  height: 100%;
  background: #ece9e6;
  position: relative;
  background: -webkit-linear-gradient(to left, #ffffff, #ece9e6);
  background: linear-gradient(to left, #ffffff, #ece9e6);
`;

export const ContentRight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const NavBar = styled.div`
  width: 100%;
  height: 100px;
  margin: 0 auto;
  background: transparent;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
`;

export const LightButton = styled(Button)`
  margin: 0 20px !important;
  border-bottom: 5px solid
    ${props => (props.active === true ? '#3c6477' : 'transparent')} !important;
  border-radius: 0px !important;
  transition: 1s;
`;

export const NavbarBackIcon = styled(BackIcon)`
  color: #223944;
  cursor: pointer;
  transition: 0.8s;
  font-size: 2em !important;
  margin-top: 16px;
  &:hover {
    transform: translateX(-2px);
  }
`;

export const NavbarButton = styled.button`
  padding: 8px 16px;
  color: white;
  background-color: #223944;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 4px 0px rgb(0, 0, 0, 0.1);
  font-size: 1.05em;
  cursor: pointer;
  transition: 0.65s;
  &:hover {
    color: white;
    background-color: #3c6477;
  }
`;

export const ContentRightTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  & > span {
    font-size: 1.5em;
    color: #223944;
  }
`;

export const FormWrapper = styled.div`
  height: auto;
  animation: slide-in 0.45s ease-in-out 0s;
  background-color: white;
  width: 80%;
  padding: 64px;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.1);
  border-radius: 8px;

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateX(200px) rotateY(62deg);
      box-shadow: -320px 120px 42px 16px rgb(0, 0, 0, 0.1);
    }
    50% {
      box-shadow: 0px 80px 42px 16px rgb(0, 0, 0, 0.1);
    }
    100% {
      opacity: 1;
      transform: translateX(0px) rotateX(0deg);
      box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.1);
    }
  }
`;

export const FormWrapperTitle = styled.div`
  text-align: center;
  & > h1 {
    font-weight: 600;
    font-size: 1.15em;
  }
  & > span {
    font-weight: 200;
    font-size: 0.9em;
    color: darkred;
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

export const Input = styled.div`
  width: 100%;
  position: relative;
`;

export const UsernameInput = styled.input`
  padding: 8px;
  border-top: none;
  border-left: none;
  border-right: none;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 1.05em;
  margin-bottom: 32px;
  text-indent: 34px;
  border-bottom-color: ${props => props.loginError && 'darkred'};
  &:focus {
    box-shadow: none;
    outline: none;
    outline-offset: none;
    border-bottom-color: #223944;
  }
  &::placeholder {
    font-style: italic;
    font-size: 1em;
  }
`;

export const PasswordInput = styled.input`
  padding: 8px;
  border-top: none;
  border-left: none;
  border-right: none;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 1.05em;
  margin-bottom: 16px;
  text-indent: 34px;
  border-bottom-color: ${props => props.loginError && 'darkred'};
  &:focus {
    box-shadow: none;
    outline: none;
    outline-offset: none;
    border-bottom-color: #223944;
  }
  &::placeholder {
    font-style: italic;
    font-size: 1em;
  }
`;

export const PersonIcon = styled(PersonIconMui)`
  color: ${props => (props.isFocused ? '#223944' : '#999999')};
  position: absolute;
  top: 8px;
  left: 7px;
`;

export const LockIcon = styled(LockIconMui)`
  color: ${props => (props.isFocused ? '#223944' : '#999999')};
  position: absolute;
  top: 8px;
  left: 7px;
`;

export const ActionLinks = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const ContentRightFooter = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  & > span {
    font-size: 0.9em;
    color: #837363;
  }
`;

export const SubmitButton = styled.button`
  padding: 8px 16px;
  width: calc(100% - 20px);
  color: white;
  background-color: #00b33c;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 4px 0px rgb(0, 0, 0, 0.1);
  font-size: 1.05em;
  cursor: pointer;
  transition: 0.65s;
  position: relative;
  margin-top: 48px;
  box-shadow: 0px 0px 4px 0px rgb(0, 0, 0, 0.1);
  font-weight: 600;
  &:hover {
    color: white;
    background-color: #223944;
  }
`;

export const SubmitArrow = styled(BackIcon)`
  transform: rotate(180deg);
  color: white;
  position: absolute;
  top: calc(50% - 12px);
  right: 8px;
`;

export const CircularProgress = styled(CircularProgressMui)`
  position: absolute;
  right: 12px;
  color: white !important;
  width: 16px !important;
  height: 16px !important;
  top: calc(50% - 12px);
`;
