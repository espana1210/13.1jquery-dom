let currentId = 0;
let moviesList = [];

$(function() {
  //when you click the delete button, remove the closest parent tr
  $("#movie-form").on("submit", function(e){
    e.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieData = { title, rating, currentId };

    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentId ++
    moviesList.push(movieData);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#movie-form").trigger("reset");
  });

// when the delete button is clicked, remove the closest parent tr and remove from the array of movies

  $("tbody").on("click", ".btn.btn-danger",
  function(e){
//find the index where this movie is
    let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(e.target).data("deleteId"))

// remove it from the array of movies
    moviesList.splice(indexToRemoveAt, 1)

// remove it from the DOM
    $(e.target)
    .closest("tr")
    .remove();
  });

// figure out what direction we are sorting and the key to sort by
  $(".fas").on("click", function(e){
    let direction = $(e.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(e.target).attr("id");
    let sortedMovies = sortBy(moviesList,
    keyToSortBy, direction);

// empty the table
$("#movie-table-body").empty();

// loop over our objects of sortedMovies nad append a new row
for (let movie of sortedMovies) {
  const HTMLtoAppend = createMovieDataHTML(movie);
  $("#movie-table-body").append(HTMLtoAppend);
}

  // toggle the arrow
  $(e.target).toggleClass("fa-sort-down");
  $(e.target).toggleClass("fa-sort-up");
  });
});

function sortBy(array, keyToSortBy, direction){
  return array.sort(function(a, b){
    if (keyToSortBy === "rating"){
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1: -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

function createMovieDataHTML(data){
  return `
  <tr>
  <td>${data.title}</td>
  <td>${data.rating}</td>
  <td>
  <button class="btn btn-danger"
  data-delete-id=${data.currentId}>
  Delete
  </button>
  </td>
  <tr>
  `;
}

  

