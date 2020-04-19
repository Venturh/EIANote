import React, { useState, useContext } from 'react'
import { IonCardContent, IonInput, IonButton, IonCard, IonIcon, IonItem } from '@ionic/react'
import { addList, removeList } from '../../constants/fire'
import UserContext from '../../constants/UserContext'
import { closeCircleOutline, addOutline } from 'ionicons/icons'
import './ListAction.css'

export const AddList: React.FC = () => {
	const userinfo = useContext(UserContext)
	const [
		listName,
		setListName
	] = useState('')

	function add() {
		addList(listName, userinfo.user.uid)
		setListName('')
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				add()
			}}
		>
			<IonItem>
				<IonButton
					disabled={

							listName === '' ? true :
							false
					}
					fill='clear'
					onClick={add}
				>
					<IonIcon color='primary' size='large' slot='start' icon={addOutline} />
				</IonButton>
				<IonInput
					type='text'
					value={listName}
					placeholder='Unnamed List'
					onIonChange={(e) => setListName(e.detail.value!)}
				/>
			</IonItem>
		</form>
	)
}

interface RemoveListProps {
	listName: string
}

export const RemoveList: React.FC<RemoveListProps> = ({ listName }) => {
	const userinfo = useContext(UserContext)
	function remove() {
		removeList(listName, userinfo.user.uid)
	}
	return (
		<IonButton onClick={remove} fill='clear'>
			<IonIcon slot='icon-only' icon={closeCircleOutline} />
		</IonButton>
	)
}
