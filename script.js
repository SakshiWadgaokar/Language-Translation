let translatedText = ""; // Global variable to hold the translated text

function translateText() {
  const inputText = document.getElementById('inputText').value.trim();

  if (inputText === "") {
    alert("Please enter some text to translate.");
    return;
  }

  const sourceLang = 'en';  // Source language (English)
  
  // Get the selected target language from the dropdown
  const targetLang = document.getElementById('targetLang').value;  

  // Create the URL for MyMemory API
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLang}|${targetLang}`;

  // Send the translation request to the MyMemory API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Show translated text in the output div
      translatedText = data.responseData.translatedText; // Save translated text for speaking
      document.getElementById('outputText').textContent = translatedText;
    })
    .catch(error => {
      // Handle errors
      document.getElementById('outputText').textContent = 'Error: ' + error.message;
    });
}

// Function to speak the translated text
function speakText() {
  if (translatedText === "") {
    alert("No translation to speak. Please translate some text first.");
    return;
  }

  // Create a SpeechSynthesisUtterance instance
  const utterance = new SpeechSynthesisUtterance(translatedText);
  
  // Set language (you can adjust this based on the selected language)
  const targetLang = document.getElementById('targetLang').value;
  if (targetLang === "hi") {
    utterance.lang = "hi-IN";  // Hindi
  } else if (targetLang === "es") {
    utterance.lang = "es-ES";  // Spanish
  } else if (targetLang === "fr") {
    utterance.lang = "fr-FR";  // French
  } else if (targetLang === "de") {
    utterance.lang = "de-DE";  // German
  } else if (targetLang === "it") {
    utterance.lang = "it-IT";  // Italian
  } else if (targetLang === "ja") {
    utterance.lang = "ja-JP";  // Japanese
  } else if (targetLang === "zh") {
    utterance.lang = "zh-CN";  // Chinese
  }

  // Speak the translated text
  speechSynthesis.speak(utterance);
}
