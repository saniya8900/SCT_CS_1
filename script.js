let mode = "encrypt";

function caesarCipher(text, shift, decrypt = false) {
  if (decrypt) shift = -shift;
  return text.split('').map(char => {
    if (/[a-zA-Z]/.test(char)) {
      const base = char === char.toUpperCase() ? 65 : 97;
      return String.fromCharCode((char.charCodeAt(0) - base + shift + 26) % 26 + base);
    }
    return char;
  }).join('');
}

function setMode(selected) {
  mode = selected;

  // Switch active buttons
  document.getElementById('encryptBtn').classList.remove('active');
  document.getElementById('decryptBtn').classList.remove('active');
  document.getElementById(`${selected}Btn`).classList.add('active');

  // Clear fields when switching
  document.getElementById("message").value = "";
  document.getElementById("shift").value = "";
  document.getElementById("outputText").innerText = "";
  document.getElementById("resultBox").classList.add("hidden");
}

function processText() {
  const message = document.getElementById("message").value.trim();
  const shiftVal = parseInt(document.getElementById("shift").value);
  const resultBox = document.getElementById("resultBox");
  const outputText = document.getElementById("outputText");

  if (!message || isNaN(shiftVal)) {
    outputText.innerText = "⚠️ Please enter a valid message and shift value.";
    resultBox.classList.remove("hidden");
    return;
  }

  const output = caesarCipher(message, shiftVal, mode === 'decrypt');
  outputText.innerText = output;
  resultBox.classList.remove("hidden");
}

function copyText() {
  const text = document.getElementById("outputText").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Copied to clipboard!");
  });
}
