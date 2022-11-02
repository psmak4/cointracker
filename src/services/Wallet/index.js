const apiEndpoint = 'https://blockchain.info/rawaddr/'

const WalletService = {
	GetWallet: async address => {
		const response = await fetch(`${apiEndpoint}${address}`)

		if (response.ok) return await response.json()

		return null
	},
}

export default WalletService
