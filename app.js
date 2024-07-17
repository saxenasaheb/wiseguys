import { fetchQuotes, getRandomQuote } from './quoteService.js';
import { getImageUrl } from './imageService.js';
import { translateQuote } from './translationService.js';

let quotes = [];
let currentQuote = null;

async function init() {
    quotes = await fetchQuotes();
    displayNewQuote();
}

async function displayNewQuote() {
    currentQuote = getRandomQuote(quotes);
    const quoteImage = document.getElementById('quote-image');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const languageSelect = document.getElementById('language-select');

    quoteImage.src = getImageUrl(currentQuote);
    quoteText.textContent = await translateQuote(currentQuote, languageSelect.value);
    quoteAuthor.textContent = `- ${currentQuote.Author}`;
}

document.getElementById('new-quote-btn').addEventListener('click', displayNewQuote);
document.getElementById('language-select').addEventListener('change', async (event) => {
    if (currentQuote) {
        const quoteText = document.getElementById('quote-text');
        quoteText.textContent = await translateQuote(currentQuote, event.target.value);
    }
});

init();