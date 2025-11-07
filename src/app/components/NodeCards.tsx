'use client'

import { useState, useEffect } from 'react'
import {
	Card,
	Text,
	Group,
	Badge,
	Grid,
	Stack,
	Progress,
	Avatar,
	Skeleton,
	Alert,
	Button,
	Tooltip,
	Title,
} from '@mantine/core'
import {
	IconServer,
	IconUsers,
	IconCpu,
	IconChartBar,
	IconRefresh,
	IconDeviceSdCard,
	IconBolt,
	IconCloudNetwork,
} from '@tabler/icons-react'
import classes from './NodeCards.module.css'
import type { Node } from '../types/node'

interface ApiResponse {
	response: Node[]
	count?: number
}

export function NodeCards() {
	const [nodes, setNodes] = useState<Node[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchNodes = async () => {
		try {
			setError(null)
			setLoading(true)

			const response = await fetch('/api/nodes')

			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.status}`)
			}

			const data: ApiResponse = await response.json()

			if (data.response && data.response.length > 0) {
				setNodes(data.response)
			} else {
				setNodes(getFallbackData())
			}
		} catch (err) {
			console.error('Error fetching nodes:', err)
			setError(err instanceof Error ? err.message : 'Unknown error')
			setNodes(getFallbackData())
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchNodes()
	}, [])

	// Fallback данные
	const getFallbackData = (): Node[] => [
		{
			uuid: '1',
			name: 'US Node 1',
			isConnected: true,
			isNodeOnline: true,
			isXrayRunning: true,
			countryCode: 'US',
			usersOnline: 15,
			cpuCount: 2,
			cpuModel: 'Ryzen 9 9950X 16-Core Processor',
			totalRam: '4.11 GB',
			consumptionMultiplier: 1,
			trafficLimitBytes: 0,
			trafficUsedBytes: 580681202810,
		},
		{
			uuid: '2',
			name: 'EU Node 1',
			isConnected: true,
			isNodeOnline: true,
			isXrayRunning: false,
			countryCode: 'DE',
			usersOnline: 8,
			cpuCount: 4,
			cpuModel: 'Intel Xeon E5-2680',
			totalRam: '8.24 GB',
			consumptionMultiplier: 1.5,
			trafficLimitBytes: 107374182400,
			trafficUsedBytes: 85899345920,
		},
	]

	// Конвертация байтов в мегабайты
	const bytesToMB = (bytes: number | null): number => {
		if (!bytes) return 0
		return Math.round(bytes / 1024 / 1024)
	}

	// Конвертация байтов в читаемый формат
	const formatBytes = (bytes: number | null): string => {
		if (!bytes) return '0 B'
		const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
		const i = Math.floor(Math.log(bytes) / Math.log(1024))
		return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
	}

	// Расчет использования трафика в процентах
	const getTrafficUsagePercent = (node: Node): number => {
		if (
			!node.trafficUsedBytes ||
			!node.trafficLimitBytes ||
			node.trafficLimitBytes === 0
		) {
			return node.trafficUsedBytes ? 100 : 0
		}
		return (node.trafficUsedBytes / node.trafficLimitBytes) * 100
	}

	// Получение цвета для прогресс-бара трафика
	const getTrafficColor = (percent: number): string => {
		if (percent >= 90) return 'red'
		if (percent >= 75) return 'orange'
		return 'blue'
	}

	// Упрощение модели процессора
	const simplifyCpuModel = (model: string | null): string => {
		if (!model) return 'Unknown'
		return model.split('/')[0].trim()
	}

	const getStatusColor = (node: Node) => {
		if (!node.isConnected || !node.isNodeOnline || !node.isXrayRunning)
			return 'red'
		return 'green'
	}

	const getStatusText = (node: Node) => {
		if (!node.isConnected) return 'Disconnected'
		if (!node.isNodeOnline) return 'Node Offline'
		if (!node.isXrayRunning) return 'Xray Stopped'
		return 'Online'
	}

	const getCountryFlag = (countryCode: string) => {
		if (!countryCode) return '🏴'
		try {
			const codePoints = countryCode
				.toUpperCase()
				.split('')
				.map(char => 127397 + char.charCodeAt(0))
			return String.fromCodePoint(...codePoints)
		} catch {
			return '🏴'
		}
	}

	if (error && nodes.length === 0) {
		return (
			<Alert color='red' title='Error' mb='md'>
				{error}
				<Button
					leftSection={<IconRefresh size={16} />}
					onClick={fetchNodes}
					ml='md'
					size='sm'
				>
					Retry
				</Button>
			</Alert>
		)
	}

	return (
		<div>
			{error && (
				<Alert color='yellow' title='Warning' mb='md'>
					{error} - Showing demo data
					<Button
						leftSection={<IconRefresh size={16} />}
						onClick={fetchNodes}
						ml='md'
						size='sm'
					>
						Retry
					</Button>
				</Alert>
			)}
			{/* <Title
				order={2}
				size='h1'
				style={{ fontFamily: 'Outfit, var(--mantine-font-family)' }}
				fw={900}
				ta='center'
				className={classes.title}
			>
				Server status
			</Title> */}
			<Grid>
				{loading && nodes.length === 0
					? [...Array(4)].map((_, index) => (
							<Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
								<Card shadow='sm' padding='lg' radius='md' withBorder>
									<Card.Section withBorder p='md'>
										<Skeleton height={20} width='60%' />
									</Card.Section>
									<Stack gap='sm' mt='md'>
										<Skeleton height={16} width='80%' />
										<Skeleton height={16} width='70%' />
										<Skeleton height={16} width='60%' />
										<Skeleton height={8} radius='xl' />
									</Stack>
								</Card>
							</Grid.Col>
					  ))
					: nodes.map(node => {
							const trafficPercent = getTrafficUsagePercent(node)
							const trafficMB = bytesToMB(node.trafficUsedBytes)

							return (
								<Grid.Col key={node.uuid} span={{ base: 12, sm: 6, lg: 4 }}>
									<Card
										shadow='sm'
										padding='lg'
										radius='md'
										withBorder
										className='glass-card gradient-border'
									>
										<Card.Section className={classes.header} withBorder>
											<Group justify='space-between' p='md'>
												<Group>
													{/* <Avatar
														src={node.provider?.faviconLink}
														size='sm'
														alt={node.provider?.name}
													>
														<IconServer size={16} />
													</Avatar> */}
													<div>
														<Text fw={500} size='sm'>
															{node.name}
														</Text>
														<Group gap='xs'>
															<Text size='sm'>
																{getCountryFlag(node.countryCode)}
															</Text>
															<Text size='sm'>{node.countryCode}</Text>
														</Group>
													</div>
												</Group>
												<Badge
													color={getStatusColor(node)}
													variant='filled'
													size='sm'
												>
													{getStatusText(node)}
												</Badge>
											</Group>
										</Card.Section>

										<Stack gap='xs' mt='md'>
											{node.usersOnline !== null && (
												<Group justify='space-between'>
													<Text size='sm' c='dimmed'>
														Online Users
													</Text>
													<Group gap='xs'>
														<IconUsers size={16} />
														<Text size='sm'>{node.usersOnline}</Text>
													</Group>
												</Group>
											)}

											{node.cpuCount && (
												<Group justify='space-between'>
													<Text size='sm' c='dimmed'>
														CPU
													</Text>
													<Group gap='xs'>
														<IconCpu size={16} />
														<Text size='sm'>
															{node.cpuCount} ×{' '}
															{simplifyCpuModel(node.cpuModel)}
														</Text>
													</Group>
												</Group>
											)}

											{node.totalRam && (
												<Group justify='space-between'>
													<Text size='sm' c='dimmed'>
														RAM
													</Text>
													<Group gap='xs'>
														<IconDeviceSdCard size={16} />
														<Text size='sm'>{node.totalRam}</Text>
													</Group>
												</Group>
											)}

											{node.consumptionMultiplier !== 1 && (
												<Group justify='space-between'>
													<Text size='sm' c='dimmed'>
														Multiplier
													</Text>
													<Tooltip label='Consumption Multiplier'>
														<Badge
															variant='light'
															color='yellow'
															leftSection={
																<IconBolt
																	size={12}
																	style={{ marginRight: 4 }}
																/>
															}
														>
															×{node.consumptionMultiplier}
														</Badge>
													</Tooltip>
												</Group>
											)}
											<Group justify='space-between' mb={8}>
												<Text size='sm' c='dimmed'>
													Traffic Used
												</Text>
												<Group gap='xs'>
													<IconCloudNetwork size={16} />
													<Text size='sm' fw={500}>
														{formatBytes(node.trafficUsedBytes)}
														{node.trafficLimitBytes &&
															node.trafficLimitBytes > 0 && (
																<Text span size='xs' c='dimmed' ml={4}>
																	/ {formatBytes(node.trafficLimitBytes)}
																</Text>
															)}
													</Text>
												</Group>
											</Group>
										</Stack>
									</Card>
								</Grid.Col>
							)
					  })}
			</Grid>
		</div>
	)
}
