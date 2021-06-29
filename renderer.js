var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
//var runButton = document.getElementById("run");
var testButton = document.getElementById("test");
var otherTestButton = document.getElementById("otherTest");

//old one: AIzaSyASmKIMfbQsbislLQG99ezyVigVCYYLBjo
var youtubeAPIKey = 'AIzaSyCRKMtdFUeAcyPvgh9c-yO36NvQ5jnvZfg'; 
var playlistId = 'PLp5Ie3eol3uMlez6wv9LGx7oDU2OnVykL';
var youtubeGET = 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY]';
var channelId = 'UCDK5FCSaeUHr_AwtHD0tN_w';
var passedData;


var input;
testButton.onclick = function() {
  input = document.getElementById("channel_id").value;
  myConsole.log("Channel ID: " + input);
  //$(".collection").empty();
  channelId = input;

  playlistLoad(input);
};
function playlistLoad(id) {
  $(function() {
  	$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id='+channelId+'&key='+youtubeAPIKey, function(data) {
      passedData = data;
  		myConsole.log(JSON.stringify(data));
  		//$(".Results").append('<li>'+data.items[0].contentDetails.relatedPlaylists.uploads+'</li>');

  		playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;
  	});

  	getPlaylists(playlistId);
  });
};

var i;
var ytTitles;
var ytThumbnails;
var ytChannelName;
var ytPlaylistName;
function getPlaylists(id) {
  $.getJSON('https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId='+channelId+'&maxResults=25&key='+youtubeAPIKey, function(data) {
    myConsole.log(JSON.stringify(data));
    //myConsole.log(data.pageInfo.totalResults);
    $(".playlists").empty();
    for (i=0; i < data.pageInfo.totalResults; i++) {
        ytTitles = data.items[i].snippet.title;
        ytThumbnails = data.items[i].snippet.thumbnails.high.url;
        ytChannelName = data.items[i].snippet.channelTitle;
        ytPlaylistId = data.items[i].id;
        $(".playlists").append(
          '<a class="black-text"> <li class="collection-item avatar grey darken-2 waves-effect waves-light btn songButton" onclick="getSongs('+[i]+')">'+
          '<img src="'+ytThumbnails+'" class="circle">'+
          '<span class="title black-text playlistName'+[i]+'">'+ytTitles+'</span>'+
          '<p class="black-text"> '+ytChannelName+' </p>'+
          '<p class="playlistId'+[i]+'" hidden>'+ytPlaylistId+'</p> </li> </a>');
        myConsole.log(ytTitles);
    }
  });
};

otherTestButton.onclick = function() {
  input = document.getElementById("other_channel_id").value;
  myConsole.log("Channel ID: " + input);
  //$(".collection").empty();
  channelId = input;
  otherPlaylistLoad(input);
};
function otherPlaylistLoad(id) {
  $(function() {
  	$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id='+channelId+'&key='+youtubeAPIKey, function(data) {
      passedData = data;
  		myConsole.log(JSON.stringify(data));
  		//$(".Results").append('<li>'+data.items[0].contentDetails.relatedPlaylists.uploads+'</li>');

  		playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;
  	});

  	getOtherPlaylists(playlistId);
  });
};
function getOtherPlaylists(id) {
  $.getJSON('https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId='+channelId+'&maxResults=25&key='+youtubeAPIKey, function(data) {
    myConsole.log(JSON.stringify(data));
    //myConsole.log(data.pageInfo.totalResults);
    $(".otherPlaylists").empty();
    for (i=0; i < data.pageInfo.totalResults; i++) {
        ytTitles = data.items[i].snippet.title;
        ytThumbnails = data.items[i].snippet.thumbnails.high.url;
        ytChannelName = data.items[i].snippet.channelTitle;
        ytPlaylistId = data.items[i].id;
        $(".otherPlaylists").append(
          '<a class="black-text"> <li class="collection-item avatar grey darken-2 waves-effect waves-light btn songButton" onclick="getOtherSongs('+[i]+')">'+
          '<img src="'+ytThumbnails+'" class="circle">'+
          '<span class="title black-text otherPlaylistName'+[i]+'">'+ytTitles+'</span>'+
          '<p class="black-text"> '+ytChannelName+' </p>'+
          '<p class="otherPlaylistId'+[i]+'" hidden>'+ytPlaylistId+'</p> </li> </a>');
        myConsole.log(ytTitles);
    }
  });
};
var testNum;
function getOtherSongs(playlistNum) {
  ytPlaylistId = $('.otherPlaylistId'+playlistNum).text();
  ytPlaylistName = $('.otherPlaylistName'+playlistNum).text();
  myConsole.log(ytPlaylistId);
  myConsole.log(ytPlaylistName);
  if ($('.songs').attr('class') == 'col s12 songs') {
    $('.songs').empty();
    $('.songs').append('<h2 class="playlistNameSongHeader"> '+ytPlaylistName+' </h2>');
    loadSongsFrom(ytPlaylistId);
  } else {
    $('.songs').removeClass().addClass('col s12 songs');
    $('.songs').append('<h2 class="playlistNameSongHeader"> '+ytPlaylistName+' </h2>');
    loadSongsFrom(ytPlaylistId);
  }
};

var testData;
function getSongs(playlistNum) {
  ytPlaylistId = $('.playlistId'+playlistNum).text();
  ytPlaylistName = $('.playlistName'+playlistNum).text();
  myConsole.log(ytPlaylistId);
  myConsole.log(ytPlaylistName);
  if ($('.songs').attr('class') == 'col s12 songs') {
    $('.songs').empty();
    $('.songs').append('<h2 class="playlistNameSongHeader"> '+ytPlaylistName+' </h2>');
    loadSongsFrom(ytPlaylistId);
  } else {
    $('.songs').removeClass().addClass('col s12 songs');
    $('.songs').append('<h2 class="playlistNameSongHeader"> '+ytPlaylistName+' </h2>');
    loadSongsFrom(ytPlaylistId);
  }
};
var ytSongTitles;
var ytSongThumbnails;
function loadSongsFrom(id) {
  $.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId='+id+'&maxResults=25&key='+youtubeAPIKey, function(data) {
    var i;
    for (i = 0; i < data.pageInfo.resultsPerPage; i++) {
      ytSongTitles = data.items[i].snippet.title;
      ytChannelName = data.items[i].snippet.channelTitle;
      ytThumbnails = data.items[i].snippet.thumbnails.high.url;
      $('.playlistNameSongHeader').append(
        '<ul class="collection white songsList">'+
          '<li class="collection-item avatar btn songButton">'+
            '<img src="'+ytThumbnails+'" class="circle">'+
            '<span class="title black-text">'+ytSongTitles+'</span>'+
            '<p class="black-text">'+ytChannelName+'</p>'+
            '</li>'+
          '</ul>'
      );
    };
  });
};
