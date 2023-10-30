function createMovieData(title, director, rating, description, genres, imgUrl, cast, boxOffice, backdrop_path, date, length, actors) {
    var card = document.createElement("div");
    card.className = "cardElement";

    const temp = genres.split(',');
    
    card.innerHTML = `
            <div class="heroImage" style="background-image: url(https://image.tmdb.org/t/p/w500${imgUrl}); background-size: cover">
                <div class="playButton">
                    <img src="../assets/movie/PlayButton.svg" width="100px" height="100px">
                </div>
                <div class="heroImageGradient"></div>
            </div>

            <div class="Moviebanner">
                <img src="../assets/movie/Banner.svg">
            <h1 class="banner-text">${title}</h1>
            </div> 
                
            </div>
            <div class="card mb-3 movieContent" id="card-container">
                <div class="row g-0">
                <div class="col-md-2">
                    <img src="https://image.tmdb.org/t/p/w500${imgUrl}" style="background-size: cover; width: 100%; height: 100%;">
                </div>
                <div class="col-md-10">
                <div class="card-body MovieText">
                <h3 class="card-title">${title}</h3>
                <h6 class="card-text">${date} ‧ ${genres} ‧ ${length}</h6>
                <h4 class="card-text">${description}</h4>
                <p class="card-text"><strong>Director:</strong> ${director}</p>
                <p class="card-text"><strong>Box Office:</strong> ${boxOffice}</p>
                <p class="card-text"><strong>Actors:</strong> ${actors}</p>
                <p class="card-text">IMDB:</strong> ${rating}/10</p>
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

function loadData() {

    document.getElementById("individaulMovie").innerHTML = "";
    
    

    if (localStorage.getItem("movie") === null) {
        return;
    }

    var moviesData = JSON.parse(localStorage.getItem("movie"));

    moviesData.forEach(movieData => {

        var movieCard = createMovieData(movieData.title, movieData.director, movieData.rating, movieData.description, movieData.genres, movieData.imgUrl, movieData.backdrop_path);
        document.getElementById("individaulMovie").appendChild(movieCard);

    });
    document.getElementById("individaulMovie").reset();
}

$(document).ready(function() {
    loadData();
});
