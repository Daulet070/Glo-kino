const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/original';
function apiSearch(event){
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    if(searchText.trim().lenght === 0){
        movie. innerHTML = '<h2 class="col-12 text-center text-danger">Поле не должно быть пустым!</h2>';
        return;
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=8f8c3467181176d1ebdb4981808861fd&language=ru&query=' + 
    searchText;
    movie.innerHTML = '<span class="spinner"></span>';
    fetch(server)
        .then(function(value){
            if (value.status !== 200){
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output){
            let inner = '';
            output.results.forEach(function (item){
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/noposter.jpg';
                let nameItemTitle = item.name || item.title;
                let nameItemDate = item.first_air_date || item.release_date;
                inner += `
                    <div class="col-12 col-md-4 col-lg-3">
                        <div class="media">
                            <img src="${poster}" class="poster"></img>
                            <h3 class="title">${nameItemTitle}</h3>
                        </div>
                    </div>
                `;
            });
            movie.innerHTML = inner;
        })
        .catch(function (reason){
            movie.innerHTML = 'Ops!';
            console.error('error: ' + reason.status);
        });
}
searchForm.addEventListener('submit', apiSearch);

// <!--<div class="col-12 col-md-8 col-lg-9 info">
                        //     
                        //     <div class="date">Дата выхода: ${nameItemDate}</div>
                        //     <div class="vote">Оценка: ${item.vote_average}/10</div>
                        //     <div class="desc"><p>${item.overview}</p></div>
                        // </div>-->