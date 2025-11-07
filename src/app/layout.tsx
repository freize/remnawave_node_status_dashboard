import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import type { Metadata } from 'next'
import '@mantine/core/styles.css'
import './globals.css'
import { theme } from '@/app/theme/theme'

export const metadata: Metadata = {
	title: 'ShadowNet VPN - Status Dashboard',
	description: 'Real-time status monitoring for ShadowNet VPN nodes',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<ColorSchemeScript defaultColorScheme='dark' />
			</head>
			<body>
				<MantineProvider theme={theme} defaultColorScheme='dark'>
					{children}
				</MantineProvider>
			</body>
		</html>
	)
}
