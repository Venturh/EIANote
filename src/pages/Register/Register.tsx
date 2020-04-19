import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonItem,
	IonLabel,
	IonInput,
	IonButton,
	IonIcon,
	IonText
} from '@ionic/react'
import React, { useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'
import { registerWithEmailandPassword } from '../../constants/fire'
import Error from '../../components/Error/Error'
import ErrorContext from '../../constants/ErrorContext'
import Loading from '../../components/Loading/Loading'

import { personCircleOutline, mailOutline, lockClosedOutline } from 'ionicons/icons'
import registerlogo from '../../assets/loginlogo.svg'
import './Register.css'

const Register: React.FC<RouteComponentProps<{ name: string }>> = ({ match }) => {
	let history = useHistory()

	const [
		username,
		setUsername
	] = useState('')

	const [
		email,
		setEmail
	] = useState('')

	const [
		password,
		setPassword
	] = useState('')

	const [
		error,
		setError
	] = useState({ errorType: '', errorTitle: '', errorMessage: '', show: false })

	const [
		loading,
		setLoading
	] = useState(false)

	async function register() {
		setError({ ...error, show: false })
		await registerWithEmailandPassword(email, password, username).then(function(error) {
			console.log('Register:', error)
			if (error) {
				setError({
					errorType: error.type,
					errorTitle: 'Testo',
					errorMessage: error.message,
					show: true
				})
			} else {
				history.push('/dashboard')
			}
		})
	}

	return (
		<IonPage>
			{
				loading ? <div className='container-loading'>
					<Loading />
				</div> :
				<IonContent>
					<ErrorContext.Provider value={{ error, setError }}>
						{
							error.show ? <Error /> :
							null}
					</ErrorContext.Provider>
					<div className='registerwrap-container'>
						<img className='registerlogo' src={registerlogo} alt='registerlogo' />
						<form
							onSubmit={(e) => {
								e.preventDefault()
								register()
							}}
							className='register-container'
						>
							<IonItem>
								<IonIcon slot='start' src={personCircleOutline} />
								<IonInput value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
							</IonItem>
							<IonItem>
								<IonIcon slot='start' src={mailOutline} />
								<IonInput value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
							</IonItem>
							<IonItem>
								<IonIcon slot='start' src={lockClosedOutline} />
								<IonInput
									type='password'
									value={password}
									onIonChange={(e) => setPassword(e.detail.value!)}
								/>
							</IonItem>
							<IonButton onClick={register} expand='block' shape='round'>
								Register
							</IonButton>
							<div className='register-registertext'>
								<IonText color='white'>Already have an account? </IonText>
								<IonText color='primary'>
									<a href='/#/login'>Login here</a>
								</IonText>
							</div>
						</form>
					</div>
				</IonContent>}
		</IonPage>
	)
}

export default Register
