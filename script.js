document.querySelectorAll('.emotion-grid div').forEach(emotion => {
    emotion.addEventListener('click', function() {
        document.querySelectorAll('.emotion-grid div').forEach(e => {
            e.classList.remove('selected');
        });
        
        this.classList.add('selected');
        
        const emotionText = this.textContent.trim();
        showNotification(`Has seleccionado que te sientes: ${emotionText}`);
        
        localStorage.setItem('lastEmotion', emotionText);
        localStorage.setItem('lastEmotionDate', new Date().toLocaleDateString());
    });
});

document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const supportType = this.querySelector('select').value;
    
    if (!supportType) {
        showNotification('Por favor selecciona un tipo de apoyo', 'error');
        return;
    }
    
    showNotification('Solicitud enviada correctamente. Nos pondremos en contacto pronto.', 'success');
    this.reset();
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

window.addEventListener('load', function() {
    const lastEmotion = localStorage.getItem('lastEmotion');
    const lastDate = localStorage.getItem('lastEmotionDate');
    
    if (lastEmotion && lastDate === new Date().toLocaleDateString()) {
        showNotification(`Ya registraste tu emoción hoy: ${lastEmotion}`);
        
        document.querySelectorAll('.emotion-grid div').forEach(emotion => {
            if (emotion.textContent.trim() === lastEmotion) {
                emotion.classList.add('selected');
            }
        });
    }
});

const emergencyBanner = document.querySelector('.emergency-banner');
if (emergencyBanner) {
    setInterval(() => {
        emergencyBanner.classList.add('pulse');
        setTimeout(() => {
            emergencyBanner.classList.remove('pulse');
        }, 1000);
    }, 5000);
}
