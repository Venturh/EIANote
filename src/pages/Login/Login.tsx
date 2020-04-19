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
	IonGrid,
	IonText,
	IonIcon,
	IonCheckbox,
	IonToggle
} from '@ionic/react'
import { mailOutline, lockClosedOutline } from 'ionicons/icons'
import React, { useState, useContext } from 'react'
import { RouteComponentProps, useHistory, Redirect } from 'react-router'
import { loginWithEmailandPassword, setFirebasePersistence } from '../../constants/fire'
import Error from '../../components/Error/Error'
import ErrorContext from '../../constants/ErrorContext'
import loginlogo from '../../assets/loginlogo.svg'
import './Login.css'
import UserContext from '../../constants/UserContext'

const Login: React.FC<RouteComponentProps<{ name: string }>> = ({ match }) => {
	let history = useHistory()
	const userinfo = useContext(UserContext)

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
		persistence,
		setPersistence
	] = useState('NONE')

	const [
		toggleStatus,
		setToggle
	] = useState(false)

	function toggle(value: boolean) {
		setToggle(value)


			value ? setPersistence('LOCAL') :
			setPersistence('NONE')
	}

	async function login() {
		setError({ ...error, show: false })
		setFirebasePersistence(persistence)
		await loginWithEmailandPassword(email, password).then(function(response) {
			if (response) {
				switch (response.type) {
					case 'error':
						setError({
							errorType: response.type,
							errorTitle: 'Testo',
							errorMessage: response.message,
							show: true
						})
						break
					case 'succes':
						history.push('/dashboard')
						break
				}
			}
		})
	}
	if (userinfo.user.loggedIn) {
		return <Redirect to='/dashboard' />
	} else {
		return (
			<IonPage>
				<IonContent>
					<ErrorContext.Provider value={{ error, setError }}>
						{
							error.show ? <Error /> :
							null}
					</ErrorContext.Provider>

					<div className='container'>
						<img className='loginlogo' src={loginlogo} alt='loginlogo' />
						<form
							onSubmit={(e) => {
								e.preventDefault()
								login()
							}}
							className='login-container'
						>
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
							<div className='checkbox'>
								<IonLabel>Remember me</IonLabel>
								<IonToggle checked={toggleStatus} onIonChange={(e) => toggle(e.detail.checked)} />
							</div>
							<IonButton type='submit' onClick={login} expand='block' shape='round'>
								Login
							</IonButton>

							<div className='login-registertext'>
								<IonText color='white'>Don´t have an account? </IonText>
								<IonText color='primary'>
									<a href='/#/register'>Sign up here</a>
								</IonText>
							</div>
						</form>
					</div>
				</IonContent>
			</IonPage>
		)
	}
}

export default Login
