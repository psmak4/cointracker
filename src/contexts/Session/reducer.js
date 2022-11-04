import sessionActions from './actions'
import defaultSession from './default'
import LocalStorageHelpers from '../../helpers/LocalStorage'

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

export default sessionReducer
