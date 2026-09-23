  // Configurazione predefinita
const DEFAULT_PERIOD = 60; // Secondi
const DEFAULT_TOLERANCE = 1; // ±N periodi

// Variabili globali
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

// Funzioni di utilità
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
    
    // Mantieni solo le ultime 100 voci
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
    
    // Genera il QR code con timestamp
    const timestamp = generateTimestamp();
    const qrData = `${formUrl}?timestamp=${timestamp}&period=${period}&tolerance=${tolerance}`;
    
    // Pulisci il container
    qrcodeDiv.innerHTML = '';
    
    // Crea nuovo QR Code
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
    
    // Genera QR Code iniziale
    generateQRCode();
});

// Simulazione di validazione QR (in produzione dovrebbe essere lato server)
function validateQRData(data) {
    const params = new URLSearchParams(data.split('?')[1]);
    const timestamp = params.get('timestamp');
    const period = parseInt(params.get('period')) || DEFAULT_PERIOD;
    const tolerance = parseInt(params.get('tolerance')) || DEFAULT_TOLERANCE;
    
    const now = new Date();
    const qrTime = new Date(timestamp);
    const diffSeconds = (now - qrTime) / 1000;
    
    // Calcola la tolleranza in secondi
    const toleranceSeconds = period * tolerance;
    
    if (Math.abs(diffSeconds) > period + toleranceSeconds) {
        return false; // Scaduto
    }
    
    return true; // Validato
}
