function makeid() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}



function processInput(bar, width, height, cbstate){

//some lovable regex
var patternVideo = new RegExp(".+/av[0-9]{5,}"); //是视频
var patternVideoShort = new RegExp(".*acg\.tv\/[0-9]{5,}"); //是短链接式视频（形如“acg.tv/xxxxx”）

var isvideo = patternVideo.test(bar);
var issvideo = patternVideoShort.test(bar);

//javascript class to make requests so that video cids are retrieved.
//see https://stackoverflow.com/questions/247483/http-get-request-in-javascript
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.withCredentials = true;
        anHttpRequest.open(this.method, this.url, true);
        anHttpRequest.setRequestHeader("Referer", "https://api.bilibili.com");
        anHttpRequest.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With");
        anHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "true");
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

//to determine whether the regex ran successfully
if (isvideo === true || issvideo === true) { //是视频
  var svc = "video";
  var uid = bar.match(/\d{5,}/);
}


else { //gg
  var svc = '';
  var uid = '';
}

if (svc && uid) {
console.log(svc);
console.log(uid);
}

if (svc.replace(/(^\s*)|(\s*$)/g, "").length !=0 && uid[0].length !=0) {
//regex to match clips number (which p)
var patternVideoP = new RegExp("/\?p=(\d+)/g");
var arraynum = patternVideoP - 1;
var requestURL = 'https://api.bilibili.com/x/player/pagelist?aid=' + uid + '&jsonp=jsonp';
var idn = makeid();
var idcf = idn;
var client = new HttpClient();
client.get(requestURL, function(response) {
    var object = JSON.parse(response);
    var cid = object.data[arraynum].cid;
});

var preOutput = "<iframe id=" + idcf + " src=\"//player.bilibili.com/player.html?aid=" + uid + "&cid=" + cid + "&page=" + arraynum + " scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\"> </iframe>"
}

else {
  var preOutput = "Invalid URL. Try again. Bangumis are not supported by far.";
}
//绘制 html
return preOutput;
}
