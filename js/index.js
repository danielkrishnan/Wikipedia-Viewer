function getResults() {
  if ($("#search-input").val() === "") {
    alert("Please enter a search value");
  } else {
    var api = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";

    var text = $("#search-input")
      .val()
      .replace(/\s/g, "%20");

    //properly format the API call

    var query = api + text + "&format=json&origin=*";

    var wiki = "https://en.wikipedia.org/wiki/";

    $.ajax({
      type: "GET",
      value: "json",
      url: query,
      success: function(data) {
        //flush out any existing results
        $("#results").empty();

        //loop through all of the results returned from the API call

        //if there's more than one search result, skip the first "[RESULT] may         //refer to..."
        if (data[1].length > 1) {
          for (i = 1; i < data[1].length; i++) {
            var resultUrl = data[3][i];
            var resultTitle = "<h1>" + data[1][i] + "</h1>";
            var resultInfo = "<p>" + data[2][i] + "</p>";

            $("#results").append(
              "<a class='list-group-item' href=" +
                resultUrl +
                ">" +
                resultTitle +
                resultInfo +
                "</a>"
            );
          }
        } else {
          /*if there's only one element, just return the first */ var resultUrl =
            data[3][0];
          var resultTitle = "<h1>" + data[1][0] + "</h1>";
          var resultInfo = "<p>" + data[2][0] + "</p>";

          $("#results").append(
            "<a class='list-group-item' href=" +
              resultUrl +
              ">" +
              resultTitle +
              resultInfo +
              "</a>"
          );
        }
      },
      cache: false
    });
  }
}

$("#search-button").on("click", getResults);