// Configurazione predefinita
const DEFAULT_PERIOD = 60;
const DEFAULT_TOLERANCE = 1;

let currentPeriod = DEFAULT_PERIOD;
let currentTolerance = DEFAULT_TOLERANCE;
let qrCodeInstance = null;
let logEntries = [];

// Elementi DOM
const formUrlInput = document.getElementById('formUrl');
const periodInput = document.getElementById('period');
const toleranceInput = document.getElementById('tolerance');
const qrcodeDiv = document.getElementById('qrcode');
const statusElement = document.getElementById('status');
const exportBtn = document.getElementById('exportBtn');
const logContainer = document.getElementById('logContainer');

function generateTimestamp() {
    return new Date().toISOString();
}

function logEvent(type, message) {
    const timestamp = generateTimestamp();
    const entry = {
        timestamp,
        type,
        message
    };
    
    logEntries.unshift(entry);
    updateLogDisplay();
    
    if (logEntries.length > 100) {
        logEntries.pop();
    }
}

function updateLogDisplay() {
    logContainer.innerHTML = '';
    
    logEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = `log-entry ${entry.type}`;
        entryElement.textContent = `${entry.timestamp} - ${entry.message}`;
        logContainer.appendChild(entryElement);
    });
}

function generateQRCode() {
    const formUrl = formUrlInput.value.trim();
    const period = parseInt(periodInput.value) || DEFAULT_PERIOD;
    const tolerance = parseInt(toleranceInput.value) || DEFAULT_TOLERANCE;
    
    if (!formUrl) {
        statusElement.textContent = "Inserisci l'URL del form";
        statusElement.style.color = "#e74c3c";
        return;
    }
    
    // Genera QR code con dati
    const timestamp = generateTimestamp();
    const qrData = `${formUrl}?timestamp=${timestamp}&period=${period}&tolerance=${tolerance}`;
    
    qrcodeDiv.innerHTML = '';
    
    try {
        qrCodeInstance = new QRCode(qrcodeDiv, {
            text: qrData,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        statusElement.textContent = `QR Code generato per ${period} secondi`;
        statusElement.style.color = "#27ae60";
        
        logEvent('info', `Nuovo QR generato con periodo ${period}s e tolleranza ${tolerance}`);
    } catch (error) {
        statusElement.textContent = "Errore nella generazione del QR Code";
        statusElement.style.color = "#e74c3c";
        logEvent('error', `Errore generazione QR: ${error.message}`);
    }
}

function exportLog() {
    const dataStr = JSON.stringify(logEntries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `log-presenze-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    logEvent('success', 'Log esportato con successo');
}

// Event listeners
formUrlInput.addEventListener('input', generateQRCode);
periodInput.addEventListener('change', generateQRCode);
toleranceInput.addEventListener('change', generateQRCode);

exportBtn.addEventListener('click', exportLog);

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    logEvent('info', 'Sistema avviato');
    generateQRCode();
});
