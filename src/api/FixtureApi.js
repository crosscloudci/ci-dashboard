export default {
	// Functions return fixtures
	getDashboard: () => {
		// Timeout to simulate asynchronous
		setTimeout(() =>{ 
			return {
				ok: true,
				data: require('../../fixtures/dashboard.json')
			}
				, 100})
	}
}
