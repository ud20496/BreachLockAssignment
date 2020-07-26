const sql = require("./db.js");

const Category = function(category) {
    this.level = category.level;
    this.cvss = category.cvss;
    this.title = category.title;
    this.vulnerability = category.vulnerability;
    this.solution = category.solution;
    this.reference = category.reference;
  };

  Category.updateById = (id, category, result) => {
    sql.query(
      "UPDATE category SET level =?, cvss =?, title =? ,vulnerability =?, solution =?, reference =? WHERE id =?",
      [category.level, category.cvss, category.title, category.vulnerability, category.solution, category.reference, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Category with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated category: ", { id: id, ...category});
        result(null, { id: id, ...category });
      }
    );
  };

  module.exports = Category;