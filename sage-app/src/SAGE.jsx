import { useState, useEffect, useRef } from "react";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

const SAGE_AVATAR = "data:image/jpeg;base64,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";

// ─── Languages ────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", name: "English",            nativeName: "English",    flag: "🇬🇧" },
  { code: "es", name: "Spanish",            nativeName: "Español",    flag: "🇪🇸" },
  { code: "fr", name: "French",             nativeName: "Français",   flag: "🇫🇷" },
  { code: "de", name: "German",             nativeName: "Deutsch",    flag: "🇩🇪" },
  { code: "pt", name: "Portuguese",         nativeName: "Português",  flag: "🇵🇹" },
  { code: "ru", name: "Russian",            nativeName: "Русский",    flag: "🇷🇺" },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "中文",     flag: "🇨🇳" },
  { code: "ja", name: "Japanese",           nativeName: "日本語",     flag: "🇯🇵" },
];

const T = {
  en: {
    appTagline: "Symptom Assessment & Guidance Engine",
    whatSAGETitle: "⚕️ What SAGE is here for",
    whatSAGEText: "SAGE is your AI-powered medical guidance assistant. It helps you understand your symptoms, assess urgency, and find the right medical professional — not replace one.\n\nSAGE does not promote self-treatment or self-medication. It is designed to sort medical concerns by urgency and guide you toward the care you need.\n\nIn any emergency, call your local emergency services immediately.",
    letsBegin: "Let's Begin →",
    noDataStored: "No personal identifying information is collected or stored.",
    aboutYou: "A little about you",
    quickPersonalisation: "Quick personalisation",
    demoDesc: "Age, sex and background help SAGE weight its assessment correctly. No identifying information required.",
    age: "Age", agePlaceholder: "Your age",
    biologicalSex: "Biological Sex",
    ethnicity: "Ethnicity (optional)",
    continueBtn: "Continue →",
    demoDisclaimer: "Used only to personalise your session. Never stored or shared.",
    male: "Male", female: "Female", other: "Other / Prefer not to say",
    emergencyCheck: "Emergency Check",
    emergencySubtitle: "Are you currently experiencing any of the following?",
    emergencyDoubt: "If in doubt, always choose YES and call emergency services.",
    allClear: "All clear — Start Consultation →",
    yes: "YES", no: "NO",
    airwayTitle: "Airway Problems", airwayDesc: "Choking, unable to speak, throat swelling, stridor",
    breathingTitle: "Breathing Difficulty", breathingDesc: "Severe shortness of breath, cannot complete sentences, lips turning blue",
    circulationTitle: "Chest Pain / Circulation", circulationDesc: "Chest pain or pressure, rapid or absent pulse, pale / cold / clammy skin",
    consciousnessTitle: "Altered Consciousness / Neuro", consciousnessDesc: "Confusion, sudden severe headache, facial drooping, limb weakness or numbness",
    bleedingTitle: "Severe Injury / Bleeding", bleedingDesc: "Uncontrolled bleeding, major trauma, suspected fracture with deformity",
    call911: "Call 911 Now",
    emergencyIndicated: "You indicated a possible",
    emergencyInstruction: "emergency. Do not wait — call emergency services immediately.",
    whileWaiting: "While you wait for EMS",
    tellDispatcher: "Tell the dispatcher",
    emsSteps: ["Call 911 (or your local emergency number) right now.", "Stay calm and stay on the line with the dispatcher.", "Do not eat, drink, or take medications unless instructed.", "Unlock your door so EMS can enter quickly.", "If safe, sit or lie down. Do not drive yourself.", "Have your medication list ready if possible."],
    dispatcherInfo: ["Your exact address or location.", "Your main symptom:", "When symptoms started and if they are worsening.", "Any medications you are taking."],
    mistakeBack: "← I made a mistake, go back",
    whereSymptom: "Where is your symptom?",
    tapToSelect: "Tap areas · flip front/back · no limit",
    front: "◉ Front", back: "◉ Back",
    swipeHint: "← swipe to flip →",
    areasSelected: "area", areasSelectedPlural: "areas",
    selectedAreas: "Selected areas",
    confirmSelection: "Confirm Selection →",
    tapHint: "Tap any area to select · Tap again to deselect · No limit on selections",
    sicSubtitle: "Symptom Assessment & Guidance Engine · AI Assistant",
    disclaimer: "⚕️ Guidance tool only · Not a substitute for professional medical advice",
    typeAnswer: "Or type your answer...",
    selectAtLeastOne: "Select at least one",
    confirmCount: "Confirm",
    selected: "selected",
    selectAllApply: "Select all that apply, then confirm",
    noPain: "No pain", mild: "Mild", moderate: "Moderate", severe: "Severe", verySevere: "Very severe / Worst",
    tapPainLevel: "Tap your pain level (0 = none, 10 = worst imaginable)",
    howLong: "How long have you had this symptom?",
    hours: "hours", days: "days", weeks: "weeks", months: "months",
    confirm: "Confirm",
    enterTemp: "Enter your temperature (°C)",
    normal: "Normal", hypothermia: "Hypothermia", lowGradeFever: "Low-grade fever", fever: "Fever", highFever: "High fever",
    normalRange: "Normal: 36.1–37.4°C",
    enterHR: "Enter your heart rate (beats per minute)",
    bradycardia: "Bradycardia", lowNormal: "Low-normal", elevated: "Elevated", tachycardia: "Tachycardia",
    normalHR: "Normal: 60–100 bpm",
    chooseLanguage: "Choose your language",
    anythingElse: "Is there anything else I can help you with?",
    feedbackTitle: "How was your experience?",
    feedbackSubtitle: "Your feedback helps us improve SAGE for everyone.",
    rateExperience: "Rate your experience",
    commentsLabel: "Comments (optional)",
    commentsPlaceholder: "Any suggestions or comments?",
    emailLabel: "Email (optional)",
    emailPlaceholder: "your@email.com — only if you'd like us to follow up",
    submitFeedback: "Submit Feedback",
    thankYouTitle: "Thank you! 🌿",
    thankYouText: "Your feedback helps us make SAGE better for everyone.",
    newConsultation: "Start New Consultation",
    feedbackYes: "Yes please",
    feedbackNo: "No, I'm done",

  },
  es: {
    appTagline: "Verificador Interactivo de Síntomas",
    whatSAGETitle: "⚕️ Para qué está SAGE",
    whatSAGEText: "SAGE es tu asistente médico con IA. Te ayuda a comprender tus síntomas, evaluar la urgencia y encontrar al profesional adecuado — no reemplazarlo.\n\nSAGE no promueve la automedicación. Está diseñado para ordenar las preocupaciones médicas por urgencia y guiarte hacia la atención que necesitas.\n\nEn caso de emergencia, llama a los servicios de emergencia locales inmediatamente.",
    letsBegin: "Empecemos →",
    noDataStored: "No se recopila ni almacena información personal identificable.",
    aboutYou: "Un poco sobre ti",
    quickPersonalisation: "Personalización rápida",
    demoDesc: "La edad, el sexo y el origen ayudan a SAGE a evaluar correctamente. No se requieren datos identificativos.",
    age: "Edad", agePlaceholder: "Tu edad",
    biologicalSex: "Sexo biológico",
    ethnicity: "Etnia (opcional)",
    continueBtn: "Continuar →",
    demoDisclaimer: "Solo para personalizar tu sesión. Nunca se almacena ni comparte.",
    male: "Masculino", female: "Femenino", other: "Otro / Prefiero no decir",
    emergencyCheck: "Verificación de emergencia",
    emergencySubtitle: "¿Estás experimentando alguno de los siguientes?",
    emergencyDoubt: "En caso de duda, siempre elige SÍ y llama a los servicios de emergencia.",
    allClear: "Todo bien — Iniciar consulta →",
    yes: "SÍ", no: "NO",
    airwayTitle: "Problemas de vía aérea", airwayDesc: "Asfixia, incapacidad para hablar, hinchazón de garganta, estridor",
    breathingTitle: "Dificultad para respirar", breathingDesc: "Disnea grave, no puede completar frases, labios azulados",
    circulationTitle: "Dolor de pecho / Circulación", circulationDesc: "Dolor o presión en el pecho, pulso rápido o ausente, piel pálida/fría/sudorosa",
    consciousnessTitle: "Alteración de consciencia / Neuro", consciousnessDesc: "Confusión, cefalea súbita intensa, caída facial, debilidad en extremidades",
    bleedingTitle: "Lesión grave / Hemorragia", bleedingDesc: "Sangrado incontrolado, trauma mayor, fractura con deformidad",
    call911: "Llama al 112 ahora",
    emergencyIndicated: "Indicaste una posible emergencia de",
    emergencyInstruction: "No esperes — llama a los servicios de emergencia inmediatamente.",
    whileWaiting: "Mientras esperas la ambulancia",
    tellDispatcher: "Di al operador",
    emsSteps: ["Llama al 112 (o tu número de emergencias local) ahora.", "Mantén la calma y permanece en línea.", "No comas, bebas ni tomes medicamentos salvo indicación.", "Abre tu puerta para que el personal de emergencias pueda entrar.", "Si es posible, siéntate o recuéstate. No conduzcas.", "Ten lista tu lista de medicamentos si es posible."],
    dispatcherInfo: ["Tu dirección exacta.", "Tu síntoma principal:", "Cuándo comenzaron y si empeoran.", "Medicamentos que estás tomando."],
    mistakeBack: "← Me equivoqué, volver",
    whereSymptom: "¿Dónde está tu síntoma?",
    tapToSelect: "Toca áreas · voltear frente/espalda · sin límite",
    front: "◉ Frente", back: "◉ Espalda",
    swipeHint: "← desliza para voltear →",
    areasSelected: "área", areasSelectedPlural: "áreas",
    selectedAreas: "Áreas seleccionadas",
    confirmSelection: "Confirmar selección →",
    tapHint: "Toca para seleccionar · Toca de nuevo para deseleccionar · Sin límite",
    sicSubtitle: "Verificador Interactivo de Síntomas · Asistente IA",
    disclaimer: "⚕️ Solo orientación · No reemplaza la consulta médica profesional",
    typeAnswer: "O escribe tu respuesta...",
    selectAtLeastOne: "Selecciona al menos uno",
    confirmCount: "Confirmar",
    selected: "seleccionado(s)",
    selectAllApply: "Selecciona todo lo que aplique, luego confirma",
    noPain: "Sin dolor", mild: "Leve", moderate: "Moderado", severe: "Severo", verySevere: "Muy severo / El peor",
    tapPainLevel: "Toca tu nivel de dolor (0 = ninguno, 10 = el peor imaginable)",
    howLong: "¿Cuánto tiempo llevas con este síntoma?",
    hours: "horas", days: "días", weeks: "semanas", months: "meses",
    confirm: "Confirmar",
    enterTemp: "Ingresa tu temperatura (°C)",
    normal: "Normal", hypothermia: "Hipotermia", lowGradeFever: "Fiebre baja", fever: "Fiebre", highFever: "Fiebre alta",
    normalRange: "Normal: 36.1–37.4°C",
    enterHR: "Ingresa tu frecuencia cardíaca (latidos por minuto)",
    bradycardia: "Bradicardia", lowNormal: "Bajo-normal", elevated: "Elevada", tachycardia: "Taquicardia",
    normalHR: "Normal: 60–100 lpm",
    chooseLanguage: "Elige tu idioma",
    anythingElse: "¿Hay algo más en lo que pueda ayudarte?",
    feedbackTitle: "¿Cómo fue tu experiencia?",
    feedbackSubtitle: "Tu opinión nos ayuda a mejorar SAGE para todos.",
    rateExperience: "Valora tu experiencia",
    commentsLabel: "Comentarios (opcional)",
    commentsPlaceholder: "¿Alguna sugerencia o comentario?",
    emailLabel: "Correo electrónico (opcional)",
    emailPlaceholder: "tu@email.com — solo si deseas que te contactemos",
    submitFeedback: "Enviar opinión",
    thankYouTitle: "¡Gracias! 🌿",
    thankYouText: "Tu opinión nos ayuda a mejorar SAGE para todos.",
    newConsultation: "Iniciar nueva consulta",
    feedbackYes: "Sí, por favor",
    feedbackNo: "No, he terminado",

  },
  fr: {
    appTagline: "Vérificateur Interactif de Symptômes",
    whatSAGETitle: "⚕️ À quoi sert SAGE",
    whatSAGEText: "SAGE est votre assistant médical IA. Il vous aide à comprendre vos symptômes, évaluer l'urgence et trouver le bon professionnel de santé — sans le remplacer.\n\nSAGE ne promeut pas l'automédication. Il est conçu pour trier les préoccupations médicales par urgence et vous orienter vers les soins appropriés.\n\nEn cas d'urgence, appelez immédiatement les services d'urgence locaux.",
    letsBegin: "Commençons →",
    noDataStored: "Aucune information personnelle identifiable n'est collectée ou stockée.",
    aboutYou: "Un peu sur vous",
    quickPersonalisation: "Personnalisation rapide",
    demoDesc: "L'âge, le sexe et l'origine aident SAGE à évaluer correctement. Aucune information identifiable requise.",
    age: "Âge", agePlaceholder: "Votre âge",
    biologicalSex: "Sexe biologique",
    ethnicity: "Ethnie (facultatif)",
    continueBtn: "Continuer →",
    demoDisclaimer: "Utilisé uniquement pour personnaliser votre session. Jamais stocké ni partagé.",
    male: "Homme", female: "Femme", other: "Autre / Préfère ne pas dire",
    emergencyCheck: "Vérification d'urgence",
    emergencySubtitle: "Ressentez-vous actuellement l'un des symptômes suivants ?",
    emergencyDoubt: "En cas de doute, choisissez toujours OUI et appelez les secours.",
    allClear: "Tout va bien — Démarrer la consultation →",
    yes: "OUI", no: "NON",
    airwayTitle: "Problèmes des voies respiratoires", airwayDesc: "Étouffement, incapacité à parler, gonflement de la gorge, stridor",
    breathingTitle: "Difficulté respiratoire", breathingDesc: "Essoufflement sévère, incapacité à finir ses phrases, lèvres bleues",
    circulationTitle: "Douleur thoracique / Circulation", circulationDesc: "Douleur ou pression thoracique, pouls rapide ou absent, peau pâle/froide/moite",
    consciousnessTitle: "Trouble de conscience / Neuro", consciousnessDesc: "Confusion, céphalée soudaine intense, paralysie faciale, faiblesse des membres",
    bleedingTitle: "Blessure grave / Saignement", bleedingDesc: "Saignement incontrôlable, traumatisme majeur, fracture avec déformation",
    call911: "Appelez le 15 maintenant",
    emergencyIndicated: "Vous avez indiqué une possible urgence de type",
    emergencyInstruction: "N'attendez pas — appelez les secours immédiatement.",
    whileWaiting: "En attendant les secours",
    tellDispatcher: "Dites à l'opérateur",
    emsSteps: ["Appelez le 15 / 112 (ou votre numéro local) maintenant.", "Restez calme et restez en ligne.", "Ne mangez, ne buvez, ne prenez pas de médicaments sauf instruction.", "Déverrouillez votre porte pour que les secours puissent entrer.", "Si possible, asseyez-vous ou allongez-vous. Ne conduisez pas.", "Préparez votre liste de médicaments si possible."],
    dispatcherInfo: ["Votre adresse exacte.", "Votre symptôme principal :", "Depuis quand et si ça empire.", "Les médicaments que vous prenez."],
    mistakeBack: "← Je me suis trompé, retour",
    whereSymptom: "Où se trouve votre symptôme ?",
    tapToSelect: "Appuyez · basculer avant/arrière · sans limite",
    front: "◉ Avant", back: "◉ Arrière",
    swipeHint: "← glisser pour retourner →",
    areasSelected: "zone", areasSelectedPlural: "zones",
    selectedAreas: "Zones sélectionnées",
    confirmSelection: "Confirmer la sélection →",
    tapHint: "Appuyez pour sélectionner · Appuyez à nouveau pour désélectionner",
    sicSubtitle: "Vérificateur de Symptômes · Assistant IA",
    disclaimer: "⚕️ Outil d'orientation uniquement · Ne remplace pas un avis médical professionnel",
    typeAnswer: "Ou tapez votre réponse...",
    selectAtLeastOne: "Sélectionnez au moins un",
    confirmCount: "Confirmer",
    selected: "sélectionné(s)",
    selectAllApply: "Sélectionnez tout ce qui s'applique, puis confirmez",
    noPain: "Pas de douleur", mild: "Légère", moderate: "Modérée", severe: "Sévère", verySevere: "Très sévère / La pire",
    tapPainLevel: "Touchez votre niveau de douleur (0 = aucune, 10 = la pire imaginable)",
    howLong: "Depuis combien de temps avez-vous ce symptôme ?",
    hours: "heures", days: "jours", weeks: "semaines", months: "mois",
    confirm: "Confirmer",
    enterTemp: "Entrez votre température (°C)",
    normal: "Normal", hypothermia: "Hypothermie", lowGradeFever: "Fièvre légère", fever: "Fièvre", highFever: "Fièvre élevée",
    normalRange: "Normal : 36,1–37,4°C",
    enterHR: "Entrez votre fréquence cardiaque (battements par minute)",
    bradycardia: "Bradycardie", lowNormal: "Bas-normal", elevated: "Élevée", tachycardia: "Tachycardie",
    normalHR: "Normal : 60–100 bpm",
    chooseLanguage: "Choisissez votre langue",
    anythingElse: "Y a-t-il autre chose que je puisse faire pour vous?",
    feedbackTitle: "Comment s'est passée votre expérience?",
    feedbackSubtitle: "Vos commentaires nous aident à améliorer SAGE pour tous.",
    rateExperience: "Évaluez votre expérience",
    commentsLabel: "Commentaires (facultatif)",
    commentsPlaceholder: "Des suggestions ou commentaires?",
    emailLabel: "E-mail (facultatif)",
    emailPlaceholder: "votre@email.com — uniquement si vous souhaitez être recontacté",
    submitFeedback: "Envoyer les commentaires",
    thankYouTitle: "Merci! 🌿",
    thankYouText: "Vos commentaires nous aident à améliorer SAGE pour tous.",
    newConsultation: "Démarrer une nouvelle consultation",
    feedbackYes: "Oui, s'il vous plaît",
    feedbackNo: "Non, j'ai terminé",

  },
  de: {
    appTagline: "Interaktiver Symptom-Checker",
    whatSAGETitle: "⚕️ Wofür ist SAGE da",
    whatSAGEText: "SAGE ist Ihr KI-gestützter medizinischer Assistent. Er hilft Ihnen, Ihre Symptome zu verstehen, die Dringlichkeit einzuschätzen und den richtigen Arzt zu finden — nicht zu ersetzen.\n\nSAGE fördert keine Selbstmedikation. Es ist darauf ausgelegt, medizinische Anliegen nach Dringlichkeit zu sortieren und Sie zur richtigen Versorgung zu führen.\n\nBei einem Notfall rufen Sie sofort Ihren lokalen Notfalldienst.",
    letsBegin: "Los geht's →",
    noDataStored: "Es werden keine personenbezogenen Daten erfasst oder gespeichert.",
    aboutYou: "Ein bisschen über Sie",
    quickPersonalisation: "Schnelle Personalisierung",
    demoDesc: "Alter, Geschlecht und Herkunft helfen SAGE bei der korrekten Einschätzung. Keine identifizierenden Angaben erforderlich.",
    age: "Alter", agePlaceholder: "Ihr Alter",
    biologicalSex: "Biologisches Geschlecht",
    ethnicity: "Ethnizität (optional)",
    continueBtn: "Weiter →",
    demoDisclaimer: "Nur zur Personalisierung Ihrer Sitzung. Wird nie gespeichert oder weitergegeben.",
    male: "Männlich", female: "Weiblich", other: "Andere / Keine Angabe",
    emergencyCheck: "Notfall-Check",
    emergencySubtitle: "Leiden Sie aktuell unter einem der folgenden Symptome?",
    emergencyDoubt: "Im Zweifel immer JA wählen und Notfalldienst rufen.",
    allClear: "Alles in Ordnung — Beratung starten →",
    yes: "JA", no: "NEIN",
    airwayTitle: "Atemwegsprobleme", airwayDesc: "Erstickung, Sprachlosigkeit, Halsschwellung, Stridor",
    breathingTitle: "Atemnot", breathingDesc: "Schwere Kurzatmigkeit, kann keine Sätze beenden, blaue Lippen",
    circulationTitle: "Brustschmerzen / Kreislauf", circulationDesc: "Brustschmerzen oder -druck, schneller oder fehlender Puls, blasse/kalte/feuchte Haut",
    consciousnessTitle: "Bewusstseinsstörung / Neuro", consciousnessDesc: "Verwirrtheit, plötzlicher starker Kopfschmerz, Gesichtslähmung, Gliederschwäche",
    bleedingTitle: "Schwere Verletzung / Blutung", bleedingDesc: "Unkontrollierbare Blutung, schweres Trauma, Fraktur mit Verformung",
    call911: "Jetzt 112 anrufen",
    emergencyIndicated: "Sie haben einen möglichen Notfall angegeben:",
    emergencyInstruction: "Warten Sie nicht — rufen Sie sofort den Notfalldienst.",
    whileWaiting: "Während Sie auf den Rettungsdienst warten",
    tellDispatcher: "Teilen Sie dem Disponenten mit",
    emsSteps: ["Rufen Sie jetzt 112 an.", "Bleiben Sie ruhig und bleiben Sie in der Leitung.", "Essen, trinken oder nehmen Sie keine Medikamente ohne Anweisung.", "Schließen Sie Ihre Tür auf, damit der Rettungsdienst eintreten kann.", "Setzen oder legen Sie sich hin. Fahren Sie nicht selbst.", "Halten Sie Ihre Medikamentenliste bereit, wenn möglich."],
    dispatcherInfo: ["Ihre genaue Adresse.", "Ihr Hauptsymptom:", "Wann die Symptome begannen und ob sie schlimmer werden.", "Medikamente, die Sie einnehmen."],
    mistakeBack: "← Irrtum, zurück",
    whereSymptom: "Wo befindet sich Ihr Symptom?",
    tapToSelect: "Tippen · vorne/hinten wechseln · kein Limit",
    front: "◉ Vorne", back: "◉ Hinten",
    swipeHint: "← wischen zum Wechseln →",
    areasSelected: "Bereich", areasSelectedPlural: "Bereiche",
    selectedAreas: "Ausgewählte Bereiche",
    confirmSelection: "Auswahl bestätigen →",
    tapHint: "Tippen zum Auswählen · Erneut tippen zum Abwählen · Kein Limit",
    sicSubtitle: "Symptom-Checker · KI-Assistent",
    disclaimer: "⚕️ Nur zur Orientierung · Kein Ersatz für ärztlichen Rat",
    typeAnswer: "Oder Antwort eingeben...",
    selectAtLeastOne: "Mindestens eines auswählen",
    confirmCount: "Bestätigen",
    selected: "ausgewählt",
    selectAllApply: "Alles Zutreffende auswählen, dann bestätigen",
    noPain: "Kein Schmerz", mild: "Leicht", moderate: "Mäßig", severe: "Stark", verySevere: "Sehr stark / Schlimmster",
    tapPainLevel: "Tippen Sie Ihr Schmerzniveau (0 = kein Schmerz, 10 = schlimmster vorstellbarer)",
    howLong: "Wie lange haben Sie dieses Symptom schon?",
    hours: "Stunden", days: "Tage", weeks: "Wochen", months: "Monate",
    confirm: "Bestätigen",
    enterTemp: "Temperatur eingeben (°C)",
    normal: "Normal", hypothermia: "Hypothermie", lowGradeFever: "Leichtes Fieber", fever: "Fieber", highFever: "Hohes Fieber",
    normalRange: "Normal: 36,1–37,4°C",
    enterHR: "Herzfrequenz eingeben (Schläge pro Minute)",
    bradycardia: "Bradykardie", lowNormal: "Niedrig-normal", elevated: "Erhöht", tachycardia: "Tachykardie",
    normalHR: "Normal: 60–100 Spm",
    chooseLanguage: "Sprache wählen",
    anythingElse: "Gibt es noch etwas, wobei ich Ihnen helfen kann?",
    feedbackTitle: "Wie war Ihre Erfahrung?",
    feedbackSubtitle: "Ihr Feedback hilft uns, SAGE für alle zu verbessern.",
    rateExperience: "Bewerten Sie Ihre Erfahrung",
    commentsLabel: "Kommentare (optional)",
    commentsPlaceholder: "Haben Sie Vorschläge oder Kommentare?",
    emailLabel: "E-Mail (optional)",
    emailPlaceholder: "ihre@email.com — nur wenn Sie eine Rückmeldung wünschen",
    submitFeedback: "Feedback senden",
    thankYouTitle: "Danke! 🌿",
    thankYouText: "Ihr Feedback hilft uns, SAGE für alle zu verbessern.",
    newConsultation: "Neue Beratung starten",
    feedbackYes: "Ja, bitte",
    feedbackNo: "Nein, ich bin fertig",

  },
  pt: {
    appTagline: "Verificador Interativo de Sintomas",
    whatSAGETitle: "⚕️ Para que serve o SAGE",
    whatSAGEText: "O SAGE é o seu assistente médico com IA. Ajuda-o a compreender os seus sintomas, avaliar a urgência e encontrar o profissional de saúde certo — não o substituir.\n\nO SAGE não promove a automedicação. Foi concebido para ordenar as preocupações médicas por urgência e orientá-lo para os cuidados de que necessita.\n\nEm caso de emergência, ligue imediatamente para os serviços de emergência locais.",
    letsBegin: "Vamos começar →",
    noDataStored: "Nenhuma informação pessoal identificável é recolhida ou armazenada.",
    aboutYou: "Um pouco sobre si",
    quickPersonalisation: "Personalização rápida",
    demoDesc: "A idade, o sexo e a origem ajudam o SAGE a avaliar corretamente. Não são necessários dados identificativos.",
    age: "Idade", agePlaceholder: "A sua idade",
    biologicalSex: "Sexo biológico",
    ethnicity: "Etnia (opcional)",
    continueBtn: "Continuar →",
    demoDisclaimer: "Usado apenas para personalizar a sua sessão. Nunca armazenado ou partilhado.",
    male: "Masculino", female: "Feminino", other: "Outro / Prefiro não dizer",
    emergencyCheck: "Verificação de emergência",
    emergencySubtitle: "Está a experienciar algum dos seguintes?",
    emergencyDoubt: "Em caso de dúvida, escolha sempre SIM e ligue para os serviços de emergência.",
    allClear: "Tudo bem — Iniciar consulta →",
    yes: "SIM", no: "NÃO",
    airwayTitle: "Problemas de vias aéreas", airwayDesc: "Engasgamento, incapacidade de falar, inchaço da garganta, estridor",
    breathingTitle: "Dificuldade respiratória", breathingDesc: "Falta de ar grave, incapaz de completar frases, lábios azulados",
    circulationTitle: "Dor no peito / Circulação", circulationDesc: "Dor ou pressão no peito, pulso rápido ou ausente, pele pálida/fria/suada",
    consciousnessTitle: "Alteração de consciência / Neuro", consciousnessDesc: "Confusão, cefaleia súbita intensa, queda facial, fraqueza dos membros",
    bleedingTitle: "Lesão grave / Hemorragia", bleedingDesc: "Hemorragia incontrolável, trauma major, fratura com deformidade",
    call911: "Ligue ao 112 agora",
    emergencyIndicated: "Indicou uma possível emergência de",
    emergencyInstruction: "Não espere — ligue aos serviços de emergência imediatamente.",
    whileWaiting: "Enquanto aguarda a ambulância",
    tellDispatcher: "Diga ao operador",
    emsSteps: ["Ligue ao 112 (ou número local) agora.", "Mantenha a calma e fique em linha.", "Não coma, beba ou tome medicamentos sem indicação.", "Desbloqueie a porta para que a emergência possa entrar.", "Se possível, sente-se ou deite-se. Não conduza.", "Tenha a lista de medicamentos pronta se possível."],
    dispatcherInfo: ["A sua morada exata.", "O seu sintoma principal:", "Quando começou e se está a piorar.", "Os medicamentos que está a tomar."],
    mistakeBack: "← Enganei-me, voltar",
    whereSymptom: "Onde está o seu sintoma?",
    tapToSelect: "Toque em áreas · virar frente/trás · sem limite",
    front: "◉ Frente", back: "◉ Trás",
    swipeHint: "← deslize para virar →",
    areasSelected: "área", areasSelectedPlural: "áreas",
    selectedAreas: "Áreas selecionadas",
    confirmSelection: "Confirmar seleção →",
    tapHint: "Toque para selecionar · Toque novamente para desselecionar · Sem limite",
    sicSubtitle: "Verificador de Sintomas · Assistente IA",
    disclaimer: "⚕️ Apenas orientação · Não substitui conselho médico profissional",
    typeAnswer: "Ou escreva a sua resposta...",
    selectAtLeastOne: "Selecione pelo menos um",
    confirmCount: "Confirmar",
    selected: "selecionado(s)",
    selectAllApply: "Selecione tudo o que se aplica, depois confirme",
    noPain: "Sem dor", mild: "Leve", moderate: "Moderada", severe: "Severa", verySevere: "Muito severa / A pior",
    tapPainLevel: "Toque no seu nível de dor (0 = nenhuma, 10 = a pior imaginável)",
    howLong: "Há quanto tempo tem este sintoma?",
    hours: "horas", days: "dias", weeks: "semanas", months: "meses",
    confirm: "Confirmar",
    enterTemp: "Introduza a sua temperatura (°C)",
    normal: "Normal", hypothermia: "Hipotermia", lowGradeFever: "Febre ligeira", fever: "Febre", highFever: "Febre alta",
    normalRange: "Normal: 36,1–37,4°C",
    enterHR: "Introduza a sua frequência cardíaca (batimentos por minuto)",
    bradycardia: "Bradicardia", lowNormal: "Baixo-normal", elevated: "Elevada", tachycardia: "Taquicardia",
    normalHR: "Normal: 60–100 bpm",
    chooseLanguage: "Escolha o seu idioma",
    anythingElse: "Há mais alguma coisa em que eu possa ajudar?",
    feedbackTitle: "Como foi a sua experiência?",
    feedbackSubtitle: "O seu feedback ajuda-nos a melhorar o SAGE para todos.",
    rateExperience: "Avalie a sua experiência",
    commentsLabel: "Comentários (opcional)",
    commentsPlaceholder: "Alguma sugestão ou comentário?",
    emailLabel: "E-mail (opcional)",
    emailPlaceholder: "seu@email.com — apenas se desejar que entremos em contacto",
    submitFeedback: "Enviar feedback",
    thankYouTitle: "Obrigado! 🌿",
    thankYouText: "O seu feedback ajuda-nos a melhorar o SAGE para todos.",
    newConsultation: "Iniciar nova consulta",
    feedbackYes: "Sim, por favor",
    feedbackNo: "Não, terminei",

  },
  ru: {
    appTagline: "Интерактивная Проверка Симптомов",
    whatSAGETitle: "⚕️ Для чего нужен SAGE",
    whatSAGEText: "SAGE — ваш медицинский ИИ-ассистент. Он помогает понять симптомы, оценить срочность и найти подходящего специалиста — но не заменить его.\n\nSAGE не пропагандирует самолечение. Он создан для сортировки медицинских проблем по срочности и направления к нужной помощи.\n\nПри любой экстренной ситуации немедленно вызывайте скорую помощь.",
    letsBegin: "Начнём →",
    noDataStored: "Никакие личные данные не собираются и не хранятся.",
    aboutYou: "Немного о вас",
    quickPersonalisation: "Быстрая персонализация",
    demoDesc: "Возраст, пол и происхождение помогают SAGE правильно оценить ситуацию. Идентифицирующие данные не требуются.",
    age: "Возраст", agePlaceholder: "Ваш возраст",
    biologicalSex: "Биологический пол",
    ethnicity: "Этническая принадлежность (необязательно)",
    continueBtn: "Продолжить →",
    demoDisclaimer: "Используется только для персонализации сессии. Никогда не сохраняется и не передаётся.",
    male: "Мужской", female: "Женский", other: "Другой / Предпочитаю не указывать",
    emergencyCheck: "Проверка экстренной ситуации",
    emergencySubtitle: "Испытываете ли вы сейчас что-либо из следующего?",
    emergencyDoubt: "В случае сомнений всегда выбирайте ДА и вызывайте скорую.",
    allClear: "Всё в порядке — начать консультацию →",
    yes: "ДА", no: "НЕТ",
    airwayTitle: "Проблемы с дыхательными путями", airwayDesc: "Удушье, невозможность говорить, отёк горла, стридор",
    breathingTitle: "Затруднённое дыхание", breathingDesc: "Тяжёлая одышка, не может закончить фразу, синюшность губ",
    circulationTitle: "Боль в груди / Кровообращение", circulationDesc: "Боль или давление в груди, учащённый или отсутствующий пульс, бледная/холодная/влажная кожа",
    consciousnessTitle: "Нарушение сознания / Неврология", consciousnessDesc: "Спутанность сознания, внезапная сильная головная боль, опущение лица, слабость конечностей",
    bleedingTitle: "Тяжёлая травма / Кровотечение", bleedingDesc: "Неконтролируемое кровотечение, серьёзная травма, перелом с деформацией",
    call911: "Звоните 112 сейчас",
    emergencyIndicated: "Вы указали возможную экстренную ситуацию:",
    emergencyInstruction: "Не ждите — немедленно вызовите скорую помощь.",
    whileWaiting: "Пока ждёте скорую",
    tellDispatcher: "Сообщите диспетчеру",
    emsSteps: ["Позвоните 112 (или местный номер экстренной помощи) прямо сейчас.", "Сохраняйте спокойствие и оставайтесь на линии.", "Не ешьте, не пейте и не принимайте лекарства без указания.", "Откройте дверь, чтобы бригада смогла войти.", "По возможности сядьте или лягте. Не садитесь за руль.", "По возможности подготовьте список лекарств."],
    dispatcherInfo: ["Ваш точный адрес.", "Ваш основной симптом:", "Когда начались симптомы и ухудшаются ли они.", "Принимаемые вами лекарства."],
    mistakeBack: "← Я ошибся, назад",
    whereSymptom: "Где находится ваш симптом?",
    tapToSelect: "Нажмите на область · перевернуть спереди/сзади · без ограничений",
    front: "◉ Спереди", back: "◉ Сзади",
    swipeHint: "← проведите для переворота →",
    areasSelected: "область", areasSelectedPlural: "области",
    selectedAreas: "Выбранные области",
    confirmSelection: "Подтвердить выбор →",
    tapHint: "Нажмите для выбора · Нажмите снова для отмены · Без ограничений",
    sicSubtitle: "Проверка симптомов · ИИ-ассистент",
    disclaimer: "⚕️ Только для ориентации · Не заменяет профессиональную медицинскую консультацию",
    typeAnswer: "Или введите ответ...",
    selectAtLeastOne: "Выберите хотя бы один",
    confirmCount: "Подтвердить",
    selected: "выбрано",
    selectAllApply: "Выберите всё подходящее, затем подтвердите",
    noPain: "Нет боли", mild: "Слабая", moderate: "Умеренная", severe: "Сильная", verySevere: "Очень сильная / Невыносимая",
    tapPainLevel: "Нажмите на уровень боли (0 = нет, 10 = невыносимая)",
    howLong: "Как давно у вас этот симптом?",
    hours: "часов", days: "дней", weeks: "недель", months: "месяцев",
    confirm: "Подтвердить",
    enterTemp: "Введите температуру (°C)",
    normal: "Норма", hypothermia: "Гипотермия", lowGradeFever: "Субфебрилитет", fever: "Жар", highFever: "Высокая температура",
    normalRange: "Норма: 36,1–37,4°C",
    enterHR: "Введите частоту сердечных сокращений (уд/мин)",
    bradycardia: "Брадикардия", lowNormal: "Ниже нормы", elevated: "Повышенная", tachycardia: "Тахикардия",
    normalHR: "Норма: 60–100 уд/мин",
    chooseLanguage: "Выберите язык",
    anythingElse: "Могу ли я помочь вам ещё с чем-нибудь?",
    feedbackTitle: "Как вам понравился наш сервис?",
    feedbackSubtitle: "Ваш отзыв помогает нам улучшать SAGE для всех.",
    rateExperience: "Оцените свой опыт",
    commentsLabel: "Комментарии (необязательно)",
    commentsPlaceholder: "Есть ли у вас предложения или комментарии?",
    emailLabel: "Электронная почта (необязательно)",
    emailPlaceholder: "ваш@email.com — только если хотите получить ответ",
    submitFeedback: "Отправить отзыв",
    thankYouTitle: "Спасибо! 🌿",
    thankYouText: "Ваш отзыв помогает нам улучшать SAGE для всех.",
    newConsultation: "Начать новую консультацию",
    feedbackYes: "Да, пожалуйста",
    feedbackNo: "Нет, я закончил",

  },
  zh: {
    appTagline: "症状互动检查系统",
    whatSAGETitle: "⚕️ SAGE的用途",
    whatSAGEText: "SAGE是您的AI医疗辅助助手。它帮助您了解症状、评估紧急程度并找到合适的医疗专业人员——而不是取代他们。\n\nSAGE不推广自我治疗或自行用药。它旨在按紧急程度对医疗问题进行排序，并引导您获得所需的医疗帮助。\n\n如遇紧急情况，请立即拨打当地急救电话。",
    letsBegin: "开始 →",
    noDataStored: "不收集或存储任何个人身份信息。",
    aboutYou: "关于您的基本信息",
    quickPersonalisation: "快速个性化设置",
    demoDesc: "年龄、性别和背景有助于SAGE正确评估。不需要提供身份识别信息。",
    age: "年龄", agePlaceholder: "您的年龄",
    biologicalSex: "生理性别",
    ethnicity: "民族/族裔（可选）",
    continueBtn: "继续 →",
    demoDisclaimer: "仅用于个性化您的会话。从不存储或共享。",
    male: "男", female: "女", other: "其他/不愿透露",
    emergencyCheck: "紧急情况检查",
    emergencySubtitle: "您目前是否有以下任何症状？",
    emergencyDoubt: "如有疑虑，请始终选择'是'并拨打急救电话。",
    allClear: "一切正常 — 开始咨询 →",
    yes: "是", no: "否",
    airwayTitle: "气道问题", airwayDesc: "窒息、无法说话、喉咙肿胀、喘鸣音",
    breathingTitle: "呼吸困难", breathingDesc: "严重气短、无法完成句子、嘴唇发绀",
    circulationTitle: "胸痛/循环问题", circulationDesc: "胸痛或胸闷、脉搏过快或消失、皮肤苍白/冰冷/湿冷",
    consciousnessTitle: "意识改变/神经系统", consciousnessDesc: "意识混乱、突发剧烈头痛、面部下垂、肢体无力或麻木",
    bleedingTitle: "严重外伤/出血", bleedingDesc: "无法控制的出血、严重创伤、疑似骨折伴畸形",
    call911: "立即拨打120",
    emergencyIndicated: "您表示可能存在紧急情况：",
    emergencyInstruction: "请勿等待——立即拨打急救电话。",
    whileWaiting: "等待急救时",
    tellDispatcher: "告知调度员",
    emsSteps: ["立即拨打120（或当地急救号码）。","保持冷静，不要挂断电话。","未经指示不要进食、饮水或服药。","开锁房门以便急救人员进入。","如安全，请坐下或躺下。不要自行驾车。","如有可能，准备好您的用药清单。"],
    dispatcherInfo: ["您的确切地址。","主要症状：","症状何时开始以及是否在加重。","您正在服用的药物。"],
    mistakeBack: "← 我填错了，返回",
    whereSymptom: "您的症状在哪里？",
    tapToSelect: "点击区域 · 切换前/后视图 · 不限数量",
    front: "◉ 正面", back: "◉ 背面",
    swipeHint: "← 滑动翻转 →",
    areasSelected: "个区域", areasSelectedPlural: "个区域",
    selectedAreas: "已选区域",
    confirmSelection: "确认选择 →",
    tapHint: "点击选择 · 再次点击取消 · 不限数量",
    sicSubtitle: "症状检查系统 · AI助手",
    disclaimer: "⚕️ 仅供参考 · 不能替代专业医疗建议",
    typeAnswer: "或输入您的回答...",
    selectAtLeastOne: "请至少选择一项",
    confirmCount: "确认",
    selected: "已选",
    selectAllApply: "选择所有适用项，然后确认",
    noPain: "无痛", mild: "轻度", moderate: "中度", severe: "重度", verySevere: "极重度/最严重",
    tapPainLevel: "点击您的疼痛程度（0=无痛，10=最严重）",
    howLong: "您有这个症状多久了？",
    hours: "小时", days: "天", weeks: "周", months: "月",
    confirm: "确认",
    enterTemp: "输入体温（°C）",
    normal: "正常", hypothermia: "低体温", lowGradeFever: "低烧", fever: "发烧", highFever: "高烧",
    normalRange: "正常：36.1–37.4°C",
    enterHR: "输入心率（次/分钟）",
    bradycardia: "心动过缓", lowNormal: "偏低正常", elevated: "偏高", tachycardia: "心动过速",
    normalHR: "正常：60–100次/分钟",
    chooseLanguage: "选择语言",
    anythingElse: "还有什么我可以帮助您的吗？",
    feedbackTitle: "您对本次体验的评价如何？",
    feedbackSubtitle: "您的反馈有助于我们为所有人改进SAGE。",
    rateExperience: "为您的体验评分",
    commentsLabel: "评论（可选）",
    commentsPlaceholder: "有什么建议或意见吗？",
    emailLabel: "电子邮件（可选）",
    emailPlaceholder: "您的@邮箱.com — 仅当您希望我们跟进时填写",
    submitFeedback: "提交反馈",
    thankYouTitle: "谢谢！🌿",
    thankYouText: "您的反馈有助于我们为所有人改进SAGE。",
    newConsultation: "开始新的咨询",
    feedbackYes: "是的，请继续",
    feedbackNo: "不，我已完成",

  },
  ja: {
    appTagline: "症状インタラクティブチェッカー",
    whatSAGETitle: "⚕️ SAGEについて",
    whatSAGEText: "SAGEはAI搭載の医療ガイダンスアシスタントです。症状を理解し、緊急度を評価し、適切な医療専門家を見つけるお手伝いをします——代替するものではありません。\n\nSAGEは自己治療や自己投薬を推奨しません。医療上の懸念を緊急度別に整理し、必要なケアへ導くために設計されています。\n\n緊急時は、直ちに地域の緊急サービスに連絡してください。",
    letsBegin: "始めましょう →",
    noDataStored: "個人を特定する情報は収集・保存されません。",
    aboutYou: "あなたについて",
    quickPersonalisation: "簡単なカスタマイズ",
    demoDesc: "年齢・性別・背景はSAGEの評価精度向上に役立ちます。個人識別情報は不要です。",
    age: "年齢", agePlaceholder: "あなたの年齢",
    biologicalSex: "生物学的性別",
    ethnicity: "民族・出身（任意）",
    continueBtn: "続ける →",
    demoDisclaimer: "セッションのカスタマイズのみに使用。保存・共有は一切しません。",
    male: "男性", female: "女性", other: "その他/回答しない",
    emergencyCheck: "緊急状態の確認",
    emergencySubtitle: "現在、次のいずれかの症状がありますか？",
    emergencyDoubt: "迷ったら必ず'はい'を選択し、緊急サービスに連絡してください。",
    allClear: "問題なし — 相談を開始 →",
    yes: "はい", no: "いいえ",
    airwayTitle: "気道の問題", airwayDesc: "窒息、話せない、喉の腫れ、喘鳴",
    breathingTitle: "呼吸困難", breathingDesc: "重篤な息切れ、文章を言い終えられない、唇の青紫変色",
    circulationTitle: "胸痛・循環", circulationDesc: "胸の痛みや圧迫感、脈が速いまたは感じられない、蒼白/冷たい/冷汗",
    consciousnessTitle: "意識障害・神経症状", consciousnessDesc: "混乱、突然の激しい頭痛、顔面下垂、手足の脱力・しびれ",
    bleedingTitle: "重篤な外傷・出血", bleedingDesc: "止まらない出血、重大な外傷、変形を伴う骨折疑い",
    call911: "今すぐ119番に電話",
    emergencyIndicated: "以下の緊急事態の可能性が示されました：",
    emergencyInstruction: "待たずに — 今すぐ緊急サービスに連絡してください。",
    whileWaiting: "救急を待つ間に",
    tellDispatcher: "オペレーターに伝えること",
    emsSteps: ["今すぐ119番（または地域の緊急番号）に電話する。","落ち着いて通話を切らない。","指示なく食事・飲水・服薬しない。","ドアを開けて救急隊員が入れるようにする。","安全なら座るか横になる。自分で運転しない。","可能なら薬のリストを用意する。"],
    dispatcherInfo: ["正確な住所。","主な症状：","症状が始まった時刻と悪化しているか。","服用中の薬。"],
    mistakeBack: "← 間違えました、戻る",
    whereSymptom: "症状はどこですか？",
    tapToSelect: "エリアをタップ · 前面/背面を切替 · 制限なし",
    front: "◉ 前面", back: "◉ 背面",
    swipeHint: "← スワイプで切替 →",
    areasSelected: "ヶ所", areasSelectedPlural: "ヶ所",
    selectedAreas: "選択したエリア",
    confirmSelection: "選択を確定 →",
    tapHint: "タップして選択 · 再タップで解除 · 制限なし",
    sicSubtitle: "症状チェッカー · AIアシスタント",
    disclaimer: "⚕️ 参考情報のみ · 専門的な医療アドバイスの代わりにはなりません",
    typeAnswer: "または回答を入力...",
    selectAtLeastOne: "少なくとも1つ選択してください",
    confirmCount: "確定",
    selected: "選択済み",
    selectAllApply: "該当するものをすべて選択して確定してください",
    noPain: "痛みなし", mild: "軽度", moderate: "中程度", severe: "重度", verySevere: "最重度/最悪",
    tapPainLevel: "痛みのレベルをタップ（0=なし、10=最悪）",
    howLong: "この症状はどのくらい続いていますか？",
    hours: "時間", days: "日", weeks: "週間", months: "ヶ月",
    confirm: "確定",
    enterTemp: "体温を入力（°C）",
    normal: "正常", hypothermia: "低体温", lowGradeFever: "微熱", fever: "発熱", highFever: "高熱",
    normalRange: "正常：36.1〜37.4°C",
    enterHR: "心拍数を入力（回/分）",
    bradycardia: "徐脈", lowNormal: "低め正常", elevated: "やや高い", tachycardia: "頻脈",
    normalHR: "正常：60〜100回/分",
    chooseLanguage: "言語を選択",
    anythingElse: "他にお手伝いできることはありますか？",
    feedbackTitle: "ご利用体験はいかがでしたか？",
    feedbackSubtitle: "フィードバックはSAGEの改善に役立てられます。",
    rateExperience: "体験を評価してください",
    commentsLabel: "コメント（任意）",
    commentsPlaceholder: "ご意見やご提案があればお聞かせください。",
    emailLabel: "メールアドレス（任意）",
    emailPlaceholder: "your@email.com — フォローアップを希望される場合のみ",
    submitFeedback: "フィードバックを送信",
    thankYouTitle: "ありがとうございます！🌿",
    thankYouText: "フィードバックはSAGEの改善に役立てられます。",
    newConsultation: "新しい相談を始める",
    feedbackYes: "はい、お願いします",
    feedbackNo: "いいえ、終わりにします",

  },
};

// ─── Body zone definitions ────────────────────────────────────────────────────
const FRONT_ZONES = [
  { id: "head", label: "Head / Face", path: "M 110,18 C 110,4 140,4 140,18 C 145,35 143,52 125,55 C 107,52 105,35 110,18 Z" },
  { id: "neck_front", label: "Neck", path: "M 117,55 L 133,55 L 136,72 L 114,72 Z" },
  { id: "chest_left", label: "Chest (Left)", path: "M 114,72 L 125,72 L 125,108 L 95,108 L 90,85 Z" },
  { id: "chest_right", label: "Chest (Right)", path: "M 125,72 L 136,72 L 160,85 L 155,108 L 125,108 Z" },
  { id: "abdomen_upper", label: "Upper Abdomen", path: "M 95,108 L 155,108 L 152,135 L 98,135 Z" },
  { id: "abdomen_lower", label: "Lower Abdomen", path: "M 98,135 L 152,135 L 150,160 L 100,160 Z" },
  { id: "groin_left", label: "Left Groin / Hip", path: "M 100,160 L 125,160 L 122,178 L 98,175 Z" },
  { id: "groin_right", label: "Right Groin / Hip", path: "M 125,160 L 150,160 L 152,175 L 128,178 Z" },
  { id: "shoulder_left", label: "Left Shoulder", path: "M 80,72 L 95,72 L 90,85 L 95,108 L 72,120 L 65,90 Z" },
  { id: "shoulder_right", label: "Right Shoulder", path: "M 155,72 L 170,72 L 185,90 L 178,120 L 155,108 L 160,85 Z" },
  { id: "upper_arm_left", label: "Left Upper Arm", path: "M 66,92 L 70,115 L 54,118 L 51,110 Z" },
  { id: "elbow_left", label: "Left Elbow", path: "M 70,115 L 74,128 L 57,132 L 54,118 Z" },
  { id: "forearm_left", label: "Left Forearm / Hand", path: "M 74,128 L 78,152 L 60,150 L 57,132 Z" },
  { id: "upper_arm_right", label: "Right Upper Arm", path: "M 184,92 L 196,110 L 200,118 L 180,115 Z" },
  { id: "elbow_right", label: "Right Elbow", path: "M 180,115 L 200,118 L 203,132 L 176,128 Z" },
  { id: "forearm_right", label: "Right Forearm / Hand", path: "M 176,128 L 203,132 L 200,150 L 172,152 Z" },
  { id: "thigh_left", label: "Left Thigh", path: "M 98,175 L 122,178 L 118,220 L 94,218 Z" },
  { id: "thigh_right", label: "Right Thigh", path: "M 128,178 L 152,175 L 156,218 L 132,220 Z" },
  { id: "knee_left", label: "Left Knee", path: "M 94,218 L 118,220 L 116,238 L 93,236 Z" },
  { id: "lower_leg_left", label: "Left Lower Leg / Shin", path: "M 93,236 L 116,238 L 115,265 L 92,262 Z" },
  { id: "knee_right", label: "Right Knee", path: "M 132,220 L 156,218 L 157,236 L 133,238 Z" },
  { id: "lower_leg_right", label: "Right Lower Leg / Shin", path: "M 133,238 L 157,236 L 158,262 L 135,265 Z" },
  { id: "foot_left", label: "Left Foot / Ankle", path: "M 92,262 L 115,265 L 113,285 L 88,282 Z" },
  { id: "foot_right", label: "Right Foot / Ankle", path: "M 135,265 L 158,262 L 162,282 L 137,285 Z" },
];

const BACK_ZONES = [
  { id: "head_back", label: "Head (Back)", path: "M 110,18 C 110,4 140,4 140,18 C 145,35 143,52 125,55 C 107,52 105,35 110,18 Z" },
  { id: "neck_back", label: "Neck (Back)", path: "M 117,55 L 133,55 L 136,72 L 114,72 Z" },
  { id: "upper_back_left", label: "Upper Back (Left)", path: "M 114,72 L 125,72 L 125,108 L 95,108 L 90,85 Z" },
  { id: "upper_back_right", label: "Upper Back (Right)", path: "M 125,72 L 136,72 L 160,85 L 155,108 L 125,108 Z" },
  { id: "lower_back_left", label: "Lower Back (Left)", path: "M 95,108 L 125,108 L 125,160 L 98,160 Z" },
  { id: "lower_back_right", label: "Lower Back (Right)", path: "M 125,108 L 155,108 L 152,160 L 125,160 Z" },
  { id: "buttock_left", label: "Left Buttock", path: "M 98,160 L 125,160 L 122,188 L 96,185 Z" },
  { id: "buttock_right", label: "Right Buttock", path: "M 125,160 L 152,160 L 154,185 L 128,188 Z" },
  { id: "shoulder_back_left", label: "Left Shoulder (Back)", path: "M 80,72 L 95,72 L 90,85 L 95,108 L 72,120 L 65,90 Z" },
  { id: "shoulder_back_right", label: "Right Shoulder (Back)", path: "M 155,72 L 170,72 L 185,90 L 178,120 L 155,108 L 160,85 Z" },
  { id: "upper_arm_back_left", label: "Left Upper Arm (Back)", path: "M 66,92 L 70,115 L 54,118 L 51,110 Z" },
  { id: "elbow_back_left", label: "Left Elbow (Back)", path: "M 70,115 L 74,128 L 57,132 L 54,118 Z" },
  { id: "forearm_back_left", label: "Left Forearm (Back)", path: "M 74,128 L 78,152 L 60,150 L 57,132 Z" },
  { id: "upper_arm_back_right", label: "Right Upper Arm (Back)", path: "M 184,92 L 196,110 L 200,118 L 180,115 Z" },
  { id: "elbow_back_right", label: "Right Elbow (Back)", path: "M 180,115 L 200,118 L 203,132 L 176,128 Z" },
  { id: "forearm_back_right", label: "Right Forearm (Back)", path: "M 176,128 L 203,132 L 200,150 L 172,152 Z" },
  { id: "hamstring_left", label: "Left Hamstring / Thigh", path: "M 96,185 L 122,188 L 118,230 L 94,228 Z" },
  { id: "hamstring_right", label: "Right Hamstring / Thigh", path: "M 128,188 L 154,185 L 156,228 L 132,230 Z" },
  { id: "knee_back_left", label: "Left Knee (Back)", path: "M 94,228 L 118,230 L 116,246 L 93,244 Z" },
  { id: "calf_left", label: "Left Calf", path: "M 93,244 L 116,246 L 115,270 L 92,268 Z" },
  { id: "knee_back_right", label: "Right Knee (Back)", path: "M 132,230 L 156,228 L 157,244 L 133,246 Z" },
  { id: "calf_right", label: "Right Calf", path: "M 133,246 L 157,244 L 158,268 L 135,270 Z" },
  { id: "heel_left", label: "Left Heel / Foot", path: "M 92,268 L 115,270 L 113,288 L 88,285 Z" },
  { id: "heel_right", label: "Right Heel / Foot", path: "M 135,270 L 158,268 L 162,285 L 137,288 Z" },
];


const ZONE_LABELS = {
  en: {
    head:"Head / Face", neck_front:"Neck", chest_left:"Chest (Left)", chest_right:"Chest (Right)",
    abdomen_upper:"Upper Abdomen", abdomen_lower:"Lower Abdomen", groin_left:"Left Groin / Hip",
    groin_right:"Right Groin / Hip", shoulder_left:"Left Shoulder", shoulder_right:"Right Shoulder",
    upper_arm_left:"Left Upper Arm", elbow_left:"Left Elbow", forearm_left:"Left Forearm / Hand",
    upper_arm_right:"Right Upper Arm", elbow_right:"Right Elbow", forearm_right:"Right Forearm / Hand",
    thigh_left:"Left Thigh", thigh_right:"Right Thigh", knee_left:"Left Knee",
    lower_leg_left:"Left Lower Leg / Shin", knee_right:"Right Knee", lower_leg_right:"Right Lower Leg / Shin",
    foot_left:"Left Foot / Ankle", foot_right:"Right Foot / Ankle",
    head_back:"Head (Back)", neck_back:"Neck (Back)", upper_back_left:"Upper Back (Left)",
    upper_back_right:"Upper Back (Right)", lower_back_left:"Lower Back (Left)", lower_back_right:"Lower Back (Right)",
    buttock_left:"Left Buttock", buttock_right:"Right Buttock", shoulder_back_left:"Left Shoulder (Back)",
    shoulder_back_right:"Right Shoulder (Back)", upper_arm_back_left:"Left Upper Arm (Back)",
    elbow_back_left:"Left Elbow (Back)", forearm_back_left:"Left Forearm (Back)",
    upper_arm_back_right:"Right Upper Arm (Back)", elbow_back_right:"Right Elbow (Back)",
    forearm_back_right:"Right Forearm (Back)", hamstring_left:"Left Hamstring / Thigh",
    hamstring_right:"Right Hamstring / Thigh", knee_back_left:"Left Knee (Back)",
    calf_left:"Left Calf", knee_back_right:"Right Knee (Back)", calf_right:"Right Calf",
    heel_left:"Left Heel / Foot", heel_right:"Right Heel / Foot",
  },
  es: {
    head:"Cabeza / Cara", neck_front:"Cuello", chest_left:"Pecho (Izquierdo)", chest_right:"Pecho (Derecho)",
    abdomen_upper:"Abdomen Superior", abdomen_lower:"Abdomen Inferior", groin_left:"Ingle / Cadera Izquierda",
    groin_right:"Ingle / Cadera Derecha", shoulder_left:"Hombro Izquierdo", shoulder_right:"Hombro Derecho",
    upper_arm_left:"Brazo Superior Izquierdo", elbow_left:"Codo Izquierdo", forearm_left:"Antebrazo / Mano Izquierda",
    upper_arm_right:"Brazo Superior Derecho", elbow_right:"Codo Derecho", forearm_right:"Antebrazo / Mano Derecha",
    thigh_left:"Muslo Izquierdo", thigh_right:"Muslo Derecho", knee_left:"Rodilla Izquierda",
    lower_leg_left:"Pierna Inferior Izquierda / Espinilla", knee_right:"Rodilla Derecha",
    lower_leg_right:"Pierna Inferior Derecha / Espinilla", foot_left:"Pie / Tobillo Izquierdo",
    foot_right:"Pie / Tobillo Derecho", head_back:"Cabeza (Posterior)", neck_back:"Cuello (Posterior)",
    upper_back_left:"Espalda Superior (Izquierda)", upper_back_right:"Espalda Superior (Derecha)",
    lower_back_left:"Espalda Inferior (Izquierda)", lower_back_right:"Espalda Inferior (Derecha)",
    buttock_left:"Glúteo Izquierdo", buttock_right:"Glúteo Derecho",
    shoulder_back_left:"Hombro Posterior Izquierdo", shoulder_back_right:"Hombro Posterior Derecho",
    upper_arm_back_left:"Brazo Superior Izquierdo (Posterior)", elbow_back_left:"Codo Izquierdo (Posterior)",
    forearm_back_left:"Antebrazo Izquierdo (Posterior)", upper_arm_back_right:"Brazo Superior Derecho (Posterior)",
    elbow_back_right:"Codo Derecho (Posterior)", forearm_back_right:"Antebrazo Derecho (Posterior)",
    hamstring_left:"Isquiotibial / Muslo Izquierdo", hamstring_right:"Isquiotibial / Muslo Derecho",
    knee_back_left:"Rodilla Posterior Izquierda", calf_left:"Pantorrilla Izquierda",
    knee_back_right:"Rodilla Posterior Derecha", calf_right:"Pantorrilla Derecha",
    heel_left:"Talón / Pie Izquierdo", heel_right:"Talón / Pie Derecho",
  },
  fr: {
    head:"Tête / Visage", neck_front:"Cou", chest_left:"Poitrine (Gauche)", chest_right:"Poitrine (Droite)",
    abdomen_upper:"Abdomen Supérieur", abdomen_lower:"Abdomen Inférieur", groin_left:"Aine / Hanche Gauche",
    groin_right:"Aine / Hanche Droite", shoulder_left:"Épaule Gauche", shoulder_right:"Épaule Droite",
    upper_arm_left:"Bras Supérieur Gauche", elbow_left:"Coude Gauche", forearm_left:"Avant-bras / Main Gauche",
    upper_arm_right:"Bras Supérieur Droit", elbow_right:"Coude Droit", forearm_right:"Avant-bras / Main Droite",
    thigh_left:"Cuisse Gauche", thigh_right:"Cuisse Droite", knee_left:"Genou Gauche",
    lower_leg_left:"Jambe Inférieure Gauche / Tibia", knee_right:"Genou Droit",
    lower_leg_right:"Jambe Inférieure Droite / Tibia", foot_left:"Pied / Cheville Gauche",
    foot_right:"Pied / Cheville Droite", head_back:"Tête (Arrière)", neck_back:"Cou (Arrière)",
    upper_back_left:"Haut du Dos (Gauche)", upper_back_right:"Haut du Dos (Droit)",
    lower_back_left:"Bas du Dos (Gauche)", lower_back_right:"Bas du Dos (Droit)",
    buttock_left:"Fesse Gauche", buttock_right:"Fesse Droite",
    shoulder_back_left:"Épaule Postérieure Gauche", shoulder_back_right:"Épaule Postérieure Droite",
    upper_arm_back_left:"Bras Supérieur Gauche (Arrière)", elbow_back_left:"Coude Gauche (Arrière)",
    forearm_back_left:"Avant-bras Gauche (Arrière)", upper_arm_back_right:"Bras Supérieur Droit (Arrière)",
    elbow_back_right:"Coude Droit (Arrière)", forearm_back_right:"Avant-bras Droit (Arrière)",
    hamstring_left:"Ischio-jambiers / Cuisse Gauche", hamstring_right:"Ischio-jambiers / Cuisse Droite",
    knee_back_left:"Genou Postérieur Gauche", calf_left:"Mollet Gauche",
    knee_back_right:"Genou Postérieur Droit", calf_right:"Mollet Droit",
    heel_left:"Talon / Pied Gauche", heel_right:"Talon / Pied Droit",
  },
  de: {
    head:"Kopf / Gesicht", neck_front:"Hals", chest_left:"Brust (Links)", chest_right:"Brust (Rechts)",
    abdomen_upper:"Oberbauch", abdomen_lower:"Unterbauch", groin_left:"Linke Leiste / Hüfte",
    groin_right:"Rechte Leiste / Hüfte", shoulder_left:"Linke Schulter", shoulder_right:"Rechte Schulter",
    upper_arm_left:"Linker Oberarm", elbow_left:"Linker Ellbogen", forearm_left:"Linker Unterarm / Hand",
    upper_arm_right:"Rechter Oberarm", elbow_right:"Rechter Ellbogen", forearm_right:"Rechter Unterarm / Hand",
    thigh_left:"Linker Oberschenkel", thigh_right:"Rechter Oberschenkel", knee_left:"Linkes Knie",
    lower_leg_left:"Linker Unterschenkel / Schienbein", knee_right:"Rechtes Knie",
    lower_leg_right:"Rechter Unterschenkel / Schienbein", foot_left:"Linker Fuß / Knöchel",
    foot_right:"Rechter Fuß / Knöchel", head_back:"Kopf (Hinten)", neck_back:"Hals (Hinten)",
    upper_back_left:"Oberer Rücken (Links)", upper_back_right:"Oberer Rücken (Rechts)",
    lower_back_left:"Unterer Rücken (Links)", lower_back_right:"Unterer Rücken (Rechts)",
    buttock_left:"Linkes Gesäß", buttock_right:"Rechtes Gesäß",
    shoulder_back_left:"Linke Schulter (Hinten)", shoulder_back_right:"Rechte Schulter (Hinten)",
    upper_arm_back_left:"Linker Oberarm (Hinten)", elbow_back_left:"Linker Ellbogen (Hinten)",
    forearm_back_left:"Linker Unterarm (Hinten)", upper_arm_back_right:"Rechter Oberarm (Hinten)",
    elbow_back_right:"Rechter Ellbogen (Hinten)", forearm_back_right:"Rechter Unterarm (Hinten)",
    hamstring_left:"Linke Kniesehne / Oberschenkel", hamstring_right:"Rechte Kniesehne / Oberschenkel",
    knee_back_left:"Linkes Knie (Hinten)", calf_left:"Linke Wade",
    knee_back_right:"Rechtes Knie (Hinten)", calf_right:"Rechte Wade",
    heel_left:"Linke Ferse / Fuß", heel_right:"Rechte Ferse / Fuß",
  },
  pt: {
    head:"Cabeça / Rosto", neck_front:"Pescoço", chest_left:"Peito (Esquerdo)", chest_right:"Peito (Direito)",
    abdomen_upper:"Abdómen Superior", abdomen_lower:"Abdómen Inferior", groin_left:"Virilha / Anca Esquerda",
    groin_right:"Virilha / Anca Direita", shoulder_left:"Ombro Esquerdo", shoulder_right:"Ombro Direito",
    upper_arm_left:"Braço Superior Esquerdo", elbow_left:"Cotovelo Esquerdo", forearm_left:"Antebraço / Mão Esquerda",
    upper_arm_right:"Braço Superior Direito", elbow_right:"Cotovelo Direito", forearm_right:"Antebraço / Mão Direita",
    thigh_left:"Coxa Esquerda", thigh_right:"Coxa Direita", knee_left:"Joelho Esquerdo",
    lower_leg_left:"Perna Inferior Esquerda / Canela", knee_right:"Joelho Direito",
    lower_leg_right:"Perna Inferior Direita / Canela", foot_left:"Pé / Tornozelo Esquerdo",
    foot_right:"Pé / Tornozelo Direito", head_back:"Cabeça (Posterior)", neck_back:"Pescoço (Posterior)",
    upper_back_left:"Costas Superiores (Esquerda)", upper_back_right:"Costas Superiores (Direita)",
    lower_back_left:"Costas Inferiores (Esquerda)", lower_back_right:"Costas Inferiores (Direita)",
    buttock_left:"Nádega Esquerda", buttock_right:"Nádega Direita",
    shoulder_back_left:"Ombro Posterior Esquerdo", shoulder_back_right:"Ombro Posterior Direito",
    upper_arm_back_left:"Braço Superior Esquerdo (Posterior)", elbow_back_left:"Cotovelo Esquerdo (Posterior)",
    forearm_back_left:"Antebraço Esquerdo (Posterior)", upper_arm_back_right:"Braço Superior Direito (Posterior)",
    elbow_back_right:"Cotovelo Direito (Posterior)", forearm_back_right:"Antebraço Direito (Posterior)",
    hamstring_left:"Isquiotibial / Coxa Esquerda", hamstring_right:"Isquiotibial / Coxa Direita",
    knee_back_left:"Joelho Posterior Esquerdo", calf_left:"Gémeo Esquerdo",
    knee_back_right:"Joelho Posterior Direito", calf_right:"Gémeo Direito",
    heel_left:"Calcanhar / Pé Esquerdo", heel_right:"Calcanhar / Pé Direito",
  },
  ru: {
    head:"Голова / Лицо", neck_front:"Шея", chest_left:"Грудь (Левая)", chest_right:"Грудь (Правая)",
    abdomen_upper:"Верхний живот", abdomen_lower:"Нижний живот", groin_left:"Левый пах / Бедро",
    groin_right:"Правый пах / Бедро", shoulder_left:"Левое плечо", shoulder_right:"Правое плечо",
    upper_arm_left:"Левое плечо (рука)", elbow_left:"Левый локоть", forearm_left:"Левое предплечье / Кисть",
    upper_arm_right:"Правое плечо (рука)", elbow_right:"Правый локоть", forearm_right:"Правое предплечье / Кисть",
    thigh_left:"Левое бедро", thigh_right:"Правое бедро", knee_left:"Левое колено",
    lower_leg_left:"Левая голень", knee_right:"Правое колено",
    lower_leg_right:"Правая голень", foot_left:"Левая стопа / Лодыжка",
    foot_right:"Правая стопа / Лодыжка", head_back:"Голова (Сзади)", neck_back:"Шея (Сзади)",
    upper_back_left:"Верхняя спина (Левая)", upper_back_right:"Верхняя спина (Правая)",
    lower_back_left:"Нижняя спина (Левая)", lower_back_right:"Нижняя спина (Правая)",
    buttock_left:"Левая ягодица", buttock_right:"Правая ягодица",
    shoulder_back_left:"Левое плечо (Сзади)", shoulder_back_right:"Правое плечо (Сзади)",
    upper_arm_back_left:"Левый плечо (Сзади)", elbow_back_left:"Левый локоть (Сзади)",
    forearm_back_left:"Левое предплечье (Сзади)", upper_arm_back_right:"Правое плечо (Сзади)",
    elbow_back_right:"Правый локоть (Сзади)", forearm_back_right:"Правое предплечье (Сзади)",
    hamstring_left:"Левое бедро (Задняя поверхность)", hamstring_right:"Правое бедро (Задняя поверхность)",
    knee_back_left:"Левое колено (Сзади)", calf_left:"Левая икра",
    knee_back_right:"Правое колено (Сзади)", calf_right:"Правая икра",
    heel_left:"Левая пятка / Стопа", heel_right:"Правая пятка / Стопа",
  },
  zh: {
    head:"头部 / 面部", neck_front:"颈部", chest_left:"胸部（左）", chest_right:"胸部（右）",
    abdomen_upper:"上腹部", abdomen_lower:"下腹部", groin_left:"左腹股沟 / 髋部",
    groin_right:"右腹股沟 / 髋部", shoulder_left:"左肩", shoulder_right:"右肩",
    upper_arm_left:"左上臂", elbow_left:"左肘", forearm_left:"左前臂 / 手",
    upper_arm_right:"右上臂", elbow_right:"右肘", forearm_right:"右前臂 / 手",
    thigh_left:"左大腿", thigh_right:"右大腿", knee_left:"左膝",
    lower_leg_left:"左小腿 / 胫骨", knee_right:"右膝",
    lower_leg_right:"右小腿 / 胫骨", foot_left:"左脚 / 踝",
    foot_right:"右脚 / 踝", head_back:"头部（后）", neck_back:"颈部（后）",
    upper_back_left:"上背部（左）", upper_back_right:"上背部（右）",
    lower_back_left:"下背部（左）", lower_back_right:"下背部（右）",
    buttock_left:"左臀", buttock_right:"右臀",
    shoulder_back_left:"左肩（后）", shoulder_back_right:"右肩（后）",
    upper_arm_back_left:"左上臂（后）", elbow_back_left:"左肘（后）",
    forearm_back_left:"左前臂（后）", upper_arm_back_right:"右上臂（后）",
    elbow_back_right:"右肘（后）", forearm_back_right:"右前臂（后）",
    hamstring_left:"左腘绳肌 / 大腿", hamstring_right:"右腘绳肌 / 大腿",
    knee_back_left:"左膝（后）", calf_left:"左小腿肚",
    knee_back_right:"右膝（后）", calf_right:"右小腿肚",
    heel_left:"左脚跟 / 脚", heel_right:"右脚跟 / 脚",
  },
  ja: {
    head:"頭部 / 顔", neck_front:"首", chest_left:"胸部（左）", chest_right:"胸部（右）",
    abdomen_upper:"上腹部", abdomen_lower:"下腹部", groin_left:"左鼠径部 / 股関節",
    groin_right:"右鼠径部 / 股関節", shoulder_left:"左肩", shoulder_right:"右肩",
    upper_arm_left:"左上腕", elbow_left:"左肘", forearm_left:"左前腕 / 手",
    upper_arm_right:"右上腕", elbow_right:"右肘", forearm_right:"右前腕 / 手",
    thigh_left:"左大腿", thigh_right:"右大腿", knee_left:"左膝",
    lower_leg_left:"左下腿 / 脛", knee_right:"右膝",
    lower_leg_right:"右下腿 / 脛", foot_left:"左足 / 足首",
    foot_right:"右足 / 足首", head_back:"頭部（後面）", neck_back:"首（後面）",
    upper_back_left:"上背部（左）", upper_back_right:"上背部（右）",
    lower_back_left:"下背部（左）", lower_back_right:"下背部（右）",
    buttock_left:"左臀部", buttock_right:"右臀部",
    shoulder_back_left:"左肩（後面）", shoulder_back_right:"右肩（後面）",
    upper_arm_back_left:"左上腕（後面）", elbow_back_left:"左肘（後面）",
    forearm_back_left:"左前腕（後面）", upper_arm_back_right:"右上腕（後面）",
    elbow_back_right:"右肘（後面）", forearm_back_right:"右前腕（後面）",
    hamstring_left:"左ハムストリング / 大腿", hamstring_right:"右ハムストリング / 大腿",
    knee_back_left:"左膝（後面）", calf_left:"左ふくらはぎ",
    knee_back_right:"右膝（後面）", calf_right:"右ふくらはぎ",
    heel_left:"左かかと / 足", heel_right:"右かかと / 足",
  },
};

const TRIAGE_ITEMS = (t) => [
  { id: "airway",        icon: "🫁",  title: t.airwayTitle,        desc: t.airwayDesc },
  { id: "breathing",     icon: "😮‍💨", title: t.breathingTitle,     desc: t.breathingDesc },
  { id: "circulation",   icon: "❤️",  title: t.circulationTitle,   desc: t.circulationDesc },
  { id: "consciousness", icon: "🧠",  title: t.consciousnessTitle, desc: t.consciousnessDesc },
  { id: "bleeding",      icon: "🩸",  title: t.bleedingTitle,      desc: t.bleedingDesc },
];

const SYSTEM_PROMPT = (lang, langName) => `You are SAGE — Symptom Assessment & Guidance Engine — a friendly and highly capable AI medical assistant. Conduct the ENTIRE conversation in ${langName}. Every single response must be in ${langName} only.

CORE RULES:
1. Ask ONE question at a time.
2. The patient has already passed emergency triage — do NOT re-check for immediate life threats.
3. The patient has already indicated their symptom location(s) via a body diagram — use this as your starting point.
4. Progress naturally: Targeted follow-up on location → Symptom character → History → Medications → Review of Systems → Objective Findings → Investigations → Differential Diagnosis.
5. To request an interactive widget, include a tag at the END of your message:
   - [WIDGET:yesno] — yes/no questions
   - [WIDGET:pain_scale] — pain/severity 0-10
   - [WIDGET:duration] — how long symptoms present
   - [WIDGET:temperature] — body temperature
   - [WIDGET:heart_rate] — heart rate
   - [WIDGET:choice:Option1|Option2|Option3|Option4|Option5] — multi-select symptom list (max 8 options, written in ${langName})
6. Use widgets whenever possible instead of asking patients to type.
7. Be warm, empathetic, clear. Match terminology to the user.
8. Structured assessment when ready:
   - Most likely condition(s) with brief reasoning
   - Other possibilities
   - Urgency: ROUTINE / SOON / URGENT / EMERGENCY
   - Red flags to watch for
   - Recommended specialist
   - Suggested investigations
9. Never diagnose definitively. Use tentative language.
10. If new emergency red flags emerge, immediately advise emergency services.

Patient demographics: {DEMOGRAPHICS}
Symptom location(s): {LOCATIONS}`;

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: { fontFamily:"'DM Sans',sans-serif", background:"linear-gradient(160deg,#0a2342 0%,#1a4a7a 60%,#2e7fc1 100%)", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"36px 24px", color:"white", maxWidth:"430px", margin:"0 auto", boxSizing:"border-box" },
  logo: { fontSize:"54px", fontWeight:"800", letterSpacing:"-2px", color:"#7dd3fc", marginBottom:"2px" },
  logoSub: { fontSize:"11px", letterSpacing:"3.5px", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginBottom:"28px" },
  card: { background:"white", borderRadius:"20px", padding:"26px 22px", width:"100%", boxSizing:"border-box", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" },
  cardTitle: { fontSize:"16px", fontWeight:"700", color:"#0a2342", marginBottom:"6px" },
  cardDesc: { fontSize:"12px", color:"#6b7280", marginBottom:"20px", lineHeight:"1.6" },
  label: { fontSize:"11px", fontWeight:"700", color:"#374151", marginBottom:"5px", display:"block", letterSpacing:"0.8px", textTransform:"uppercase" },
  input: { width:"100%", padding:"11px 13px", border:"1.5px solid #e5e7eb", borderRadius:"10px", fontSize:"15px", color:"#111827", marginBottom:"14px", boxSizing:"border-box", background:"#f9fafb", fontFamily:"inherit", outline:"none" },
  select: { width:"100%", padding:"11px 13px", border:"1.5px solid #e5e7eb", borderRadius:"10px", fontSize:"15px", color:"#111827", marginBottom:"14px", boxSizing:"border-box", background:"#f9fafb", fontFamily:"inherit", outline:"none", appearance:"none" },
  btn: { width:"100%", padding:"14px", background:"linear-gradient(135deg,#1a4a7a,#2e7fc1)", color:"white", border:"none", borderRadius:"12px", fontSize:"16px", fontWeight:"700", cursor:"pointer" },
  btnOutline: { width:"100%", padding:"13px", background:"transparent", color:"white", border:"2px solid rgba(255,255,255,0.4)", borderRadius:"12px", fontSize:"14px", fontWeight:"600", cursor:"pointer" },
  smallText: { fontSize:"10px", color:"rgba(255,255,255,0.4)", textAlign:"center", marginTop:"18px", lineHeight:"1.5", padding:"0 8px" },
  bigAvatar: { width:"150px", height:"150px", borderRadius:"50%", overflow:"hidden", marginBottom:"18px", border:"3px solid rgba(125,211,252,0.5)" },
  sicName: { fontSize:"38px", fontWeight:"800", textAlign:"center", marginBottom:"2px", color:"#7dd3fc", letterSpacing:"-1px" },
  sicTagline: { fontSize:"12px", color:"rgba(255,255,255,0.55)", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"18px", textAlign:"center" },
  disclaimerBox: { background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"14px", padding:"16px 18px", marginBottom:"22px", width:"100%", boxSizing:"border-box" },
  disclaimerTitle: { fontSize:"13px", fontWeight:"700", color:"#7dd3fc", marginBottom:"8px" },
  disclaimerText: { fontSize:"12px", color:"rgba(255,255,255,0.7)", lineHeight:"1.65", whiteSpace:"pre-line" },
  triagePage: { fontFamily:"'DM Sans',sans-serif", background:"#0a2342", minHeight:"100vh", display:"flex", flexDirection:"column", padding:"28px 20px", color:"white", maxWidth:"430px", margin:"0 auto", boxSizing:"border-box" },
  triageHeader: { textAlign:"center", marginBottom:"22px" },
  triageTitle: { fontSize:"20px", fontWeight:"800", color:"#f87171", marginBottom:"6px" },
  triageSubtitle: { fontSize:"13px", color:"rgba(255,255,255,0.6)", lineHeight:"1.5" },
  triageItem: { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"14px", padding:"14px 16px", marginBottom:"10px", display:"flex", alignItems:"center", gap:"14px" },
  triageItemActive: { background:"rgba(248,113,113,0.15)", border:"1px solid rgba(248,113,113,0.5)", borderRadius:"14px", padding:"14px 16px", marginBottom:"10px", display:"flex", alignItems:"center", gap:"14px" },
  triageIcon: { fontSize:"26px", flexShrink:0, width:"36px", textAlign:"center" },
  triageText: { flex:1 },
  triageItemTitle: { fontSize:"14px", fontWeight:"700", color:"white", marginBottom:"2px" },
  triageItemDesc: { fontSize:"11px", color:"rgba(255,255,255,0.5)", lineHeight:"1.4" },
  triageButtons: { display:"flex", gap:"8px", marginLeft:"auto", flexShrink:0 },
  triageYes: { padding:"8px 14px", background:"#dc2626", color:"white", border:"none", borderRadius:"8px", fontSize:"12px", fontWeight:"700", cursor:"pointer" },
  triageNo: { padding:"8px 14px", background:"rgba(255,255,255,0.12)", color:"white", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"8px", fontSize:"12px", fontWeight:"600", cursor:"pointer" },
  triageYesActive: { padding:"8px 14px", background:"#dc2626", color:"white", border:"2px solid #f87171", borderRadius:"8px", fontSize:"12px", fontWeight:"700", cursor:"pointer" },
  triageNoActive: { padding:"8px 14px", background:"rgba(134,239,172,0.2)", color:"#86efac", border:"2px solid #86efac", borderRadius:"8px", fontSize:"12px", fontWeight:"700", cursor:"pointer" },
  emergencyPage: { fontFamily:"'DM Sans',sans-serif", background:"linear-gradient(160deg,#450a0a,#991b1b)", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"36px 24px", color:"white", maxWidth:"430px", margin:"0 auto", boxSizing:"border-box", textAlign:"center" },
  emergencyTitle: { fontSize:"32px", fontWeight:"800", marginBottom:"8px" },
  emergencySubtitle: { fontSize:"15px", color:"rgba(255,255,255,0.85)", marginBottom:"28px", lineHeight:"1.5" },
  emergencyCard: { background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:"16px", padding:"18px", width:"100%", boxSizing:"border-box", marginBottom:"20px", textAlign:"left" },
  emergencyCardTitle: { fontSize:"12px", fontWeight:"700", color:"#fca5a5", marginBottom:"10px", letterSpacing:"0.5px", textTransform:"uppercase" },
  emergencyStep: { fontSize:"13px", color:"rgba(255,255,255,0.85)", marginBottom:"8px", lineHeight:"1.5", display:"flex", gap:"10px" },
  chatWrap: { display:"flex", flexDirection:"column", height:"100vh", background:"#f0f4f8", maxWidth:"430px", margin:"0 auto" },
  chatHeader: { background:"linear-gradient(135deg,#0a2342,#1a4a7a)", padding:"10px 18px", display:"flex", alignItems:"center", gap:"11px", boxShadow:"0 2px 12px rgba(0,0,0,0.2)", flexShrink:0 },
  smallAvatar: { width:"40px", height:"40px", borderRadius:"50%", overflow:"hidden", flexShrink:0, border:"2px solid rgba(125,211,252,0.45)" },
  hName: { color:"white", fontWeight:"800", fontSize:"15px", lineHeight:"1.2" },
  hSub: { color:"#7dd3fc", fontSize:"10px" },
  msgs: { flex:1, overflowY:"auto", padding:"14px 13px", display:"flex", flexDirection:"column", gap:"10px" },
  bubbleSAGE: { background:"white", color:"#1a1a2e", borderRadius:"18px 18px 18px 4px", padding:"11px 15px", maxWidth:"83%", fontSize:"14px", lineHeight:"1.65", boxShadow:"0 1px 4px rgba(0,0,0,0.08)", alignSelf:"flex-start", whiteSpace:"pre-wrap" },
  bubbleUser: { background:"linear-gradient(135deg,#1a4a7a,#2e7fc1)", color:"white", borderRadius:"18px 18px 4px 18px", padding:"11px 15px", maxWidth:"83%", fontSize:"14px", lineHeight:"1.65", alignSelf:"flex-end", whiteSpace:"pre-wrap" },
  typing: { background:"white", borderRadius:"18px 18px 18px 4px", padding:"11px 15px", alignSelf:"flex-start", boxShadow:"0 1px 4px rgba(0,0,0,0.08)", display:"flex", gap:"4px", alignItems:"center" },
  dot: { width:"7px", height:"7px", borderRadius:"50%", background:"#94a3b8" },
  inputRow: { background:"white", padding:"11px 13px", display:"flex", gap:"9px", alignItems:"flex-end", borderTop:"1px solid #e5e7eb", flexShrink:0 },
  textarea: { flex:1, border:"1.5px solid #e5e7eb", borderRadius:"20px", padding:"9px 15px", fontSize:"14px", fontFamily:"inherit", outline:"none", resize:"none", maxHeight:"100px", background:"#f9fafb", color:"#111827", lineHeight:"1.5" },
  sendBtn: { width:"41px", height:"41px", borderRadius:"50%", background:"linear-gradient(135deg,#1a4a7a,#2e7fc1)", border:"none", cursor:"pointer", color:"white", fontSize:"16px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" },
  disclaim: { fontSize:"9px", color:"#9ca3af", textAlign:"center", padding:"3px 12px 2px", background:"white", borderTop:"1px solid #f3f4f6", flexShrink:0 },
};

const ethnicities = {
  en: ["Prefer not to say","White / Caucasian","Black / African","Hispanic / Latino","East Asian","South Asian","Middle Eastern","Mixed / Other"],
  es: ["Prefiero no decir","Blanco / Caucásico","Negro / Africano","Hispano / Latino","Asiático Oriental","Asiático del Sur","Oriente Medio","Mixto / Otro"],
  fr: ["Préfère ne pas dire","Blanc / Caucasien","Noir / Africain","Hispanique / Latino","Asiatique de l'Est","Asiatique du Sud","Moyen-Orient","Mixte / Autre"],
  de: ["Keine Angabe","Weiß / Kaukasisch","Schwarz / Afrikanisch","Hispanisch / Lateinamerikanisch","Ostasiatisch","Südasiatisch","Naher Osten","Gemischt / Andere"],
  pt: ["Prefiro não dizer","Branco / Caucasiano","Negro / Africano","Hispânico / Latino","Asiático Oriental","Asiático do Sul","Médio Oriente","Misto / Outro"],
  ru: ["Не хочу указывать","Белый / Европейский","Чёрный / Африканский","Латиноамериканский","Восточноазиатский","Южноазиатский","Ближневосточный","Смешанный / Другой"],
  zh: ["不愿透露","白人/高加索人","黑人/非洲裔","西班牙裔/拉丁裔","东亚裔","南亚裔","中东裔","混血/其他"],
  ja: ["回答しない","白人/コーカサス系","黒人/アフリカ系","ヒスパニック/ラテン系","東アジア系","南アジア系","中東系","混血/その他"],
};

function renderText(text) {
  // Strip any JSON metadata that leaked in from partial responses
  let t = text;
  const metaMarkers = ['"}]', '"stop_reason"', '"stop_sequence"', '"usage":', '"input_tokens"', '"model":"claude', '"id":"msg_'];
  for (const marker of metaMarkers) {
    const mi = t.indexOf(marker);
    if (mi !== -1) { t = t.slice(0, mi); break; }
  }
  return t
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, ' ')
    .replace(/\*\*(.*?)\*\*/gs, '$1')
    .replace(/\*(.*?)\*/gs, '$1')
    .replace(/#{1,3} (.*)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function TypingDots() {
  return (
    <div style={S.typing}>
      {[0,1,2].map(i => (
        <div key={i} style={{...S.dot, animation:"bounce 1.2s infinite", animationDelay:`${i*0.2}s`}} />
      ))}
    </div>
  );
}

function parseWidget(text) {
  const match = text.match(/\[WIDGET:([^\]]+)\]/);
  if (!match) return { cleanText: text, widget: null };
  const cleanText = text.replace(/\[WIDGET:[^\]]+\]/, "").trim();
  const raw = match[1];
  if (raw === "yesno") return { cleanText, widget: { type:"yesno" } };
  if (raw === "pain_scale") return { cleanText, widget: { type:"pain_scale" } };
  if (raw === "duration") return { cleanText, widget: { type:"duration" } };
  if (raw === "temperature") return { cleanText, widget: { type:"temperature" } };
  if (raw === "heart_rate") return { cleanText, widget: { type:"heart_rate" } };
  if (raw.startsWith("choice:")) return { cleanText, widget: { type:"choice", options: raw.replace("choice:","").split("|") } };
  return { cleanText, widget: null };
}

// ─── Screen 1: Language + Welcome ────────────────────────────────────────────
function MeetSAGE({ onNext }) {
  const [lang, setLang] = useState("en");
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);
  const t = T[lang];
  return (
    <div style={{...S.page, opacity: show?1:0, transition:"opacity 0.6s ease", paddingTop:"28px", paddingBottom:"28px", justifyContent:"flex-start", overflowY:"auto"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap'); @keyframes glow{0%,100%{box-shadow:0 0 30px rgba(125,211,252,0.35)}50%{box-shadow:0 0 60px rgba(125,211,252,0.7)}} @keyframes bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}} *{box-sizing:border-box}`}</style>

      <div style={{...S.bigAvatar, animation:"glow 3s infinite", marginTop:"8px"}}>
        <img src={SAGE_AVATAR} alt="SAGE" style={{width:"100%",height:"100%",objectFit:"cover"}} />
      </div>
      <div style={S.sicName}>SAGE</div>
      <div style={S.sicTagline}>{t.appTagline}</div>

      {/* Language selector */}
      <div style={{width:"100%", marginBottom:"18px"}}>
        <div style={{fontSize:"11px", color:"rgba(255,255,255,0.5)", textAlign:"center", marginBottom:"10px", letterSpacing:"1px", textTransform:"uppercase"}}>{t.chooseLanguage}</div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px"}}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} style={{
              padding:"9px 10px", borderRadius:"10px", border:"1.5px solid",
              borderColor: lang === l.code ? "#7dd3fc" : "rgba(255,255,255,0.15)",
              background: lang === l.code ? "rgba(125,211,252,0.15)" : "rgba(255,255,255,0.06)",
              color: lang === l.code ? "#7dd3fc" : "rgba(255,255,255,0.7)",
              fontWeight: lang === l.code ? "700" : "500",
              fontSize:"13px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
              display:"flex", alignItems:"center", gap:"7px", transition:"all 0.15s",
            }}>
              <span style={{fontSize:"18px"}}>{l.flag}</span>
              <span>{l.nativeName}</span>
              {lang === l.code && <span style={{marginLeft:"auto", fontSize:"12px"}}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={S.disclaimerBox}>
        <div style={S.disclaimerTitle}>{t.whatSAGETitle}</div>
        <div style={S.disclaimerText}>{t.whatSAGEText}</div>
      </div>

      <div style={{width:"100%"}}>
        <button style={S.btn} onClick={() => onNext(lang)}>{t.letsBegin}</button>
      </div>
      <div style={S.smallText}>{t.noDataStored}</div>
    </div>
  );
}

// ─── Screen 2: Demographics ───────────────────────────────────────────────────
function Demographics({ lang, onNext }) {
  const t = T[lang];
  const [demo, setDemo] = useState({ age:"", sex:t.male, ethnicity:ethnicities[lang][0] });
  function go() {
    const age = parseInt(demo.age);
    if (!demo.age || isNaN(age) || age < 1 || age > 120) { alert("1–120"); return; }
    onNext(demo);
  }
  const sexOpts = [t.male, t.female, t.other];
  return (
    <div style={S.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap'); *{box-sizing:border-box} select:focus,input:focus{border-color:#2e7fc1!important;outline:none}`}</style>
      <div style={S.logo}>SAGE</div>
      <div style={S.logoSub}>{t.aboutYou}</div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t.quickPersonalisation}</div>
        <div style={S.cardDesc}>{t.demoDesc}</div>
        <label style={S.label}>{t.age}</label>
        <input style={S.input} type="number" min="1" max="120" placeholder={t.agePlaceholder} value={demo.age} onChange={e => setDemo({...demo,age:e.target.value})} />
        <label style={S.label}>{t.biologicalSex}</label>
        <select style={S.select} value={demo.sex} onChange={e => setDemo({...demo,sex:e.target.value})}>
          {sexOpts.map(s => <option key={s}>{s}</option>)}
        </select>
        <label style={S.label}>{t.ethnicity}</label>
        <select style={S.select} value={demo.ethnicity} onChange={e => setDemo({...demo,ethnicity:e.target.value})}>
          {ethnicities[lang].map(e => <option key={e}>{e}</option>)}
        </select>
        <button style={S.btn} onClick={go}>{t.continueBtn}</button>
      </div>
      <div style={S.smallText}>{t.demoDisclaimer}</div>
    </div>
  );
}

// ─── Screen 3: Emergency Triage ───────────────────────────────────────────────
function Triage({ lang, onClear, onEmergency }) {
  const t = T[lang];
  const items = TRIAGE_ITEMS(t);
  const [answers, setAnswers] = useState({});
  function answer(id, val) {
    const updated = {...answers,[id]:val};
    setAnswers(updated);
    if (val==="yes") { setTimeout(()=>onEmergency(id),300); return; }
    const allNo = items.every(item => (item.id===id?"no":updated[item.id])==="no");
    if (allNo) setTimeout(()=>onClear(),400);
  }
  const allNo = items.every(item=>answers[item.id]==="no");
  return (
    <div style={S.triagePage}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap'); *{box-sizing:border-box}`}</style>
      <div style={S.triageHeader}>
        <div style={{fontSize:"32px",marginBottom:"8px"}}>🚨</div>
        <div style={S.triageTitle}>{t.emergencyCheck}</div>
        <div style={S.triageSubtitle}>{t.emergencySubtitle}</div>
      </div>
      {items.map(item => {
        const ans = answers[item.id];
        return (
          <div key={item.id} style={ans?S.triageItemActive:S.triageItem}>
            <div style={S.triageIcon}>{item.icon}</div>
            <div style={S.triageText}>
              <div style={S.triageItemTitle}>{item.title}</div>
              <div style={S.triageItemDesc}>{item.desc}</div>
            </div>
            <div style={S.triageButtons}>
              <button style={ans==="yes"?S.triageYesActive:S.triageYes} onClick={()=>answer(item.id,"yes")}>{t.yes}</button>
              <button style={ans==="no"?S.triageNoActive:S.triageNo} onClick={()=>answer(item.id,"no")}>{t.no}</button>
            </div>
          </div>
        );
      })}
      {allNo && <button style={{...S.btn,marginTop:"16px"}} onClick={onClear}>{t.allClear}</button>}
      <div style={{...S.smallText,marginTop:"16px"}}>{t.emergencyDoubt}</div>
    </div>
  );
}

// ─── Screen 4: Emergency Response ────────────────────────────────────────────
function Emergency({ lang, triggeredBy, onBack }) {
  const t = T[lang];
  const items = TRIAGE_ITEMS(t);
  const item = items.find(i=>i.id===triggeredBy);
  return (
    <div style={S.emergencyPage}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap'); @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`}</style>
      <div style={{fontSize:"70px",marginBottom:"14px",animation:"pulse 1.5s infinite"}}>🚨</div>
      <div style={S.emergencyTitle}>{t.call911}</div>
      <div style={S.emergencySubtitle}>{t.emergencyIndicated} <strong>{item?.title}</strong>. {t.emergencyInstruction}</div>
      <div style={S.emergencyCard}>
        <div style={S.emergencyCardTitle}>{t.whileWaiting}</div>
        {t.emsSteps.map((s,i)=>(
          <div key={i} style={S.emergencyStep}><span>{i+1}.</span><span>{s}</span></div>
        ))}
      </div>
      <div style={S.emergencyCard}>
        <div style={S.emergencyCardTitle}>{t.tellDispatcher}</div>
        {[["📍",t.dispatcherInfo[0]],["⚠️",`${t.dispatcherInfo[1]} ${item?.title}`],["🕐",t.dispatcherInfo[2]],["💊",t.dispatcherInfo[3]]].map(([icon,text],i)=>(
          <div key={i} style={S.emergencyStep}><span>{icon}</span><span>{text}</span></div>
        ))}
      </div>
      <button style={S.btnOutline} onClick={onBack}>{t.mistakeBack}</button>
    </div>
  );
}

// ─── Screen 5: Body Diagram ───────────────────────────────────────────────────
function BodyDiagram({ lang, onConfirm }) {
  const zl = ZONE_LABELS[lang] || ZONE_LABELS.en;
  const t = T[lang];
  const [view, setView] = useState("front");
  const [selected, setSelected] = useState({});
  const zones = view==="front"?FRONT_ZONES:BACK_ZONES;
  const touchStart = useRef(null);
  function toggle(id) { const label = zl[id] || id; setSelected(prev=>({...prev,[id]:prev[id]?undefined:label})); }
  const selectedLabels = Object.values(selected).filter(Boolean);
  function onTouchStart(e) { touchStart.current=e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX-touchStart.current;
    if (dx<-50) setView("back");
    if (dx>50) setView("front");
    touchStart.current=null;
  }
  return (
    <div style={{...S.chatWrap, background:"#0a2342"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap'); *{box-sizing:border-box}`}</style>
      <div style={S.chatHeader}>
        <div style={S.smallAvatar}><img src={SAGE_AVATAR} alt="SAGE" style={{width:"100%",height:"100%",objectFit:"cover"}} /></div>
        <div>
          <div style={S.hName}>{t.whereSymptom}</div>
          <div style={S.hSub}>{t.tapToSelect}</div>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:"0",margin:"14px 20px 0",background:"rgba(255,255,255,0.08)",borderRadius:"12px",padding:"4px"}}>
        {["front","back"].map(v=>(
          <button key={v} onClick={()=>setView(v)} style={{
            flex:1, padding:"9px", border:"none", borderRadius:"9px", cursor:"pointer",
            background:view===v?"white":"transparent",
            color:view===v?"#0a2342":"rgba(255,255,255,0.6)",
            fontWeight:"700", fontSize:"14px", fontFamily:"'DM Sans',sans-serif",
          }}>{v==="front"?t.front:t.back}</button>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 24px 0"}}>
        <div style={{fontSize:"11px",color:"rgba(255,255,255,0.35)"}}>{t.swipeHint}</div>
        {selectedLabels.length>0&&(
          <div style={{background:"rgba(239,68,68,0.25)",border:"1px solid rgba(239,68,68,0.5)",borderRadius:"20px",padding:"3px 12px",fontSize:"12px",fontWeight:"700",color:"#fca5a5"}}>
            {selectedLabels.length} {selectedLabels.length===1?t.areasSelected:t.areasSelectedPlural}
          </div>
        )}
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 20px"}}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <svg viewBox="40 0 175 295" style={{width:"100%",maxWidth:"260px",maxHeight:"400px"}}>
          {zones.map(zone=>(
            <path key={zone.id} d={zone.path}
              fill={selected[zone.id]?"rgba(239,68,68,0.75)":"rgba(255,255,255,0.12)"}
              stroke={selected[zone.id]?"#ef4444":"rgba(255,255,255,0.3)"}
              strokeWidth="1.5" style={{cursor:"pointer",transition:"fill 0.15s"}}
              onClick={()=>toggle(zone.id)} />
          ))}
          <ellipse cx="125" cy="30" rx="18" ry="22" fill="none" stroke="rgba(125,211,252,0.2)" strokeWidth="1" strokeDasharray="3,3"/>
          <line x1="125" y1="52" x2="125" y2="290" stroke="rgba(125,211,252,0.1)" strokeWidth="1" strokeDasharray="2,4"/>
        </svg>
      </div>
      {selectedLabels.length>0&&(
        <div style={{margin:"0 16px 8px",background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.4)",borderRadius:"12px",padding:"10px 14px"}}>
          <div style={{fontSize:"11px",color:"#fca5a5",fontWeight:"700",marginBottom:"4px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{t.selectedAreas}</div>
          <div style={{fontSize:"13px",color:"white",lineHeight:"1.5"}}>{selectedLabels.join(" · ")}</div>
        </div>
      )}
      <div style={{padding:"10px 16px 18px"}}>
        <button style={{...S.btn,opacity:selectedLabels.length===0?0.4:1,cursor:selectedLabels.length===0?"not-allowed":"pointer"}}
          onClick={()=>selectedLabels.length>0&&onConfirm(selectedLabels)} disabled={selectedLabels.length===0}>
          {t.confirmSelection}
        </button>
        <div style={{textAlign:"center",fontSize:"11px",color:"rgba(255,255,255,0.3)",marginTop:"7px"}}>{t.tapHint}</div>
      </div>
    </div>
  );
}

// ─── Widgets ──────────────────────────────────────────────────────────────────
function YesNoWidget({ t, onAnswer }) {
  return (
    <div style={{display:"flex",gap:"10px",marginTop:"6px",alignSelf:"flex-start",flexWrap:"wrap"}}>
      {[t.yes, t.no, "?"].map(opt=>(
        <button key={opt} onClick={()=>onAnswer(opt)} style={{
          padding:"10px 20px", borderRadius:"20px", border:"2px solid",
          borderColor:opt===t.yes?"#2e7fc1":opt===t.no?"#6b7280":"#9ca3af",
          background:opt===t.yes?"rgba(46,127,193,0.1)":"white",
          color:opt===t.yes?"#1a4a7a":"#374151",
          fontWeight:"700", fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
        }}>{opt==="?"?"🤔":opt}</button>
      ))}
    </div>
  );
}

function PainScaleWidget({ t, onAnswer }) {
  const [val, setVal] = useState(null);
  const emojis = ["😊","😊","😐","😐","😟","😟","😣","😣","😱","😱","😱"];
  const colors = ["#22c55e","#22c55e","#86efac","#86efac","#fbbf24","#fbbf24","#f97316","#f97316","#ef4444","#ef4444","#991b1b"];
  const labels = [t.noPain,t.noPain,t.mild,t.mild,t.moderate,t.moderate,t.severe,t.severe,t.verySevere,t.verySevere,t.verySevere];
  return (
    <div style={{background:"white",borderRadius:"16px",padding:"14px 16px",marginTop:"6px",alignSelf:"flex-start",maxWidth:"100%",boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
      <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"10px",fontWeight:"600"}}>{t.tapPainLevel}</div>
      <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
        {[0,1,2,3,4,5,6,7,8,9,10].map(n=>(
          <button key={n} onClick={()=>setVal(n)} style={{
            width:"34px",height:"34px",borderRadius:"50%",border:"2px solid",
            borderColor:val===n?colors[n]:"#e5e7eb",
            background:val===n?colors[n]:"white",
            color:val===n?"white":"#374151",
            fontWeight:"800",fontSize:"13px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s",
          }}>{n}</button>
        ))}
      </div>
      {val!==null&&(
        <div style={{marginTop:"10px",display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"22px"}}>{emojis[val]}</span>
          <span style={{fontSize:"13px",color:"#374151",fontWeight:"600"}}>{labels[val]}</span>
          <button onClick={()=>onAnswer(`${val}/10`)} style={{marginLeft:"auto",padding:"8px 16px",background:"linear-gradient(135deg,#1a4a7a,#2e7fc1)",color:"white",border:"none",borderRadius:"10px",fontWeight:"700",fontSize:"13px",cursor:"pointer"}}>{t.confirm}</button>
        </div>
      )}
    </div>
  );
}

function DurationWidget({ t, onAnswer }) {
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState(t.days);
  const units = [t.hours, t.days, t.weeks, t.months];
  return (
    <div style={{background:"white",borderRadius:"16px",padding:"14px 16px",marginTop:"6px",alignSelf:"flex-start",boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
      <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"10px",fontWeight:"600"}}>{t.howLong}</div>
      <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"10px",flexWrap:"wrap"}}>
        <input type="number" min="1" max="365" value={amount} onChange={e=>setAmount(e.target.value)}
          style={{width:"65px",padding:"8px",border:"1.5px solid #e5e7eb",borderRadius:"8px",fontSize:"16px",fontWeight:"700",textAlign:"center",fontFamily:"'DM Sans',sans-serif",outline:"none"}} />
        <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
          {units.map(u=>(
            <button key={u} onClick={()=>setUnit(u)} style={{
              padding:"8px 11px",borderRadius:"8px",border:"1.5px solid",
              borderColor:unit===u?"#2e7fc1":"#e5e7eb",
              background:unit===u?"rgba(46,127,193,0.1)":"white",
              color:unit===u?"#1a4a7a":"#6b7280",
              fontWeight:"600",fontSize:"12px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",
            }}>{u}</button>
          ))}
        </div>
      </div>
      <button onClick={()=>onAnswer(`${amount} ${unit}`)} style={{width:"100%",padding:"10px",background:"linear-gradient(135deg,#1a4a7a,#2e7fc1)",color:"white",border:"none",borderRadius:"10px",fontWeight:"700",fontSize:"14px",cursor:"pointer"}}>{t.confirm}</button>
    </div>
  );
}

function TemperatureWidget({ t, onAnswer }) {
  const [temp, setTemp] = useState("37.0");
  const val = parseFloat(temp);
  const getStatus = v => v<36?{label:t.hypothermia,color:"#3b82f6"}:v<37.5?{label:t.normal,color:"#22c55e"}:v<38.5?{label:t.lowGradeFever,color:"#fbbf24"}:v<39.5?{label:t.fever,color:"#f97316"}:{label:t.highFever,color:"#ef4444"};
  const status = getStatus(val);
  return (
    <div style={{background:"white",borderRadius:"16px",padding:"14px 16px",marginTop:"6px",alignSelf:"flex-start",boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
      <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"10px",fontWeight:"600"}}>{t.enterTemp}</div>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
        <input type="number" step="0.1" min="34" max="43" value={temp} onChange={e=>setTemp(e.target.value)}
          style={{width:"88px",padding:"10px",border:"2px solid",borderColor:status.color,borderRadius:"10px",fontSize:"22px",fontWeight:"800",textAlign:"center",fontFamily:"'DM Sans',sans-serif",outline:"none",color:"#111827"}} />
        <div>
          <div style={{fontSize:"15px",fontWeight:"700",color:status.color}}>🌡️ {status.label}</div>
          <div style={{fontSize:"11px",color:"#9ca3af"}}>{t.normalRange}</div>
        </div>
      </div>
      <button onClick={()=>onAnswer(`${temp}°C (${status.label})`)} style={{width:"100%",padding:"10px",background:"linear-gradient(135deg,#1a4a7a,#2e7fc1)",color:"white",border:"none",borderRadius:"10px",fontWeight:"700",fontSize:"14px",cursor:"pointer"}}>{t.confirm}</button>
    </div>
  );
}

function HeartRateWidget({ t, onAnswer }) {
  const [hr, setHr] = useState("75");
  const val = parseInt(hr);
  const getStatus = v => v<50?{label:t.bradycardia,color:"#3b82f6"}:v<60?{label:t.lowNormal,color:"#86efac"}:v<=100?{label:t.normal,color:"#22c55e"}:v<=120?{label:t.elevated,color:"#fbbf24"}:{label:t.tachycardia,color:"#ef4444"};
  const status = getStatus(val);
  return (
    <div style={{background:"white",borderRadius:"16px",padding:"14px 16px",marginTop:"6px",alignSelf:"flex-start",boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
      <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"10px",fontWeight:"600"}}>{t.enterHR}</div>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
        <input type="number" min="20" max="250" value={hr} onChange={e=>setHr(e.target.value)}
          style={{width:"88px",padding:"10px",border:"2px solid",borderColor:status.color,borderRadius:"10px",fontSize:"22px",fontWeight:"800",textAlign:"center",fontFamily:"'DM Sans',sans-serif",outline:"none",color:"#111827"}} />
        <div>
          <div style={{fontSize:"15px",fontWeight:"700",color:status.color}}>❤️ {status.label}</div>
          <div style={{fontSize:"11px",color:"#9ca3af"}}>{t.normalHR}</div>
        </div>
      </div>
      <button onClick={()=>onAnswer(`${hr} bpm (${status.label})`)} style={{width:"100%",padding:"10px",background:"linear-gradient(135deg,#1a4a7a,#2e7fc1)",color:"white",border:"none",borderRadius:"10px",fontWeight:"700",fontSize:"14px",cursor:"pointer"}}>{t.confirm}</button>
    </div>
  );
}

function ChoiceWidget({ t, options, onAnswer }) {
  const [picked, setPicked] = useState([]);
  function toggle(opt) { setPicked(prev=>prev.includes(opt)?prev.filter(o=>o!==opt):[...prev,opt]); }
  function confirm() { if (picked.length===0) return; onAnswer(picked.join(", ")); }
  return (
    <div style={{marginTop:"6px",alignSelf:"flex-start",maxWidth:"92%"}}>
      <div style={{fontSize:"11px",color:"#6b7280",marginBottom:"8px",fontWeight:"600",fontFamily:"'DM Sans',sans-serif"}}>{t.selectAllApply}</div>
      <div style={{display:"flex",flexDirection:"column",gap:"7px",marginBottom:"10px"}}>
        {options.map(opt=>{
          const active=picked.includes(opt);
          return (
            <button key={opt} onClick={()=>toggle(opt)} style={{
              padding:"11px 16px",borderRadius:"12px",
              border:active?"2px solid #2e7fc1":"1.5px solid #e5e7eb",
              background:active?"rgba(46,127,193,0.1)":"white",
              color:active?"#1a4a7a":"#1a1a2e",
              fontWeight:active?"700":"600",fontSize:"14px",cursor:"pointer",
              textAlign:"left",fontFamily:"'DM Sans',sans-serif",
              boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
              display:"flex",alignItems:"center",gap:"10px",transition:"all 0.15s",
            }}>
              <span style={{width:"18px",height:"18px",borderRadius:"5px",flexShrink:0,border:active?"2px solid #2e7fc1":"2px solid #d1d5db",background:active?"#2e7fc1":"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"white",fontWeight:"800"}}>
                {active?"✓":""}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      <button onClick={confirm} disabled={picked.length===0} style={{
        width:"100%",padding:"11px",borderRadius:"12px",border:"none",
        background:picked.length===0?"#e5e7eb":"linear-gradient(135deg,#1a4a7a,#2e7fc1)",
        color:picked.length===0?"#9ca3af":"white",
        fontWeight:"700",fontSize:"14px",cursor:picked.length===0?"not-allowed":"pointer",
        fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",
      }}>
        {picked.length===0?t.selectAtLeastOne:`${t.confirmCount} (${picked.length} ${t.selected})`}
      </button>
    </div>
  );
}

// ─── Screen 6: Chat ───────────────────────────────────────────────────────────

// ─── Feedback Screen ──────────────────────────────────────────────────────────

// ─── Anything Else Widget ─────────────────────────────────────────────────────
function AnythingElseWidget({ t, onYes, onNo }) {
  return (
    <div style={{display:"flex", gap:"10px", marginTop:"8px", alignSelf:"flex-start"}}>
      <button onClick={onYes} style={{
        padding:"11px 20px", borderRadius:"20px", border:"2px solid #2e7fc1",
        background:"rgba(46,127,193,0.1)", color:"#1a4a7a",
        fontWeight:"700", fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
      }}>{t.feedbackYes}</button>
      <button onClick={onNo} style={{
        padding:"11px 20px", borderRadius:"20px", border:"2px solid #6b7280",
        background:"white", color:"#374151",
        fontWeight:"700", fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
      }}>{t.feedbackNo}</button>
    </div>
  );
}

function FeedbackScreen({ t, lang, onNewConsultation }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
          email: email.trim(),
          language: lang,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch(e) {
      // Fail silently — don't block user from seeing thank you
      console.error("Feedback save failed:", e);
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div style={{...S.page, justifyContent:"center", textAlign:"center"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap'); *{box-sizing:border-box}`}</style>
        <div style={{fontSize:"64px", marginBottom:"16px"}}>🌿</div>
        <div style={{fontSize:"26px", fontWeight:"800", color:"#7dd3fc", marginBottom:"12px"}}>{t.thankYouTitle}</div>
        <div style={{fontSize:"15px", color:"rgba(255,255,255,0.7)", marginBottom:"36px", lineHeight:"1.6", maxWidth:"280px"}}>{t.thankYouText}</div>
        <button style={S.btn} onClick={onNewConsultation}>{t.newConsultation}</button>
      </div>
    );
  }

  return (
    <div style={{...S.page, justifyContent:"flex-start", paddingTop:"40px", overflowY:"auto"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap'); *{box-sizing:border-box} textarea:focus,input:focus{outline:none;border-color:#7dd3fc!important}`}</style>
      <div style={{fontSize:"32px", marginBottom:"12px"}}>🌿</div>
      <div style={{fontSize:"22px", fontWeight:"800", color:"#7dd3fc", marginBottom:"8px", textAlign:"center"}}>{t.feedbackTitle}</div>
      <div style={{fontSize:"13px", color:"rgba(255,255,255,0.6)", marginBottom:"28px", textAlign:"center", lineHeight:"1.5"}}>{t.feedbackSubtitle}</div>

      {/* Star rating */}
      <div style={{width:"100%", marginBottom:"24px"}}>
        <div style={{fontSize:"12px", fontWeight:"700", color:"rgba(255,255,255,0.6)", marginBottom:"12px", letterSpacing:"0.8px", textTransform:"uppercase"}}>{t.rateExperience}</div>
        <div style={{display:"flex", gap:"6px", justifyContent:"center"}}>
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <button key={n} onClick={()=>setRating(n)}
              onMouseEnter={()=>setHover(n)} onMouseLeave={()=>setHover(0)}
              style={{
                width:"42px", height:"42px", borderRadius:"10px", border:"none", cursor:"pointer",
                background: n <= (hover||rating) ? "linear-gradient(135deg,#1a4a7a,#2e7fc1)" : "rgba(255,255,255,0.1)",
                color: n <= (hover||rating) ? "white" : "rgba(255,255,255,0.5)",
                fontWeight:"800", fontSize:"15px", fontFamily:"'DM Sans',sans-serif",
                transition:"all 0.15s",
              }}>{n}</button>
          ))}
        </div>
        {rating > 0 && (
          <div style={{textAlign:"center", marginTop:"10px", fontSize:"13px", color:"#7dd3fc", fontWeight:"600"}}>
            {rating <= 3 ? "😕" : rating <= 6 ? "😐" : rating <= 8 ? "😊" : "🤩"} {rating}/10
          </div>
        )}
      </div>

      {/* Comment */}
      <div style={{width:"100%", marginBottom:"16px"}}>
        <label style={S.label}>{t.commentsLabel}</label>
        <textarea value={comment} onChange={e=>setComment(e.target.value)}
          placeholder={t.commentsPlaceholder} rows={3}
          style={{...S.input, resize:"none", marginBottom:0, fontFamily:"'DM Sans',sans-serif", lineHeight:"1.5"}} />
      </div>

      {/* Email */}
      <div style={{width:"100%", marginBottom:"28px"}}>
        <label style={S.label}>{t.emailLabel}</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          style={{...S.input, marginBottom:0}} />
      </div>

      <button onClick={handleSubmit} disabled={rating===0||submitting} style={{
        ...S.btn,
        opacity: rating===0 ? 0.4 : 1,
        cursor: rating===0 ? "not-allowed" : "pointer",
      }}>
        {submitting ? "..." : t.submitFeedback}
      </button>
    </div>
  );
}

function Chat({ lang, demographics, locations }) {
  const t = T[lang];
  const langObj = LANGUAGES.find(l=>l.code===lang);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeWidget, setActiveWidget] = useState(null);
  const [consultationDone, setConsultationDone] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const bottomRef = useRef(null);

  const demoStr = `${t.age}: ${demographics.age}, ${t.biologicalSex}: ${demographics.sex}, ${t.ethnicity}: ${demographics.ethnicity}`;
  const locStr = locations.join(", ");
  // Build compact system prompt - only active language data, nothing else
  const sysPrompt = `You are SAGE (Symptom Assessment & Guidance Engine), a friendly AI medical assistant. Respond ENTIRELY in ${langObj.name} only.

RULES:
1. Ask ONE question at a time.
2. Patient already passed emergency triage - do NOT recheck for life threats.
3. Patient indicated symptom location(s): ${locStr}. Use this as starting point.
4. Progress: location follow-up → character → history → medications → exam → investigations → differential.
5. Use widget tags at END of message when appropriate:
   [WIDGET:yesno] | [WIDGET:pain_scale] | [WIDGET:duration] | [WIDGET:temperature] | [WIDGET:heart_rate] | [WIDGET:choice:Opt1|Opt2|Opt3|Opt4]
6. Prefer widgets over asking patient to type.
7. Be warm, empathetic, clear.
8. When ready, give structured assessment: likely diagnosis, urgency (ROUTINE/SOON/URGENT/EMERGENCY), red flags, specialist, investigations.
9. Never diagnose definitively. Use tentative language.
10. If new emergency red flags emerge, advise emergency services immediately.

Patient: ${demoStr}
Symptom location(s): ${locStr}`;

  // Compress old history into a summary prefix to avoid repetition while keeping request small
  function buildMessages(hist) {
    if (hist.length <= 8) return hist;
    // Keep first message (system init) + summarise middle + keep last 6
    const first = hist[0];
    const middle = hist.slice(1, hist.length - 6);
    const recent = hist.slice(-6);
    // Build a compact summary of the middle conversation
    const summary = middle.map(m => {
      const role = m.role === "user" ? "Patient" : "SAGE";
      const text = typeof m.content === "string" ? m.content : "";
      return `${role}: ${text.slice(0, 120)}`;
    }).join(" | ");
    const summaryMsg = {
      role: "user",
      content: `[Earlier in this consultation: ${summary}]`
    };
    const summaryReply = {
      role: "assistant",
      content: "Understood, I have reviewed the earlier conversation and will not repeat questions already asked."
    };
    return [first, summaryMsg, summaryReply, ...recent];
  }

  // Queue state: when non-null, useEffect fires the API call (works on iOS - same as mount)
  const [apiQueue, setApiQueue] = useState(null);

  // Initial greeting - fires from mount via useEffect, which iOS allows
  useEffect(()=>{
    const initMsg = {role:"user", content:`[System: Patient passed emergency triage. Demographics: ${demoStr}. Symptom location(s): ${locStr}. Greet warmly in ${langObj.name}, acknowledge location(s), ask about the nature of the symptom. Use a widget if appropriate.]`};
    setApiQueue({ hist: [initMsg], isInit: true });
  },[]);

  // All API calls go through here - triggered by state change, not user gesture
  useEffect(()=>{
    if (!apiQueue) return;
    const { hist, isInit, retries = 0 } = apiQueue;
    setApiQueue(null);
    setTyping(true);
    // 25 second timeout — fail fast rather than hanging on iOS
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    fetch(ANTHROPIC_API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 800,
        system: sysPrompt,
        messages: buildMessages(hist)
      })
    })
    .then(async r => {
      clearTimeout(timeoutId);
      if (r.status === 401 || r.status === 403) throw new Error("Not authorised — please log in to claude.ai");
      // Read the complete response body
      const txt = await r.text();
      if (!txt || txt.trim() === "") {
        // Auto-retry up to 3 times on empty response — common iOS Safari behaviour
        if (retries < 3) {
          setTyping(false);
          setTimeout(() => setApiQueue({ hist, isInit, retries: retries + 1 }), 1500);
          return;
        }
        throw new Error("Empty response after retries — please try again.");
      }
      // The response may be plain text streaming or JSON — handle both
      let raw = "";
      try {
        const data = JSON.parse(txt);
        if (data.error) throw new Error("API error: " + (data.error.message || JSON.stringify(data.error).slice(0,80)));
        raw = data.content?.find(b=>b.type==="text")?.text || data.content?.[0]?.text || "";
      } catch(e) {
        // JSON parse failed - extract text content from partial/truncated response
        const marker = '"text":"';
        const start = txt.indexOf(marker);
        if (start !== -1) {
          const valueStart = start + marker.length;
          // Find end of text value - stop at unescaped quote
          let end = valueStart;
          while (end < txt.length) {
            if (txt[end] === '"' && txt[end-1] !== '\\') break;
            end++;
          }
          raw = txt.slice(valueStart, end)
            .replace(/\\n/g, "\n")
            .replace(/\\t/g, "\t")
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, "\\");
          // Strip any trailing JSON metadata that leaked in - check all known markers
          const metaMarkers = ['"}]', '"stop_reason"', '"stop_sequence"', '"usage":', '"input_tokens"', '"model":"claude', '"id":"msg_'];
          for (const marker of metaMarkers) {
            const mIdx = raw.indexOf(marker);
            if (mIdx !== -1) { raw = raw.slice(0, mIdx); break; }
          }
        } else if (txt.length > 20 && !txt.startsWith("{") && !txt.startsWith("<")) {
          raw = txt;
        } else {
          // Can't extract text - treat as empty response to trigger auto-retry
          if (retries < 3) {
            setTyping(false);
            setTimeout(() => setApiQueue({ hist, isInit, retries: retries + 1 }), 1500);
            return;
          }
          throw new Error("Could not parse response after retries — please try again.");
        }
      }
      if (!raw) throw new Error("No content extracted from response");
      const {cleanText, widget} = parseWidget(raw);
      const displayText = renderText(cleanText);
      setHistory([...hist, {role:"assistant", content:raw}]);
      if (isInit) setMessages([{role:"sic", text:displayText, widget}]);
      else setMessages(p=>[...p, {role:"sic", text:displayText, widget}]);
      setActiveWidget(widget);
      setTyping(false);
      // Detect consultation complete - look for urgency assessment keywords
      if (!isInit && !consultationDone) {
        const upper = raw.toUpperCase();
        if (upper.includes("ROUTINE") || upper.includes("SOON") || upper.includes("URGENT") || upper.includes("EMERGENCY")) {
          setConsultationDone(true);
          // After a short delay, add the "anything else?" prompt
          setTimeout(() => {
            setMessages(p => [...p, {
              role: "sic",
              text: t.anythingElse,
              widget: { type: "anythingelse" }
            }]);
          }, 1000);
        }
      }
    })
    .catch(err => {
      clearTimeout(timeoutId);
      const isAbort = err?.name === "AbortError";
      const detail = isAbort ? "Response timed out — please try again." : (err?.message || String(err));
      if (isInit) setMessages([{role:"sic", text:"Hello! I am SAGE. What brings you here today?", widget:null}]);
      else setMessages(p=>[...p, {role:"sic", text:detail, widget:null}]);
      setTyping(false);
    });
  },[apiQueue]);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,typing,activeWidget]);

  function sendText(userInput) {
    if (!userInput.trim() || typing) return;
    setActiveWidget(null);
    setInput("");
    // Truncate very long inputs to keep request body small on iOS
    const safeInput = userInput.slice(0, 500);
    const newHist = [...history, {role:"user", content:safeInput}];
    setHistory(newHist);
    setMessages(p=>[...p, {role:"user", text:safeInput}]);
    // Trigger API via state change → useEffect (iOS-safe, not tied to user gesture)
    setApiQueue({ hist: newHist, isInit: false });
  }

  function handleWidgetAnswer(answer) {
    setActiveWidget(null);
    setMessages(p=>p.map((m,i)=>i===p.length-1?{...m,widget:null}:m));
    sendText(answer);
  }

  if (showFeedback) return <FeedbackScreen t={t} lang={lang} onNewConsultation={()=>window.location.reload()} />;

  return (
    <div style={S.chatWrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap'); @keyframes bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}} textarea:focus{border-color:#2e7fc1!important} ::-webkit-scrollbar{width:0}`}</style>
      <div style={S.chatHeader}>
        <div style={S.smallAvatar}><img src={SAGE_AVATAR} alt="SAGE" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
        <div>
          <div style={S.hName}>SAGE <span style={{fontSize:"11px",opacity:0.7}}>{langObj.flag}</span></div>
          <div style={S.hSub}>{t.sicSubtitle}</div>
        </div>
      </div>
      <div style={S.msgs}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column"}}>
            <div style={m.role==="sic"?S.bubbleSAGE:S.bubbleUser}>{m.text}</div>
            {m.role==="sic"&&m.widget&&i===messages.length-1&&(
              m.widget.type==="yesno"?<YesNoWidget t={t} onAnswer={handleWidgetAnswer}/>:
              m.widget.type==="pain_scale"?<PainScaleWidget t={t} onAnswer={handleWidgetAnswer}/>:
              m.widget.type==="duration"?<DurationWidget t={t} onAnswer={handleWidgetAnswer}/>:
              m.widget.type==="temperature"?<TemperatureWidget t={t} onAnswer={handleWidgetAnswer}/>:
              m.widget.type==="heart_rate"?<HeartRateWidget t={t} onAnswer={handleWidgetAnswer}/>:
              m.widget.type==="choice"?<ChoiceWidget t={t} options={m.widget.options} onAnswer={handleWidgetAnswer}/>:
              m.widget.type==="anythingelse"?<AnythingElseWidget t={t} onYes={()=>{
                setMessages(p=>p.map((msg,i)=>i===p.length-1?{...msg,widget:null}:msg));
                sendText(t.feedbackYes);
              }} onNo={()=>{
                setMessages(p=>p.map((msg,i)=>i===p.length-1?{...msg,widget:null}:msg));
                setShowFeedback(true);
              }}/>:
              null
            )}
          </div>
        ))}
        {typing&&<TypingDots/>}
        <div ref={bottomRef}/>
      </div>
      <div style={S.disclaim}>{t.disclaimer}</div>
      <div style={S.inputRow}>
        <textarea style={S.textarea} value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendText(input);}}}
          placeholder={t.typeAnswer} rows={1}/>
        <button style={S.sendBtn} onClick={()=>sendText(input)}>➤</button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function SAGE() {
  const [screen, setScreen] = useState("meet");
  const [lang, setLang] = useState("en");
  const [demo, setDemo] = useState(null);
  const [emergencyTrigger, setEmergencyTrigger] = useState(null);
  const [locations, setLocations] = useState([]);

  if (screen==="meet") return <MeetSAGE onNext={l=>{setLang(l);setScreen("demographics");}}/>;
  if (screen==="demographics") return <Demographics lang={lang} onNext={d=>{setDemo(d);setScreen("triage");}}/>;
  if (screen==="triage") return <Triage lang={lang} onClear={()=>setScreen("body")} onEmergency={id=>{setEmergencyTrigger(id);setScreen("emergency");}}/>;
  if (screen==="emergency") return <Emergency lang={lang} triggeredBy={emergencyTrigger} onBack={()=>setScreen("triage")}/>;
  if (screen==="body") return <BodyDiagram lang={lang} onConfirm={locs=>{setLocations(locs);setScreen("chat");}}/>;
  if (screen==="chat"&&demo) return <Chat lang={lang} demographics={demo} locations={locations}/>;
  return null;
}
