import { Container, Navbar } from 'react-bootstrap'

const Header = () => {
	return (
		<Navbar bg='dark' variant='dark' as='header'>
			<Container fluid className='px-4'>
				<Navbar.Brand>Cointracker</Navbar.Brand>
			</Container>
		</Navbar>
	)
}

export default Header
