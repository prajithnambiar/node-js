// const routes = require("./routes");

// const server = http.createServer(routes.export1);
const User = require("./model/user.js");
const Product = require("./model/product.js");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoute = require("./routes/admin.js");
const shopRouter = require("./routes/shop.js");
const errorController = require("./controllers/error.js");
const sequelize = require("./util/database.js");

const path = require("path");
const app = express();

app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoute.router); //these are called filtered routes. All routes inside adminRoute start with /admin.
app.use(shopRouter);

app.use(errorController.loadError);
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
sequelize
  .sync({ force: true })
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
