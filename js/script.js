const body = document.querySelector("body"),
    toggle = body.querySelector(".toggle"),
    sidebar = body.querySelector(".sidebar");
    header = body.querySelector(".header");
pageContent = body.querySelector(".page-content");

toggle.addEventListener("click", () => {
    console.log('clicked');
    sidebar.classList.toggle("close");
    // header.classList.toggle("close");
    pageContent.classList.toggle("alignMainContent");
    console.log(pageContent);
});

