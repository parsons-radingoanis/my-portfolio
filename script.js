const fileItems = document.querySelectorAll(".file-item");
const pageSections = [
    { name: "Home", id: "home", file: "index.html" },
    { name: "About", id: "about", file: "about.html" },
    { name: "Education", id: "education", file: "education.html" },
    { name: "Skills", id: "skills", file: "skills.json" },
    { name: "Projects", id: "projects", file: "projects/index.html" },
    { name: "Reports", id: "reports", file: "reports.md" },
    { name: "Experience", id: "experience", file: "experience.html" },
    { name: "Learning Journey", id: "journey", file: "journey.md" },
    { name: "Contact", id: "contact", file: "contact.html" }
];

function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    document.querySelectorAll(".page-section").forEach(function (item) {
        item.classList.remove("active-section");
    });
    section.classList.add("active-section");

    fileItems.forEach(function (item) {
        item.classList.toggle("active", item.dataset.section === sectionId);
    });

    const selected = pageSections.find(function (item) {
        return item.id === sectionId;
    });

    if (selected) {
        document.getElementById("breadcrumb-file").textContent = selected.file;
        document.querySelector(".editor-tab").innerHTML =
            '<span class="file-icon html">▤</span> ' + selected.file.split("/").pop() + ' <span class="tab-close">×</span>';
        document.getElementById("terminal-message").textContent =
            "Opened " + selected.file;
    }

    document.getElementById("sidebar").classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

fileItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navigateToSection(item.dataset.section);
    });
});

document.querySelectorAll("[data-go]").forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        navigateToSection(link.dataset.go);
    });
});

// Mobile explorer
document.getElementById("mobile-explorer").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("open");
});
document.getElementById("sidebar-close").addEventListener("click", function () {
    document.getElementById("sidebar").classList.remove("open");
});

// Activity bar explorer button
document.querySelector('[data-panel="explorer"]').addEventListener("click", function () {
    if (window.innerWidth <= 720) {
        document.getElementById("sidebar").classList.toggle("open");
    }
});

// Theme
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
    themeToggle.textContent = document.body.classList.contains("light-theme") ? "☾" : "☼";
});

// COMMAND PALETTE
const commandOpen = document.getElementById("command-open");
const commandPalette = document.getElementById("command-palette");
const commandInput = document.getElementById("command-input");
const commandResults = document.getElementById("command-results");

function displayCommandResults(searchText) {
    commandResults.innerHTML = "";
    const filteredSections = pageSections.filter(function (section) {
        return section.name.toLowerCase().includes(searchText.toLowerCase()) ||
            section.file.toLowerCase().includes(searchText.toLowerCase());
    });

    filteredSections.forEach(function (section) {
        const result = document.createElement("button");
        result.textContent = section.name + "  —  " + section.file;
        result.className = "command-result";
        result.addEventListener("click", function () {
            navigateToSection(section.id);
            closeCommandPalette();
        });
        commandResults.appendChild(result);
    });
}

function openCommandPalette() {
    commandPalette.classList.add("open");
    commandPalette.setAttribute("aria-hidden", "false");
    commandInput.value = "";
    displayCommandResults("");
    commandInput.focus();
}
function closeCommandPalette() {
    commandPalette.classList.remove("open");
    commandPalette.setAttribute("aria-hidden", "true");
}
commandOpen.addEventListener("click", openCommandPalette);
commandInput.addEventListener("input", function () {
    displayCommandResults(commandInput.value);
});
commandPalette.addEventListener("click", function (event) {
    if (event.target === commandPalette) closeCommandPalette();
});
document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openCommandPalette();
    }
    if (event.key === "Escape") closeCommandPalette();
});

// TERMINAL PANEL
document.getElementById("terminal-toggle").addEventListener("click", function () {
    const terminal = document.querySelector(".terminal-output");
    terminal.hidden = !terminal.hidden;
    this.textContent = terminal.hidden ? "⌃" : "⌄";
});

// Back to top
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", function () {
    backToTop.classList.toggle("visible", window.scrollY > 400);
});
backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Image preview
const imagePreview = document.getElementById("image-preview");
const previewImage = document.getElementById("preview-image");
function showImagePreview(imageSource, imageDescription) {
    previewImage.src = imageSource;
    previewImage.alt = imageDescription;
    imagePreview.classList.add("open");
}
document.getElementById("close-preview").addEventListener("click", function () {
    imagePreview.classList.remove("open");
});
imagePreview.addEventListener("click", function (event) {
    if (event.target === imagePreview) imagePreview.classList.remove("open");
});

// ABOUT CONTENT
document.getElementById("about-content").innerHTML = `
    <div class="content-card">
        
        <p class="card-description">
            Final-year Diploma in Computer Science student at Tshwane University of Technology with a 
            strong interest in technology and exploring different areas of the industry, including software 
            development, backend development, application development, cybersecurity and Linux.
        </p><br>
        <p class="card-description">
            Enjoy problem-solving, coding, debugging and analysing technical challenges to understand 
            how systems work and identify practical solutions. Have developed technical knowledge through
            academic studies and hands-on experience with programming, databases, web technologies
            and operating systems.
        </p><br>
        <p class="card-description">I am continuously expanding my technical knowledge through academic projects and practical learning.</p><br>
        <p class="card-description">
            Currently seeking a Work Integrated Learning (WIL) opportunity to gain practical industry 
            experience, apply acquired Computer Science knowledge and fulfil the practical training 
            requirement for completing my Diploma. Eager to learn, contribute to a team and continue 
            developing professionally within the technology industry.
        </p>
    </div>
    <div class="card-grid">
        <div class="content-card">
            <h3 class="card-title">Key Areas of Knowledge</h3>
            <div class="expertise-list">
                <span class="tag">Java Programming</span>
                <span class="tag">Object-Oriented Programming</span>
                <span class="tag">Advanced Object-Oriented Programming</span>
                <span class="tag">HTML & CSS</span>
                <span class="tag">JavaScript</span>
                <span class="tag">SQL, MySQL & PostgreSQL</span>
                <span class="tag">Linux</span>
                <span class="tag">Java EE</span>
                <span class="tag">Android Development</span>
                <span class="tag">Cybersecurity Fundamentals</span>
            </div>
        </div>
    </div>
`;

// EDUCATION
document.getElementById("education-content").innerHTML = `
    <div class="timeline">
        <div class="timeline-card">
            <h3 class="card-title">Diploma in Computer Science (In Progress) — Tshwane University of Technology (TUT)</h3>
            <p class="card-description">Final-year student | <span style="color:rgb(233, 29, 29); text-weight: bold;" >WIL outstanding</span></p>
            <div><span class="tag">Computer Science</span><span class="tag">Java</span><span class="tag">SQL</span><span class="tag">Linux</span></div>
        </div>
        <div class="timeline-card">
            <h3 class="card-title">National Senior Certificate (NSC) — Ngwanakwena Senior Secondary School </h3>
            <span class="tag">Completed NSC in 2023</span>
        </div>
    </div>
`;

// SKILLS
const skillsContent = document.getElementById("skills-content");
const skillFilters = document.getElementById("skill-filters");
const skills = [
    { name: "Java", category: "Programming", level: "Studied and practised" },
    { name: "Kotlin", category: "Programming", level: "Studied and practised" },
    { name: "HTML", category: "Web Development", level: "Studied and practised" },
    { name: "CSS", category: "Web Development", level: "Studied and practised" },
    { name: "JavaScript", category: "Web Development", level: "Studied and practised" },
    { name: "SQL", category: "Databases", level: "Studied and practised" },
    { name: "MySQL", category: "Databases", level: "Studied and practised" },
    { name: "PostgreSQL", category: "Databases", level: "Practised in projects" },
    { name: "Linux", category: "Operating Systems", level: "Studied and practised" },
    { name: "Git", category: "Tools", level: "Used for version control" },
    { name: "GitHub", category: "Tools", level: "Used for repository management" },
    { name: "Notepad++", category: "Tools", level: "Used for code editing" },
    { name: "Android Studio", category: "Tools", level: "Used for Android development" },
    { name: "Visual Studio Code", category: "Tools", level: "Used for code editing" },
    { name: "NetBeans", category: "Tools", level: "Used for Java development" }
    
];
const skillCategories = ["All", "Programming", "Web Development", "Databases", "Operating Systems", "Tools"];

function displaySkills(category) {
    skillsContent.innerHTML = "";
    const filteredSkills = category === "All" ? skills : skills.filter(function (skill) {
        return skill.category === category;
    });
    filteredSkills.forEach(function (skill) {
        const card = document.createElement("div");
        card.className = "skill-card";
        card.innerHTML = `<h3 class="card-title">${skill.name}</h3><p>${skill.category}</p><span class="tag">${skill.level}</span>`;
        skillsContent.appendChild(card);
    });
    document.querySelectorAll("#skill-filters .filter-btn").forEach(function (button) {
        button.classList.toggle("active", button.textContent === category);
    });
}
skillCategories.forEach(function (category, index) {
    const button = document.createElement("button");
    button.textContent = category;
    button.className = "filter-btn" + (index === 0 ? " active" : "");
    button.addEventListener("click", function () { displaySkills(category); });
    skillFilters.appendChild(button);
});
displaySkills("All");

// PROJECTS
const projectsContent = document.getElementById("projects-content");
const projectFilters = document.getElementById("project-filters");
const projects = [
    {
        name: "SpazaHub", category: "Java Development",
        description: "A Java EE web-based tuck shop management system developed using NetBeans.",
        technologies: ["Java", "Java EE", "EJB", "JPA", "JSP", "Servlets", "PostgreSQL"],
        details: "Developed a web-based management system with user authentication, roles, product and "+
                 "category management, sales processing, stock management and reports. "+
                 "The web application integrates a separate Enterprise JavaBeans (EJB) module for business logic and data access.",
        image: "images/spazahub.jpeg",
        github: "https://github.com/parsons-radingoanis/SpazaHub"
    },
    {
        name: "Old Lady's Tuck Shop", category: "Java Development",
        description: "A standalone Java console application for a tuck shop.",
        technologies: ["Java", "Arrays", "Methods", "Loops"],
        details: "A console-based application that simulates tuck shop transactions, including product selection, stock availability checks, payment processing, change calculation, customer receipts and shop summaries.",
        image: "images/tuckshop.jpeg",
        github: "https://github.com/parsons-radingoanis/old-ladys-tuck-shop"
    },
    {
        name: "Personal Portfolio Website", category: "Web Development",
        description: "A standalone Java console application for a tuck shop.",
        technologies: ["HTML", "CSS", "JavaScript"],
        details: "An interactive personal portfolio website showcasing my Computer Science background, technical skills, projects and learning journey.",
        image: "images/portfolio.png",
        github: "https://github.com/parsons-radingoanis/my-portfolio.git",
        website: "https://parsons-radingoanis.github.io/my-portfolio/"
    }/*,
    {
        name: "Linux Practical Work", category: "Linux",
        description: "Practical Linux exercises involving system administration and command-line operations.",
        technologies: ["Linux", "Bash", "Permissions", "Networking"],
        details: "Worked with Linux commands, users and groups, file permissions, access control, system information, directory management and backup operations.",
        image: "images/linux-project.png"
    }*/
];
const projectCategories = ["All", "Java Development", "Web Development", "Linux"];

function displayProjects(category) {
    projectsContent.innerHTML = "";
    const filteredProjects = category === "All" ? projects : projects.filter(function (project) {
        return project.category === category;
    });
    filteredProjects.forEach(function (project) {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <img src="${project.image}" alt="${project.name} screenshot" class="project-image">
            <h3 class="card-title">${project.name}</h3>
            <p>${project.description}</p>
            <div>${project.technologies.map(function (technology) { return `<span class="tag">${technology}</span>`; }).join("")}</div>
            <div class="project-actions">
                <button class="details-btn">View Details</button>
                ${
                    project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" 
                    class="github-btn"><i class="fab fa-github"></i> View on GitHub</a>` : ""
                }
                ${
                    project.website ? `<a href="${project.website}" target="_blank" rel="noopener noreferrer" 
                    class="github-btn"><i class="fas fa-globe"></i> View Website</a>` : ""
                }
            </div>
            <div class="project-details" hidden>${project.details}</div>
        `;
        const detailsButton = card.querySelector(".details-btn");
        const details = card.querySelector(".project-details");
        detailsButton.addEventListener("click", function () {
            details.hidden = !details.hidden;
            detailsButton.textContent = details.hidden ? "View Details" : "Hide Details";
        });
        card.querySelector(".project-image").addEventListener("click", function () {
            showImagePreview(project.image, project.name);
        });
        projectsContent.appendChild(card);
    });
    document.querySelectorAll("#project-filters .filter-btn").forEach(function (button) {
        button.classList.toggle("active", button.textContent === category);
    });
}
projectCategories.forEach(function (category, index) {
    const button = document.createElement("button");
    button.textContent = category;
    button.className = "filter-btn" + (index === 0 ? " active" : "");
    button.addEventListener("click", function () { displayProjects(category); });
    projectFilters.appendChild(button);
});
displayProjects("All");

// EXPERIENCE
document.getElementById("experience-content").innerHTML = `
    <div class="timeline">
        <div class="timeline-card">
            <h3 class="card-title">Student Residence Recruitment Assistance</h3>
                <li>Assisted students with recruitment-related enquiries and administrative processes.</li>
                <li>Captured and maintained student information; organised documents and 
                supported administrative activities.</li>
            </ul>
            <span class="tag">Work Experience</span><span class="tag">Administrative Support</span><span class="tag">Communication</span><span class="tag">Organisation</span>
        </div>
    </div>
`;

// LEARNING JOURNEY
const journey = [
    { title: "Computer Science Foundations", description: "Started developing a foundation in Computer Science, programming concepts and problem-solving.", technologies: ["Computer Science", "Programming"] },
    { title: "Object-Oriented Programming", description: "Studied Java programming, object-oriented concepts and practical application development.", technologies: ["Java", "OOP"] },
    { title: "Advanced Object-Oriented Programming", description: "Studied Java programming, advanced object-oriented concepts and practical application development.", technologies: ["Java", "AOP"] },
    { title: "Databases", description: "Developed knowledge of database design, SQL and working with relational databases.", technologies: ["SQL", "PostgreSQL"] },
    { title: "Web and Application Development", description: "Explored web application development and Android development using Kotlin and Jetpack Compose.", technologies: ["HTML", "CSS", "JavaScript", "Kotlin"] },
    { title: "Linux and Technical Practice", description: "Practised Linux commands, user and group management, file permissions and system administration tasks.", technologies: ["Linux", "Bash", "Networking"] },
    { title: "Continuing to Explore Technology", description: "Continuing to develop technical knowledge while seeking an internship or WIL opportunity to gain industry experience.", technologies: ["Learning", "Practical Experience"] }
];
document.getElementById("journey-content").innerHTML = `
    <div class="timeline">
        ${journey.map(function (item) {
            return `<div class="timeline-card"><h3 class="card-title">${item.title}</h3><p class="card-description">${item.description}</p><div>${item.technologies.map(function (technology) { return `<span class="tag">${technology}</span>`; }).join("")}</div></div>`;
        }).join("")}
    </div>
`;

// CONTACT
const contacts = [
    {
        icon: '<i class="fa-solid fa-envelope"></i>',
        link: "mailto:parsonsradingoanis@gmail.com",
        label: "Email"
    },
    {
        icon: '<i class="fa-solid fa-phone"></i>',
        link: "tel:+27715977044",
        label: "Phone"
    },
    {
        icon: '<i class="fa-brands fa-github"></i>',
        link: "https://github.com/parsons-radingoanis",
        label: "GitHub"
    },
    {
        icon: '<i class="fa-brands fa-linkedin"></i>',
        link: "https://www.linkedin.com/in/parsons-radingoanis-063a27301",
        label: "LinkedIn"
    },
    {
        icon: '<i class="fa-brands fa-whatsapp"></i>',
        link: "https://wa.me/27715977044",
        label: "WhatsApp"
    },
    {
        icon: '<i class="fa-brands fa-instagram"></i>',
        link: "https://www.instagram.com/xo__thapelo/",
        label: "Instagram"
    }
];
document.getElementById("contact-content").innerHTML = `
    <div class="contact-grid">
        ${contacts.map(function (contact) {
            const external = contact.link.startsWith("http");
            return `<a href="${contact.link}" class="contact-card" aria-label="${contact.label}" title="${contact.label}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}><span class="contact-icon">${contact.icon}</span></a>`;
        }).join("")}
    </div>
`;

// UPDATE QUICK STATS
document.getElementById("stat-education").textContent =
    String(1).padStart(2, "0");

document.getElementById("stat-projects").textContent =
    String(projects.length).padStart(2, "0");

// Start with home selected
navigateToSection("home");
