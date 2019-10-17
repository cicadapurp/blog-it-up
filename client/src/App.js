import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withAuth } from './context/AuthProvider.js'
import Navbar from './components/Navbar.js'
import SignUp from './components/SignUp.js'
import Login from './components/Login.js'
import BlogList from './components/BlogList.js'
import Publish from './components/Publish.js'
import Favorites from './components/Favorites.js'
import ProtectedRoute from './auth/ProtectedRoute'


// change password input to password field 
// push logged in users to home 

const App = props => {
  const { token } = props


  
  return(
    <div>
    
     <Route render={ rProps => <Navbar {...rProps} />} />
      <Switch>
        <Route exact path='/' render={rProps => !token ? <SignUp /> : <Redirect to="/allblogposts"/>}/>
        <Route path='/login' component={Login}/>
        <ProtectedRoute path='/allblogposts' component={BlogList}/>
        <ProtectedRoute path='/publishablogpost' component={Publish}/>
      
        <ProtectedRoute path='/favorites' component={Favorites}/>
      </Switch>
    </div>
  )
}

export default withAuth(App)