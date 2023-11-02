// HTML template for the movie card
function createMovieCard(movie) {
    const director = movie.director ? movie.director : "N/A";
    const rating = movie.vote_average ? movie.vote_average : "N/A";

    return `
        <div class="col-6 col-lg-3 col-md-4 col-xl-2 mb-3">
            <div class="movie-container">
                <img class="movie-block" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                <div class="img-overlay">
                    <h4>${movie.title}</h4>
                    <p>Director: ${director} <br> Rating: ${rating}</p>
                    <button type="button" class="btn">
                        <div class="row movie-links">
                            <div class="col-8">
                            <img class="btn-movies" src="../assets/Retro-btn.svg" onclick="addToLocalStorageAndGoToMovie('${movie.title}','${director}','${rating}','${movie.description}','${movie.genres}','${movie.poster_path}')">
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


// Clear the movieContainer
const movieContainer = $('#movieContainer');
movieContainer.empty();

const apiKey = '721f6c1ba010dd467b63985221a03ae9';

function fetchMovies(page) {
    const tmdbEndpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&include_video=true&language=en-USappend_to_response=credits,images&page=${page}`;

// API
    $.ajax({
        url: tmdbEndpoint,
        method: 'GET',
        success: function (data) {
            const movies = data.results.slice(0, 60); // Load only 25 movies

            movies.forEach(function (movie, index) {
                console.log(`Movie ${index + 1}:`);
                console.log(`Title: ${movie.title}`);
    
                const movieId = movie.id;
                const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;
    
                $.ajax({
                    url: movieDetailsEndpoint,
                    method: 'GET',
                    success: function (movieDetails) {
                        const director = movieDetails.credits.crew.find(person => person.job === "Director");                                         
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
           
    });
}

// Fetch movies from more pages
fetchMovies(2); 
fetchMovies(3); 
fetchMovies(4); 

           
// Add to Watchlist button

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

// Watch now Button

function addToLocalStorageAndGoToMovie(title, director, rating, description, genres, imageurl, cast, boxOffice) {
    // Create an object with the movie data
    const temp = {
        'title': title,
        'director': director,
        'rating': rating,
        'description': description,
        'genres': genres,
        'imgUrl': imageurl,
        'actors': cast,
        'box-office': boxOffice
    };

    // Check if local storage already contains a 'movie' key
    if (localStorage.getItem('movie') === null) {
        // If not, create a new array and add the movie data
        localStorage.setItem('movie', JSON.stringify([temp]));
    } else {
        // If it exists, retrieve the existing data, add the new movie data, and update local storage
        const movie = JSON.parse(localStorage.getItem('movie'));
        movie.push(temp);
        localStorage.setItem('movie', JSON.stringify(movie));
    }

    // Redirect to the website
    window.location.href = '../pages/movie.html';
    
}

// Filtering





