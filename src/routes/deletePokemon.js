const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        Pokemon.findByPk(id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = `Le pokémon demandé n'existe pas.`
                    return res.status(404).json({ message })
                }
                const message = `Le pokémon ${pokemon.name} a bien été supprimé.`
                return pokemon.destroy()
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                const message = `Le pokémon n'a pas pu être supprimé. Réessayer ultérieurement.`
                res.status(500).json({ message, data: error })
            })
    })
}


