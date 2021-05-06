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

}

