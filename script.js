    // var b1 = document.getElementById("toggle").classList.toggle("hide")
// var b1 = document.getElementById("toggle1").classList.toggle("hide")

const openModalButtons = document.querySelectorAll("[data-modal -target]")
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById("overlay")

openModalButtons.forEach(button => {
    button.addEventlistener("click", () => {
        const modal = document.querySelector(button.dataset.newblogTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventlistener("click", () => {
        const modal = button.closest(".new-blog")
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add("active")
    overlay.classList.add("active")
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove("active")
    overlay.classList.remove("active")
}