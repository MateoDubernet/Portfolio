const routes = {
    "/profile": "pages/profile.html",
    "/projets": "pages/projets.html",
    "/compétences": "pages/compétences.html",
    "/expériences-professionnelle": "pages/expériences-professionnelle.html",
    "/formations-académique": "pages/formations-académique.html",
};

const handleLocation = async () => {
    if (!window.location.hash || window.location.hash === "#/") {
        window.history.replaceState({}, "", "#/profile");
    }

    let path = window.location.hash.replace("#", "");
    const route = routes[path] || routes["/profile"];

    try {
        const response = await fetch(route);
        if (!response.ok) {
            throw new Error(`Failed to load ${route}: ${response.statusText}`);
        }

        const html = await response.text();
        document.getElementById("app").innerHTML = html;
    } catch (error) {
        console.error(error);
        document.getElementById("app").innerHTML = "<p>Page not found</p>";
    }

    updateActiveLink(path);
};

const updateActiveLink = (path) => {
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${path}`) {
            link.classList.add("active");
        }
    });
};

window.addEventListener("hashchange", handleLocation);
window.addEventListener("DOMContentLoaded", handleLocation);