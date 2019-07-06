import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import SignInPage from './components/pages/SignInPage/SignInPage';
import Dashboard from './components/pages/Dashboard/Dashboard';
import AddLoan from './components/pages/AddLoan/AddLoan';
import { Routes } from './Constants';
import MainLayout from './components/MainLayout/MainLayout';
import axios from 'axios';
import { ApiServer, STRIPE_KEY } from './Defaults';
import Bill from './components/pages/Bill/Bill';
import ClientPage from './components/pages/ClientPage/ClientPage';
import LoanPage from './components/pages/LoanPage/LoanPage';
import PaymentPage from './components/pages/PaymentPage/PaymentPage';
import ArticlePage from './components/pages/ArticlePage/ArticlePage';
import {Elements, StripeProvider} from 'react-stripe-elements';
import 'react-credit-cards/lib/styles.scss';
import 'antd/dist/antd';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      menuLinks: [
        { label: 'Inicio', active: true, url: Routes.homePage },
        { label: 'Abrir préstamo', active: false, url: Routes.addLoan },
        { label: 'Clientes', active: false, url: Routes.clientPage },
        { label: 'Préstamos', active: false, url: Routes.loanPage },
        { label: 'Efectuar pago', active: false, url: Routes.paymentPage },
        { label: 'Artículos', active: false, url: Routes.articlePage }
      ]
    }
  }

  componentWillMount = () => {
    const { cookies } = this.props;
    const isLoggedIn = this.verifyUserLoggedIn();

    if (isLoggedIn) {

      // Configre axios
      axios.interceptors.request.use(
        config => {
          const token = cookies.get("token", { path: '/' })
          config.headers = {}
          if (token) {
            config.headers['Authorization'] = token;
          }
          return config;
        },
        error => Promise.reject(error)
      );

      // Get curretn user
      this.getUser(true);
    }
    this.setState({
      isLoggedIn
    });
  }

  getUser = (value) => {
    axios.get(`${ApiServer}/api/v1/user`).then(data => {
      const user = data.data.user;
      this.setState({
        user,
        isLoggedIn: value
      })
    })
  }

  verifyUserLoggedIn = () => {
    const { cookies } = this.props;
    if (!!cookies.get('token', { path: '/' })) {
      return true;
    }
    return false;
  }

  handleSignIn = (user) => {
    this.setState({
      user,
      isLoggedIn: true
    })
  }

  handleSignOut = () => {
    const { cookies } = this.props;
    cookies.remove('token', { path: '/' });
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    const { isLoggedIn, menuLinks, user } = this.state;
    console.log(this.state);
    return (
      <StripeProvider apiKey={STRIPE_KEY}>
        <Router>
          <Switch>
            <Route
              exact
              path={Routes.signInPage}
              render={() => <SignInPage handleSignIn={this.handleSignIn} />}
            />
            <MainLayout menuLinks={menuLinks} user={user} handleSignOut={this.handleSignOut}>
              <Route
                exact
                path={Routes.homePage}
                render={() => isLoggedIn ? <Dashboard /> :  <Redirect to={Routes.signInPage} />}
              />
              <Route
                exact
                path={Routes.addLoan}
                render={() => isLoggedIn ? <AddLoan user={user} /> :  <Redirect to={Routes.signInPage} />}
              />
              <Route
                exact
                path={Routes.billPage}
                render={() => isLoggedIn ? <Bill user={user} /> :  <Redirect to={Routes.signInPage} />}
              />
              <Route
                exact
                path={Routes.loanPage}
                render={() => isLoggedIn ? <LoanPage user={user} /> :  <Redirect to={Routes.signInPage} />}
              />
              <Route
                exact
                path={Routes.clientPage}
                render={() => isLoggedIn ? <ClientPage user={user} /> :  <Redirect to={Routes.signInPage} />}
              />
              <Route
                exact
                path={Routes.paymentPage}
                render={() => isLoggedIn ? <PaymentPage user={user} /> :  <Redirect to={Routes.signInPage} />}
              />
              <Route
                exact
                path={Routes.articlePage}
                render={() => isLoggedIn ? <ArticlePage user={user} /> :  <Redirect to={Routes.signInPage} />}
              />
            </MainLayout>
          </Switch>
        </Router>
      </StripeProvider>
    );
  }
}

export default withCookies(App);