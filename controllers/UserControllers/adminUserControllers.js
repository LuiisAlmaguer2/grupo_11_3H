const db = require("../../database/models")

const controller = {

    index: (req, res) => {
        db.User.findAll()
            .then((usuarios) =>
                res.render("./admin/adminUsers", { usuarios })
            )
    },

    edit: (req, res) => {

        let usuarioAEditar = db.User.findByPk(req.params.id);
        let roles = db.Role.findAll()

        Promise.all([usuarioAEditar, roles])
            .then(([usuario, rol]) => {
                console.log(usuario.role_id)
                res.render("./admin/editUsers", { usuario, rol })
            })

    },

    update: (req, res) => {

        db.User.update({
            role_id: req.body.role
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect("/adminUsers")
            })

    }
}

module.exports = controller