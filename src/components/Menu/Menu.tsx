import {
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonMenuToggle,
	IonNote,
	IonButton
} from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom'
import { archiveOutline } from 'ionicons/icons'
import UserContext from '../../constants/UserContext'
import { AddList, RemoveList } from '../ListAction/ListAction'

import './Menu.css'
import { onDbChange, getLists, fire } from '../../constants/fire'

interface MenuProps extends RouteComponentProps {
	selectedPage: string
}

interface AppPage {
	url: string
	iosIcon: string
	mdIcon: string
	title: string
}

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {
	const userinfo = useContext(UserContext)
	const [
		loading,
		setLoading
	] = useState(true)

	const [
		userLists,
		setUserLists
	] = useState([])

	const history = useHistory()

	useEffect(() => {
		getLists(userinfo.user.uid, setUserLists, setLoading)
		onDbChange(userinfo.user.uid, setUserLists, setLoading)

		return () => {}
	}, [])

	function logout() {
		fire.auth().signOut().then(function() {
			history.push('/login')
		})
	}

	return (
		<IonMenu contentId='main' type='overlay'>
			<IonContent>
				<IonList id='inbox-list'>
					<div className='menu-header'>
						<IonListHeader>{userinfo.user.username}</IonListHeader>
						<IonButton onClick={logout} expand='block' size='small'>
							LogOut
						</IonButton>
					</div>

					<IonNote>{userinfo.user.email}</IonNote>

					{userLists.map((data, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem
									className={

											selectedPage === data ? 'selected' :
											''
									}
									routerLink={'/dashboard/' + data}
									routerDirection='none'
									lines='full'
									detail={false}
								>
									<IonIcon slot='start' src={archiveOutline} />
									<IonLabel>{data}</IonLabel>
									<RemoveList listName={data} />
								</IonItem>
							</IonMenuToggle>
						)
					})}
					<hr className='divider' />
					<AddList />
				</IonList>
			</IonContent>
		</IonMenu>
	)
}

export default withRouter(Menu)
