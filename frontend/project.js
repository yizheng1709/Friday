class Project {
    constructor(id, name, due_date, groupSupervisor, completed, tasks) {
        this.id = id
        this.name = name 
        this.dueDate = due_date
        this.groupSupervisor = groupSupervisor
        this.completed = completed
        this.tasks = tasks
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
        creatingProjectForm.addEventListener("submit", submitProject)
        addAnotherMember.addEventListener("click", Project.addAnotherMemberInput)
      }  

}

