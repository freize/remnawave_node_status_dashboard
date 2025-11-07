import { HeaderSimple } from './components/HeaderSimple'
import { NodeCards } from './components/NodeCards'
import { Container, MantineProvider } from '@mantine/core'

export default function HomePage() {
	return (
		<>
			<MantineProvider>
				<HeaderSimple />
				<Container size='lg' py='xl'>
					<NodeCards />
				</Container>
			</MantineProvider>
		</>
	)
}
