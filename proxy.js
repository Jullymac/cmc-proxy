const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());

app.get("/*", (req, res) => {
  let url = `https://pro-api.coinmarketcap.com${req.originalUrl}`;

  axios
    .get(url, { headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY } })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.send(err.response.data);
    });
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log("Listening on port ", port);
});
