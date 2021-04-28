const initialButton = document.getElementById("initial-button")
const initialContact = document.getElementById("initial-contact")


function deleteInitialAndContinue() {
    initialContact.remove()
}

initialButton.addEventListener("click", deleteInitialAndContinue)