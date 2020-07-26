const sql = require('../models/db.js');

module.exports = app => {
    const category = require('../controller/controller.js');

    // Update a Category with categoryId
    app.put("/category/:categoryId", category.update);
}