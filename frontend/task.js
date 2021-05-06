class Task{
    constructor(projectID, content, memberEmail, completed, id) {
        this.projectID = projectID
        this.content = content 
        this.memberEmail = memberEmail
        this.completed = completed 
        this.id = id
    }

    checkBox() {
        if (this.completed) {
          return "checked"
        }
      }
      
     generateTaskHTML() {
        return `
        <p class="task-content">${this["content"]}</p>
        <span class="assigned">assigned to: ${this["memberEmail"]}</span><br>
        <form class="task" id="complete-task${this.id}">
        <input name="completed" type="checkbox" ${checkBox(this)}><span class="check">Completed Task</span><br>
        <input class="initial-button small-button bold" type="submit">
        </form>
        `
      }
      
}