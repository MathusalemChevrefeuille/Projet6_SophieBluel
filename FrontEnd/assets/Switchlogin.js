let log = document.querySelector(".login")

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
    }
})