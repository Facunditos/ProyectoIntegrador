module.exports = function (sequelize, dataTypes) {
    let alias = "Image";

    let cols = {
        id: {
            type: dataTypes.INTEGER,     //sequelize las lee de la base de datos, no es necesario poner TODAS si no las necesito.
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        file_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
        
};

    let config = {
        tableName: "images",
        timestamps: false
    }
    
    
    let Image = sequelize.define (alias, cols, config);

    Image.associate = function (models) {
        Image.belongsTo (models.Product, { 
            as: "image_product",
            foreignKey: "product_id",
            timestamps: false
    })
    };

    return Image;
}