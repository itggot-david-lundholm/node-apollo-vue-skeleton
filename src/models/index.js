import Sequelize from 'sequelize'
import 'dotenv/config'

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        operatorAliases: false,
        dialect: 'postgres'
    }
)

const models = {
    User: sequelize.import('./User'),
}

Object.keys(models).forEach( key => {
    if('associate' in models[key]){
        models[key].associate(models)
    }
})

export {sequelize}

export default models