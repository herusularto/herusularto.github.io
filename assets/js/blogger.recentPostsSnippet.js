function showrecentposts(t){for(var e=0;e<numposts;e++){var n,r=t.feed.entry[e],i=r.title.$t;if(e==t.feed.entry.length)break;for(var s=0;s<r.link.length;s++)if("alternate"==r.link[s].rel){n=r.link[s].href;break}i=i.link(n);var a="...",d=r.published.$t,u=d.substring(0,4),o=d.substring(5,7),c=d.substring(8,10),l=new Array;if(l[1]="Jan",l[2]="Feb",l[3]="Mar",l[4]="Apr",l[5]="May",l[6]="Jun",l[7]="Jul",l[8]="Aug",l[9]="Sep",l[10]="Oct",l[11]="Nov",l[12]="Dec","content"in r)var m=r.content.$t;else if("summary"in r)var m=r.summary.$t;else var m="";var w=/<\S[^>]*>/g;if(m=m.replace(w,""),document.write('<div class="rctitle">'),standardstyling&&document.write("<br/>"),document.write(i),1==showpostdate&&document.write(" - "+l[parseInt(o,10)]+" "+c+" "+u),document.write('</div><div class="rcsumm">'),1==showpostsummary)if(standardstyling&&document.write(""),m.length<numchars)standardstyling&&document.write("<i>"),document.write(m),standardstyling&&document.write("</i>");else{standardstyling&&document.write(""),m=m.substring(0,numchars);var g=m.lastIndexOf(" ");m=m.substring(0,g),document.write(m+a),standardstyling&&document.write("")}document.write("</div>"),standardstyling&&document.write("")}standardstyling||document.write('<div class="bbwidgetfooter">'),standardstyling&&document.write(""),document.write(""),standardstyling||document.write("")}

<!-- Add this
<script>
var numposts = 5;var showpostdate = true;var showpostsummary = true;var numchars = 100;var standardstyling = true;
</script>
<script src="http://h.eru.web.id/feeds/posts/default?orderby=published&amp;alt=json-in-script&amp;callback=showrecentposts">
</script>
-->
