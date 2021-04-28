const initialButton = document.getElementById("initial-button")
const initialContact = document.getElementById("initial-contact")
const findProject = document.getElementById("find-project")
const logo = document.getElementById("logo")


function deleteInitialAndContinue() {
    initialContact.style.display = "none"
    //show search project
    findProject.style.display = "block"
}

function goBackToInitial() {
    findProject.style.display = "none"
    initialContact.style.display = "block"
}

initialButton.addEventListener("click", deleteInitialAndContinue)
logo.addEventListener("click", goBackToInitial)