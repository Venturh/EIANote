import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ShoppingList } from '../../components/ShoppingList/ShoppingList'
import { AddItem } from '../../components/ItemAction/ItemAction'
import './Shopping.css'

const Shopping: React.FC<RouteComponentProps<{ name: string }>> = ({ match }) => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{match.params.name}</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>{match.params.name}</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ShoppingList name={match.params.name} />
				<div className='addItem-container'>
					<AddItem name={match.params.name} />
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Shopping
