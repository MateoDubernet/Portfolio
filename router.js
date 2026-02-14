const routes = {
    "/": "pages/profil.html",
    "/profil": "pages/profil.html",
    "/competences": "pages/competences.html",
    "/professional-experience": "pages/professional-experience.html",
    "/academic-training": "pages/academic-training.html",
    "/projects": "pages/projects.html",
};

const handleLocation = async () => {
    let path = window.location.hash.replace("#", "");
    if (path === "") path = "/";

    const route = routes[path] || routes["/"];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("app").innerHTML = html;

    updateActiveLink(path);
};

const updateActiveLink = (path) => {
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.classList.remove("active");

        const linkPath = new URL(link.href).pathname;

        if (linkPath === path || (path === "/" && linkPath === "/profil")) {
            link.classList.add("active");
        }
    })
};

window.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        window.history.pushState({}, "", e.target.href);
        handleLocation();
    }
});

window.addEventListener("hashchange", handleLocation);
window.addEventListener("DOMContentLoaded", handleLocation);

window.onpopstate = handleLocation;
handleLocation();