
## 5. **SECURITY.md**
```markdown
# Policy di Sicurezza - QR Code Presenze UniCal

## 🔍 Informazioni Generali

Questo sistema è progettato per essere utilizzato in ambiente accademico e didattico, con particolare attenzione alla privacy degli utenti.

## 🔐 Sicurezza dei Dati

### 📊 Tracciamento
- Tutti i dati vengono registrati localmente sul dispositivo del docente
- Nessun dato viene inviato a server esterni
- I log non contengono informazioni sensibili o personali

### 📱 Validazione QR
- La validazione avviene lato client (browser)
- Non è presente alcuna convalida di autenticità del QR Code
- La scadenza è gestita localmente basata sul timestamp

## 🔒 Protezione dell'Accesso

### ⚠️ Accesso al Form
- Il sistema presuppone che l'accesso al form Microsoft Forms sia configurato correttamente
- Solo gli utenti autorizzati (studenti UnICal) possono accedere al form
- Nessun controllo di autenticazione è implementato nel sistema

## 🛡️ Rischi Conosciuti

### ⚠️ Limitazioni di Sicurezza
1. **Manca il controllo dell'identità** degli utenti che scansionano il QR Code
2. **Potenziale condivisione del QR Code** tra più persone
3. **Validazione temporale** basata su timestamp locale

### 🛠️ Suggerimenti per Miglioramenti
1. Implementare un sistema di autenticazione utente
2. Aggiungere controllo della validità del QR Code lato server
3. Includere crittografia dei dati sensibili
4. Implementare test automatizzati

## 📞 Segnalazione di Vulnerabilità

Se trovi una vulnerabilità di sicurezza, contatta:
- **Sviluppatore**: [nome@unical.it]
- **Team Sicurezza**: [sicurezza@unical.it]

## 🔧 Revisione e Aggiornamenti

Questa policy verrà revisionata ogni 6 mesi o dopo qualsiasi modifica significativa al sistema.

Ultimo aggiornamento: 2026-09-23
