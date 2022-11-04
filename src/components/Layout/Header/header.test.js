import { render, screen } from '@testing-library/react'
import Header from './header'

describe('<Header />', () => {
	test('renders correctly', async () => {
		const { container } = render(<Header />)

		expect(container).toMatchSnapshot()

		const text = await screen.findByText('Cointracker')
		expect(text).toBeInTheDocument()
	})
})
