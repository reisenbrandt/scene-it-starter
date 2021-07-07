console.log('script')
const movieContainer = document.querySelector('.movieContainer');
const watchlist = localStorage.getItem('watchlist')
const watchlistParse = JSON.parse(watchlist)
// const searchButton = document.querySelector('.searchButton');

document.addEventListener('DOMContentLoaded', function () {
    console.log(watchlist);
    // localStorage.getItem('watchlist');
    renderContent();
})

function renderContent() {
    return movieContainer.innerHTML = renderMovies();
}

function renderMovies() {
    console.log(watchlist.length);
    console.log(watchlistParse.length);
    return watchlistHTMLArray = watchlistParse.map((currentMovie) => {
        return `
        <div class="movieStyle">
            <img src="${currentMovie.Poster}" height="444px" width="300px">
            <h5 class="movie-title">${currentMovie.Title}</h5>
            <div class="movieFooter">
                <span class="release-date">${currentMovie.Year}</span>
                <a href="#" class="btn btn-warning add-btn" data-imdbid="${currentMovie.imdbID}">Remove</a>
            </div>
        </div>`;
    }).join('');
}

