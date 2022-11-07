const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let pokemonSearch = 1;
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}


const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = ''
    const data =  await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.setAttribute('src', data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'])
        inputSearch.value = '';
        pokemonSearch = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}
form.addEventListener('submit', e => {
    e.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase())
})
buttonPrev.addEventListener('click', () => {
    if(pokemonSearch > 1) {
        pokemonSearch -=1;
        renderPokemon(pokemonSearch)
    }
})
buttonNext.addEventListener('click', () => {
    pokemonSearch += 1;
    renderPokemon(pokemonSearch);
})
renderPokemon(pokemonSearch)