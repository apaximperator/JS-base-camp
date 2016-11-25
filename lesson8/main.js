(function() {
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');
    let heroInfoList = document.getElementById('hero-info');
    let heroFilmsList = document.getElementById('hero-films');
    let loadingBlock = document.getElementById('loading');
    let currentHeroInfo = {};
    let currentHeroFilms = [];
    let index = 1;
    let loading = false;
    // !
    document.addEventListener("DOMContentLoaded", ()=>{
        getHero(index);
        prev.addEventListener('click', e=>{
            if (loading) {
                return;
            }
            if (index <= 1) {
                prev.classList.add('disabled');
                // disable(prev, true);
                return;
            }
            if (index === 2) {
                prev.classList.add('disabled');
            }
            getHero(--index);
            if (index === 87) {
                next.classList.remove('disabled');
            }
        }
        );
        next.addEventListener('click', e=>{
            if (loading) {
                return;
            }
            if (index >= 88) {
                next.classList.add('disabled');
                // disable(next, true);
                return false;
            }
            if (index === 87) {
                next.classList.add('disabled');
            }
            getHero(++index);
            if (index === 2) {
                prev.classList.remove('disabled');
            }
        }
        );
    }
    );
    function disable(node, value) {
        node.disabled = value
    }
    function enable(node, value) {
        node.enable = value
    }
    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }
    function json(response) {
        return response.json()
    }
    function copySomeProps(o1, o2, howMany) {
        let counter = 0;
        for (let prop in o2) {
            if (o2.hasOwnProperty(prop)) {
                if (counter > howMany - 1)
                    break;
                counter++;
                o1[prop] = o2[prop];
            }
        }
    }
    function toNormalCase(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1).split('_').join(' ');
    }
    function renderHeroInfo(hero) {
        let fragment = document.createDocumentFragment();
        for (let prop in hero) {
            if (hero.hasOwnProperty(prop)) {
                let li = document.createElement('li');
                li.textContent = toNormalCase(prop) + ': ' + hero[prop];
                fragment.appendChild(li);
            }
        }
        heroInfoList.appendChild(fragment);
    }
    function renderHeroFilms(films) {
        let fragment = document.createDocumentFragment();
        films = films.sort((a,b)=>a.id - b.id);
        films.map(film=>{
            let li = document.createElement('li');
            let liContent = `Episode ${film.id}: ${film.title}`;
            li.textContent = toNormalCase(liContent);
            fragment.appendChild(li);
        }
        );
        heroFilmsList.appendChild(fragment);
    }
    function getHero(index) {
        heroInfoList.innerHTML = '';
        heroFilmsList.innerHTML = '';
        loadingBlock.innerHTML = '<h3 class="loading-text">Loading...</h3>';
        loading = true;
        // !
        fetch('http://swapi.co/api/people/' + index).then(status).then(json).then(data=>{
            copySomeProps(currentHeroInfo, data, 8);
            return Promise.all(data.films.map(url=>fetch(url)));
        }
        ).then(responses=>Promise.all(responses.map(response=>response.json()))).then(films=>{
            currentHeroFilms.length = 0;
            films.forEach(film=>{
                currentHeroFilms.push({
                    title: film.title,
                    id: film.episode_id
                });
            }
            );
        }
        ).then(()=>{
            loadingBlock.innerHTML = '';
            renderHeroInfo(currentHeroInfo);
            renderHeroFilms(currentHeroFilms);
        }
        ).catch(err=>{
            console.log('Something wrong with fetch...', err);
            loading = false;
        }
        ).then(()=>loading = false);
    }
})();
