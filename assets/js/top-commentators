// Top Commentators gadget with avatars, by MS-potilas 2012.
// Gets a list of top commentators from all comments, or specified number of days in the past.
// See http://yabtb.blogspot.com/2012/05/top-commenters-gadget-with-avatars.html
//
// CONFIG:
var maxTopCommenters = 5;   // how big a list of top commentators
var minComments = 1;        // how many comments must top commentator have at least
var numDays = 0;            // from how many days (ex. 30), or 0 from "all the time"
var excludeMe = true;       // true: exclude my own comments
var excludeUsers = ["Anonymous", "someotherusertoexclude"];     // exclude these usernames
var maxUserNameLength = 42; // 0: don't cut, >4: cut usernames
//
var txtTopLine = '<b>[#].</b> [image] [user] ([count])';
var txtNoTopCommenters = 'No top commentators at this time.';
var txtAnonymous = '';      // empty, or Anonymous user name localized if you want to localize
//
var sizeAvatar = 16;
var cropAvatar = true;
//
var urlNoAvatar = "http://lh4.googleusercontent.com/-069mnq7DV_g/TvgRrBI_JaI/AAAAAAAAAic/Iot55vywnYw/s"+sizeAvatar+"/avatar_blue_m_96.png"; // http://www.blogger.com/img/avatar_blue_m_96.png resizeable
var urlAnoAvatar = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=' + sizeAvatar;
var urlMyProfile = ''; // set if you have no profile gadget on page
var urlMyAvatar = '';  // can be empty (then it is fetched) or url to image
// config end
// for old IEs & IE modes:
if(!Array.indexOf) {
 Array.prototype.indexOf=function(obj) {
  for(var i=0;i<this.length;i++) if(this[i]==obj) return i;
  return -1;
}}
function replaceTopCmtVars(text, item, position)
{
  if(!item || !item.author) return text;
  var author = item.author;
 
  var authorUri = "";
  if(author.uri && author.uri.$t != "")
    authorUri = author.uri.$t;
 
  var avaimg = urlAnoAvatar;
  var bloggerprofile = "http://www.blogger.com/profile/";
  if(author.gd$image && author.gd$image.src && authorUri.substr(0,bloggerprofile.length) == bloggerprofile)
    avaimg = author.gd$image.src;
  else {
    var parseurl = document.createElement('a');
    if(authorUri != "") {
      parseurl.href = authorUri;
      avaimg = 'http://www.google.com/s2/favicons?domain=' + parseurl.hostname;
    }
  }
  if(urlMyProfile != "" && authorUri == urlMyProfile && urlMyAvatar != "")
    avaimg = urlMyAvatar;
  if(avaimg == "http://img2.blogblog.com/img/b16-rounded.gif" && urlNoAvatar != "")
    avaimg = urlNoAvatar;
  var newsize="s"+sizeAvatar;
  avaimg = avaimg.replace(/\/s\d\d+-c\//, "/"+newsize+"-c/");
  if(cropAvatar) newsize+="-c";
  avaimg = avaimg.replace(/\/s\d\d+(-c){0,1}\//, "/"+newsize+"/");
 
  var authorName = author.name.$t;
  if(authorName == 'Anonymous' && txtAnonymous != '' && avaimg == urlAnoAvatar)
    authorName = txtAnonymous;
  var imgcode = '<img class="top-commenter-avatar" height="'+sizeAvatar+'" width="'+sizeAvatar+'" title="'+authorName+'" src="'+avaimg+'" />';
  if(authorUri!="") imgcode = '<a href="'+authorUri+'">'+imgcode+'</a>';
 
  if(maxUserNameLength > 3 && authorName.length > maxUserNameLength)
    authorName = authorName.substr(0, maxUserNameLength-3) + "...";
  var authorcode = authorName;
  if(authorUri!="") authorcode = '<a class="profile-name-link" href="'+authorUri+'">'+authorcode+'</a>';
 
  text = text.replace('[user]', authorcode);
  text = text.replace('[image]', imgcode);
  text = text.replace('[#]', position);
  text = text.replace('[count]', item.count);
  return text;
}
 
var topcommenters = {};
var ndxbase = 1;
function showTopCommenters(json) {
  var one_day=1000*60*60*24;
  var today = new Date();
 
  if(urlMyProfile == "") {
    var elements = document.getElementsByTagName("*");
    var expr = /(^| )profile-link( |$)/;
    for(var i=0 ; i<elements.length ; i++)
      if(expr.test(elements[i].className)) {
        urlMyProfile = elements[i].href;
        break;
      }
  }
 
  if(json && json.feed && json.feed.entry && json.feed.entry.length) for(var i = 0 ; i < json.feed.entry.length ; i++ ) {
    var entry = json.feed.entry[i];
    if(numDays > 0) {
      var datePart = entry.published.$t.match(/\d+/g); // assume ISO 8601
      var cmtDate = new Date(datePart[0],datePart[1]-1,datePart[2],datePart[3],datePart[4],datePart[5]);
 
      //Calculate difference btw the two dates, and convert to days
      var days = Math.ceil((today.getTime()-cmtDate.getTime())/(one_day));
      if(days > numDays) break;
    }
    var authorUri = "";
    if(entry.author[0].uri && entry.author[0].uri.$t != "")
      authorUri = entry.author[0].uri.$t;
 
    if(excludeMe && authorUri != "" && authorUri == urlMyProfile)
      continue;
    var authorName = entry.author[0].name.$t;
    if(excludeUsers.indexOf(authorName) != -1)
      continue;
 
    var hash=entry.author[0].name.$t + "-" + authorUri;
    if(topcommenters[hash])
      topcommenters[hash].count++;
    else {
      var commenter = new Object();
      commenter.author = entry.author[0];
      commenter.count = 1;
      topcommenters[hash] = commenter;
    }
  }
  if(json && json.feed && json.feed.entry && json.feed.entry.length && json.feed.entry.length == 200) {
    ndxbase += 200;
    document.write('<script type="text/javascript" src="http://'+window.location.hostname+'/feeds/comments/default?redirect=false&max-results=200&start-index='+ndxbase+'&alt=json-in-script&callback=showTopCommenters"></'+'script>');
    return;
  }
 
  // convert object to array of tuples
  var tuplear = [];
  for(var key in topcommenters) tuplear.push([key, topcommenters[key]]);
 
  tuplear.sort(function(a, b) {
    if(b[1].count-a[1].count)
        return b[1].count-a[1].count;
    return (a[1].author.name.$t.toLowerCase() < b[1].author.name.$t.toLowerCase()) ? -1 : 1;
  });
 
  // list top topcommenters:
  var realcount = 0;
  for(var i = 0; i < maxTopCommenters && i < tuplear.length ; i++) {
    var item = tuplear[i][1];
    if(item.count < minComments)
        break;
    document.write('<di'+'v class="top-commenter-line">');
    document.write(replaceTopCmtVars(txtTopLine, item, realcount+1));
    document.write('</d'+'iv>');
    realcount++;
  }
  if(!realcount)
    document.write(txtNoTopCommenters);
}  
document.write('<script type="text/javascript" src="http://'+window.location.hostname+'/feeds/comments/default?redirect=false&max-results=200&alt=json-in-script&callback=showTopCommenters"></'+'script>');
