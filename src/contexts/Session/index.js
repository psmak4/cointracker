import { createContext, useContext, useReducer } from 'react'
import LocalStorageHelpers from '../../helpers/LocalStorage'

const SessionStateContext = createContext()
const SessionDispatchContext = createContext()

const defaultSession = {
	wallets: {},
}

const sessionActions = {
	ADD_WALLET: 'add wallet',
	CLEAR_SESSION: 'clear session',
	REMOVE_WALLET: 'remove wallet',
}

const AddWallet = (state, action) => {
	state.wallets[action.wallet.address] = action.wallet
	LocalStorageHelpers.AddWallet(action.wallet.address)

	return {
		...state,
	}
}

const ClearSession = () => {
	return defaultSession
}

const RemoveWallet = (state, action) => {
	delete state.wallets[action.wallet.address]
	LocalStorageHelpers.RemoveWallet(action.wallet.address)

	return {
		...state,
	}
}

const sessionReducer = (state, action) => {
	switch (action.type) {
		case sessionActions.ADD_WALLET:
			return AddWallet(state, action)
		case sessionActions.CLEAR_SESSION:
			return ClearSession()
		case sessionActions.REMOVE_WALLET:
			return RemoveWallet(state, action)
		default:
			return state
	}
}

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
