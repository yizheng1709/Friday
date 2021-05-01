const initialButton = document.getElementById("initial-button")
const initialContact = document.getElementById("initial-contact")
const initialDiv = document.getElementById("initial-div")
const createNewProjectButton = document.getElementById("create-new-project-button")
const logo = document.getElementById("logo")
const mainContainer = document.getElementById("main-container")

function removeChildrenFromMain(){
    Array.from(mainContainer.children).forEach(child => child.remove())
}

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
  </div><br><br><br>`
  homeButton()
 
}

function askUserForEmail() {
    removeChildrenFromMain()
    mainContainer.innerHTML += `
    <div class="responsive center shadow find-or-create-project" id="ask-user-email">
    <br><br>
        <p class="project-name project-font">Please enter your name:</p>
        <input type="text" class="creating-project-input" placeholder="Name">
        <br><br><br>
        <button class="initial-button bold" id="received-user-email">Next</button>
        <br><br>
    </div><br><br><br>
    `
    homeButton()
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

function addAnotherMemberInput() {
    const groupMembers = document.getElementById("group-members")
    groupMembers.innerHTML += `
    <p class="project-name project-font">Group Member</p>
    <input type="text" class="creating-project-input" placeholder="E-Mail of Group Member">
    `
}

function newProjectForm() {
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
            <div id="group-members">
            <p class="project-name project-font">Group Member</p>
            <input type="text" class="creating-project-input" placeholder="E-mail of Group Member">
            <p class="project-name project-font">Group Member</p>
            <input type="text" class="creating-project-input" placeholder="E-Mail of Group Member">
            </div>
            <br><br><br>
            <input type="submit" class="initial-button bold" value="Next">
            <br><br><br>
          </form>
          <button class="initial-button bold" id="add-another-member">Add Another Group Member</button>
            <br><br><br>
        </div><br><br><br>`
    homeButton()
    const creatingProjectForm = document.getElementById("creating-project-form")
    const addAnotherMember = document.getElementById("add-another-member")
    creatingProjectForm.addEventListener("submit", submitProjectName)
    addAnotherMember.addEventListener("click", addAnotherMemberInput)
    
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
        </div><br><br><br>`
    homeButton()
    
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
    // Array.from(e.target).forEach(ele => console.log(ele.value))
    // need to send this back ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    const attributes = Array.from(e.target).slice(0, 2).map(a => a.value)
    let project = new Project(attributes[0], attributes[1])
    // console.log(project)
    removeChildrenFromMain()
    mainContainer.innerHTML += `
    <div class="creating-project-div center responsive shadow">
    <br><br>
      <p class="search-by-name project-font">Project Name</p>
      <p>${project.name}</p>
      <p class="search-by-name project-font">Project Due Date</p>
      <p>${project.dueDate}</p>
    <br><br>
    </div>
    <br><br><br><br><br>
    `
    homeButton()
    // fetch("localhost:3000/projects", {
    //     method: 'POST', 
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   })
    //   .then(response => response.json())
    // //   .then(data => {
    // //     console.log('Success:', data);
    // //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   })
    // console.log(e)
}

function goBackToInitial() {
    removeChildrenFromMain()
    createInitialContact()
    document.getElementById("first-click").click()
    const initialButton = document.getElementById("initial-button")
    initialButton.addEventListener("click", deleteInitialAndContinue)
    
}

initialButton.addEventListener("click", deleteInitialAndContinue)
logo.addEventListener("click", goBackToInitial)
