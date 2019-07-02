const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
function apiSearch(event){
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=8f8c3467181176d1ebdb4981808861fd&language=ru&query=' + 
    searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url){
    const request = new XMLHttpRequest();
    // console.log(request);
    request.open(method, url);
    request.send();
    request.addEventListener('readystatechange', function() {
        // console.log(request.readyState);
        if(request.readyState !== 4){
            movie.innerHTML ='Загрузка';
            return;
        }
        if(request.status !==200){
            movie.innerHTML ='Упс, что то не так!';
            console.log('error: ' + request.status);
            return;
        }
        const output = JSON.parse(request.responseText);
        let inner = '';
        output.results.forEach(function(item){
            let nameItem = item.name || item.title;
            let nameItem1 = item.overview;
            let nameItem2 = item.first_air_date || item.release_date;
            let nameItem3 = 'https://image.tmdb.org/t/p/original' + item.poster_path;
            let nameItem4 = item.vote_average;
            // console.log(nameItem);
            inner += `<div class="row wraper jumbotron">
                            <div class="col-12 col-md-4 col-lg-3 media">
                                <img src="${nameItem3}"class="poster"></img>
                            </div>
                            <div class="col-12 col-md-8 col-lg-9 info">
                                <div class="title"><h3>${nameItem}</h3></div>
                                <div class="date">Дата выхода: ${nameItem2}</div>
                                <div class="vote">Оценка: ${nameItem4}/10</div>
                                <div class="desc"><p>${nameItem1}</p></div>
                            </div>
                        </div>`;
        });
        movie.innerHTML = inner;
        console.log(output);
    });

}