function createMovieCard(title, director, rating, description, genres, imgUrl, cast, boxOffice) {
    var card = document.createElement("div");
    card.className = "cardElement";

    const temp = genres.split(',');
    
    card.innerHTML = `
            <div class="row g-0">
                <div class="col-md-2">
                    <img src="https://image.tmdb.org/t/p/w500${imgUrl}" style="background-size: cover; width: 100%; height: 100%;">
                </div>
            <div class="col-md-10">
            <div class="card-body MovieText">
            <h3 class="card-title">${title}</h3>
            <h6 class="card-text">1981 ‧ Adventure/Action ‧ 1h 55m</h6>
            <h4 class="card-text">${description}</h4>
            <p class="card-text"><strong>Director:</strong> ${director}</p>
            <p class="card-text"><strong>Box Office:</strong> ${boxOffice}</p>
            <p class="card-text"><strong>Actors:</strong> ${cast}</p>
            <p class="card-text">IMDB:</strong> ${rating}/10</p>
            <div class="buttons">
                <button type="button" class="btn wishlistBtn">Wishlist</button>
                <button type="button" class="btn trailerBtn">Trailer</button>
            </div>
            </div>
                </div>        
            </div>
    `;

    return card;
}

function loadData() {

    document.getElementById("card-container").innerHTML = "";

    if (localStorage.getItem("movie") === null) {
        return;
    }

    var moviesData = JSON.parse(localStorage.getItem("movie"));

    moviesData.forEach(movieData => {

        var movieCard = createMovieCard(movieData.title, movieData.director, movieData.rating, movieData.description, movieData.genres, movieData.imgUrl);
        document.getElementById("card-container").appendChild(movieCard);

    });
}

$(document).ready(function() {
    loadData();
});
