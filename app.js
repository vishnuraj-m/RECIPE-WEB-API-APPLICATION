const app_id = "a29afe38";
const app_key = "a4d4c5c2f62d1d52a65b2fcae0b36dbf";

const query = document.querySelector('header.search input');
const search = document.querySelector('header.search button');
const container = document.querySelector('.recipes');
const cards = document.querySelector('section.cards')

const generateCard = (image, label, mealType, totalTime, link, calories, ingredients) => `

        <aside>
            <img src="${image}" alt="Chai Oatmeal" />
            <a href="${link}" class="button"><span class="icon icon-play"></span></a>
        </aside>
        <article>
            <h2>${label}</h2>
            <h3>${mealType}</h3>
            <ul>
                <li><span class="icon icon-users"></span><span>1</span></li>
                <li><span class="icon icon-clock"></span><span>${totalTime} min</span></li>
                <li><span class="icon icon-level"></span><span>Beginner level</span></li>
                <li><span class="icon icon-calories"></span><span>${calories.toFixed(2)}</span></li>
            </ul>
            <p class="ingredients"><span>Ingredients:&nbsp;</span>
            <ul>
            ${ingredients.map(i => `<ul>${i.text}</ul>`)}
            </ul>
            </p>
        </article>
`


const handleSearch = async () => {
    try {
        container.innerHTML = "";
        const endpoint = `https://api.edamam.com/search?q=${query.value}&app_id=${app_id}&app_key=${app_key}`;
        const response = await fetch(endpoint);
        const { hits } = await response.json();
        hits.map(({ recipe }) => {
            console.log(recipe);
            const { image, label, mealType, totalTime, url, calories, ingredients } = recipe
            const ele = document.createElement('div')
            ele.classList.add('recipe-card')
            ele.innerHTML = generateCard(image, label, mealType[0], totalTime, url, calories, ingredients)
            container.appendChild(ele);
        })
    } catch (error) {
        console.log(error)
    }
}

search.addEventListener('click', handleSearch);
query.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
