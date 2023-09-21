const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize")

module.exports = function () {

    let alias = "Role"

    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
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
        tableName: "roles",
        timestamps: false,
        underscored: true
    }


    const Role = sequelize.define(alias, cols, config);

    Role.associate = function (models) {
        Role.hasMany(models.User)
    }


    return Role
}