const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");

const button = document.getElementById("new-quote-btn");

async function loadQuote() {
  try {
    const response = await fetch("http://localhost:3000");

    const data = await response.json();

    quoteElement.textContent = `"${data.quote}"`;

    authorElement.textContent = `- ${data.author}`;
  } catch (error) {
    console.error(error);

    quoteElement.textContent = "Failed to load quote";
  }
}

button.addEventListener("click", loadQuote);

loadQuote();