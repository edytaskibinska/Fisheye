function displayModal() {
    console.log("test")
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal(event) {
    event.preventDefault()
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
