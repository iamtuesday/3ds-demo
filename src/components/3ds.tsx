import { apiConfig } from '../utils/config'

export const Component3DS = () => {
	const createSession = async () => {
		try {
			const res = await apiConfig.post('/PCI/Authentication/CreateSession', {
				amount: 1230,
				currency: 'PEN',
				transactionCategory: 'PAYMENT',
				productType: 'GOODS_OR_SERVICE_PURCHASE',
				merchant: {
					mid: '4587895'
				},
				paymentForm: {
					pan: '4970110000000013',
					expiryMonth: '02',
					expiryYear: '24',
					networkPreference: 'VISA'
				},
				protocolRequest: {
					name: 'THREEDS',
					version: '2',
					challengePreference: 'NO_PREFERENCE'
				},
				ianTargetUrl: 'https://myiantargeturl.com'
			})

			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			<button className="bg-red-600 border border-gray rounded-lg p-2 text-white hover:bg-red-500" onClick={createSession}>
				Create Session
			</button>
		</div>
	)
}
