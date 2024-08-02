//Sticky nav bar
const navbar = document.querySelector('.navbar')
 
window.addEventListener("scroll",()=>{
    if(window.scrollY > 0){
        navbar.classList.add('sticky')
    }else{
        navbar.classList.remove('sticky')
    }
})
//End of sticky navigation bar 

//Projects
const filterLinks = document.querySelectorAll('.filter-nav-link')

filterLinks.forEach((filterLink) => {
    filterLink.addEventListener('click', (e) => {
        e.preventDefault()

        document.querySelector(".filter-nav-link.active").classList.remove("active")
        filterLink.classList.add("active")

        const project = document.querySelectorAll('.project')
        project.forEach((project) => {
            project.classList.add("hide")
        })

        if(filterLink.getAttribute('data-type')===project.
            getAttribute('date-type') || filterLink.getAttribute('data-type')---'all'){
              project.classlist.remove('hide')  
            }
    })
})
//End of Projects