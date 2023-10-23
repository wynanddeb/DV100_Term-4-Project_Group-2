// HTML template for the movie card
function createMovieCard(movie) {
    const director = movie.director ? movie.director : "N/A";
    const rating = movie.vote_average ? movie.vote_average : "N/A";

    return `
        <div class="col-sm-6 col-lg-3 col-md-4 col-xl-3 mb-3 col-xxl-2">
            <div class="movie-container">
                <img class="movie-block" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                <div class="img-overlay">
                    <h3>${movie.title}</h3>
                    <p>Director: ${director} <br> Rating: ${rating}</p>
                    <button type="button" class="btn">
                        <div class="row movie-links">
                            <div class="col-8">
                                <img class="btn-movies" src="../assets/Retro-btn.svg">
                            </div>
                            <div class="col-4">
                                <img class="add-btn" src="../assets/Add-btn.svg" onclick="addToWatchList('${movie.title}','${director}','${rating}','${movie.description}','${movie.genres}','${movie.poster_path}')">
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>`;
}

const apiKey = '721f6c1ba010dd467b63985221a03ae9';
const tmdbEndpoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

// Clear the movieContainer
const movieContainer = $('#movieContainer');
movieContainer.empty();

// API
$.ajax({
    url: tmdbEndpoint,
    method: 'GET',
    success: function (data) {
        const movies = data.results.slice(0, 25); // Load only 8 movies

        movies.forEach(function (movie, index) {
            console.log(`Movie ${index + 1}:`);
            console.log(`Title: ${movie.title}`);

            const movieId = movie.id;
            const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;

            $.ajax({
                url: movieDetailsEndpoint,
                method: 'GET',
                success: function (movieDetails) {
                    console.log(`Title: ${movie.title}`);
                    const director = movieDetails.credits.crew.find(person => person.job === "Director");
                    console.log(`Director: ${director ? director.name : "N/A"}`);
                    console.log(`Description: ${movieDetails.overview}`);
                    console.log(`Viewer Rating: ${movie.vote_average}`);
                    
                    const genresArr = [];

                    movieDetails.genres.forEach(function(genre){
                        genresArr.push(genre.name);
                    });

                    // Create the movie card HTML and append it to the container
                    const movieCard = createMovieCard({
                        title: movie.title,
                        director: director ? director.name : "N/A",
                        vote_average: movie.vote_average,
                        poster_path: movie.poster_path,
                        description: movieDetails.overview,
                        genres: genresArr
                    });

                    // Append the card to the container
                    movieContainer.append(movieCard);

                    console.log('-------------------------');
                    
                },
                error: function (error) {
                    console.log('Error:', error);
                }
            });
        });
    },
    error: function (error) {
        console.log('Error:', error);
    }
    // Your existing code for fetching movie data goes here

       
});


function addToWatchList(title,director,rating, description, genres, imageurl){
    console.log(genres)
    const temp = {
        'title':title,
        'director':director,
        'rating':rating,
        'description':description,
        'genres':genres,
        'imgUrl':imageurl
    }

    if(localStorage.getItem('watchList') === null){
        localStorage.setItem('watchList',JSON.stringify([temp]));
    }
    else{
        const watchList = JSON.parse(localStorage.getItem('watchList'));
        watchList.push(temp);
        localStorage.setItem('watchList',JSON.stringify(watchList));
    }
 

}