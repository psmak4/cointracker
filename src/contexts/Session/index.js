import { createContext, useContext, useReducer } from 'react'
import sessionActions from './actions'
import defaultSession from './default'
import sessionReducer from './reducer'

const SessionStateContext = createContext()
const SessionDispatchContext = createContext()

function SessionProvider({ children }) {
	const [state, dispatch] = useReducer(sessionReducer, defaultSession)

	return (
		<SessionStateContext.Provider value={state}>
			<SessionDispatchContext.Provider value={dispatch}>
				{children}
			</SessionDispatchContext.Provider>
		</SessionStateContext.Provider>
	)
}

const useSessionState = () => {
	const context = useContext(SessionStateContext)
	if (context === undefined)
		throw new Error('useSessionState must be used within a SessionProvider')

	return context
}

const useSessionDispatch = () => {
	const context = useContext(SessionDispatchContext)
	if (context === undefined)
		throw new Error(
			'useSessionDispatch must be used within a SessionProvider',
		)

	return context
}

export { SessionProvider, useSessionState, useSessionDispatch, sessionActions }
