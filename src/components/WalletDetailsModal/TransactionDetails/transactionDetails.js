import { Col, ListGroup, Row } from 'react-bootstrap'

const TransactionDetails = ({ transaction }) => {
	return (
		<ListGroup.Item action as='li' className='py-3'>
			<span className='fw-bold'>{transaction.hash}</span>
			<Row>
				<Col>
					<small className='text-muted'>Size</small>
					<br />
					{transaction.size}
				</Col>
				<Col>
					<small className='text-muted'>Weight</small>
					<br />
					{transaction.weight}
				</Col>
				<Col>
					<small className='text-muted'>Fee</small>
					<br />
					{transaction.fee}
				</Col>
				<Col>
					<small className='text-muted'>Result</small>
					<br />
					{transaction.result}
				</Col>
				<Col>
					<small className='text-muted'>Balance</small>
					<br />
					{transaction.balance}
				</Col>
			</Row>
		</ListGroup.Item>
	)
}

export default TransactionDetails
