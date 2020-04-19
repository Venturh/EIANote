import { IonPage, IonSplitPane, IonRouterOutlet } from '@ionic/react'
import React, { useState, useEffect, useContext } from 'react'
import { RouteComponentProps, Route, Redirect } from 'react-router'
import Menu from '../components/Menu/Menu'
import Shopping from './Shopping/Shopping'
import { getFirstListName } from '../constants/fire'
import UserContext from '../constants/UserContext'

interface MenuProps extends RouteComponentProps {
	selectedPage: string
}

const Dashboard: React.FC<RouteComponentProps<{ name: string }>> = ({ match }) => {
	const userinfo = useContext(UserContext)
	const [
		selectedPage,
		setSelectedPage
	] = useState('empty')

	const [
		loading,
		setLoading
	] = useState(true)

	useEffect(() => {
		getFirstListName(userinfo.user.uid, setSelectedPage, setLoading)
		return () => {}
	}, [])

	if (loading) {
		return (
			<div>
				<IonPage />
			</div>
		)
	} else {
		return (
			<IonPage>
				<IonSplitPane contentId='main'>
					<Menu selectedPage={selectedPage} />

					<IonRouterOutlet id='main'>
						<Route
							path='/dashboard/:name'
							render={(props) => {
								setSelectedPage(props.match.params.name)
								return <Shopping {...props} />
							}}
							exact={true}
						/>
						<Route
							path='/dashboard'
							render={() => <Redirect to={'/dashboard/' + selectedPage} />}
							exact={true}
						/>
					</IonRouterOutlet>
				</IonSplitPane>
			</IonPage>
		)
	}
}

export default Dashboard
