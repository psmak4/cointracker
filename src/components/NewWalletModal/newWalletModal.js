import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { sessionActions, useSessionDispatch } from '../../contexts/Session'
import WalletService from '../../services/Wallet'

const NewWalletModal = ({ show, onClose }) => {
	const [address, setAddress] = useState('')
	const [error, setError] = useState()
	const sessionDispatch = useSessionDispatch()

	const handleClose = () => {
		if (typeof onClose === 'function') onClose()
	}

	const handleSubmit = async () => {
		setError(null)

		if (address.length < 3) {
			setError('Please enter a valid wallet address.')

			return
		}

		try {
			const wallet = await WalletService.GetWallet(address)
			if (!wallet) {
				setError('Invalid wallet address given.')

				return
			}

			sessionDispatch({
				type: sessionActions.ADD_WALLET,
				wallet,
			})

			handleClose()
		} catch (e) {
			setError(
				'There was a problem retrieving your wallet. Please try again later.',
			)
			console.error(e)
		}
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add new wallet</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						autoFocus={true}
						type='text'
						placeholder='3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd'
						onChange={e => setAddress(e.target.value)}
						isInvalid={!!error}
					/>
					{!error && (
						<Form.Text className='text-muted'>
							Wallet address you would like to add.
						</Form.Text>
					)}
					{!!error && (
						<Form.Control.Feedback type='invalid'>
							{error}
						</Form.Control.Feedback>
					)}
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					className='me-auto'
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button variant='primary' onClick={handleSubmit}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default NewWalletModal
