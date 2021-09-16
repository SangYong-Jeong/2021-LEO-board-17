const methodOverride = require('method-override')

module.exports = () => {
	return methodOverride((req, res)=>{
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			let method = req.body._method
			delete req.body._method
			return method
		}
	})
}