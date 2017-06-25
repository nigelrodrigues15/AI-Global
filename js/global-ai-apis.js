/**
 * Created by chico_percedes on 2017-06-24.
 */

$(function() {


    //hide all result divs
    hide(document.getElementById('anger_div'));
    hide(document.getElementById('contempt_div'));
    hide(document.getElementById('disgust_div'));
    hide(document.getElementById('fear_div'));
    hide(document.getElementById('happiness_div'));
    hide(document.getElementById('neutral_div'));
    hide(document.getElementById('sadness_div'));
    hide(document.getElementById('surprise_div'));

    var params = {
        // Request parameters
    };

    var instagram_clientid = "cdb6ebd6ab4841d3a518e9ecaef9213d";
    var instagram_secretkey = "43ef1a2a7c484f17aeede55a343ba6fc";
    var uri_redirect = "https://github.com/yxblee/AI-Global";
    var insta_code = "https://github.com/yxblee/AI-Global?code=d8689bef17da47cea344ebc92e598f6b";
    var insta_access_token = "5645620360.cdb6ebd.6d138fa6fac04089867a9ceae954de7d";

    var insta_user_auth_url = "https://api.instagram.com/oauth/authorize/?client_id=cdb6ebd6ab4841d3a518e9ecaef9213d&redirect_uri=https://github.com/yxblee/AI-Global&response_type=code&scope=public_content";

    var get_insta_token_curl = "    curl -F 'client_id=cdb6ebd6ab4841d3a518e9ecaef9213d' \
    -F 'client_secret=43ef1a2a7c484f17aeede55a343ba6fc' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=https://github.com/yxblee/AI-Global' \
    -F 'code=d8689bef17da47cea344ebc92e598f6b' \
    https://api.instagram.com/oauth/access_token";





    var hashtag;

    var jsonresults;

    $.ajax({
               url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
               beforeSend: function(xhrObj){
                   // Request headers
                   xhrObj.setRequestHeader("Content-Type","application/json");
                   xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","3fab902b4add4555bfd10686842091ee");
               },
               type: "POST",
               // Request body
               data: '{ "url" : "http://static2.businessinsider.com/image/5087f99369bedd394700000d/obama-press-conference-obamacare-sad.jpg" }',
           })
        .done(function(data) {
            console.log(data);
            paramupdate(data);
            appendhtml();
        })
        .fail(function(data) {
            console.log(data);
        });

    var token = '5645620360.cdb6ebd.6d138fa6fac04089867a9ceae954de7d',
        hashtag='smile', // hashtag without # symbol
        num_photos = 4;

    $.ajax({
               url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
               dataType: 'jsonp',
               type: 'GET',
               data: {access_token: token},
               success: function(data){
                   console.log(data);
                   // for(x in data.data){
                   //     $('ul').append('<li><img src="'+data.data[x].images.standard_resolution.url+'"></li>');
                   // }
               },
               error: function(data){
                   console.log(data);
               }
           });

    function paramupdate(value){
        jsonresults = value;
    }

    function appendhtml(){

        var anger = jsonresults[0].scores.anger;
        var contempt = jsonresults[0].scores.contempt;
        var disgust = jsonresults[0].scores.disgust;
        var fear = jsonresults[0].scores.fear;
        var happiness = jsonresults[0].scores.happiness;
        var neutral = jsonresults[0].scores.neutral;
        var sadness = jsonresults[0].scores.sadness;
        var surprise = jsonresults[0].scores.surprise;

        $('#anger').html("<p>" + anger + "</p>");
        $('#contempt').html("<p>" + contempt + "</p>");
        $('#disgust').html("<p>" + disgust + "</p>");
        $('#fear').html("<p>" + fear + "</p>");
        $('#happiness').html("<p>" + happiness + "</p>");
        $('#neutral').html("<p>" + neutral + "</p>");
        $('#sadness').html("<p>" + sadness + "</p>");
        $('#surprise').html("<p>" + surprise + "</p>");

        var highestNum = Math.max(anger, contempt, disgust, fear, happiness, neutral, sadness, surprise);
        var highest = "";

        switch(highestNum){
            case anger:
                highest = " Anger"
                show(document.getElementById('anger_div'));
                break;
            case contempt:
                highest = " Contempt"
                show(document.getElementById('contempt_div'));
                break;
            case disgust:
                highest = " Disgust"
                show(document.getElementById('disgust_div'));
                break;
            case fear:
                highest = " Fear"
                show(document.getElementById('fears_div'));
                break;
            case happiness:
                highest = " Happiness"
                show(document.getElementById('happiness_div'));
                break;
            case neutral:
                highest = " Neutral"
                show(document.getElementById('neutral_div'));
                break;
            case sadness:
                highest = " Sadness"
                show(document.getElementById('sadness_div'));
                break;
            case surprise:
                highest = " Surprise"
                show(document.getElementById('surprise_div'));
                break;
            default:
                highest = "Unknown";
        }

        $('#highest').html("<p>Dominant Emotion:" + highest + "</p>");

    };
	
});
function useHashtag(){
	var hashtag = document.getElementById('hashtag').value;
	console.log(hashtag);
	var div = document.getElementById('showHash');

    div.innerHTML = "";
	if(hashtag.charAt(0) != "#") {
		div.innerHTML = "#" + div.innerHTML + hashtag;
	} else {
		div.innerHTML = div.innerHTML + hashtag;
	}

}

function stopRKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
  if ((evt.keyCode == 32) && (node.type=="text"))  {return false;}
}

document.onkeypress = stopRKey;

function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}

function show (elements){
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'block';
  }
}