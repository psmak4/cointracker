import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Layout from '../Layout'
import NewWalletModal from '../NewWalletModal'
import WalletDetailsModal from '../WalletDetailsModal'
import WalletList from '../WalletList'
import { sessionActions, useSessionDispatch } from '../../contexts/Session'
import LocalStorageHelpers from '../../helpers/LocalStorage'
import WalletService from '../../services/Wallet'

import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
	const sessionDispatch = useSessionDispatch()
	const [showNewWalletModal, setShowNewWalletModal] = useState(false)
	const [selectedWallet, setSelectedWallet] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadWallets = async () => {
			const addresses = LocalStorageHelpers.GetStoredWallets()
			addresses.forEach(async address => {
				const wallet = await WalletService.GetWallet(address)
				if (wallet)
					sessionDispatch({
						type: sessionActions.ADD_WALLET,
						wallet,
					})
			})
		}

		loadWallets().then(() => setIsLoading(false))

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (isLoading) return <>Loading...</>

	return (
		<>
			<Layout>
				<div className='text-end'>
					<Button onClick={() => setShowNewWalletModal(true)}>
						Add new wallet
					</Button>
				</div>
				<hr />
				<WalletList onSelect={setSelectedWallet} />
			</Layout>
			{showNewWalletModal && (
				<NewWalletModal
					show={showNewWalletModal}
					onClose={() => setShowNewWalletModal(false)}
				/>
			)}
			{!!selectedWallet && (
				<WalletDetailsModal
					wallet={selectedWallet}
					show={!!selectedWallet}
					onClose={() => setSelectedWallet(null)}
				/>
			)}
		</>
	)
}

export default App
