import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
var config = {
	apiKey: 'AIzaSyCMlKR9pZN0UFThIcuwCEaHtAsXcJwtdPk',
	authDomain: 'eianode.firebaseapp.com',
	databaseURL: 'https://eianode.firebaseio.com',
	projectId: 'eianode',
	storageBucket: 'eianode.appspot.com',
	messagingSenderId: '648590009057',
	appId: '1:648590009057:web:537936183c115fa721cda0'
}
export const fire = firebase.initializeApp(config)

//Check for changes in auth
export function onAuthStateChange(callback: any, loading: any) {
	return fire.auth().onAuthStateChanged((user) => {
		loading(true)
		if (user) {
			fire.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
				callback({
					loggedIn: true,
					email: user.email,
					username: snapshot.val().username,
					uid: user.uid
				})
				loading(false)
			})
		} else {
			loading(false)
			callback({ loggedIn: false })
		}
	})
}

//set Auth persistence

export function setFirebasePersistence(persistence: string) {
	let authPersistence
	if (persistence === 'LOCAL') {
		authPersistence = firebase.auth.Auth.Persistence.LOCAL
	} else {
		authPersistence = firebase.auth.Auth.Persistence.NONE
	}

	firebase.auth().setPersistence(authPersistence).catch(function(error) {
		console.log('err', error)
	})
}

//Login

export async function createUsername(userid: any, name: string, email: string) {
	try {
		await new Promise((resolve, reject) => {
			fire
				.database()
				.ref('users/' + userid)
				.set({ username: name, useremail: email })
				.then((response) => resolve(response))
				.catch((error) => reject(error))
		}).then(function(response) {})
	} catch (error) {
		console.log(error)
	}
}

export async function registerWithEmailandPassword(
	email: string,
	password: string,
	username: string
) {
	try {
		await new Promise((resolve, reject) => {
			fire
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((response) => resolve(response))
				.catch((error) => reject(error))
		}).then(function(response: any) {
			createUsername(response.user.uid, username, email)
			return { type: 'succes', message: response }
		})
	} catch (error) {
		return { type: 'error', message: error.message }
	}
}

export async function loginWithEmailandPassword(email: string, password: string) {
	try {
		await fire.auth().signInWithEmailAndPassword(email, password)
		return { type: 'succes', message: 'd' }
	} catch (error) {
		console.log('err', error)
		return { type: 'error', message: error.message }
	}
}

export function getFirstListName(userid: string, setListName: Function, setLoading: Function) {
	const ref = fire.database().ref().child(userid)
	ref.limitToFirst(1).once('value').then((snap) => {
		if (snap.val()) {
			const key: string = Object.keys(snap.val())[0]
			setListName(key)
			setLoading(false)
		} else {
			setListName([
				'none'
			])
			setLoading(false)
		}
	})
}

export function getLists(userid: string, setLists: Function, setLoading: Function) {
	fire.database().ref().child(userid).on('value', function(snapshot) {
		if (snapshot.val()) {
			let tmp = [] as any
			let i = 0
			snapshot.forEach(function(element) {
				const key: string = Object.keys(snapshot.val())[i]
				tmp.push(key)
				i += 1
			})
			setLists(tmp)
			setLoading(false)
		} else {
			setLoading(false)
		}
	})
}

export function onDbChange(uid: string, setLists: any, setLoading: any) {
	fire.database().ref().child(uid).on(
		'child_added',
		function(snap) {
			let tmp = [] as any
			let i = 0
			snap.forEach(function(element) {
				const key: string = Object.keys(snap.val())[i]
				tmp.push(key)
				i += 1
			})
			setLists(tmp)
			setLoading(false)
		},
		function(error: any) {
			console.log('The read failed: ' + error)
		}
	)
}

export function addItem(listName: string, name: string, uid: string) {
	fire
		.database()
		.ref()
		.child(uid)
		.child(listName)
		.child(name)
		.set({
			name: name
		})
		.then(() => {
			return 'succes'
		})
		.catch(() => {
			return 'fail'
		})
}

export function removeItem(listName: string, itemName: string, userid: string) {
	fire.database().ref().child(userid).child(listName).child(itemName).remove()
}

export function removeList(listName: string, userid: string) {
	fire.database().ref().child(userid).child(listName).remove()
}

export function addList(name: string, userid: string) {
	fire
		.database()
		.ref()
		.child(userid)
		.child(name)
		.set('')
		.then(() => {
			return 'succes'
		})
		.catch(() => {
			return 'fail'
		})
}
