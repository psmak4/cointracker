const walletKey = 'wallets'

const LocalStorageHelpers = {
	AddWallet: address => {
		const wallets = JSON.parse(localStorage.getItem(walletKey)) ?? []
		if (wallets.find(wallet => wallet === address)) return

		wallets.push(address)

		localStorage.setItem(walletKey, JSON.stringify(wallets))
	},
	GetStoredWallets: () => {
		const wallets = JSON.parse(localStorage.getItem(walletKey))

		return wallets ?? []
	},
	RemoveWallet: address => {
		const wallets = JSON.parse(localStorage.getItem(walletKey)) ?? []
		const newWallets = wallets.filter(wallet => wallet !== address)

		localStorage.setItem(walletKey, JSON.stringify(newWallets))
	},
}

export default LocalStorageHelpers
