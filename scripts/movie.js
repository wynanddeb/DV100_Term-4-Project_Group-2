function createMovieCard(title, director, rating, description, genres, imgUrl) {
    var card = document.createElement("div");
    card.className = "cardElement";

    const temp = genres.split(',');
    

    const genresList = temp.map(genre => `<span class="badge rounded-pill text-bg-light">${genre}</span>`).join(" ");

    card.innerHTML = `
        <div class="card mb-3 movieContent" style="max-width: 85%; margin-top: 130px;">
            <div class="row g-0">
                <div class="col-md-2">
                    <img src="../assets/movie/MoviePoster.png" style="background-size: cover; width: 100%; height: 100%;">
                </div>
            <div class="col-md-10">
            <div class="card-body MovieText">
            <h3 class="card-title">Raiders of the Lost Ark</h3>
            <h6 class="card-text">1981 ‧ Adventure/Action ‧ 1h 55m</h6>
            <h4 class="card-text">"The Lost City of Legends" is an exhilarating adventure film that takes audiences on an unforgettable journey deep into the heart of an uncharted jungle. When renowned archaeologist Dr. Evelyn Carter (played by a charismatic lead actress) stumbles upon an ancient map that hints at the existence of a mythical lost city, she assembles a diverse team of experts to embark on a perilous expedition.</h4>
            <p class="card-text"><strong>Director:</strong> Steven Spielberg</p>
            <p class="card-text"><strong>Box Office:</strong> $2,106,950</p>
            <p class="card-text"><strong>Actors:</strong> Steven Spielberg</p>
            <p class="card-text">IMDB:</strong> 8.4/10</p>
            <div class="buttons">
                <button type="button" class="btn wishlistBtn">Wishlist</button>
                <button type="button" class="btn trailerBtn">Trailer</button>
            </div>
            </div>
                </div>        
            </div>
        </div>
    `;

    return card;
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
