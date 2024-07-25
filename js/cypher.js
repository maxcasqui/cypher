const btn_encrypt = document.getElementById("btn-encrypt");
const btn_decrypt = document.getElementById("btn-decrypt");
const result_panel = document.querySelector(".output-container");
const raw_text = document.getElementById("input-text");

const vowels = Object.freeze({
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
});

showMessage();
btn_encrypt.addEventListener("click", encryptPhrase);
btn_decrypt.addEventListener("click", decryptPhrase);

function encryptPhrase() {
    const rawText = raw_text.value.toLowerCase();
    if (rawText.includes(" ")) {
        const words = rawText.split(" ");
        const encryptedWords = words.map(word => encryptWord(word));
        showMessage(encryptedWords.join(" "));
    } else {
        showMessage(encryptWord(rawText));
    }
}

function decryptPhrase() {
    const rawText = raw_text.value.toLowerCase();
    if (rawText.includes(" ")) {
        const words = rawText.split(" ");
        const decryptedWords = words.map(word => decryptWord(word));
        showMessage(decryptedWords.join(" "));
    } else {
        showMessage(decryptWord(rawText))
    }
}

function encryptWord(word) {
    if (word.length === 0) return '';

    const firstChar = word[0];
    const rest = word.slice(1);

    if (vowels[firstChar]) {
        return vowels[firstChar] + encryptWord(rest);
    }
    return firstChar + encryptWord(rest);
}

function decryptWord(word){
    const reverseVowels = Object.fromEntries(Object.entries(vowels).map(([k, v]) => [v, k]));
    let decryptedWord = word;

    for (const [encoded, vowel] of Object.entries(reverseVowels)) {
        decryptedWord = decryptedWord.replaceAll(encoded, vowel);
    }
    return decryptedWord;
}

function showMessage(message = "") {
    let html_result_panel;
    if (message) {
        html_result_panel = `
            <p class="output">${message}</p>
            <button type="button" class="output" onclick="copyMessage()">&#128203;</button>
        `;
    }
    if (!message) {
        html_result_panel = `
            <img src="img/imagefortext.svg" alt="">
            <h3 class="title-text">Ningún mensaje fue encontrado</h3>
            <h3 class="info-text">Ingresa el texto que deseas encriptar o desencriptar.</h3>
        `;
    }
    result_panel.innerHTML = html_result_panel;
}

function copyMessage() {
    const text = document.querySelector(".output").innerHTML;

    navigator.clipboard.writeText(text);
}