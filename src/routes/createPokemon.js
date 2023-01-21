const { ValidationError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/pokemons', auth,  (req, res) => {
        const pokemon = req.body
        Pokemon.create(pokemon)
            .then(pokemon => {
                const message = `Le pokémon ${req.body.name} a bien été créé.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                if(error instanceof ValidationError) {
                    return res.statut(400).json({ message: error.message, data: error })
                }
                if(error instanceof UniqueConstraintError) {
                    return res.statut(400).json({ message: error.message, data: error })
                }

                const message = `Le pokémon ${req.body.name} n'a pas pu être créé. Réessayer ultérieurement.`
                res.status(500).json({ message, data: error })
            })
    })
}

