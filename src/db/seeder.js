import models from '../models'


export const createAThing = async () => {
    const date = new Date()

    await models.ExampleModel.create(
        {
            text: 'Lorem Ipsum',
        },
    )
        
};

export const createBulk = async () => {
    const count = 10
    const promises = []

    for(let i = 0; i < count; i++){
        promises.push( 
            models.ExampleModel.create({
                text: 'Lorem ipsum',
            })
        )
    }

    await Promise.all(promises)
}