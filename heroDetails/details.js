/* GET ALL DETAILS */
async function loadHeroDetails(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString); // getting id from url
    const character = urlParams.get('character');
    console.log(character);
    const URL = `https://gateway.marvel.com:443/v1/public/characters/${character}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`
    const response = await fetch(`${URL}`); // Fetch the data from API 
    const data = await response.json();
    console.log(data.data.results);
    displayHeroDetails(data.data.results)
}

/* DISPLAY DETAILS OF HERO */
function displayHeroDetails(data){
    const name = document.getElementById('name');
    name.innerHTML =  data[0].name; //only one array is there
    const description = document.getElementById('description');
    description.innerHTML = data[0].description;
    const comicsList = document.getElementById('comics-list-ul');
    // iterate the comic list
    for(let i = 0 ; i < data[0].comics.items.length ; i++){
        const comicName = data[0].comics.items[i].name; 
        let comicListElement = document.createElement('li');
        comicListElement.className = 'comic';
        comicListElement.innerHTML = comicName;
        comicsList.append(comicListElement);
    }
    // ietarte the series list
    const seriesList = document.getElementById('series-list-ul');
    for(let i = 0 ; i < data[0].series.items.length ; i++){
        const seriescName = data[0].series.items[i].name;
        let seriesListElement = document.createElement('li');
        seriesListElement.className = 'series';
        seriesListElement.innerHTML =seriescName;
        seriesList.append(seriesListElement);
    }
    // iterate over stories
    const storiesList = document.getElementById('stories-list-ul');
    for(let i = 0 ; i < data[0].stories.items.length ; i++){
        const storiesName = data[0].stories.items[i].name;
        let storiesListElement = document.createElement('li');
        storiesListElement.className = 'stories';
        storiesListElement.innerHTML =storiesName;
        storiesList.append(storiesListElement);
    }
    //add image also
    const heroImage = document.getElementById('image-wrapper');
    const image = document.createElement('img');
    image.src = data[0].thumbnail.path + "."+ data[0].thumbnail.extension; 
    heroImage.appendChild(image); 

}


loadHeroDetails();
