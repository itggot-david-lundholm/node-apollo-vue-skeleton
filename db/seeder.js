import models from '../src/models'


export const createAnAdmin = async () => {

    await models.User.create(
        {
            username: 'admin',
            email: 'admin@example.com',
            password: 'password',
            role: 'ADMIN',
        }
    )
        
};

export const createUserBulk = async () => {
    const count = 10
    const promises = []
    for(let i = 0; i < count; i++){
        promises.push( 
            models.User.create({
                username: `user${i}`,
                email: `user${i}@example.com`,
                password: 'password',
                role: 'USER'
            })
        )
    }

    await Promise.all(promises)
}