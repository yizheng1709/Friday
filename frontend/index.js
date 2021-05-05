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
  const id = e.target.id.split("complete-task")[1]
  let checkmark = e.target[0].checked
  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      completed: {checkmark}
    })
  }
  //fetch task
  fetch(`http:localhost:3000/tasks/${id}`, options)
}

function fetchTasks(projectObjectid) {
  const tasksContainer = document.getElementById(`tasks-container`)
  fetch(`http://localhost:3000/projects/${projectObjectid}/tasks`)
  .then(resp => resp.json())
  .then(tasks => tasks.map(task => new Task(task["project_id"], task["content"], task["member_email"], task["completed"], task["id"])))
  .then(tasks => tasks.forEach(task => tasksContainer.innerHTML += generateTaskHTML(task)))
  
  
  .then(document.getElementById(`project${projectObjectid}`).append(tasksContainer))

  .then(() => Array.from(document.getElementsByClassName("task")).forEach(function(task){
    task.addEventListener("submit", updateTask)
  }))
}

function checkBox(taskObject) {
  if (taskObject.completed) {
    return "checked"
  }
}

function generateTaskHTML(taskObject) {
  return `
  <p class="task-content">${taskObject["content"]}</p>
  <span class="assigned">assigned to: ${taskObject["memberEmail"]}</span><br>
  <form class="task" id="complete-task${taskObject.id}">
  <input name="completed" type="checkbox" ${checkBox(taskObject)}><span class="check">Completed Task</span><br>
  <input class="initial-button small-button bold" type="submit">
  </form>
  `
}



//////////////////////////

//this generates projects index

function generateProjectHTML(projectObject) {
  const id = projectObject.id
  return `
  <span class="label-font underline project${id}">Project Name: </span>
  <span class="project-font fake-hover show-project project${id}" id="${id}">${projectObject.name}</span><br>
  <span class="label-font underline project${id}">Due Date: </span>
  <span class="project-font fake-hover show-project project${id}" id="${id}">${projectObject.dueDate}</span><br>
  <form class="delete-project bold project${id}" id="${id}">
  <input class="initial-button small-button " type="submit" value="Delete Project">
  </form><br><br>
  `
}

//////////////////////////////

function createDivForAllProjects() {
  mainContainer.innerHTML += `
  <div class="shadow center responsive creating-project-div all-projects-div" id="all-projects-div">
  <br><br>
  </div>
  <br><br>
  `
}


function generateOneProjectHTML(projectObject){
  const id = projectObject.id
  
  mainContainer.innerHTML += `
  <div class="shadow center responsive creating-project-div all-projects-div" id="project${id}">
  <span class="label-font underline" id="${id}">Project Name</span><br>
  <span class="project-font bold">${projectObject.name}</span><br>
  <span class="label-font underline" id="${id}">Due Date</span><br>
  <span class="project-font bold">${projectObject.dueDate}</span><br>
  <span class="label-font underline" id="${id}">Supervisor</span><br>
  <span class="project-font bold">${projectObject.groupSupervisor}</span><br>

  <br>
  <div id="tasks-container">
  </div>
  </div>
  <br><br>
  `
  homeButton()
}

function findOneProject(e) {
  removeChildrenFromMain()
  const id = e.target.id

  fetch(`http://localhost:3000/projects/${id}`)
  .then(resp => resp.json())
  .then(project => {
    return(
      new Project(project["id"], project["name"], project["due_date"], project["group_supervisor"], project["completed"])
      )
    })
    .then(project => {
      generateOneProjectHTML(project)
      fetchTasks(project.id)
    })

}

function deleteProject(e) {
  e.preventDefault()
  const id = e.target.id
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      project: {id: id}
    })
  }
  fetch(`http://localhost:3000/projects/${id}`, options)
  .then(() => Array.from(document.getElementsByClassName(`project${id}`)).forEach(child => child.remove()))
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
  .then(() => Array.from(document.getElementsByClassName("delete-project")).forEach(function (child) {
    child.addEventListener("submit", deleteProject)
    }))

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
    <label class="project-name label-font">Group Member's E-mail</label><br><br>
    <input type="text" class="creating-project-input" value=" "><br><br>
    <label class="project-name label-font">Task</label><br><br>
    <input type="text" class="creating-project-input task-input" value=" "><br>
    `
}

function newProjectForm() {
    removeChildrenFromMain()
    mainContainer.innerHTML += `
    <div class="creating-project-div center responsive shadow" id="creating-project-div">
          <form id="creating-project-form">
            <br>
            <label class="project-name label-font">Project Name</label><br><br>
            <input type="text" class="creating-project-input" value=" "><br><br>
            <label class="project-name label-font">Due Date</label><br><br>
            <input type="date" class="creating-project-input" value="2022-05-05"><br><br>
            <label class="project-name label-font">Group Supervisor's E-mail</label><br><br>
            <input type="text" class="creating-project-input" value=" "><br><br>
            <div id="group-members">
            <label class="project-name label-font">Group Member's E-mail</label><br><br>
            <input type="text" class="creating-project-input" value=" "><br><br>
            <label class="project-name label-font">Task</label><br><br>
            <input type="text" class="creating-project-input task-input" value=" "><br><br>
            <label class="project-name label-font">Group Member's E-mail</label><br><br>
            <input type="text" class="creating-project-input" value=" "><br><br>
            <label class="project-name label-font">Task</label><br><br>
            <input type="text" class="creating-project-input task-input" value=" "><br>
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
    creatingProjectForm.addEventListener("submit", submitProject)
    addAnotherMember.addEventListener("click", addAnotherMemberInput)
}

function findProjectBackend(e) {
  debugger
  e.preventDefault()
  console.log(e.target)
}

function findProjectForm() {
    removeChildrenFromMain()
    mainContainer.innerHTML += `
        <div class="find-project responsive shadow center" id="find-project">
          <br>
          <p class="search-by-name label-font underline" id="search-by-name">
            <strong>Searc<span class="small-space"> </span>h Project by Name</strong>
          </p>
          <form id="find-project-form">
          <input type="search" class="project-input" placeholder="Name of Project">
          <br><br><br>
          <input type="submit" class="initial-button bold" value="Find Project">
          </form>
          <br><br><br>
        </div><br><br><br>`
    const form = document.getElementById("find-project-form")
    form.addEventListener("submit", findProjectBackend)

    //   const options = {
    //     headers = {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       project: {name: e.target[0]}
    //     })
    //   }
    //   fetch("http://localhost:3000/search")
  
    homeButton()
}

function submitProject(e) {
    e.preventDefault()
 
    let userInput = Array.from(e.target).map(ele => ele.value)
    let tasks = userInput.slice(3, userInput.length-1)
    
    //need every two elements to be an object
    let fetchObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        project: {name: userInput[0], due_date: userInput[1], group_supervisor: userInput[2], tasks: tasks} 
      })
    }

    //send data to backend
    fetch("http://localhost:3000/projects", fetchObject)
    .then(resp => resp.json())
    .then(obj => new Project(obj["id"], obj["name"], obj["due_date"], obj["group_supervisor"], obj["completed"]))
    .then(project => {
      removeChildrenFromMain()
      generateOneProjectHTML(project)
      fetchTasks(project.id)
    })
    // // AFTER SUBMITTING, GENERATE SAME HTML AS SHOW PAGE (with tasks)
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
