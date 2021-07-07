console.log('script')
const movieContainer = document.querySelector('.movieContainer');
const searchButton = document.querySelector('.searchButton');
let apiDataArray = [];



function renderContent(data) {
    return movieContainer.innerHTML = renderMovies(data);
}

function renderMovies(movieArray) {
    console.log(movieArray);
    return movieHTMLArray = movieArray.map((currentMovie) => {
        return `
        <div class="movieStyle">
            <img src="${currentMovie.Poster}" alt="No Poster Available" height="444px" width="300px">
            <h5 class="movie-title">${currentMovie.Title}</h5>
            <div class="movieFooter">
                <span class="release-date">${currentMovie.Year}</span>
                <a href="#" class="btn btn-warning add-btn" data-imdbid="${currentMovie.imdbID}">Add</a>
            </div>
        </div>`;
    }).join('');
}

searchButton.addEventListener('click', function(e) {
    e.preventDefault();
    const searchString= document.querySelector('.search-bar').value
    // console.log(searchString)
    const searchValue = encodeURIComponent(searchString)
    // console.log(searchValue)
    fetch('http://www.omdbapi.com/?apikey=59354c85&s="' + searchValue)
        .then((res) => {
            return res.json();
        })
        .then(function(data) {
            // console.log(data.Search);
            // renderMovies(data.Search);
            renderContent(data.Search);
            apiDataArray = data.Search;
            console.log(apiDataArray);

        })

})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
        const movieID = e.target.dataset.imdbid;
        e.preventDefault();
        e.target.textContent = 'Added';
        console.log(movieID)
        saveToWatchlist(movieID);
    }
})

function saveToWatchlist(movieID) {
    const watchMovie = apiDataArray.find((currentMovie) => {
        return currentMovie.imdbID == movieID;
    });
    console.log(watchMovie);
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);

    if (watchlist == null) {
        watchlist = [];
    };
    
    watchlist.push(watchMovie);
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    console.log(watchlist)
}