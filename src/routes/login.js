const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } }).then(user => {
            if (!user) {
                const message = "L'utilisateur demandé n'existe pas"
                return res.status(404).json({ message })
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    const message = `Le mot de passe est incorrecte`
                    return res.status(401).json({ message })
                }

                // JWT
                const token = jwt.sign(
                    { userId: user.id },
                    privateKey,
                    { expiresIn: '24h' }
                )
                const message = `L'utilisateur ${user.username} a bien été authentifié.`
                res.json({ message, data: user, token })
            })
        })
            .catch(error => {
                const message = `L'utilisateur ${user.username} n'a pas pu être authentifié. Réessayer ultérieurement.`
                res.status(500).json({ message, data: error })
            })
    })
}