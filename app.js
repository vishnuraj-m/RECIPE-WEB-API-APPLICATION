const app_id = "a29afe38";
const app_key = "a4d4c5c2f62d1d52a65b2fcae0b36dbf";

const query = document.querySelector('header.search input');
const search = document.querySelector('header.search button');
const container = document.querySelector('.recipes');


const handleSearch = async () => {
    try {
        container.innerHTML = "";
        const endpoint = `https://api.edamam.com/search?q=${query.value}&app_id=${app_id}&app_key=${app_key}`;
        const response = await fetch(endpoint);
        const { hits } = await response.json();
        hits.map(({ recipe }) => {
            console.log(recipe);
            const { image, label, url, calories } = recipe
            const ele = document.createElement('div')
            ele.innerHTML = `
            <div class="recipe">
            <h2>${label}</h2>
            <img src="${image}" width="150px" alt="${label}">
            <h3>${calories}</h3>
            <a href="${url}" target="_blank">View Recipe</a>
            </div>
            `

            // const ele = document.createElement('img');
            // ele.src = recipe.image;
            // ele.style = "width:150px;margin:50px"
            // console.log(ele);
            container.appendChild(ele);
        })
    } catch (error) {

    }
}

search.addEventListener('click', handleSearch)
console.log({
    query,
    search
}
)