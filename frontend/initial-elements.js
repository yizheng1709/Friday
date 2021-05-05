const initialButton = document.getElementById("initial-button")
const initialContact = document.getElementById("initial-contact")
const initialDiv = document.getElementById("initial-div")
const createNewProjectButton = document.getElementById("create-new-project-button")
const logo = document.getElementById("logo")
const mainContainer = document.getElementById("main-container")

// removes all children from Main Container

function removeChildrenFromMain(){
    Array.from(mainContainer.children).forEach(child => child.remove())
}

//generates home button that takes user back to initial page

function homeButton() {
    mainContainer.innerHTML += `
    <div class="center responsive">
    <button class="initial-button bold" id="home-button">
    Back to Home
    </button>
    </div>
    <br><br><br><br><br>
    `
    document.getElementById("home-button").addEventListener("click", goBackToInitial)
}
