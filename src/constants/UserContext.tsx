import { createContext } from 'react'

type User = {
	email: string
	username: string
	uid: string
	loggedIn: boolean
}

export interface UserProps {
	user: User
	setUser: Function
}

const UserContext = createContext<UserProps>({
	user: { email: '', username: '', uid: '', loggedIn: false },
	setUser: () => null
})
export default UserContext
