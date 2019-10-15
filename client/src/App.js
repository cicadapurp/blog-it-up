import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { withAuth } from './context/AuthProvider.js'

import Navbar from './components/Navbar.js'
import SignUp from './components/SignUp.js'
import Login from './components/Login.js'
import BlogList from './components/BlogList.js'
import Publish from './components/Publish.js'
import Favorites from './components/Favorites.js'

const App = props => {
  return(
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/' component={SignUp}/>
        <Route path='/login' component={Login}/>
        <Route path='/allblogposts' component={BlogList}/>
        <Route path='/publishablogpost' component={Publish}/>
        <Route path='/favorites' component={Favorites}/>
      </Switch>
    </div>
  )
}

export default withAuth(App)