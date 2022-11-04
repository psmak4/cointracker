import { render, screen } from '@testing-library/react'
import Layout from './layout'

describe('<Layout />', () => {
	test('renders correctly', async () => {
		const sampleText = 'This is some sample text'
		const { container } = render(
			<Layout>
				<div>{sampleText}</div>
			</Layout>,
		)

		expect(container).toMatchSnapshot()

		const text = await screen.findByText(sampleText)
		expect(text).toBeInTheDocument()
	})
})
