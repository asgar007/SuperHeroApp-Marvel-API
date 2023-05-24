const charSearchBox = document.getElementById('char-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// ------------------- Load HomePage having all Heroes -------------------------
async function LoadHomeHeros(){
  const URL = 'https://gateway.marvel.com:443/v1/public/characters?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc'
  const response = await fetch(`${URL}`);
  const data = await response.json();
  // console.log(data.data.results);
  displayAllHeroLoaded(data.data.results);
}

let HomeList = document.getElementById('home-list-ul');
async function displayAllHeroLoaded(results){ // input has array of heros
  for(let i=0; i<results.length; i++){
    let heroList = document.createElement('div');
    heroList.dataset.id = results[i].id; // adding data-id in div
    heroList.id = 'home-list-li'; // adding id in div
    // console.log(heroList);

    

    heroList.innerHTML = 
    `<li id = "home-single-hero">
      <div id= "home-hero-info">
        <div id = "home-top">
          <img src="${results[i].thumbnail.path + "." + results[i].thumbnail.extension }"></img>
        </div>
        <div id="bottom">
            <p id="home-hero-name"> ${ results[i].name }</p>
            <a href = "heroDetails/details.html?character=${results[i].id}">Details</a>
        </div>
      </div>
    </li>`
    HomeList.appendChild(heroList);
    // HomeList.append(redirectLink);
  }
}

// ------------- Load All Heroes from API --------------------------
// let query = "A" // testing
async function loadHeroes(query){
  const URL = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`
  const response = await fetch(`${URL}`);
  const data = await response.json();
  // console.log(data.data.results);
  displayHeroList(data.data.results);
}
// loadHeroes('a');

// ------------display Lists of Heroes -----------------------------
function displayHeroList(heroes){ // heroes may be a char or string like when we type
  searchList.innerHTML = "";
  for(let i=0; i< heroes.length; i++){ // creating URL for all Search elements
    let redirectLink = document.createElement('a');
    let heroList = document.createElement('div');
    redirectLink.innerHTML = "Link";
    redirectLink.href = "heroDetails/details.html?character=" + heroes[i].id;
    // console.log(redirectLink);
    heroList.dataset.id = heroes[i].id;
    heroList.className = 'search-list-item';
    heroList.innerHTML = `
    <div class = "search-item-thumbnail">
    <img src="${heroes[i].thumbnail.path + "." + heroes[i].thumbnail.extension}">
    </div>
    <div class = "search-item-info">
    <a href = ${ "heroDetails/details.html?character=" + heroes[i].id }> <h3>${heroes[i].name}</h3> </a>
    <button onClick="addtoFavs()"><i class="fa-solid fa-heart"></i></button>
    </div>
    `;
    searchList.append(heroList);
  }
  loadHeroDetails();
}

//--------------Show Search List hide -----------------------
function findHeroes(){
  // console.log(charSearchBox.value);
  let searchItem = (charSearchBox.value).trim();
  if(searchItem.length > 0){
    searchList.classList.remove('hide-search-list');
    loadHeroes(searchItem);
  }else{
    searchList.classList.add('hide-search-list');
  }
  // console.log(searchItem);
}

//--------------Load Hero details and add to favourite ------------
function loadHeroDetails(){
  const searchConstList = searchList.querySelectorAll('.search-list-item');
  searchConstList.forEach(hero => {
    // console.log(hero);
    hero.addEventListener('click', async ()=> {
      searchConstList.className = ('hide-search-list');
      charSearchBox.value = "";
      const result = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${hero.dataset.id}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`)
      const heroDetails = await result.json();
      // console.log(heroDetails);
      addToFavs(heroDetails);
    })
  })
}

// ------------- Add To Favourites -----------------------------------
function addToFavs(heroDetails){
  console.log("hi")
  let heroId = heroDetails.data.results[0].id;
  let favs = getFavs();
  if(!favs.includes(heroId)){
    favs.push(heroId);
  }
  localStorage.setItem('favHeroes', JSON.stringify(favs));
}

//-----------------Get Favourite List ids From Local Storage ------------------
function getFavs(){
  let favs;
  if(localStorage.getItem('favHeroes') === null){
    favs = [];
  }else{
    favs = JSON.parse(localStorage.getItem('favHeroes'));
  }
  return favs;
}






//Load Home Page
LoadHomeHeros();