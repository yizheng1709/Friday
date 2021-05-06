class Task{
    constructor(projectID, content, memberEmail, completed, id) {
        this.projectID = projectID
        this.content = content 
        this.memberEmail = memberEmail
        this.completed = completed 
        this.id = id
    }

    static updateTask(e) {
        e.preventDefault()
        // console.log(this)
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
        .catch( () => alert("There was an error completing the task. Please try again."))
    }
     
    //instance  methods

    checkBox() {
        if (this.completed) {
          return "checked"
        }}
        

    generateTaskHTML() {
        return `
        <p class="task-content">${this["content"]}</p>
        <span class="assigned">assigned to: ${this["memberEmail"]}</span><br>
        <form class="task" id="complete-task${this.id}">
        <input name="completed" type="checkbox" ${this.checkBox()}><span class="check">Completed Task</span><br>
        <input class="initial-button small-button bold" type="submit">
        </form>
        `
    }
}