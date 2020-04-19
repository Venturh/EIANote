import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import UserContext from '../constants/UserContext'

interface PrivateRouteProps extends RouteProps {
	// tslint:disable-next-line:no-any
	component: any
	isSignedIn: boolean
}

const PrivateRoute: React.ComponentType<any> = ({ userinfo, component: Component, ...rest }) => {
	const user = useContext(UserContext)
	return (
		<Route
			{...rest}
			render={(props) =>

					user.user.loggedIn ? <Component {...props} /> :
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>}
		/>
	)
}

export default PrivateRoute
