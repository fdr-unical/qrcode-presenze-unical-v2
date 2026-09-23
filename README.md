  # QR Code Presenze UniCal

Sistema per la gestione della presenza tramite QR Code per l'Università della Calabria.

## 📋 Caratteristiche

- Generazione automatica di QR Code con timestamp
- Validazione temporale con tolleranza configurabile
- Registro completo delle scansioni in tempo reale
- Esportazione dei log in formato JSON
- Compatibile con tutti i browser moderni
- Funziona offline dopo il primo caricamento

## 🛠️ Requisiti

- Browser moderno con JavaScript abilitato
- Connessione internet per libreria QRCode.js (solo per prima volta)
- Form Microsoft Forms configurato per l'organizzazione UnICal

## 📱 Compatibilità

- ✅ Chrome, Firefox, Edge, Safari (desktop e mobile)
- ✅ Tutti gli smartphone moderni con fotocamera
- ✅ Funziona offline per il docente (dopo primo caricamento)

## ⚙️ Configurazione Rapida

Modifica direttamente nel file `index.html`:
```html
<!-- Durata default QR (secondi) -->
<input type="number" id="period" value="60" min="30" max="180" step="15" />

<!-- Tolleranza finestre (±N periodi) -->
<script>
  const DEFAULT_TOLERANCE = 1; // 0=stretto, 1=default (~2min), 2=~3min
</script>
