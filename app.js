//* Importation des modules *//

const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');


//* Déclaration de mes variables *//

const app = express();
const port = process.env.PORT || 3000;

//* Déclaration de mes middlewares *//

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

    sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Hello Heroku ! :)')
})


//* Déclaration de mes routes *//
require ('./src/routes/findAllPokemons')(app)
require ('./src/routes/findPokemonByPk')(app)
require ('./src/routes/createPokemon')(app)
require ('./src/routes/deletePokemon')(app)
require ('./src/routes/updatePokemon')(app)
require ('./src/routes/login')(app)
require ('./src/routes/signup')(app)



//* On ajoute la gestion des erreurs 404 *//
app.use((req, res, next) => {
    const message = `La ressource demandée n'existe pas`;
    res.status(404).json({message});
});


//* Lancement du serveur *//
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
