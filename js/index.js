
let limit = 50
let page = 1

//loaders 
fetchMonsters()
addEventListeners()

function postMonster(monster) {
    config = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(monster)
    }

    fetch('http://localhost:3000/monsters', config)
    .then(resp => resp.json())
    .then(monster => fetchMonsters())
    .catch(() => alert('whoops didnt work'))
}

function fetchMonsters(){
    let div = document.getElementById('monster-container')
    div.innerHTML = ''

    fetch(`http://localhost:3000/monsters/?_limit=${limit}$&_page=${page}`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => addFiftyMonsters(monster)))
}

function addFiftyMonsters(monster){
    let div = document.getElementById('monster-container')
    let name = document.createElement('h2')
    let age = document.createElement('p')
    let description = document.createElement('p')

    name.textContent = monster.name
    age.textContent = monster.age 
    description.textContent = monster.description

    div.appendChild(name)
    div.appendChild(age)
    div.appendChild(description)
}

function handleSubmit(e) {
    e.preventDefault()
    monster = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value,
    }
    let form = document.getElementById('new-monster').reset()
    postMonster(monster)
}

function nextFifty() { 
    page++
    fetchMonsters()
}

function previousFifty() {
    if (page !== 1) {
        page--
        fetchMonsters() 
    } 
} 

function addEventListeners() {
    let form = document.getElementById('new-monster')
    form.addEventListener('submit', handleSubmit)

    let forward = document.getElementById('forward')
    forward.addEventListener('click', nextFifty)

    let backward = document.getElementById('back')
    backward.addEventListener('click', previousFifty)

}