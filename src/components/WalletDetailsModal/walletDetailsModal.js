import { Button, ListGroup, Modal } from 'react-bootstrap'
import TransactionDetails from './TransactionDetails'
import { sessionActions, useSessionDispatch } from '../../contexts/Session'

const WalletDetailsModal = ({ onClose, show, wallet }) => {
	const sessionDispatch = useSessionDispatch()

	const handleClose = () => {
		if (typeof onClose === 'function') onClose()
	}

	const handleDelete = e => {
		e.preventDefault()

		sessionDispatch({
			type: sessionActions.REMOVE_WALLET,
			wallet,
		})

		if (typeof onClose === 'function') onClose()
	}

	return (
		<Modal show={show} onHide={handleClose} size='lg'>
			<Modal.Header closeButton>
				<Modal.Title>{wallet.address}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='mb-3'>
					<small className='text-muted'>Balance</small>
					<br />
					{wallet.final_balance}
				</div>
				<div>
					<small className='text-muted'>Transaction Count</small>
					<br />
					{wallet.txs?.length}
				</div>
				<hr />
				<Modal.Title className='h5 mb-3'>Transactions</Modal.Title>
				<ListGroup variant='flush' as='ol' numbered>
					{wallet.txs.map(transaction => (
						<TransactionDetails
							key={transaction.hash}
							transaction={transaction}
						/>
					))}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='link'
					onClick={handleDelete}
					className='me-auto text-danger'
				>
					Delete
				</Button>
				<Button variant='primary' onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default WalletDetailsModal
