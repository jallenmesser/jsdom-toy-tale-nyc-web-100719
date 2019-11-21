let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})

let toyCollection = document.getElementById("toy-collection")
let form = document.getElementsByClassName("add-toy-form")[0]

function getToys(){
  fetch("http://localhost:3000/toys")
  .then(function(resp){return resp.json()})
  .then(function(data){data.forEach(createToy)})
}

getToys()

function createToy(toy){
  let toyDiv = document.createElement("div")
  toyDiv.className = "card"
  toyDiv.innerHTML = `
  <h2> ${toy.name} </h2>
  <img src="${toy.image}" class="toy-avatar">
  <p>Likes: ${toy.likes}</p>
  <button class="like-btn">"Like"</button>
  `
  toyDiv.querySelector("p").dataset.likes = `${toy.likes}`
  let button = toyDiv.getElementsByClassName("like-btn")[0]
  button.addEventListener("click", function(e){
    increaseLikes(e)
    let newLikes = toyDiv.querySelector("p").dataset.likes
    persistLikes(toy.id, newLikes)
  })
  
  toyCollection.append(toyDiv)
}

function persistToy(toy){
  fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accepts: "application/json"
        },
        body: JSON.stringify(toy)

    })
}


form.addEventListener("submit", function (e) {
  console.log(e.target)
  e.preventDefault()
  let toy = {
      name: e.target.name.value,
      likes: 0,
      image: e.target.image.value
  }
  createToy(toy)
  persistToy(toy)
  form.remove()
  
})

function increaseLikes(e){
  let parentDiv = e.target.parentNode
  let pTag = parentDiv.querySelector("p")
  likes = parseInt(pTag.dataset.likes)
  likes = 1 + likes
  pTag.dataset.likes = likes
  pTag.innerText = `Likes: ${likes}`
}

function persistLikes(id, likes){
  fetch(`http://localhost:3000/toys/${id}`,{
    method: "PATCH",
    headers: {
        "content-type": "application/json",
        accepts: "application/json"
    },
    body: JSON.stringify({ likes: likes })
  })
    .then(function (resp) { return resp.json()})
    .then(console.log)
}