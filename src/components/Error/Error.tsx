import React, { useContext } from 'react'
import { IonToast } from '@ionic/react'
import ErrorContext from '../../constants/ErrorContext'

const Error = () => {
	const { error, setError } = useContext(ErrorContext)

	if (error.show === false) {
		return <div />
	} else {
		return (
			<IonToast
				color={'danger'}
				isOpen={error.show}
				message={error.errorMessage}
				buttons={[
					{
						side: 'end',
						text: 'Close',
						handler: () => {
							setError({ errorType: '', errorTitle: '', errorMessage: '', show: false })
						}
					}
				]}
			/>
		)
	}
}

export default Error
