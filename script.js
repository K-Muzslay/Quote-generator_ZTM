const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading() {
  loader.style.display = 'flex';
  quoteContainer.style.display = 'none';
}
//Hide Loading
function complete() {
  quoteContainer.style.display = 'grid';
  loader.style.display = 'none';
}
//Show New Quote
function newQuote() {
  loading();
  //pick a random quote from thr array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check it if there is an unknown author
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  //Check quote length
  if (quote.text.lenght > 180) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //Set Quote, Hide the loader

  quoteText.textContent = quote.text;
  complete();
}
//Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error Here
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuotes();
