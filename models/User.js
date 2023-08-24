const { text } = require("express");
const fs = require("fs");
const path = require("path");

const User = {
    filename: "../data/users.json",

    getData: function () {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, this.filename)));
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);

        return userFound;
    },

    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);

        return userFound;
    }


}

module.exports = User;

// console.log(User.findByField('email', 'cano_alejandro97@hotmail.com'))