const saisieText = document.getElementById("saisie-tache")
const boutonAjout = document.querySelector(".icone-ajout")
const listeAfaire = document.querySelector(".liste-afaire")
const listeFait = document.querySelector(".liste-fait")
const iconeTrash = document.querySelector(".icone-trash")

boutonAjout.addEventListener("click", entrerInfo)

saisieText.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        entrerInfo()
    }
})

iconeTrash.addEventListener("click", viderTachesFaites)

window.addEventListener("load", chargerTaches)

function entrerInfo() {
    const texte = saisieText.value.trim()
    if (texte !== "") {
        const li = document.createElement("li")
        li.className = "tache"
        li.textContent = texte
        
        li.addEventListener("click", function() {
            marquerCommeFait(li)
        })
        
        listeAfaire.appendChild(li)
        saisieText.value = "" 
        sauvegarderTaches()
    }
}

function marquerCommeFait(tacheElement) {
    tacheElement.classList.add("fait")
    tacheElement.classList.remove("tache")
    
    listeFait.appendChild(tacheElement)
    
    tacheElement.removeEventListener("click", marquerCommeFait)
    tacheElement.addEventListener("click", function() {
        remettreAFaire(tacheElement)
    })
    sauvegarderTaches()
}

function remettreAFaire(tacheElement) {
    tacheElement.classList.remove("fait")
    tacheElement.classList.add("tache")
    
    listeAfaire.appendChild(tacheElement)
    
    tacheElement.removeEventListener("click", remettreAFaire)
    tacheElement.addEventListener("click", function() {
        marquerCommeFait(tacheElement)
    })
    sauvegarderTaches()
}

function viderTachesFaites() {
    listeFait.innerHTML = ""
    sauvegarderTaches()
}

function sauvegarderTaches() {
    const tachesAfaire = []
    const tachesFaites = []
    
    listeAfaire.querySelectorAll("li").forEach(li => {
        tachesAfaire.push(li.textContent)
    })
    
    listeFait.querySelectorAll("li").forEach(li => {
        tachesFaites.push(li.textContent)
    })
    
    localStorage.setItem("tachesAfaire", JSON.stringify(tachesAfaire))
    localStorage.setItem("tachesFaites", JSON.stringify(tachesFaites))
}

function chargerTaches() {
    const tachesAfaire = JSON.parse(localStorage.getItem("tachesAfaire")) || []
    const tachesFaites = JSON.parse(localStorage.getItem("tachesFaites")) || []
    
    tachesAfaire.forEach(texte => {
        const li = document.createElement("li")
        li.className = "tache"
        li.textContent = texte
        li.addEventListener("click", function() {
            marquerCommeFait(li)
        })
        listeAfaire.appendChild(li)
    })
    
    tachesFaites.forEach(texte => {
        const li = document.createElement("li")
        li.className = "fait"
        li.textContent = texte
        li.addEventListener("click", function() {
            remettreAFaire(li)
        })
        listeFait.appendChild(li)
    })
}

























