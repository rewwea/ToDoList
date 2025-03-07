const { verifyJwt } = require('../middleware/auth.middleware')

const express = require('express')
const router = express.Router()

router.post('/', verifyJwt, (req, res) => {
	// Логика создания задачи
})

module.exports = router
