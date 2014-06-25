google.load("feeds", "1");
function OnLoad() {
      var feed = new google.feeds.Feed("http://littlebigdetails.com/rss");
      feed.setNumEntries(20);
      feed.load(feedLoaded);
}
    
google.setOnLoadCallback(OnLoad);

function feedLoaded(result) {
  if (!result.error) {
      
    var container = $("#content");
    container.innerHTML = '';
    
    var $header = $('<header></header>');
    $header.text(result.feed.description);
    $header.append($('<span class="headerDesc">Newest ' + result.feed.entries.length + ' posts from <a tabindex="-1" href="' + result.feed.link + '" >' +  result.feed.link +  '</a></span>'));
    container.append($header);
        
    for (var i = 0; i < result.feed.entries.length; i++) {
      var entry = result.feed.entries[i];
          container.append(createEntry(entry, i+1));
    }
  }
}
    
function createEntry(data, index) {
  var $div = $('<div class="entry"></div>');
  var $snippet = $('<span class="entrySnippet">' + data.contentSnippet + '</span>');
  var $publishedDate = $('<span class="publishedDate"> #' +  index + ' ' + data.publishedDate + '</span>');
  var $image = $('<div class="entryImage"><a tabindex="-1" href="' + data.link + '">' + retrieveImageFromContent(data.content) + '</a></div>');   
  
  $div.append($publishedDate).append($snippet).append($image);

  return $div;
}

function retrieveImageFromContent(content) {
  var image = content.slice(content.indexOf('<img'));
  image = image.slice(0, image.indexOf('>')+1);
  return image;
}
    