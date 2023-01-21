const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/signup', (req, res) => {
        User.findOne({ where: { username: req.body.username } }).then(user => {
            // si l'utilisateur existe on envoie une erreur 
            if (user) {
                const message = "L'utilisateur demandé existe déjà"
                return res.status(400).json({ message })
            }
            // sinon on crée l'utilisateur
            bcrypt.hash(req.body.password, 10).then(hash => {
                User.create({
                    username: req.body.username,
                    password: hash
                }).then(user => {
                    const message = `L'utilisateur a bien été créé.`
                    res.json({ message, data: user, })
                })
                    .catch(error => {
                        const message = `L'utilisateur n'a pas pu être créé. Réessayer ultérieurement.`
                        res.status(500).json({ message, data: error })
                    })
            }
            )
        })
    })
}