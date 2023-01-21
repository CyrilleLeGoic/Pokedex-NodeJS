const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons/:id', auth,  (req, res) => {
        const id = req.params.id
        Pokemon.findByPk(id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = `Le pokémon demandé n'existe pas.`
                    return res.status(404).json({ message })
                }
                const message = `Le pokémon demandé a bien été récupéré.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                const message = `Le pokémon demandé n'a pas pu être récupéré. Réessayer ultérieurement.`
                res.status(500).json({ message, data: error })
            })
    })
}

