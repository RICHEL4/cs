const ACTIVATION_CODE = "TAFAIRAY1210";

function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'block';
    }
}

function registerOrLogin() {
    const phone = document.getElementById('phoneInput').value.trim();
    const code = document.getElementById('activationCode').value.trim();
    const password = document.getElementById('passwordInput').value.trim();
    const message = document.getElementById('loginMessage');
    const storedUser = JSON.parse(localStorage.getItem('userData')) || {};

    if (!phone.match(/^\+?[1-9]\d{1,14}$/)) {
        message.textContent = "Numéro de téléphone invalide.";
        return;
    }

    if (storedUser[phone]) {
        // Utilisateur existant : connexion avec mot de passe
        if (password === storedUser[phone].password) {
            localStorage.setItem('loggedInUser', phone);
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
            message.textContent = "Connexion réussie !";
        } else {
            message.textContent = "Mot de passe incorrect.";
        }
    } else {
        // Nouvel utilisateur : inscription
        if (code !== ACTIVATION_CODE) {
            message.textContent = "Code d'activation incorrect.";
            return;
        }
        if (!password) {
            message.textContent = "Veuillez entrer un mot de passe.";
            return;
        }
        storedUser[phone] = { password: password };
        localStorage.setItem('userData', JSON.stringify(storedUser));
        localStorage.setItem('loggedInUser', phone);
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'block';
        message.textContent = "Inscription réussie !";
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('phoneInput').value = '';
    document.getElementById('activationCode').value = '';
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginMessage').textContent = '';
    updateLoginForm();
}

function updateLoginForm() {
    const phone = document.getElementById('phoneInput').value.trim();
    const storedUser = JSON.parse(localStorage.getItem('userData')) || {};
    const activationInput = document.getElementById('activationCode');
    const passwordInput = document.getElementById('passwordInput');

    if (storedUser[phone]) {
        activationInput.style.display = 'none';
        passwordInput.style.display = 'block';
    } else {
        activationInput.style.display = 'block';
        passwordInput.style.display = 'block';
    }
}

function calculate() {
    const timeInput = document.getElementById('timeInput').value.trim();
    if (!timeInput.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
        alert("Format d'heure invalide. Utilisez HH:MM (ex: 15:38)");
        return;
    }
    
    const [hours, minutes] = timeInput.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    const newDate = new Date(date.getTime() + 3 * 60000);
    const newTime = formatTime(newDate);
    
    const multiplier = Math.floor(Math.random() * 13) + 3;
    const multiplierText = 'X' + multiplier;
    
    const riskLevel = Math.floor(Math.random() * 100) + 1;
    let riskText = riskLevel.toString();
    if (riskLevel >= 100) riskText += ' (DANGER MAXIMUM)';
    else if (riskLevel >= 7) riskText += ' (HAUT RISQUE)';
    else if (riskLevel >= 4) riskText += ' (RISQUE MODÉRÉ)';
    else riskText += ' (FAIBLE RISQUE)';
    
    document.querySelector('.time').textContent = newTime;
    document.querySelector('.multiplier').textContent = multiplierText;
    document.querySelector('.risk-level').textContent = riskText;
    
    const riskElement = document.querySelector('.risk-level');
    if (riskLevel >= 100) {
        riskElement.style.color = '#ff0000';
        riskElement.style.textShadow = '0 0 15px #ff0000';
    } else if (riskLevel >= 7) {
        riskElement.style.color = '#ff5555';
        riskElement.style.textShadow = '0 0 10px #ff5555';
    } else {
        riskElement.style.color = '#ff9955';
        riskElement.style.textShadow = '0 0 5px #ff9955';
    }
}

function useCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('timeInput').value = `${hours}:${minutes}`;
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Événements
window.onload = () => {
    checkLoginStatus();
    document.getElementById('phoneInput').addEventListener('input', updateLoginForm);
};
