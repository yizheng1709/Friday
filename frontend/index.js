const initialButton = document.getElementById("initial-button")
const initialContact = document.getElementById("initial-contact")
const initialDiv = document.getElementById("initial-div")
const dots = document.getElementById("dots")
const createNewProjectButton = document.getElementById("create-new-project-button")
const findProjectButton = document.getElementById("find-project-button")
const findProject = document.getElementById("find-project")
const logo = document.getElementById("logo")
const creatingProjectDiv = document.getElementById("creating-project-div")
const creatingProjectForm = document.getElementById("creating-project-form")
const mainContainer = document.getElementById("main-container")
const galleryContainer = document.getElementById("gallery-container")

function removeChildrenFromMain(){
    Array.from(mainContainer.children).forEach(child => child.remove())
}

function findOrCreateProjectDiv() {
    mainContainer.innerHTML += `<div class="find-or-create-project responsive shadow center" 
    id="find-or-create-project">
    <br>
    <button class="initial-button" id="create-new-project-button">
      <strong>Create New Project</strong>
    </button><br><br>
    <button class="initial-button" id="find-project-button">
      <strong>Find a Project</strong>
    </button>
    <br><br>
  </div><br><br><br><br><br>`
}

function askUserForEmail() {
    removeChildrenFromMain()
    mainContainer.innerHTML += `
    <div class="responsive center shadow find-or-create-project" id="ask-user-email">
    <br><br>
        <p class="project-name project-font">Please enter your name:</p>
        <input type="text" class="creating-project-input" placeholder="Name">
        <br><br><br>
        <button class="initial-button" id="received-user-email">Next</button>
        <br><br>
    </div><br><br><br><br><br>
    `
    document.getElementById("received-user-email").addEventListener("click", newProjectForm)
}

function deleteInitialAndContinue() {
    removeChildrenFromMain()
    findOrCreateProjectDiv()
    const findProjectButton = document.getElementById("find-project-button")
    const createNewProjectButton = document.getElementById("create-new-project-button")
    findProjectButton.addEventListener("click", findProjectForm)
    createNewProjectButton.addEventListener("click", askUserForEmail)
}

function newProjectForm() {
    // findOrCreateProject.style.display = "none"
    // creatingProjectDiv.style.display = "block"
    removeChildrenFromMain()
    mainContainer.innerHTML += `
    <div class="creating-project-div center responsive shadow" id="creating-project-div">
          <form id="creating-project-form">
            <br>
            <p class="project-name project-font">Project Name</p>
            <input type="text" class="creating-project-input" placeholder="Project Name">
            <p class="project-name project-font">Due Date</p>
            <input type="date" class="creating-project-input">
            <p class="project-name project-font">Group Supervisor</p>
            <input type="text" class="creating-project-input" placeholder="E-mail of Group Supervisor">
            <p class="project-name project-font">Group Member</p>
            <input type="text" class="creating-project-input" placeholder="E-mail of Group Member">
            <p class="project-name project-font">Group Member</p>
            <input type="text" class="creating-project-input" placeholder="E-Mail of Group Member">
            <br><br><br>
            <input type="submit" class="initial-button bold" value="Next">
            <br><br><br><br>
          </form>
        </div><br><br><br><br><br>`
    const creatingProjectForm = document.getElementById("creating-project-form")
    creatingProjectForm.addEventListener("submit", submitProjectName)
}

function findProjectForm() {
    removeChildrenFromMain()
    mainContainer.innerHTML += `
        <div class="find-project responsive shadow center" id="find-project">
          <br>
          <p class="search-by-name" id="search-by-name">
            <strong>Searc<span class="small-space"> </span>h Project by Name</strong>
          </p>
          <input type="search" class="project-input" placeholder="Name of Project">
          <br><br><br>
          <button class="initial-button">
            <strong>Find Project</strong>
          </button>
          <br><br><br>
        </div><br><br><br><br><br>`
}

function createInitialContact() {
    mainContainer.innerHTML += `
    <div class="gallery-container" id="gallery-container">
    <div class="slideshow-container responsive shadow center" 
    id="initial-contact">

    <div class="mySlides fade">
      <img src="images/one.png" class="gallery-image responsive">
    </div>

    <div class="mySlides fade">
      <img src="images/two.png" class="gallery-image responsive">
    </div>

    <div class="mySlides fade">
      <img src="images/three.png" class="gallery-image responsive">
    </div>

    <div class="mySlides fade">
      <img src="images/four.png" class="gallery-image responsive">
    </div>

    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
  </div>
  <br>

  <div id="dots" style="text-align:center" class="responsive">
    <span class="dot" onclick="currentSlide(1)" id="first-click"></span>
    <span class="dot" onclick="currentSlide(2)"></span>
    <span class="dot" onclick="currentSlide(3)"></span>
    <span class="dot" onclick="currentSlide(4)"></span>
  </div>
  <div class="center initial-div" id="initial-div">
    <br><br><br>
  <button class="initial-button" id="initial-button">
    <strong>Continue</strong>
  </button>
  <br><br><br>
  </div>
  </div>
  <br><br>
  `
}

function submitProjectName(e) {
    e.preventDefault()
}

function goBackToInitial() {
    // const findOrCreateProject = document.getElementById("find-or-create-project")
    // findOrCreateProject.remove()
    Array.from(mainContainer.children).forEach(child => child.remove())
    createInitialContact()
    document.getElementById("first-click").click()
    const initialButton = document.getElementById("initial-button")
    initialButton.addEventListener("click", deleteInitialAndContinue)
}

initialButton.addEventListener("click", deleteInitialAndContinue)
logo.addEventListener("click", goBackToInitial)
// findProjectButton.addEventListener("click", findProjectForm)
// createNewProjectButton.addEventListener("click", newProjectForm)
// creatingProjectForm.addEventListener("submit", submitProjectName)