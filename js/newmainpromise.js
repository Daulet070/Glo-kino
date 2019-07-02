const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
function apiSearch(event){
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=8f8c3467181176d1ebdb4981808861fd&language=ru&query=' + 
    searchText;
    movie.innerHTML = 'Загрузка';
    requestApi(server)
        .then(function(result){
            const output = JSON.parse(result);
            console.log(output);
            let inner = '';
            output.results.forEach(function (item){
                let nameItem1 = 'https://image.tmdb.org/t/p/original' + item.poster_path;
                let nameItem2 = item.name || item.title;
                let nameItem3 = item.first_air_date || item.release_date;
                let nameItem4 = item.vote_average;
                let nameItem5 = item.overview;
                // console.log(nameItem);
                inner += `
                        <div class="row wraper jumbotron">
                            <div class="col-12 col-md-4 col-lg-3 media">
                                <img src="${nameItem1}" class="poster"></img>
                            </div>
                            <div class="col-12 col-md-8 col-lg-9 info">
                                <div class="title"><h3>${nameItem2}</h3></div>
                                <div class="date">Дата выхода: ${nameItem3}</div>
                                <div class="vote">Оценка: ${nameItem4}/10</div>
                                <div class="desc"><p>${nameItem5}</p></div>
                            </div>
                        </div>
                        `;
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason){
            movie.innerHTML = 'Ops!';
            console.log('error: ' + reason.status);
        });
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url){
    return new Promise (function (resolve, reject){
        const request = new XMLHttpRequest();
        request.open('GET', url);

        request.addEventListener('load', function(){
            if (request.status !== 200){
                reject({status: request.status});
                return;
            }
            resolve(request.response);
        });
        
        request.addEventListener('error', function(){
            reject({status: request.status});
        });
        request.send();
    });
}