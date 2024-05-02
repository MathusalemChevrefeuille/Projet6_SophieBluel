const formlogin = document.querySelector("#formlogin")

formlogin.addEventListener("submit",(event) => {
    event.preventDefault()
    login()
})

const error = document.getElementById("error")

async function login() {
    const logs = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }
    
    const chargeutile = JSON.stringify(logs)
    const response = await fetch("http://localhost:5678/api/users/login",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: chargeutile
    })
    const retour = await response.json()
    if(retour.userId === 1){
        window.localStorage.setItem("token", retour.token)
        console.log("connecté")
        window.location.href = "./index.html"
    }
    else{
        console.log("erreur")
        error.classList.remove("hidden")
    }
}