const initialButton = document.getElementById("initial-button")
const initialContact = document.getElementById("initial-contact")
const initialDiv = document.getElementById("initial-div")
const dots = document.getElementById("dots")
const findOrCreateProject = document.getElementById("find-or-create-project")
const createNewProjectButton = document.getElementById("create-new-project-button")
const findProjectButton = document.getElementById("find-project-button")
const findProject = document.getElementById("find-project")
const logo = document.getElementById("logo")
const creatingProjectDiv = document.getElementById("creating-project-div")
const creatingProjectForm = document.getElementById("creating-project-form")


function deleteInitialAndContinue() {
    initialContact.style.display = "none"
    initialDiv.style.display = "none"
    dots.style.display = "none"
    findOrCreateProject.style.display = "block"
}

function newProjectForm() {
    findOrCreateProject.style.display = "none"
    creatingProjectDiv.style.display = "block"
}

function findProjectForm() {
    findOrCreateProject.style.display = "none"
    findProject.style.display = "block"
}

function goBackToInitial() {
    findProject.style.display = "none"
    findOrCreateProject.style.display = "none"
    creatingProjectDiv.style.display = "none"
    initialContact.style.display = "block"
    initialDiv.style.display = "block"
    dots.style.display = "block"
}

function submitProjectName(e) {
    e.preventDefault()
}

initialButton.addEventListener("click", deleteInitialAndContinue)
logo.addEventListener("click", goBackToInitial)
findProjectButton.addEventListener("click", findProjectForm)
createNewProjectButton.addEventListener("click", newProjectForm)
creatingProjectForm.addEventListener("submit", )