const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize")

module.exports = function () {

    let alias = "User"

    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(300),
            allowNull: false,

        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }


    const config = {
        tableName: "users",
        timestamps: false,
        underscored: true
    }


    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.Role)
    }

    return User
}