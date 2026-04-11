// --- Multilingual Dictionary ---
const dict = {
    en: {
        titleLogin: "Welcome to AgriMitra",
        subtitle: "Connecting Farms to Experts immediately.",
        btnFarmer: "I am a Farmer",
        btnDoctor: "I am a Doctor",
        dashFarmer: "Farmer Dashboard",
        takePhoto: "Take a Photo of Crop",
        callVoice: "Voice Call Expert",
        callVideo: "Video Call Expert",
        alertTitle: "Doctor's Alerts",
        alertNewMessage: "New Message from Doctor",
        doctorAlertMessage: "Your crop requires immediate attention. Please apply fungicide within 2 days to control the pest.",
        playVoice: "Listen to Alert",
        dashDoctor: "Doctor Dashboard",
        incomingCases: "Incoming Farmer Cases",
        caseCotton: "1 New Case: Cotton Pest",
        farmerLocation: "📍 Location: Field near Rohtak Highway, Jind",
        viewMap: "View Map",
        shareLocation: "Share Location",
        sharingLocation: "Sharing location...",
        waitingLocation: "Waiting for Farmer Location...",
        sendNotif: "Send Notification & Voice Alert"
    },
    hi: {
        titleLogin: "एग्री-मित्रा में आपका स्वागत है",
        subtitle: "खेतों को विशेषज्ञों से तुरंत जोड़ना।",
        btnFarmer: "मैं एक किसान हूँ",
        btnDoctor: "मैं एक डॉक्टर हूँ",
        dashFarmer: "किसान डैशबोर्ड",
        takePhoto: "फसल की फोटो लें",
        callVoice: "विशेषज्ञ को ऑडियो कॉल करें",
        callVideo: "विशेषज्ञ को वीडियो कॉल करें",
        alertTitle: "डॉक्टर के अलर्ट",
        alertNewMessage: "डॉक्टर का नया संदेश",
        doctorAlertMessage: "आपकी फसल पर तुरंत ध्यान देने की जरूरत है। कीट नियंत्रण के लिए कृपया 2 दिन के अंदर फफूंदनाशक का छिड़काव करें।",
        playVoice: "सन्देश सुनें",
        dashDoctor: "डॉक्टर डैशबोर्ड",
        incomingCases: "किसानों के नए मामले",
        caseCotton: "1 नया मामला: कपास का कीट",
        farmerLocation: "📍 स्थान: रोहतक हाईवे के पास खेत, जींद",
        viewMap: "नक्शे पर देखें",
        shareLocation: "स्थान साझा करें",
        sharingLocation: "स्थान साझा किया जा रहा है...",
        waitingLocation: "किसान के स्थान का इंतजार...",
        sendNotif: "नोटिफिकेशन और आवाज अलर्ट भेजें"
    }
};

let currentLang = 'en';

const app = {
    init() {
        // Setup language toggle
        document.getElementById('lang-btn').addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'hi' : 'en';
            this.applyLanguage();
            this.showToast(currentLang === 'en' ? 'Language switched to English' : 'भाषा बदलकर हिंदी कर दी गई है');
        });
        
        // Ensure browser supports speech logic
        if (!('speechSynthesis' in window)) {
            console.warn("Speech API not supported in this browser.");
        }
    },

    applyLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(dict[currentLang][key]) {
                el.innerText = dict[currentLang][key];
            }
        });
    },

    navigate(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active-screen'));
        document.getElementById(screenId).classList.add('active-screen');
    },

    login(role) {
        if (role === 'farmer') this.navigate('screen-farmer');
        if (role === 'doctor') this.navigate('screen-doctor');
    },

    logout() {
        this.navigate('screen-login');
        // Reset state for demo purposes
        document.getElementById('simulated-alert').style.display = 'none';
        document.getElementById('no-alerts').style.display = 'flex';
    },

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    },

    // --- Farmer Features ---
    sendLocation() {
        this.showToast(currentLang === 'hi' ? dict.hi.sharingLocation : dict.en.sharingLocation);
        setTimeout(() => {
            const waiting = document.getElementById('waiting-location');
            const tracker = document.getElementById('doctor-location-tracker');
            if (waiting) waiting.style.display = 'none';
            if (tracker) tracker.style.display = 'block';
            this.showToast(currentLang === 'hi' ? 'स्थान सफलतापूर्वक साझा किया गया!' : 'Location successfully shared!');
        }, 1500);
    },

    simulatePhoto() {
        this.showToast(currentLang === 'hi' ? 'कैमरा खोला जा रहा है...' : 'Opening Camera...');
    },

    simulateCall(type) {
        this.showToast(currentLang === 'hi' ? `विशेषज्ञ को ${type === 'Video' ? 'वीडियो' : 'ऑडियो'} कॉल किया जा रहा है...` : `Initiating ${type} Call to Expert...`);
    },

    playVoiceAlert() {
        const msgText = dict[currentLang].doctorAlertMessage;
        
        // Stop any currently playing audio
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(msgText);
        // Set voice params based on language selection
        utterance.lang = currentLang === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9; // speak slightly slower for clarity
        
        window.speechSynthesis.speak(utterance);
        this.showToast(currentLang === 'hi' ? 'टेक्स्ट-टू-स्पीच सिस्टम आवाज चला रहा है...' : 'Text-to-Speech playing alert...');
    },

    // --- Doctor Features ---
    sendNotification() {
        this.showToast(currentLang === 'hi' ? 'किसान के फोन पर अलर्ट सफलतापूर्वक भेज दिया गया!' : 'Alert sent to Farmer successfully!');
        
        // Simulate backend transmitting notice up to the farmer state
        setTimeout(() => {
            document.getElementById('no-alerts').style.display = 'none';
            document.getElementById('simulated-alert').style.display = 'block';
        }, 800);
    }
};

app.init();
