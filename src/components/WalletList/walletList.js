import { Col, Row } from 'react-bootstrap'
import WalletCard from './WalletCard'
import { useSessionState } from '../../contexts/Session'

const WalletList = ({ onSelect }) => {
	const sessionState = useSessionState()

	return (
		<Row xs={1} md={2} xl={3} className='align-items-stretch g-4'>
			{Object.entries(sessionState.wallets).map(([address, wallet]) => (
				<Col key={address}>
					<WalletCard
						wallet={wallet}
						onClick={() => onSelect(wallet)}
					/>
				</Col>
			))}
		</Row>
	)
}

export default WalletList
