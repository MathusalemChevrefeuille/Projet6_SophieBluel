const gallery = document.querySelector(".gallery")
export async function addallworks(){
    const response = await fetch("http://localhost:5678/api/works")
    const works = await response.json()
    gallery.innerHTML = ""
    for(let i = 0;i < works.length; i++){
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        

        image.src = works[i].imageUrl
        image.alt = works[i].title
        figcaption.innerText = works[i].title

        gallery.appendChild(figure)
        figure.appendChild(image)
        figure.appendChild(figcaption)
    }
}

addallworks()


function resetselectedfilter () {
     let tabfilter = document.querySelectorAll(".filter")
    for(let i = 0; i < tabfilter.length; i++){
        tabfilter[i].classList.remove("selected")
    }
}

const allfilter = document.querySelector(".allfilter")

allfilter.addEventListener("click", () => {
    resetselectedfilter()
    allfilter.classList.add("selected")
    addallworks()
})


async function addfilteredworks(id){
    const response = await fetch("http://localhost:5678/api/works")
    const works = await response.json()
    gallery.innerHTML = ""
    for(let i = 0;i < works.length; i++){
        const idwork = works[i].categoryId
        if(idwork === id){
            const figure = document.createElement("figure")
            const image = document.createElement("img")
            const figcaption = document.createElement("figcaption")
            

            image.src = works[i].imageUrl
            image.alt = works[i].title
            figcaption.innerText = works[i].title

            gallery.appendChild(figure)
            figure.appendChild(image)
            figure.appendChild(figcaption)
        }
    }
}

async function addfilters(){
    const response = await fetch("http://localhost:5678/api/categories")
    const categories = await response.json()
    const filters = document.querySelector(".filters")
    for(let i = 0;i < categories.length; i++){
        const button = document.createElement("button")
        button.innerText = categories[i].name
        const id = categories[i].id
        button.classList.add("filter")
        filters.appendChild(button)

        button.addEventListener("click", () => {
            resetselectedfilter()
            button.classList.add("selected")
            addfilteredworks(id)
        })
    }

}

addfilters()