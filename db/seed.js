import {createAnAdmin, createUserBulk} from './seeder'

console.log("Seeding Database")

createAnAdmin()
createUserBulk()

process.exit()