const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieYear = document.getElementById('year');
const movieActors = document.getElementById('actors');
const runningTime = document.getElementById('time');
const movieType = document.getElementById('movie-type');
const search = document.getElementById('search');
const spinner = document.getElementById('loading-spinner');
const results = document.querySelector('.results');

const api_key = config.MY_KEY;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': api_key,
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

async function getData(movieName){
    const response = await fetch(`https://imdb8.p.rapidapi.com/title/find?q=${movieName}`, options);
    const data = await response.json();
    return data;
}


search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        // Trigger the button element with a click
        searchBtn.click();
    }
});


searchBtn.addEventListener('click', async() => {
     spinner.style.display = 'block';
    results.style.display ='none';
    const movieName = searchInput.value;
    const data = await getData(movieName);
    showMovieData(data);

});
// let the awaited data now be processed by showMovieData() function

// const handleError = (err) => {
//     console.log('error!');
//     console.log(err);
// }

const showMovieData = (processData) => {
   console.log(processData.results[0])
   moviePoster.src = `${processData.results[0].image.url}`;
   movieTitle.innerText = `TITLE: ${processData.results[0].title}`.toUpperCase();
    movieYear.innerText = `YEAR: ${processData.results[0].year}`;
    movieActors.innerText = `ACTORS: ${processData.results[0].principals[0].name}`;
    movieType.textContent = `MOVIE TYPE: ${processData.results[0].titleType}`;
    runningTime.textContent = `TIME: ${processData.results[0].runningTimeInMinutes}`;

     spinner.style.display = 'none';
    results.style.display ='block';

}

// Show the first result or movie details after DOMContentLoaded event is fired

// window.addEventListener('DOMContentLoaded', () => {
//  showMovieData();
// });



/*Remaining
1. A loader GIF to be displayed till data is fetched
2. When window Dom is loaded, show the first result dynamically
3. Remove the static info of the first avatar result on default
4. Hide API KEY */