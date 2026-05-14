import express from "express";
import cors from "cors";
import dotenv from "dotenv";  

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());


const port = process.env.PORT || 3000;

const quotes = [
  {
    quote: "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);

  return quotes[index];
}

app.get("/", (req, res) => {
  const quote = randomQuote();

  res.json(quote);;
});

app.post("/", (req, res) => {
  const { quote, author } = req.body;

  if (!quote || !author) {
    return res.status(400).send(
      "Expected quote and author"
    );
  }

  quotes.push({
    quote,
    author,
  });
  res.send(`Added quote: ${quote}`);
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});