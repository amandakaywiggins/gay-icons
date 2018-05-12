var gayArray = ["Cher" , "Elton John" , "Simon Amstell", "John Barrowman" , "Hayley Kiyoko" , "Ru Paul" , "Ariana Grande" , "Celine Dion" ,
                "Judy Garland" , "Ellen Degeneres" , "George Michael" , "Madonna" , "Samira Wiley"];

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
            gayDiv.addClass("image-style");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gayImage = $("<img>");
            var imageURL = results[i].images.fixed_height.url
            var stillImageURL = results[i].images.fixed_height_still.url;
            gayImage.attr("src", stillImageURL);
            gayImage.attr("data-still" , stillImageURL);
            gayImage.attr("data-animate" , imageURL);
            gayImage.attr("data-state" , "still");
            gayImage.addClass("animateThatBitch");
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

$(document).on("click" , "img.animateThatBitch" , function() {
    console.log(this)
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src" , $(this).attr("data-animate"));
        $(this).attr("data-state" , "animate");
    } else {
        $(this).attr("src" , $(this).attr("data-still"));
        $(this).attr("data-state" , "still");
    }
}); 

renderButtons();