// ==============================
// LANGUAGE SWITCH
// ==============================

const languageToggle = document.getElementById("languageToggle");

let currentLanguage = "en";

languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "es" : "en";

    document.documentElement.lang = currentLanguage;
    languageToggle.textContent = currentLanguage === "en" ? "ES" : "EN";

    document.querySelectorAll("[data-en][data-es]").forEach(element => {
        element.textContent = element.dataset[currentLanguage];
    });

    updateImpactCard();
    updateCharts();
});


// ==============================
// MOBILE MENU
// ==============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});


// ==============================
// WHY MENTAL HEALTH MATTERS
// INTERACTIVE BUTTONS
// ==============================

const impactInformation = {
    academic: {
        en: {
            title: "Academic Performance",
            description: "Mental health can influence concentration, motivation, memory and the ability to learn. Taking care of emotional well-being can help students engage more effectively with their studies."
        },
        es: {
            title: "Rendimiento académico",
            description: "La salud mental puede influir en la concentración, la motivación, la memoria y la capacidad de aprender. Cuidar el bienestar emocional puede ayudar a los estudiantes a involucrarse mejor en sus estudios."
        },
        icon: "fa-graduation-cap"
    },

    emotional: {
        en: {
            title: "Emotional Well-being",
            description: "Good mental health helps students understand and manage their emotions, deal with difficult situations and develop a healthier relationship with themselves."
        },
        es: {
            title: "Bienestar emocional",
            description: "Una buena salud mental ayuda a los estudiantes a comprender y manejar sus emociones, enfrentar situaciones difíciles y desarrollar una relación más saludable consigo mismos."
        },
        icon: "fa-heart"
    },

    relationships: {
        en: {
            title: "Personal Relationships",
            description: "Mental health affects the way we communicate, connect with others and build relationships. Emotional well-being can help create healthier friendships and stronger support systems."
        },
        es: {
            title: "Relaciones personales",
            description: "La salud mental influye en la manera en que nos comunicamos, conectamos con los demás y construimos relaciones. El bienestar emocional puede ayudar a crear amistades más saludables y redes de apoyo más fuertes."
        },
        icon: "fa-users"
    },

    physical: {
        en: {
            title: "Physical Health",
            description: "Mental and physical health are connected. Stress and emotional difficulties can affect sleep, energy levels and daily habits. Taking care of the mind is also part of taking care of the body."
        },
        es: {
            title: "Salud física",
            description: "La salud mental y física están conectadas. El estrés y las dificultades emocionales pueden afectar el sueño, la energía y los hábitos diarios. Cuidar la mente también es parte de cuidar el cuerpo."
        },
        icon: "fa-person-walking"
    }
};

const impactButtons = document.querySelectorAll(".impact-btn");

function updateImpactCard(topic = null) {
    const selectedButton = topic
        ? document.querySelector(`.impact-btn[data-topic="${topic}"]`)
        : document.querySelector(".impact-btn.active");

    if (!selectedButton) return;

    const selectedTopic = selectedButton.dataset.topic;
    const information = impactInformation[selectedTopic][currentLanguage];

    const impactTitle = document.getElementById("impactTitle");
    const impactDescription = document.getElementById("impactDescription");
    const impactIcon = document.querySelector("#impactDetail .card-icon i");

    impactTitle.textContent = information.title;
    impactDescription.textContent = information.description;
    impactIcon.className = `fas ${impactInformation[selectedTopic].icon}`;
}

impactButtons.forEach(button => {
    button.addEventListener("click", () => {
        impactButtons.forEach(item => item.classList.remove("active"));

        button.classList.add("active");

        updateImpactCard(button.dataset.topic);
    });
});


// ==============================
// CHARTS
// ONLY TWO CHARTS
// ==============================

const stressCanvas = document.getElementById("stressChart");
const importanceCanvas = document.getElementById("importanceChart");

let stressChart;
let importanceChart;

function createCharts() {

    // Chart 1: Stress frequency

    stressChart = new Chart(stressCanvas, {
        type: "doughnut",

        data: {
            labels: ["Always", "Often", "Sometimes", "Rarely"],
            datasets: [{
                data: [1, 2, 1, 1],
                backgroundColor: [
                    "#315b78",
                    "#6b9eaa",
                    "#a8c9c3",
                    "#dce9e8"
                ],
                borderWidth: 2,
                borderColor: "#ffffff"
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });


    // Chart 2: Importance of mental health support

    importanceChart = new Chart(importanceCanvas, {
        type: "bar",

        data: {
            labels: [
                "Very important",
                "Important",
                "Moderately important",
                "Not important"
            ],

            datasets: [{
                label: "Students",
                data: [4, 1, 0, 0],

                backgroundColor: [
                    "#315b78",
                    "#6b9eaa",
                    "#a8c9c3",
                    "#dce9e8"
                ],

                borderRadius: 7
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },

            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


// ==============================
// UPDATE CHART LANGUAGE
// ==============================

function updateCharts() {

    if (!stressChart || !importanceChart) return;

    if (currentLanguage === "en") {

        stressChart.data.labels = [
            "Always",
            "Often",
            "Sometimes",
            "Rarely"
        ];

        importanceChart.data.labels = [
            "Very important",
            "Important",
            "Moderately important",
            "Not important"
        ];

        importanceChart.data.datasets[0].label = "Students";

    } else {

        stressChart.data.labels = [
            "Siempre",
            "Frecuentemente",
            "A veces",
            "Rara vez"
        ];

        importanceChart.data.labels = [
            "Muy importante",
            "Importante",
            "Moderadamente importante",
            "Nada importante"
        ];

        importanceChart.data.datasets[0].label = "Estudiantes";
    }

    stressChart.update();
    importanceChart.update();
}


// ==============================
// START
// ==============================

createCharts();
updateImpactCard();