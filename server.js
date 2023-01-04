const express = require("express");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require("method-override");
const Article = require("./models/article");

const articlesRouter = require("./routes/articles");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/blog");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articlesRouter);

app.listen(8000);
