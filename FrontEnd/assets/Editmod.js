import {addallworks} from "./index.js"

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



const editbutton = document.querySelectorAll(".editbutton")
const modal = document.querySelector(".modal")

for(let i =0;i < editbutton.length;i++){
    editbutton[i].addEventListener("click",() => {
        modal.classList.remove("hidden")
        addallworksmodal()
    })
}

const categoryform = document.getElementById("categoryform")

async function addcategoriesselect() {
    const response = await fetch("http://localhost:5678/api/categories")
    const categories = await response.json()
    for(let i = 0;i < categories.length; i++){
        const category = document.createElement("option")
        category.value = categories[i].id
        category.innerText = categories[i].name
        category.classList.add("selecttext")

        categoryform.appendChild(category)
    }

}
addcategoriesselect()
const buttonaddphoto = document.querySelector(".button-add-photo")
const modalgallery = document.querySelector(".modal-gallery")
const modaladdphoto = document.querySelector(".modal-add-photo")

buttonaddphoto.addEventListener("click", () => {
    modalgallery.classList.add("hidden")
    modaladdphoto.classList.remove("hidden")
})

const back = document.querySelector(".back")

back.addEventListener("click", () => {
    modalgallery.classList.remove("hidden")
    modaladdphoto.classList.add("hidden")
})


const close = document.querySelectorAll(".close")

for(let i =0;i < close.length;i++){
    close[i].addEventListener("click",() => {
        modal.classList.add("hidden")
        if(modalgallery.classList.contains("hidden") === true){
            modalgallery.classList.remove("hidden")
            modaladdphoto.classList.add("hidden")
        }
        if(modaladdphoto.classList.contains("hidden") === false){
            modaladdphoto.classList.add("hidden")
            modalgallery.classList.remove("hidden")
        }
    })
}

modal.addEventListener("click", (event) => {
    if(event.target.classList.contains("modal") === true){
        modal.classList.add("hidden")
            if(modalgallery.classList.contains("hidden") === true){
                modalgallery.classList.remove("hidden")
                modaladdphoto.classList.add("hidden")
            }
            if(modaladdphoto.classList.contains("hidden") !== false){
                modaladdphoto.classList.add("hidden")
                modalgallery.classList.remove("hidden")
            }
    }
})

const buttonsubmitphoto = document.querySelector(".button-submit-photo")
const photoform = document.getElementById("photoform")
const titleform = document.getElementById("titleform")
let photobol = false
let titlebol = false
let categorybol = false
function checkform() {
    if(photobol === false){
        buttonsubmitphoto.classList.add("greyed")
    }
    if(titlebol === false){
        buttonsubmitphoto.classList.add("greyed")
    }
    if(categorybol === false){
        buttonsubmitphoto.classList.add("greyed")
    }
    if(photobol === true && titlebol === true && categorybol === true){
        buttonsubmitphoto.classList.remove("greyed")
    }
}

checkform()






function previewPhoto (){
    const file = photoform.files
    const fileReader = new FileReader()
    const imgaddformcontainer = document.querySelector(".img-add-form-container")
    fileReader.addEventListener("load", (event) =>{
        imgaddformcontainer.src = event.target.result;
    })
    fileReader.readAsDataURL(file[0])
}



const labeladdformcontainer = document.querySelector(".label-add-form-container")
const paddformcontainer = document.querySelector(".p-add-form-container")

photoform.addEventListener("change", () => {
    labeladdformcontainer.classList.add("hidden")
    paddformcontainer.classList.add("hidden")
    if(photoform.value !== ""){
        photobol = true
    }
    else{
        photobol = false
    }
    checkform()
    previewPhoto ()
})

titleform.addEventListener("change", () => {
    if(titleform.value !== ""){
        titlebol = true
    }
    else{
        titlebol = false
    }
    checkform()
})

categoryform.addEventListener("change", () => {
    if(categoryform.value === "0"){
        categorybol = false
    }
    else{
        categorybol = true
    }
    checkform()
})


async function addworksinbackend(){
    const Formdata = new FormData()

    Formdata.append("image", document.getElementById("photoform").files[0])
    Formdata.append("title", document.getElementById("titleform").value)
    Formdata.append("category", document.getElementById("categoryform").value)

    let token = window.localStorage.getItem("token")
    const response = await fetch("http://localhost:5678/api/works",{
        
        method: "POST",
        headers:{
            "Authorization": `Bearer ${token}`},
        body: Formdata
    })
    if(response.status === 201){
        addallworksmodal()
        addallworks()
        document.querySelector(".add-form").reset()
        document.querySelector(".img-add-form-container").src="./assets/images/picture-svgrepo-com 1.svg"
        labeladdformcontainer.classList.remove("hidden")
        paddformcontainer.classList.remove("hidden")
    }
}


buttonsubmitphoto.addEventListener("click", (event) => {
    event.preventDefault()
    if (buttonsubmitphoto.classList.contains("greyed") === false) {
        addworksinbackend()
    }
})