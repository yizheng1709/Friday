function findOrCreateProjectDiv() {
    document.body.innerHTML += `<div class="find-or-create-project responsive shadow center" 
    id="find-or-create-project">
    <br>
    <button class="initial-button" id="create-new-project-button">
      <strong>Create New Project</strong>
    </button><br><br>
    <button class="initial-button" id="find-project-button">
      <strong>Find a Project</strong>
    </button>
    <br><br>
  </div>`
}

function deleteInitialAndContinue() {
    initialContact.remove()
    initialDiv.remove()
    dots.remove()
    // initialDiv.style.display = "none"
    // dots.style.display = "none"
    findOrCreateProjectDiv()
//     const findOrCreateProject = document.getElementById("find-or-create-project")
// const createNewProjectButton = document.getElementById("create-new-project-button")
// const findProjectButton = document.getElementById("find-project-button")
}

function newProjectForm() {
    findOrCreateProject.style.display = "none"
    creatingProjectDiv.style.display = "block"
}

function findProjectForm() {
    findOrCreateProject.style.display = "none"
    findProject.style.display = "block"
}

function createInitialContact() {
    document.body.innerHTML += `<div class="slideshow-container responsive shadow center" id="initial-contact">

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
    <span class="dot" onclick="currentSlide(1)"></span>
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
  </div>`
}

function submitProjectName(e) {
    e.preventDefault()
}

function goBackToInitial() {
    findProject.style.display = "none"
    findOrCreateProject.style.display = "none"
    creatingProjectDiv.style.display = "none"
    createInitialContact()
    // initialContact.style.display = "block"
    // initialDiv.style.display = "block"
    // dots.style.display = "block"
}