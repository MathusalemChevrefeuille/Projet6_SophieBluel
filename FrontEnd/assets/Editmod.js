let edittop2 = document.querySelector(".editmodtop-container")
let edit2 = document.querySelector(".editmod-container")
let filter2 = document.querySelector(".filters")


if (window.localStorage.getItem("token") !== null){
    edittop2.classList.remove("hidden")
    edit2.classList.remove("hidden")
    filter2.classList.add("hidden")
}


const modal_gallery_photo = document.querySelector(".modal-gallery-photo")
async function addallworksmodal(){
    const response = await fetch("http://localhost:5678/api/works")
    const works = await response.json()
    modal_gallery_photo.innerHTML = ""
    for(let i = 0;i < works.length; i++){
        const image = document.createElement("img")
        image.src = works[i].imageUrl
        modal_gallery_photo.appendChild(image)
    }
}

addallworksmodal()