class Project {
    constructor(id, name, due_date, groupSupervisor, completed, tasks) {
        this.id = id
        this.name = name 
        this.dueDate = due_date
        this.groupSupervisor = groupSupervisor
        this.completed = completed
        this.tasks = tasks
    }

    static createDivForAllProjects() {
        mainContainer.innerHTML += `
        <div class="shadow center responsive creating-project-div all-projects-div" id="all-projects-div">
        
        </div>
        <br><br>
        `
        }
        

    static addAnotherMemberInput() {
        const groupMembers = document.getElementById("group-members")
        groupMembers.innerHTML += `
        <br>
        <label class="project-name label-font">Group Member's E-mail</label><br><br>
        <input type="text" class="creating-project-input" value=" "><br><br>
        <label class="project-name label-font">Task</label><br><br>
        <input type="text" class="creating-project-input task-input" value=" "><br>
        `
      }

    static newProjectForm() {
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
        creatingProjectForm.addEventListener("submit", Project.submitProject)
        addAnotherMember.addEventListener("click", Project.addAnotherMemberInput)
      }  

      static findAllProjects() {
        removeChildrenFromMain()
        Project.createDivForAllProjects()
        homeButton()
        // const allProjectsDiv = document.getElementById("all-projects-div")
        fetch("http://localhost:3000/projects")
        .then(resp => { 
          if (resp.ok){
          return resp.json()
        }else {
          alert("There was an error finding all the projects! Please try again.")
        }
        })
        .then(data => data.map(project => new Project(project["id"], project["name"], project["due_date"], project["group_supervisor"], project["completed"])))
        .then(projects => {projects.forEach(project => { 
         project.generateProjectHTML()
        })
        return projects.forEach(project => {
          document.getElementById(`delete-${project.id}`).addEventListener("submit", project.deleteProject.bind(project))

        })}
        )
        
        .then(() => Array.from(document.getElementsByClassName("show-project")).forEach(function (child) {
        child.addEventListener("click", Project.findOneProject)}))

        // .then(() => 
        //   {Array.from(document.getElementsByClassName("delete-project")).forEach(function (child) {
        //     // {debugger}
        //     // value of this is where the function is declared
        //     // unless it's called on the left object
        //     {debugger}
        //     // get this = form
        //     let boundChild = deleteProject.bind(child)
        //     child.addEventListener("submit", boundChild)
            
            // function(e) {
            //   // e.preventDefault()
            //   // console.log(this)
            //   this.deleteProject
            // })
          // })})
          .catch(() => alert("There was an error finding all the projects! Please try again."))
        }

        deleteProject(e) {
          //  {debugger}
         e.preventDefault()
          const id = this.id
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
          .catch(() => alert("There was an error deleting the project! Please try again."))
        } 
        
      // deleteProject(e) {
      //   //  {debugger}
      //   e.preventDefault()
      //   const id = e.target.id
      //   const options = {
      //   method: "DELETE",
      //   headers: {
      //       "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //       project: {id: id}
      //   })
      //   }
      //   fetch(`http://localhost:3000/projects/${id}`, options)
      //   .then(() => Array.from(document.getElementsByClassName(`project${id}`)).forEach(child => child.remove()))
      //   .catch(() => alert("There was an error deleting the project! Please try again."))
      // } 


        static findOneProject(e) {
          removeChildrenFromMain()
          const id = e.target.id
          
          fetch(`http://localhost:3000/projects/${id}`)
          .then(resp => { 
            if (resp.ok){
              return resp.json()
            }else {
              alert("There was an error finding the project! Please try again.")
            }
          
            })
            .then(project => {
              return(
                new Project(project["id"], project["name"], project["due_date"], project["group_supervisor"], project["completed"])
              )
            })
            .then(project => {
              project.generateOneProjectHTML()
              project.fetchTasks()
            })
            .catch(() => alert("There was an error finding the project! Please try again."))
          
          }

        static submitProject(e) {
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
            .then(resp => { 
              if (resp.ok){
                return resp.json()
              }else {
                alert("There was an error submitting the project! Please try again.")
            }
          })
          .then(obj => new Project(obj["id"], obj["name"], obj["due_date"], obj["group_supervisor"], obj["completed"]))
          .then(project => {
            removeChildrenFromMain()
            project.generateOneProjectHTML()
            project.fetchTasks()
          })
          .catch(() => alert("There was an error saving the project! Please try again."))
          // // AFTER SUBMITTING, GENERATE SAME HTML AS SHOW PAGE (with tasks)
        }
        
        
            
    // static deleteProject(e) {
    //     e.preventDefault()
    //     const id = e.target.id
    //     const options = {
    //     method: "DELETE",
    //     headers: {
      //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         project: {id: id}
    //     })
    //     }
    //     fetch(`http://localhost:3000/projects/${id}`, options)
    //     .then(() => Array.from(document.getElementsByClassName(`project${id}`)).forEach(child => child.remove()))
    //     .catch(() => alert("There was an error deleting the project! Please try again."))
    // }  

    /// instance methods
          // is this better here or in the Task class?
    fetchTasks() {
        // console.log(this)
        const tasksContainer = document.getElementById(`tasks-container`)
        fetch(`http://localhost:3000/projects/${this.id}/tasks`)
        .then(resp => { 
          if (resp.ok){
          return resp.json()
        }else {
          alert("There was an error finding the tasks! Please try again.")
        }
        })
        .then(tasks => tasks.map(task => new Task(task["project_id"], task["content"], task["member_email"], task["completed"], task["id"])))
        .then(tasks => tasks.forEach(task => tasksContainer.innerHTML += task.generateTaskHTML()))
        
        
        .then(document.getElementById(`project${this.id}`).append(tasksContainer))
        
        .then(() => Array.from(document.getElementsByClassName("task")).forEach(function(task){
          task.addEventListener("submit", Task.updateTask)
        }))
        .catch(() => alert("There was an error finding the tasks! Please try again."))
        }

    generateOneProjectHTML(){
        const id = this.id
        
        mainContainer.innerHTML += `
        <div class="shadow center responsive creating-project-div all-projects-div" id="project${id}">
        <span class="label-font underline" id="${id}">Project Name</span><br>
        <span class="project-font bold">${this.name}</span><br>
        <span class="label-font underline" id="${id}">Due Date</span><br>
        <span class="project-font bold">${this.dueDate}</span><br>
        <span class="label-font underline" id="${id}">Supervisor</span><br>
        <span class="project-font bold">${this.groupSupervisor}</span><br>
        <br>
        <div id="tasks-container">
        </div>
        </div>
        <br><br>
        `
        homeButton()
    }

    generateProjectHTML() {
        const id = this.id
        const allProjectsDiv = document.getElementById("all-projects-div")

        allProjectsDiv.innerHTML += `
        <span class="label-font underline project${id}"><br>Project Name: </span>
        <span class="project-font fake-hover show-project project${id}" id="${id}">${this.name}</span><br>
        <span class="label-font underline project${id}">Due Date: </span>
        <span class="project-font fake-hover show-project project${id}" id="${id}">${this.dueDate}</span><br>
        
        <form class="delete-project bold project${id}" id="delete-${id}">
        <input class="initial-button small-button " type="submit" value="Delete Project">
        <br></form>
        `

        
      }


}




