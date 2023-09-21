const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

module.exports = function () {

    let alias = "Category"

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false,
        underscored: true
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product)
    }

    return Category
}