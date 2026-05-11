const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");

const button = document.getElementById("new-quote-btn");
const form = document.getElementById("quote-form");
const quoteInput = document.getElementById("quote-input");
const authorInput = document.getElementById("author-input");
const messageElement = document.getElementById("message");

const API_URL = "http://fdklrvx2s82abjks8duhd0uf.178.105.39.91.sslip.io/";

async function loadQuote() {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    quoteElement.textContent = `"${data.quote}"`;

    authorElement.textContent = `- ${data.author}`;
  } catch (error) {
    console.error(error);

    quoteElement.textContent = "Failed to load quote";
  }
}

async function addQuote(event) {
  event.preventDefault();

  const quote = quoteInput.value;
  const author = authorInput.value;

  try {
    const response = await fetch("/quotes", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        quote,
        author,
      }),
    });

    const result = await response.text();

    messageElement.textContent = result;

    form.reset();

  } catch (error) {
    console.error(error);

    messageElement.textContent =
      "Failed to add quote";
  }
}

button.addEventListener("click", loadQuote);
form.addEventListener("submit", addQuote);

loadQuote();