// Get Favourite Heroes from Local Storage
function getFavs(){
    let favs;
    if(localStorage.getItem('favHeroes') === null){
        favs = [];
    }else{
        favs = JSON.parse(localStorage.getItem('favHeroes'));
    }
    return favs;
}

/* store favourites */
let favHeroes = getFavs();

/* GET ALL ELEMENTS */
let favListName = document.getElementById('fav-list-ul');
let heading = document.getElementById('heading');

//if list is empty show message
if(favHeroes.length == 0){
    let EmptyMessage = document.createElement('div');
    EmptyMessage.className = 'empty-list';
    EmptyMessage.innerHTML = "Favourite List is Empty! ";
    heading.appendChild(EmptyMessage);
}

/* SHOW LIST */
function showFavList(){
    for(let i=0; i<favHeroes.length; i++){

        showDetails(favHeroes[i]);

        async function showDetails(hero){
            const URL = `https://gateway.marvel.com:443/v1/public/characters/${hero}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`
            const response = await fetch(`${URL}`);
            const data = await response.json();
            console.log(data.data.results);
            displayHeroDetails(data.data.results);
        }

        function displayHeroDetails(data){
            let heroList = document.createElement('div');
            heroList.dataset.id = data[0].id;
            heroList.id = 'fav-list-li';
            heroList.innerHTML = 
            `<li id="single-hero">
            <div id="hero-info">
                <div id="top">
                    <img src="${data[0].thumbnail.path + "." + data[0].thumbnail.extension }"></img>
                </div>
                <div id="bottom">
                    <p id="hero-name"> ${ data[0].name }</p>
                </div>
            </div>
            </li>`

            let removeButton = document.createElement("button");
            removeButton.id = data[0].id;
            removeButton.addEventListener('click',removeFromFavourites);
            removeButton.innerHTML="Remove";
            heroList.appendChild(removeButton);
            favListName.appendChild(heroList);
        }
    }
}

/* REMOVE HERO FROM LIST */
async function removeFromFavourites(e){
    let id = e.target.id;
    let favs = getFavs();
    let updatedFavs = favs.filter(function(value){
        return value != id;
    })
    localStorage.setItem('favHeroes', JSON.stringify(updatedFavs));
    location.reload();
}

showFavList();