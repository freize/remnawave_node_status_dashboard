import { createTheme, MantineColorsTuple, rem } from '@mantine/core'

// Основная сине-голубая палитра
const primary: MantineColorsTuple = [
	'#e6f7ff',
	'#bae7ff',
	'#91d5ff',
	'#69c0ff',
	'#40a9ff',
	'#1890ff',
	'#096dd9',
	'#0050b3',
	'#003a8c',
	'#002766',
]

const blue: MantineColorsTuple = [
	'#f0f9ff',
	'#e0f2fe',
	'#bae6fd',
	'#7dd3fc',
	'#38bdf8',
	'#0ea5e9',
	'#0284c7',
	'#0369a1',
	'#075985',
	'#0c4a6e',
]

// Более светлая темная палитра для лучшего контраста
const dark: MantineColorsTuple = [
	'#1e293b', // Самый темный - стал светлее
	'#334155',
	'#475569',
	'#64748b',
	'#94a3b8',
	'#cbd5e1',
	'#e2e8f0',
	'#f1f5f9',
	'#f8fafc',
	'#ffffff',
]

// Новая светлая палитра для фона
const light: MantineColorsTuple = [
	'#f8fafc',
	'#f1f5f9',
	'#e2e8f0',
	'#cbd5e1',
	'#94a3b8',
	'#64748b',
	'#475569',
	'#334155',
	'#1e293b',
	'#0f172a',
]

export const theme = createTheme({
	colors: {
		primary,
		blue,
		dark,
		light,
	},

	primaryColor: 'blue',
	primaryShade: 5,

	fontFamily: 'Inter, sans-serif',

	defaultGradient: {
		from: 'blue.4',
		to: 'primary.7',
		deg: 135,
	},

	shadows: {
		md: '0 4px 20px rgba(14, 165, 233, 0.15)',
		lg: '0 8px 40px rgba(14, 165, 233, 0.2)',
		xl: '0 16px 60px rgba(14, 165, 233, 0.25)',
	},

	components: {
		Button: {
			defaultProps: {
				variant: 'gradient',
				gradient: { from: 'blue.5', to: 'primary.6', deg: 135 },
				size: 'md',
				radius: 'md',
			},
			styles: {
				root: {
					transition: 'all 0.3s ease',
					transform: 'translateY(0)',
					boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
				},
			},
		},

		Card: {
			defaultProps: {
				shadow: 'lg',
				radius: 'lg',
				padding: 'lg',
			},
			styles: {
				root: {
					background:
						'linear-gradient(145deg, rgba(241, 245, 249, 0.95), rgba(226, 232, 240, 0.95))',
					backdropFilter: 'blur(10px)',
					border: '1px solid rgba(56, 189, 248, 0.3)',
					position: 'relative',
					overflow: 'hidden',
					transition: 'all 0.3s ease',
					color: '#334155', // Темный текст для контраста
				},
			},
		},

		Text: {
			styles: {
				root: {
					color: '#334155', // Темный текст по умолчанию
				},
			},
		},

		Badge: {
			defaultProps: {
				variant: 'gradient',
				gradient: { from: 'blue.4', to: 'primary.5' },
				radius: 'sm',
				color: 'dark', // Темный текст в бейджах
			},
		},

		Progress: {
			styles: {
				root: {
					backgroundColor: 'rgba(226, 232, 240, 0.7)',
					border: '1px solid rgba(56, 189, 248, 0.4)',
					borderRadius: rem(10),
					overflow: 'hidden',
				},
				bar: {
					background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)',
					transition: 'width 0.5s ease',
				},
			},
		},

		Alert: {
			styles: {
				root: {
					background:
						'linear-gradient(135deg, rgba(241, 245, 249, 0.95), rgba(226, 232, 240, 0.95))',
					border: '1px solid rgba(56, 189, 248, 0.4)',
					backdropFilter: 'blur(10px)',
					color: '#334155',
				},
			},
		},

		Header: {
			styles: {
				root: {
					background:
						'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.95))',
					backdropFilter: 'blur(10px)',
					borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
					boxShadow: '0 4px 20px rgba(14, 165, 233, 0.1)',
					color: '#334155',
				},
			},
		},
	},
})
