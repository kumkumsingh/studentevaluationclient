import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Signup , Login , ErrorBoundary, Profile , Batch , Students , Evaluations , ProgressBarChart} from "./components/Index"; 
import AuthService from "./service/AuthService"
import Spinner from "./components/Spinner/Spinner"

export default class App extends Component {
  
  state =  {
    user: null,
    loading: true
  }

  setUser = (user) => this.setState({user , loading: false})

  checkAuthenticated = () => {
    if(this.state.user === null) {
      const service = new AuthService()
      service.isAuthenticated()
      .then(response => this.setState({user: response,loading: false}))
      .catch( err => this.setState({user: false ,loading: false }))
    }
    return this.state.user ?  true : false
  }

  render() {
    const userLoggedIn = this.checkAuthenticated()
    const appContent = 
    <Switch>      
      <ErrorBoundary>
        <Route path="/" exact component={(props) => <Signup {...props} />} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={(props) => <Profile {...props} isLoggedIn={userLoggedIn} setUser={this.setUser} user={this.state.user} />} />  
        <Route path="/batch" exact component={(props) => <Batch {...props} isLoggedIn={userLoggedIn} setUser={this.setUser} user={this.state.user} /> } />  
        <Route path="/batch/:batchId/students" exact component={(props) => <Students {...props} isLoggedIn={userLoggedIn}/> } />
        <Route path="/batch/:batchId/progress" exact component={(props) => <ProgressBarChart {...props} isLoggedIn={userLoggedIn}/> } />
        <Route path="/student/:studentId/evaluations" exact component={(props) => <Evaluations {...props} isLoggedIn={userLoggedIn}/> } />    
      </ErrorBoundary>         
    </Switch>
    return (
      <React.Fragment>
        <BrowserRouter>
        { this.state.loading ? <Spinner /> :
          appContent
         }
         </BrowserRouter>
        </React.Fragment>
    )
    
  }
}
