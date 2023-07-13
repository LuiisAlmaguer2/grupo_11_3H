const controller = {
    productCart: (req, res) => {
        return res.render("productCart");
    },
    productDetail: (req, res) => {
        return res.render("productDetail");
    },
}

module.exports = controller;