fetch_feed("http://quotes.rest/qod.json",
  function(data) {
    var quote = $("#quoteblock");
    var author = $("#author");
    if (data !== null) {
      var dailyQuote = JSON.parse(data);
      quote.text(dailyQuote.contents.quotes[0].quote);
      author.text(dailyQuote.contents.quotes[0].author);
    } else {
      quote.text("A ship in harbor is safe — but that is not what ships are built for.");
      author.text("John A. Shedd");
    }
  });
