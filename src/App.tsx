import React, { useState, useEffect } from 'react'
import { IonApp, IonButton, IonHeader, isPlatform } from '@ionic/react'
import { IonReactRouter, IonReactHashRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import { onAuthStateChange } from './constants/fire'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './App.css'
import UserContext from './constants/UserContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login/Login'
import PrivateRoute from './components/PrivateRoute'
import Loading from './components/Loading/Loading'
import Register from './pages/Register/Register'

const App: React.FC = () => {
	const [
		user,
		setUser
	] = useState({ email: '', loggedIn: false, username: '', uid: '' })
	const userValue = { user, setUser }

	const [
		loading,
		setLoading
	] = useState(true)

	useEffect(() => {
		const unsub = onAuthStateChange(setUser, setLoading)
		return () => {
			unsub()
		}
	}, [])

	if (loading === false) {
		return (
			<UserContext.Provider value={userValue}>
				<IonApp>
					<IonReactHashRouter>
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<PrivateRoute userinfo={user.loggedIn} path='/dashboard' component={Dashboard} />
						<Route
							path='/'
							render={() =>

									user.loggedIn ? <Redirect to='/dashboard' /> :
									<Redirect to='/login' />}
							exact={true}
						/>
						<Route
							path='/#'
							render={() =>

									user.loggedIn ? <Redirect to='/dashboard' /> :
									<Redirect to='/login' />}
							exact={true}
						/>
					</IonReactHashRouter>
				</IonApp>
			</UserContext.Provider>
		)
	} else {
		return (
			<div className='container-loading'>
				<Loading />
			</div>
		)
	}
}

export default App
