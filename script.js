// ==========================================================
// PORTFÓLIO RELÂMPAGO MCQUEEN (#95 RUST-EZE) - JAVASCRIPT
// ==========================================================

// DADOS PADRÃO
const DEFAULT_DATA = {
  name: "RELÂMPAGO MCQUEEN",
  role: "Piloto Desenvolvedor Full Stack & Especialista em Altas Velocidades",
  quote: '"Mais rápido que o rápido, mais veloz que o veloz... Eu sou a Velocidade!"',
  bio: "Bem-vindo ao meu cockpit! Assim como o Relâmpago McQueen aprendeu em Radiator Springs, tecnologia e desenvolvimento não são apenas sobre velocidade pura, mas sim sobre precisão, trabalho em equipe e entregar uma experiência inesquecível a cada curva do código.",
  photo: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
  skills: [
    { name: "HTML5 & CSS3 Ultra Veloz", level: 98 },
    { name: "JavaScript / ES6 Async Sprint", level: 95 },
    { name: "React / Vue Engine Turbo", level: 90 },
    { name: "Node.js High Performance", level: 88 },
    { name: "UI/UX Aerodinâmico", level: 92 }
  ]
};

// Obter dados salvos ou padrão
let profileData = JSON.parse(localStorage.getItem('mcqueen_portfolio_data')) || DEFAULT_DATA;

// ELEMENTOS DOM
const introOverlay = document.getElementById('intro-overlay');
const btnStartEngine = document.getElementById('btn-start-engine');
const profileImg = document.getElementById('profile-img');
const profileName = document.getElementById('profile-name');
const navName = document.getElementById('nav-name');
const introNameDisplay = document.getElementById('intro-name-display');
const profileRole = document.getElementById('profile-role');
const profileQuote = document.getElementById('profile-quote');
const profileBio = document.getElementById('profile-bio');
const skillsList = document.getElementById('skills-list');

// MODAL EDITOR
const editorModal = document.getElementById('editor-modal');
const btnOpenEditor = document.getElementById('btn-open-editor');
const btnCloseEditor = document.getElementById('btn-close-editor');
const editorForm = document.getElementById('editor-form');
const btnAddSkill = document.getElementById('btn-add-skill');
const btnResetDefault = document.getElementById('btn-reset-default');
const skillsEditorContainer = document.getElementById('skills-editor-container');

// INPUTS MODAL
const inputImgUrl = document.getElementById('input-img-url');
const inputImgFile = document.getElementById('input-img-file');
const inputName = document.getElementById('input-name');
const inputRole = document.getElementById('input-role');
const inputQuote = document.getElementById('input-quote');
const inputBio = document.getElementById('input-bio');

// EFEITOS DE SOM E VISUAIS
const btnKachowSound = document.getElementById('btn-kachow-sound');
const kachowOverlay = document.getElementById('kachow-overlay');

// RENDERIZAR NA PÁGINA
function renderProfile() {
  if (profileImg) profileImg.src = profileData.photo;
  if (profileName) profileName.textContent = profileData.name;
  if (navName) navName.textContent = profileData.name;
  if (introNameDisplay) introNameDisplay.textContent = profileData.name;
  if (profileRole) profileRole.textContent = profileData.role;
  
  if (profileQuote) {
    profileQuote.textContent = profileData.quote.startsWith('"') 
      ? profileData.quote 
      : `"${profileData.quote}"`;
  }
  
  if (profileBio) profileBio.textContent = profileData.bio;

  // Renderizar Barras de Habilidades
  if (skillsList) {
    skillsList.innerHTML = '';
    profileData.skills.forEach(skill => {
      const item = document.createElement('div');
      item.className = 'skill-card';
      item.innerHTML = `
        <div class="skill-info">
          <span class="skill-name"><i class="fa-solid fa-bolt"></i> ${skill.name}</span>
          <span class="skill-percentage">${skill.level}%</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
        </div>
      `;
      skillsList.appendChild(item);
    });
  }
}

// ANIMAÇÃO DE ENTRADA
if (btnStartEngine && introOverlay) {
  btnStartEngine.addEventListener('click', () => {
    introOverlay.classList.add('hide');
    triggerKachowEffect();
  });
}

// ABRIR / FECHAR PIT STOP
if (btnOpenEditor && editorModal) {
  btnOpenEditor.addEventListener('click', () => {
    inputImgUrl.value = profileData.photo.startsWith('data:') ? '' : profileData.photo;
    inputImgFile.value = '';
    inputName.value = profileData.name;
    inputRole.value = profileData.role;
    inputQuote.value = profileData.quote;
    inputBio.value = profileData.bio;

    renderSkillsEditor();
    editorModal.classList.add('show');
  });
}

if (btnCloseEditor && editorModal) {
  btnCloseEditor.addEventListener('click', () => {
    editorModal.classList.remove('show');
  });
}

// EDITAR HABILIDADES NO MODAL
function renderSkillsEditor() {
  if (!skillsEditorContainer) return;
  skillsEditorContainer.innerHTML = '';
  
  profileData.skills.forEach((skill, index) => {
    const row = document.createElement('div');
    row.className = 'skill-edit-row';
    row.innerHTML = `
      <input type="text" class="skill-edit-name" value="${skill.name}" placeholder="Nome da Habilidade">
      <input type="number" class="skill-edit-level" value="${skill.level}" min="0" max="100" placeholder="%">
      <button type="button" class="btn-remove-skill" onclick="removeSkillRow(${index})">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
    skillsEditorContainer.appendChild(row);
  });
}

// REMOVER UMA HABILIDADE
window.removeSkillRow = function(index) {
  profileData.skills.splice(index, 1);
  renderSkillsEditor();
};

if (btnAddSkill) {
  btnAddSkill.addEventListener('click', () => {
    profileData.skills.push({ name: "Nova Habilidade Turbo", level: 90 });
    renderSkillsEditor();
  });
}

// UPLOAD DE ARQUIVO DE IMAGEM
let uploadedFileBase64 = null;
if (inputImgFile) {
  inputImgFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        uploadedFileBase64 = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// SALVAR FORMULÁRIO
if (editorForm) {
  editorForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Atualiza Foto
    if (uploadedFileBase64) {
      profileData.photo = uploadedFileBase64;
    } else if (inputImgUrl && inputImgUrl.value.trim() !== '') {
      profileData.photo = inputImgUrl.value.trim();
    }

    // Atualiza Textos
    if (inputName) profileData.name = inputName.value.trim() || DEFAULT_DATA.name;
    if (inputRole) profileData.role = inputRole.value.trim() || DEFAULT_DATA.role;
    if (inputQuote) profileData.quote = inputQuote.value.trim() || DEFAULT_DATA.quote;
    if (inputBio) profileData.bio = inputBio.value.trim() || DEFAULT_DATA.bio;

    // Atualiza Lista de Habilidades
    const skillNames = document.querySelectorAll('.skill-edit-name');
    const skillLevels = document.querySelectorAll('.skill-edit-level');
    const updatedSkills = [];

    skillNames.forEach((input, idx) => {
      const nameVal = input.value.trim();
      const levelVal = parseInt(skillLevels[idx].value) || 50;
      if (nameVal) {
        updatedSkills.push({ 
          name: nameVal, 
          level: Math.min(100, Math.max(0, levelVal)) 
        });
      }
    });

    profileData.skills = updatedSkills.length > 0 ? updatedSkills : DEFAULT_DATA.skills;

    // Salva no LocalStorage
    localStorage.setItem('mcqueen_portfolio_data', JSON.stringify(profileData));
    
    uploadedFileBase64 = null;
    renderProfile();
    editorModal.classList.remove('show');
    triggerKachowEffect();
  });
}

// RESTAURAR PADRÃO
if (btnResetDefault) {
  btnResetDefault.addEventListener('click', () => {
    if (confirm("Deseja restaurar todos os dados originais do Relâmpago McQueen?")) {
      profileData = JSON.parse(JSON.stringify(DEFAULT_DATA));
      localStorage.removeItem('mcqueen_portfolio_data');
      renderProfile();
      if (editorModal) editorModal.classList.remove('show');
    }
  });
}

// EFEITO KACHOW & ÁUDIO
function playKachowSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch(e) {
    console.log("Audio Web API indisponível.");
  }
}

function triggerKachowEffect() {
  playKachowSound();
  if (kachowOverlay) {
    kachowOverlay.classList.add('active');
    setTimeout(() => {
      kachowOverlay.classList.remove('active');
    }, 900);
  }
}

if (btnKachowSound) {
  btnKachowSound.addEventListener('click', triggerKachowEffect);
}

// INICIALIZAR AO CARREGAR A PÁGINA
document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
});