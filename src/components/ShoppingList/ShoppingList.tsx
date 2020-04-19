import React, { useEffect, useState, useContext } from 'react'
import { IonItem, IonLabel, IonReorder, IonReorderGroup } from '@ionic/react'
import { fire } from '../../constants/fire'
import UserContext from '../../constants/UserContext'
import { RemoveItem } from '../ItemAction/ItemAction'
import './ShoppingList.css'

interface ContainerProps {
	name: string
}

export const ShoppingList: React.FC<ContainerProps> = ({ name }) => {
	const userinfo = useContext(UserContext)
	const [
		foodList,
		setFoodList
	] = useState([] as any)

	useEffect(
		() => {
			fire.database().ref().child(userinfo.user.uid).child(name).on('value', (snap) => {
				setFoodList([])
				let tempList = [] as any
				snap.forEach((child) => {
					tempList.push(child.val())
				})

				setFoodList(tempList)
			})
		},
		[
			name
		]
	)

	return (
		<div className='list-container'>
			{foodList.map((data: { name: string }, index: any) => {
				return (
					<IonItem color='light' key={index}>
						<IonLabel>{data.name}</IonLabel>
						<RemoveItem itemName={data.name} listName={name} />
					</IonItem>
				)
			})}
		</div>
	)
}
