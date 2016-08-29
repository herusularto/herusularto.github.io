//need jQuery
// Post titles to Older Post and Newer Post links (without stats skew)
// by MS-potilas 2012. See http://yabtb.blogspot.com/2012/01/add-post-titles-to-older-and-newer-post.html
//<![CDATA[
var urlToNavTitle = {};
function getTitlesForNav(json) {
  for(var i=0 ; i < json.feed.entry.length ; i++) {
    var entry = json.feed.entry[i];
    var href = "";
    for (var k=0; k<entry.link.length; k++) {
      if (entry.link[k].rel == 'alternate') {
        href = entry.link[k].href;
        break;
      }
    }
    if(href!="") urlToNavTitle[href]=entry.title.$t;
  }
}
document.write('<script type="text/javascript" src="http://'+window.location.hostname+'/feeds/posts/summary?redirect=false&max-results=500&alt=json-in-script&callback=getTitlesForNav"></'+'script>');
function urlToPseudoTitle(href) {
  var title=href.match(/\/([^\/_]+)(_.*)?\.html/);
  if(title) {
    title=title[1].replace(/-/g," ");
    title=title[0].toUpperCase() + title.slice(1);
    if(title.length > 28) title=title.replace(/ [^ ]+$/, "...")
  }
  return title;
}
$(window).load(function() {
 window.setTimeout(function() {
  var href = $("a.blog-pager-newer-link").attr("href");
  if(href) {
    href = href.replace(/\.blogspot\.[^/]+\//, ".blogspot.com/");
    var title=urlToNavTitle[href];
    if(!title) title=urlToPseudoTitle(href);
    if(title) $("a.blog-pager-newer-link").html("&lt;&lt; Newer Post<br />" + title);
  }
  href = $("a.blog-pager-older-link").attr("href");
  if(href) {
    href = href.replace(/\.blogspot\.[^/]+\//, ".blogspot.com/");
    var title=urlToNavTitle[href];
    if(!title) title=urlToPseudoTitle(href);
    if(title) $("a.blog-pager-older-link").html("Older Post &gt;&gt;<br />" + title);
  }
 }, 500);
});
//]]>
