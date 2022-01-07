import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Login from '../pages/Login/Login'
import AuthRoute from './AuthRoute'
import Home from '../pages/Home/Home'
import PageNotFound from '../pages/PageNotFound/PageNotFound'

const Error = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      color: '#004e37',
    }}
  >
    <p style={{ fontSize: '24px', marginTop: 10 }}>Error Page</p>
  </div>
)

const AppRouter = () => {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <AuthRoute
            path="/commercial-webapp"
            component={Home}
            isAuthorized={true}
            arb={false}
          />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route exact path="/error" component={Error} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Container>
  )
}

export default AppRouter
