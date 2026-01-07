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

async function unlockVideo(event) {
  event.preventDefault();
  
  // Récupérer les données du formulaire
  const formData = {
    firstname: document.getElementById("firstname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    instagram: document.getElementById("instagram").value,
    answer_1: answers[0],
    answer_2: answers[1],
    answer_3: answers[2],
    answer_4: answers[3],
    answer_5: answers[4],
    answer_6: answers[5],
    answer_1_text: quizQuestions[0].answers[answers[0]] || null,
    answer_2_text: quizQuestions[1].answers[answers[1]] || null,
    answer_3_text: quizQuestions[2].answers[answers[2]] || null,
    answer_4_text: quizQuestions[3].answers[answers[3]] || null,
    answer_5_text: quizQuestions[4].answers[answers[4]] || null,
    answer_6_text: quizQuestions[5].answers[answers[5]] || null
  };

  // Envoyer les données à Supabase si configuré
  if (typeof SUPABASE_CONFIG !== 'undefined' && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
    try {
      // Initialiser le client Supabase
      const { createClient } = supabase;
      const supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      
      // Insérer les données dans la base de données
      const { data, error } = await supabaseClient
        .from('quiz_responses')
        .insert([formData])
        .select();

      if (error) {
        console.error('Erreur lors de l\'enregistrement:', error);
        // Continuer quand même pour ne pas bloquer l'utilisateur
      } else {
        console.log('Données enregistrées avec succès:', data);
      }
    } catch (error) {
      console.error('Erreur de connexion à Supabase:', error);
      // Continuer quand même pour ne pas bloquer l'utilisateur
    }
  } else {
    console.warn('Supabase non configuré. Les données ne seront pas enregistrées.');
  }

  // Afficher la vidéo (déjà chargée via iframe YouTube)
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

// Gestion du lien Telegram
document.addEventListener('DOMContentLoaded', function() {
  const telegramLink = document.getElementById('telegram-link');
  if (telegramLink) {
    telegramLink.addEventListener('click', function(e) {
      e.stopPropagation();
      window.open('https://t.me/mathieubsupport', '_blank', 'noopener,noreferrer');
    });
  }
});

