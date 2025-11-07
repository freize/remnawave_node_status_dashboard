export interface NodeApiResponse {
	uuid: string
	name: string
	// address: string
	isConnected: boolean
	isNodeOnline: boolean
	isXrayRunning: boolean
	countryCode: string
	usersOnline: number | null
	cpuCount: number | null
	cpuModel: string | null
	totalRam: string | null
	consumptionMultiplier: number
	trafficLimitBytes: number | null
	trafficUsedBytes: number | null
	// provider: {
	// 	name: string
	// 	faviconLink: string | null
	// }
	// // Остальные поля, которые не используем
	// port?: number | null
	// isDisabled?: boolean
	// isConnecting?: boolean
	// lastStatusChange?: string | null
	// lastStatusMessage?: string | null
	// xrayVersion?: string | null
	// nodeVersion?: string | null
	// xrayUptime?: string | null
	// isTrafficTrackingActive?: boolean
	// trafficResetDay?: number | null
	// notifyPercent?: number | null
	// viewPosition?: number
	// createdAt?: string
	// updatedAt?: string
	// configProfile?: any
	// providerUuid?: string | null
}

// Упрощенный тип только для компонента
export interface Node {
	uuid: string
	name: string
	// address: string
	isConnected: boolean
	isNodeOnline: boolean
	isXrayRunning: boolean
	countryCode: string
	usersOnline: number | null
	cpuCount: number | null
	cpuModel: string | null
	totalRam: string | null
	consumptionMultiplier: number
	trafficLimitBytes: number | null
	trafficUsedBytes: number | null
	// provider: {
	// 	name: string
	// 	faviconLink: string | null
	// }
}
