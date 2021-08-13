const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
    User: require('./user')(sequelize, DataTypes),
    Peep: require('./peep')(sequelize, DataTypes),
};

module.exports = {
    sequelize: sequelize,
    models: models
}