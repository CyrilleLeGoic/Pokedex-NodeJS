const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name

      // au moins 2 caractères
      if (name.length < 2) {
        const message = 'Le nom du pokémon doit comporter au moins 2 caractères.'
        return res.status(400).json({ message })
      }
      
      const limit = parseInt(req.query.limit) || 5
      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          }
        },

        order: [['name', 'ASC']],
        limit: limit,
      })
        .then(({ count, rows }) => {
          const message = `Il y'a ${count} pokémons qui correspondent à votre recherche.`
          res.json({ message, data: rows })
        })
    } else {
      Pokemon.findAll({
        order: [['name', 'ASC']],

      })
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = `La liste des pokémons n'a pas pu être récupérée. Réessayer utlérieurement.`
          res.status(500).json({ message, data: error })
        })
    }
  })
}