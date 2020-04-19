import React, { useEffect, useState, useContext } from 'react'
import { IonCardContent, IonInput, IonButton, IonItem, IonIcon } from '@ionic/react'
import { addItem, removeItem } from '../../constants/fire'
import './ItemAction.css'
import UserContext from '../../constants/UserContext'
import { closeCircleOutline, addOutline } from 'ionicons/icons'

interface ContainerProps {
	name: string
}

export const AddItem: React.FC<ContainerProps> = ({ name }) => {
	const userinfo = useContext(UserContext)

	const [
		input,
		setInput
	] = useState('')

	function add() {
		addItem(name, input, userinfo.user.uid)
		setInput('')
	}

	return (
		<form
			className='addItem'
			onSubmit={(e) => {
				e.preventDefault()
				add()
			}}
		>
			<IonItem>
				<IonButton
					type='submit'
					disabled={

							input === '' ? true :
							false
					}
					fill='clear'
					onClick={add}
				>
					<IonIcon color='primary' size='large' slot='start' icon={addOutline} />
				</IonButton>
				<IonInput
					type='text'
					value={input}
					placeholder='Add Item'
					onIonChange={(e) => setInput(e.detail.value!)}
				/>
			</IonItem>
		</form>
	)
}

interface RemoveItemProps {
	itemName: string
	listName: string
}

export const RemoveItem: React.FC<RemoveItemProps> = ({ itemName, listName }) => {
	const userinfo = useContext(UserContext)
	function remove() {
		removeItem(listName, itemName, userinfo.user.uid)
	}
	return (
		<IonButton onClick={remove} fill='clear'>
			<IonIcon slot='icon-only' icon={closeCircleOutline} />
		</IonButton>
	)
}
