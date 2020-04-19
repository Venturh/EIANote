import { createContext } from 'react'

type Error = {
	errorType: string
	errorTitle: string
	errorMessage: string
	show: boolean
}

export interface ErrorProps {
	error: Error
	setError: Function
}

const ErrorContext = createContext<ErrorProps>({
	error: { errorType: '', errorTitle: '', errorMessage: '', show: false },
	setError: () => null
})
export default ErrorContext
