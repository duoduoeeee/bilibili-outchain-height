function makeid() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


function processInput(bar, width, height){

//some lovable regex
var patternVideo = new RegExp(".+/av[0-9]{5,}"); //是视频
var patternVideoShort = new RegExp(".*acg\.tv\/[0-9]{5,}"); //是短链接式视频（形如“acg.tv/xxxxx”）

var isvideo = patternVideo.test(bar);
var issvideo = patternVideoShort.test(bar);

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
var patternVideoP = new RegExp(/\?p=(\d+)/g);
var whichP = patternVideoP.exec(bar);
if (whichP) {

    arraynum = whichP[1];
} else {
    arraynum = "1";
}
////debugging
console.log(whichP);
console.log(arraynum);
////debugging

var requestURL = 'api.php?aid=' + uid + '&p=' + arraynum;
var idn = makeid();
var idcf = idn;

//autoselect
if (document.getElementById("height").focus) {
    document.getElementById("height").select();
    document.getElementById("width").value = "";
}

if (document.getElementById("width").focus) {
    document.getElementById("width").select();
    document.getElementById("height").value = "";
}

if (document.getElementById("codebar").focus) {
    document.getElementById("codebar").select();
}

//process width and height
if (height == "" && width) {
    var height = width/9*6;
    document.getElementById("height").value = height;
} else if (width == "" && height) {
    var width = height/6*9;
    document.getElementById("width").value = width;
} else if (width == "" && height == "") {
    var width = 846;
    var height = 568;
    document.getElementById("height").value = height;
    document.getElementById("width").value = width;
}

console.log("height: " + height);
console.log("width: " + width);

//make http requests. 
//referring to https://www.kirupa.com/html5/making_http_requests_js.htm.
var makeHttpRequest = new XMLHttpRequest();
makeHttpRequest.open('GET', requestURL, true);
makeHttpRequest.send();
makeHttpRequest.onreadystatechange = processRequest;

function processRequest(e) {
    if (makeHttpRequest.readyState == 4 && makeHttpRequest.status == 200) {
        var cid = JSON.parse(makeHttpRequest.responseText);
        console.log(cid.cid);
        var embedCode = "<iframe id=" + idcf + " src=\"//player.bilibili.com/player.html?aid=" + uid + "&cid=" + cid.cid + "&page=" + arraynum + " scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\"" + " style=\"width: " + width + "px; height: " + height + "px; max-width: 100%" + "\"> </iframe>";
        document.getElementById("codebar").value = embedCode;
        document.getElementById("preview").innerHTML = embedCode;
    }
}
}

else {
  var embedCode = "Invalid URL. Try again. Bangumis are not supported by far.";
  document.getElementById("codebar").value = embedCode;
}
}
