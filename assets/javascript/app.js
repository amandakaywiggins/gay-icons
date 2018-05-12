var gayArray = ["Cher" , "Elton John" , "Hayley Kiyoko" , "Ru Paul" , "Ariana Grande" , "Celine Dion" ,
                "Judy Garland" , "Ellen Degeneres" , "George Michael" , "Madonna"];

function displayGayGifs() {
    var gay = $(this).attr("data-gay");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gay + "&api_key=dc6zaTOxFJmzC&limit=10";
        
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        $("button").on("click", function() {
        for (var i = 0; i < results.length; i++) {
            var gayDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gayImage = $("<img>");
            gayImage.attr("src", results[i].images.fixed_height.url);
            gayDiv.append(p);
            gayDiv.append(gayImage);
            $("#display-gifs").prepend(gayDiv);
        }
        });
    });
};
    
function renderButtons() {
    $("#new-buttons").empty();
    for (var i = 0; i < gayArray.length; i++) {
        var a = $("<button>");
        a.addClass("gay");
        a.attr("data-gay", gayArray[i]);
        a.text(gayArray[i]);
        $("#new-buttons").append(a);
    };
};

$("#add-button").on("click", function(event) {
    event.preventDefault();

    var gayIcon = $("#gif-input").val().trim();

    gayArray.push(gayIcon);

    renderButtons();
});

$(document).on("click", ".gay", displayGayGifs);

renderButtons();