const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const path = require("path");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));

const userRoutes = require("./router/user");
const adminRoutes = require("./router/admin");

const Review = require("./models/review");
const Resturant = require("./models/resturant");
const View = require("./models/view");

app.use("/user", userRoutes);
app.use("/analytics", adminRoutes);

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, `Public/${req.url}`));
// });
app.use(express.static(path.join(__dirname, "public")));

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin/admin.html"));
});

app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "public/user/index.html"));
});

Resturant.hasMany(Review, { foreignKey: "resturantId" });
Review.belongsTo(Resturant, { foreignKey: "resturantId" });

sequelize
  // .sync({force: true})
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
authenticate();
