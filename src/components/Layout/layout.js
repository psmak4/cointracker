import Container from 'react-bootstrap/Container'
import Header from './Header'

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<main>
				<Container fluid className='p-4'>
					{children}
				</Container>
			</main>
		</>
	)
}

export default Layout
