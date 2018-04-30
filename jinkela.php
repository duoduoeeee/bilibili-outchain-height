<?php

function makeHttpRequest($aid, $p) {
    $RequestURL = file_get_contents('https://api.bilibili.com/x/player/pagelist?aid='.$aid.'&jsonp=jsonp');
    $pageListObject = json_decode($RequestURL);
    $pn = $p -1;

    $cid = $pageListObject -> data[$pn] -> cid;
    return array($cid);
}

?>
