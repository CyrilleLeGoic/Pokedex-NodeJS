const validTypes = ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy']



module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Ce nom est déjà pris"
      },
      validate: {
        notNull: { msg: "Le nom ne peut pas être vide" },
        notEmpty: { msg: "Le nom doit contenir des caractères" },
        len: {
          args: [1, 25],
          msg: "Le nom doit contenir entre 1 et 25 caractères"
        }
      }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez des nombres entiers pour les points de vie" },
          notNull: { msg: "Les points de vie ne peuvent pas être nuls" },
          min: {
            args: [0],
            msg: "Les points de vie ne peuvent pas être négatifs"
          },
          max: {
            args: [999],
            msg: "Les points de vie ne peuvent pas être supérieurs à 999"
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez des nombres entiers pour les points de combat" },
          notNull: { msg: "Les points de combat ne peuvent pas être nuls" },
          min: {
            args: [0],
            msg: "Les points de combat ne peuvent pas être négatifs"
          },
          max: {
            args: [99],
            msg: "Les points de combat ne peuvent pas être supérieurs à 99"
          }
        }
        },
        picture: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isUrl: { msg: "Utilisez une URL valide pour l'image" },
            notNull: { msg: "L'image ne peut pas être nulle" },
          }
        },
        types: {
          type: DataTypes.STRING,
          allowNull: false,
          get() {
            return this.getDataValue('types').split(',')
          },
          set(types) {
            this.setDataValue('types', types.join(','))
          },
          validate: {
            isTypesValid(value) {
              if(!value){
                throw new Error('Un pokemon doit avoir au moins un type')
              }
              if(value.split(',').lengh > 3){
                throw new Error('Un pokemon ne peut avoir plus de trois types')
              }
              value.split(',').forEach(type => {
                if(!validTypes.includes(type)){
                  throw new Error(`Le type ${type} n'est pas valide`)
                }
              }
              )
            }
          }
        }
      }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
