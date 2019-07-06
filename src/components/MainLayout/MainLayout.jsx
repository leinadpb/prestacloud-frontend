import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: minmax(50px, 60px) auto;
  grid-template-areas: 
    "sidemenu topbar"
    "sidemenu content";
`;

const SideMenu = styled.div`
  grid-area: sidemenu;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.1);
  z-index: 1000;
`;

const TopBar = styled.div`
  grid-area: topbar;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
`;

const Content = styled.div`
  grid-area: content;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin-top: 64px;
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

const Title = styled.div`
  margin-top: 32px;
  color: white;
  width: 100%;
  text-align: center;
  & > h1 {
    font-weight: 600;
    font-size: 1.3rem;
  }
`;

const Links = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
`;

const Link = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 3px auto;
  margin-bottom: 16px;
  cursor: pointer;
`;

const LinkIndicator = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.active ? 'white' : '#223944'};
  margin-right: 8px;
`;

const LinkLabel = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 8px;
  & > h4 {
    color: #e2e2e2;
    font-size: 1.15rem;
  }
`;

const UserName = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 32px;
  & > span {
    font-style: italic;
  }
`;

class MainLayout extends React.Component {

  componentWillReceiveProps = (newProps) => {

    if (!!newProps && !!newProps.location && !!newProps.location.pathname) {
      this.selectActiveNavbarLink(newProps.location.pathname);
    }
  }

  selectActiveNavbarLink = (pathname) => {
    let menuLinks = [...this.props.menuLinks];

    menuLinks.forEach(link => {
      link.active = false;
    });

    if (window.location.href.includes(pathname)) {
      let navbarLink = menuLinks.filter(x => x.url === pathname)[0];
      
      if (!!navbarLink) {
        const idx = menuLinks.indexOf(navbarLink);

        menuLinks[idx].active = true;

        this.setState({
          menuLinks
        });
      }
    }
  }

  gotTolink = (link) => {
    this.props.history.push(link.url);
  }

  render() {
    return(
      <Wrapper>
        <SideMenu>
          <LogoWrapper>
            <img
              src="/images/logotype.png"
              alt="PrestaCloud, Inc"
            />
          </LogoWrapper>
          <Title>
            <h1>PrestaCloud System</h1>
          </Title>
          <Links>
            {
              this.props.menuLinks.map(link => (
                <Link onClick={() => this.gotTolink(link)}>
                  <LinkIndicator active={link.active} />
                  <LinkLabel>
                    <h4>{ link.label }</h4>
                  </LinkLabel>
                </Link>
              ))
            }
          </Links>
        </SideMenu>
        <TopBar>
          <UserName>{ this.props.user.full_name }</UserName>
          <Button variant="contained" color="secondary" onClick={this.props.handleSignOut}>
            Logout
          </Button>
        </TopBar>
        <Content>
          { this.props.children }
        </Content>
      </Wrapper>
    );
  } 
}

export default withRouter(MainLayout);
