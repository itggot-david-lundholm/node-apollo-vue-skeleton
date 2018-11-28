const exampleModel = (sequelize, DataTypes) => {
    const ExampleModel = sequelize.define('exampleModel', {
        field: {
            type: DataTypes.STRING,
            validate: { 
                notEmpty: {
                    args: true,
                    msg: 'A field has to have a text.',
                } 
            },
        }
    })
    
    // Message.associate = models => {
    //     Message.belongsTo(models.User)
    // }
    
    return ExampleModel
}

export default xampleModel