import styled from 'styled-components';
import BackIcon from '@material-ui/icons/ArrowBack';
import LockIconMui from '@material-ui/icons/Lock';
import PersonIconMui from '@material-ui/icons/Person';
import EmailIconMui from '@material-ui/icons/Email';
import CircularProgressMui from '@material-ui/core/CircularProgress';

export const FormWrapper = styled.div`
  width: 85%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.1);
  animation: slide-in 0.45s ease-in-out 0s;

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
  padding: 16px;
  margin-top: 32px;
  & > span {
    font-weight: 600;
    font-size: 1.35em;
  }
`;

export const InputsWrapper = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const EmailIcon = styled(EmailIconMui)`
  color: ${props => (props.isFocused ? '#223944' : '#999999')};
  position: absolute;
  top: 8px;
  left: 7px;
`;

export const SubmitButton = styled.button`
  padding: 8px 16px;
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
  width: calc(100% - 20px);
  &:hover {
    color: white;
    background-color: #223944;
  }
`;

export const TermsOfUse = styled.div`
  width: 90%;
  padding: 16px;
  margin-top: 16px;
  text-align: center;
  & > span {
    font-size: 0.9em;
    color: #8c8c8c;
  }
`;

export const SubmitArrow = styled(BackIcon)`
  transform: rotate(180deg);
  color: white;
  position: absolute;
  top: 18%;
  right: 8px;
  top: calc(50% - 12px);
`;

export const CircularProgress = styled(CircularProgressMui)`
  position: absolute;
  top: 20%;
  right: 12px;
  color: white !important;
  width: 16px !important;
  height: 16px !important;
  top: calc(50% - 12px);
`;
