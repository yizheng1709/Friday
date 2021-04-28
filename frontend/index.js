const initialButton = document.getElementById("initial-button")
const initialContact = document.getElementById("initial-contact")
const findProject = document.getElementById("find-project")


function deleteInitialAndContinue() {
    initialContact.remove()
    //show search project
    findProject.style.display = "block"
}

initialButton.addEventListener("click", deleteInitialAndContinue)