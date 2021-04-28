const initialButton = document.getElementById("initial-button")
const initialContact = document.getElementById("initial-contact")
const findOrCreateProject = document.getElementById("find-or-create-project")
const createNewProjectButton = document.getElementById("create-new-project-button")
const findProjectButton = document.getElementById("find-project-button")
const findProject = document.getElementById("find-project")
const logo = document.getElementById("logo")


function deleteInitialAndContinue() {
    initialContact.style.display = "none"
    findOrCreateProject.style.display = "block"
}

function newProjectForm() {
    findOrCreateProject.style.display = "none"
    
}

function findProjectForm() {
    findOrCreateProject.style.display = "none"
    findProject.style.display = "block"
}

function goBackToInitial() {
    findProject.style.display = "none"
    initialContact.style.display = "block"
}

initialButton.addEventListener("click", deleteInitialAndContinue)
logo.addEventListener("click", goBackToInitial)
findProjectButton.addEventListener("click", findProjectForm)
createNewProjectButton.addEventListener("click", newProjectForm)