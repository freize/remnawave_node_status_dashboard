import { NextResponse } from 'next/server'
import { NodeApiResponse, Node } from '../../types/node'

export async function GET() {
	try {
		const apiUrl = `${process.env.API_BASE_URL}/api/nodes`

		const response = await fetch(apiUrl, {
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		})

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Failed to fetch from upstream' },
				{ status: response.status }
			)
		}

		const data = await response.json()

		// Фильтруем только нужные поля
		const filteredNodes: Node[] = (data.response || []).map(
			(node: NodeApiResponse) => ({
				uuid: node.uuid,
				name: node.name,
				isConnected: node.isConnected,
				isNodeOnline: node.isNodeOnline,
				isXrayRunning: node.isXrayRunning,
				countryCode: node.countryCode,
				usersOnline: node.usersOnline,
				cpuCount: node.cpuCount,
				cpuModel: node.cpuModel,
				totalRam: node.totalRam,
				consumptionMultiplier: node.consumptionMultiplier,
				trafficLimitBytes: node.trafficLimitBytes,
				trafficUsedBytes: node.trafficUsedBytes,
			})
		)

		return NextResponse.json({
			response: filteredNodes,
			count: filteredNodes.length,
		})
	} catch (error) {
		console.error('API route error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
