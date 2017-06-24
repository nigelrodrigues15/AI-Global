/**
 * Created by chico_percedes on 2017-06-24.
 */

$(function() {
    var params = {
        // Request parameters
    };

    var instagram_clientid = "cdb6ebd6ab4841d3a518e9ecaef9213d";
    var instagram_secretkey = "43ef1a2a7c484f17aeede55a343ba6fc";

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

        var highest = Math.max(anger, contempt, disgust, fear, happiness, neutral, sadness, surprise);

        $('#highest').html("<p>" + highest + "</p>");

    };

});