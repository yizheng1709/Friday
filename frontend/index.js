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

/////////////////////////////////////////////////////////////////

/// generates HTML that creates a div to store two buttons; one will take user to find project
/// another button to create project

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
    <button class="initial-button" id="all-projects-button">
      <strong>All Projects</strong>
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

////////////////////////

/// TASK FUNCTIONS ////

//this will be a callback that will update the task
function updateTask(e) {
  e.preventDefault()
}

function fetchTasks(projectObjectid) {
  const tasksContainer = document.getElementById(`tasks-container`)
  fetch(`http://localhost:3000/projects/${projectObjectid}/tasks`)
  .then(resp => resp.json())
  .then(tasks => tasks.map(task => new Task(task["project_id"], task["content"], task["member_email"], task["completed"], task["id"])))
  .then(tasks => tasks.forEach(task => tasksContainer.innerHTML += generateTaskHTML(task)))
  
  
  .then(document.getElementById(`project${projectObjectid}`).append(tasksContainer))
  Array.from(document.getElementsByClassName("task")).forEach(function(task){
    task.addEventListener("submit", updateTask)
  })
}

function generateTaskHTML(taskObject) {
  return `
  <p class="task-content">${taskObject["content"]}</p>
  <li>${taskObject["memberEmail"]}</li>
  <form class="task" id="complete-task${taskObject.id}">
  <input type="checkbox">Completed Task<br>
  <input class="initial-button small-button bold" type="submit">
  </form>
  `
}



//////////////////////////

function generateProjectHTML(projectObject) {
  return `
  <span class="label-font">Project Name: </span>
  <span class="project-font fake-hover show-project" id="${projectObject.id}">${projectObject.name}</span><br>
  <span class="label-font">Due Date: </span>
  <span class="project-font fake-hover show-project" id="${projectObject.id}">${projectObject.dueDate}</span><br><br>
  `
}

function fetchAllProjects() {
  fetch("http://localhost:3000/projects")
  .then(resp => resp.json())
  .then(data => data.map(project => new Project(project["name"], project["due_date"])))
}

function createDivForAllProjects() {
  mainContainer.innerHTML += `
  <div class="shadow center responsive creating-project-div all-projects-div" id="all-projects-div">
  </div>
  <br><br>
  `
}


function generateOneProjectHTML(projectObject){
  document.getElementById(`project${projectObject.id}`).innerHTML += `
  <p class="project-font" id="${projectObject.id}">Project Name: ${projectObject.name}</p>
  <p class="project-font" id="${projectObject.id}">Due Date: ${projectObject.dueDate}</p>
  <p class="project-font" id="${projectObject.id}">Supervisor: ${projectObject.groupSupervisor}</p>
  <span class="project-font bold">Completed?</span>
  <br>
  `
}

function findOneProject(e) {
  removeChildrenFromMain()
  const id = e.target.id
  mainContainer.innerHTML += `
  <div class="shadow center responsive creating-project-div all-projects-div" id="project${id}">
  <div id="tasks-container">
  </div>
  </div>
  <br><br>
  `
  homeButton()
  fetch(`http://localhost:3000/projects/${id}`)
  .then(resp => resp.json())
  // .then(resp => console.log(resp))
  .then(project => {
    return(
      new Project(project["id"], project["name"], project["due_date"], project["group_supervisor"], project["completed"])
      )
    })
  .then(project => generateOneProjectHTML(project))
  fetchTasks(id)
  //assign eventListener to every task with class "task"  
}

function findAllProjects() {
  removeChildrenFromMain()
  createDivForAllProjects()
  homeButton()
  const allProjectsDiv = document.getElementById("all-projects-div")
  fetch("http://localhost:3000/projects")
  .then(resp => resp.json())
  .then(data => data.map(project => new Project(project["id"], project["name"], project["due_date"], project["group_supervisor"], project["completed"])))
  .then(projects => projects.forEach(project => { 
    allProjectsDiv.innerHTML += generateProjectHTML(project)
  }))
  .then(() => Array.from(document.getElementsByClassName("show-project")).forEach(function (child) {
    child.addEventListener("click", findOneProject)}))


    
  // Array.from(allProjectsDiv.children).forEach(projectElement => console.log(projectElement))
  // debugger
}

function deleteInitialAndContinue() {
    removeChildrenFromMain()
    findOrCreateProjectDiv()
    const findProjectButton = document.getElementById("find-project-button")
    const createNewProjectButton = document.getElementById("create-new-project-button")
    const findAllProjectsButton = document.getElementById("all-projects-button")
    findProjectButton.addEventListener("click", findProjectForm)
    createNewProjectButton.addEventListener("click", askUserForEmail)
    findAllProjectsButton.addEventListener("click", findAllProjects)
}

function addAnotherMemberInput() {
    const groupMembers = document.getElementById("group-members")
    groupMembers.innerHTML += `
    <br>
    <label class="project-name label-font">Group Member</label><br><br>
    <input type="text" class="creating-project-input" placeholder="E-Mail of Group Member"><br><br>
    <label class="project-name label-font">Task</label><br><br>
    <input type="text" class="creating-project-input task-input" placeholder="Task for this Group Member"><br>
    `
}

function newProjectForm() {
    removeChildrenFromMain()
    mainContainer.innerHTML += `
    <div class="creating-project-div center responsive shadow" id="creating-project-div">
          <form id="creating-project-form">
            <br>
            <label class="project-name label-font">Project Name</label><br><br>
            <input type="text" class="creating-project-input" placeholder="Project Name"><br><br>
            <label class="project-name label-font">Due Date</label><br><br>
            <input type="date" class="creating-project-input"><br><br>
            <label class="project-name label-font">Group Supervisor</label><br><br>
            <input type="text" class="creating-project-input" placeholder="E-mail of Group Supervisor"><br><br>
            <div id="group-members">
            <label class="project-name label-font">Group Member</label><br><br>
            <input type="text" class="creating-project-input" placeholder="E-mail of Group Member"><br><br>
            <label class="project-name label-font">Task</label><br><br>
            <input type="text" class="creating-project-input task-input" placeholder="Task for this Group Member"><br><br>
            <label class="project-name label-font">Group Member</label><br><br>
            <input type="text" class="creating-project-input" placeholder="E-Mail of Group Member"><br><br>
            <label class="project-name label-font">Task</label><br><br>
            <input type="text" class="creating-project-input task-input" placeholder="Task for this Group Member"><br>
            </div>
            <br><br>
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



function submitProjectName(e) {
    e.preventDefault()
    // Array.from(e.target).forEach(ele => console.log(ele.value))
    // need to send this back ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    const attributes = Array.from(e.target).slice(0, 3).map(a => a.value)
    // {debugger}
    let project = new Project(attributes[0], attributes[1], attributes[2])
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
    <form>
    <input type="submit" class="initial-button bold" value="Edit Project" id="edit-project"> 
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
