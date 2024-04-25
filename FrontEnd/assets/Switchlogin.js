let log = document.querySelector(".login")
let edittop = document.querySelector(".editmodtop-container")
let edit = document.querySelector(".editmod-container")
let filter = document.querySelector(".filters")

if (window.localStorage.getItem("token") === null) {
    log.innerText = "login"
} else {
    log.innerText = "logout"
}

log.addEventListener("click", (event) => {
    if (log.innerText === "logout") {
        event.preventDefault()
        localStorage.removeItem("token")
        log.innerText = "login"
        edittop.classList.add("hidden")
        edit.classList.add("hidden")
        filter.classList.remove("hidden")
    }
})