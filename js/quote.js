function getQuote(){
  getData("http://quotes.rest/qod.json", displayQuote);
}

function displayQuote(data){
  var quote = document.querySelector("#quoteBlock");
  var author = document.querySelector("#author");
  if (data !== null) {
    var dailyQuote = JSON.parse(data);
    quote.innerHTML = dailyQuote.contents.quotes[0].quote;
    author.innerHTML = dailyQuote.contents.quotes[0].author;
  } else {
    quote.innerHTML = "A ship in harbor is safe — but that is not what ships are built for.";
    author.innerHTML = "John A. Shedd";
  }
}
