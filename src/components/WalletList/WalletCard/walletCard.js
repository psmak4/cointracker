import { Button, Card } from 'react-bootstrap'

const WalletCard = ({ onClick, wallet }) => {
	const handleClick = e => {
		e.preventDefault()

		if (typeof onClick === 'function') onClick()
	}

	return (
		<Card className='h-100 shadow'>
			<Card.Body>
				<Card.Title className='d-block text-truncate'>
					<Button
						variant='link'
						as={Card.Title}
						className='text-decoration-none p-0 fw-semibold stretched-link'
						title={wallet.address}
						onClick={handleClick}
					>
						{wallet.address}
					</Button>
				</Card.Title>
				<hr />
				<Card.Text>
					<small className='text-muted'>Balance</small>
					<br />
					{wallet.final_balance}
				</Card.Text>
				<Card.Text>
					<small className='text-muted'>Transaction Count</small>
					<br />
					{wallet.txs?.length}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default WalletCard
