var gayArray = ["Cher" , "Elton John" , "Lady Gaga" , "Hayley Kiyoko" , "Ru Paul" , "Ariana Grande" , "Liberace" , "Celine Dion" ,
                "Judy Garland" , "Ellen Degeneres" , "Georgia Michael" , "Madonna"];

function displayGayGifs() {
    $("button").on("click", function() {
        var gay = $(this).attr("data-gay");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gay + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.data;
            
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
}
    
function renderButtons() {
    $("#new-buttons").empty();
    for (var i = 0; i < gayArray.length; i++) {
        var a = $("<button>");
        a.addClass("gay");
        a.attr("data-gay", gayArray[i]);
        a.text(gayArray[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-button").on("click", function(event) {
    event.preventDefault();

    var gayIcon = $("#gif-input").val().trim();

    gayArray.push(gayIcon);

    renderButtons();
});

$(document).on("click", ".gay", displayGayGifs);

renderButtons();
