const express = require("express");
const server = express();
const database = require("./database/database");
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index.html");
});
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});
server.get("/search-results", (req, res) => {
  database.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      console.log(err);
    }

    const total = rows.length;

    console.log("Aqui estão seus registros: ");
    console.log(rows);

    return res.render("search-results.html", { places: rows, total });
  });
});

server.post("/save-point", (req, res) => {
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?)
  `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(error) {
    if (error) {
      console.log(error);
    }
    console.log("Cadastrado com sucesso!");
    console.log(this);

    return res.send("ok");
  }

  database.run(query, values, afterInsertData);
});
server.listen(3000);
