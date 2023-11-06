function createMovieCard(title, director, rating, description, genres, imgUrl) {
    var card = document.createElement("div");
    card.className = "card mb-3";
    card.style.backgroundColor = "#0C3948";

    const temp = genres.split(',');
    

     const genresList = temp.map(genre => `<span class="badge rounded-pill text-bg-light">${genre}</span>`).join(" ");

    card.innerHTML = `
        <div class="row g-0">
          <div class="col-md-2">
            <img src="https://image.tmdb.org/t/p/w500${imgUrl}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title" style="font-family: 'Luckiest Guy', cursive">${title}</h5>
              <p class="card-text" style="font-family: 'Lato', sans-serif">${director}</p>
              <p class="card-text" style="font-family: 'Lato', sans-serif">Rating: ${rating}</p>
              <p class="card-text" style="font-family: 'Lato', sans-serif">Description: ${description}</p>
              <div class="card-content-bottom">
              <div class="genres">
                ${genresList}
            </div>
            <a href="movie.html">
            <img class="btn-movies" src="../assets/Retro-btn.svg" onclick="addToLocalStorageAndGoToMovie('${title}','${director}','${rating}','${description}','${genres}','${imgUrl}')">
            </a>
                <div class="delete" onclick="deleteMovie('${title}')">
                  <i class="fa fa-remove fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;

    return card;
}

function addToLocalStorageAndGoToMovie(title, director, rating, description, genres, imageurl, cast, boxOffice, backdrop_path, movieId) {

  const temp = {
      'title': title,
      'director': director,
      'rating': rating,
      'description': description,
      'genres': genres,
      'imgUrl': imageurl,
      'actors': cast,
      'box-office': boxOffice,
      'backdrop_path': backdrop_path,
  };

  if (localStorage.getItem('movies') === null) {
      localStorage.setItem('movies', JSON.stringify([temp]));
  } else {
      const movies = JSON.parse(localStorage.getItem('movies'));
      movies.push(temp);
      localStorage.setItem('movies', JSON.stringify(movies));
  }
  window.location.href = 'movie.html';
}

function deleteMovie(title){
   
    var moviesData = JSON.parse(localStorage.getItem("watchList"));
    var index = moviesData.findIndex(movie => movie.title === title);
    moviesData.splice(index, 1);
    localStorage.setItem("watchList", JSON.stringify(moviesData));

    loadData();

}

function loadData() {

    document.getElementById("cards-container").innerHTML = "";

    if (localStorage.getItem("watchList") === null) {
        return;
    }

    var moviesData = JSON.parse(localStorage.getItem("watchList"));

    moviesData.forEach(movieData => {

        var movieCard = createMovieCard(movieData.title, movieData.director, movieData.rating, movieData.description, movieData.genres, movieData.imgUrl);
        document.getElementById("cards-container").appendChild(movieCard);

    });
}

$(document).ready(function() {
    loadData();
});
