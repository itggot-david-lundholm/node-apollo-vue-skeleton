import models from '../models'

console.log("Purging database...")
Object.keys(models).forEach( model => {
    models[model].destroy()
})


console.log("Done!")