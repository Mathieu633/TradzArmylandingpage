// Données du quiz (exemple minimal)
const quizQuestions = [
  {
    question: "Que connais-tu du trading ?",
    answers: [
      "Je n'en ai jamais entendu parler",
      "J'ai quelques notions mais aucune expérience",
      "Je pratique déjà mais je ne suis pas rentable",
      "Je génère déjà des milliers d'euros par mois"
    ]
  },
  {
    question: "Quelle est ta tranche d'âge ?",
    answers: [
      "Moins de 18 ans",
      "De 18 à 25 ans",
      "De 26 à 35 ans",
      "De 36 à 50 ans",
      "Plus de 50 ans"
    ]
  },
  {
    question: "Quel est ton objectif avec ce business, et combien aimerais-tu gagner grâce à celui-ci ?",
    answers: [
      "Monter un side business (500€ à 1500€/mois)",
      "Remplacer mon salaire (1500€ à 5000€/mois)",
      "Devenir libre financièrement (+10000€/mois)",
      "Construire un empire (+50000€/mois)"
    ]
  },
  {
    question: "Qu'est-ce qui se passe dans ta vie en ce moment pour que tu envisages de potentiellement changer de voie ?",
    answers: [
      "Je ne suis pas satisfait(e) de ma situation financière actuelle",
      "Je cherche plus de flexibilité et de liberté dans mon travail",
      "Je veux un métier avec un meilleur potentiel de revenus",
      "Je veux travailler depuis chez moi (ou n'importe où)"
    ]
  },
  {
    question: "Quel est ton statut actuel ?",
    answers: [
      "Sans emploi",
      "Salarié",
      "Étudiant",
      "Retraité",
      "Entrepreneur",
      "Fonctionnaire"
    ]
  },
  {
    question: "Combien pourrais-tu investir dès maintenant pour atteindre ces objectifs si tu étais 100 % certain(e) d'y arriver ?",
    answers: [
      "Rien du tout...",
      "Entre 300€ et 500€",
      "Entre 500€ et 1000€",
      "Plus de 1000€"
    ]
  }
];

let currentQuestionIndex = 0;
let answers = [];

const screens = {
  home: document.getElementById("home-screen"),
  quiz: document.getElementById("quiz-screen"),
  congrats: document.getElementById("congrats-screen"),
  video: document.getElementById("video-screen"),
};

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const progressFill = document.getElementById("progress-fill");
const btnPrevious = document.getElementById("btn-previous");

function showScreen(name) {
  Object.values(screens).forEach(el => el.classList.remove("active"));
  screens[name].classList.add("active");
}

function showHomeScreen() {
  showScreen("home");
  currentQuestionIndex = 0;
  answers = [];
  progressFill.style.width = "0%";
}

function startQuiz() {
  answers = [];
  currentQuestionIndex = 0;
  showScreen("quiz");
  displayQuestion();
}

function displayQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  answersContainer.innerHTML = "";

  q.answers.forEach((ans, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = ans;
    btn.onclick = () => selectAnswer(idx);
    answersContainer.appendChild(btn);
  });

  progressFill.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;
  btnPrevious.style.display = currentQuestionIndex > 0 ? "block" : "none";
}

function selectAnswer(idx) {
  answers[currentQuestionIndex] = idx;
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    progressFill.style.width = "100%";
    showScreen("congrats");
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

function unlockVideo(event) {
  event.preventDefault();
  const video = document.getElementById("unlocked-video");
  video.src = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  showScreen("video");
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("active");
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("active");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach(m => m.classList.remove("active"));
  }
});

// Initial
showScreen("home");

