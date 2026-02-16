console.log('script loaded v2');

const password = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const form = document.getElementById("form");
const uppercaseBox = document.getElementById("uppercase");
const lowercaseBox = document.getElementById("lowercase");
const numbersBox = document.getElementById("numbers");
const symbolsBox = document.getElementById("symbols");
const slider = document.getElementById("slider");
const characterLengthText = document.getElementById("character-length");
const strengthLevel = document.getElementById("strength-level");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
const bar4 = document.getElementById("bar4");
const copyBtn = document.getElementById("copy-button");
const copyTxt = document.getElementById("copy-status");

let characterLength = characterLengthText.textContent;
let passwordStrength = 0;

const alphabetLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\', ';', ':', "'", '"', ',', '.', '<', '>', '/', '?', '`', '~', '£', '€'];
let characterRange = [...alphabetLower, ...alphabetUpper, ...numbers, ...symbols];



copyTxt.style.display = "none";

function randomCharacter() {
    let num = Math.floor(Math.random() * characterRange.length);
    return characterRange[num];
};

function generatePassword() {
    password.classList.remove("placeholder");
    copyTxt.style.display = "none";
    // console.log("generate password function begun. charlength = " + characterLength + typeof characterLength);
    if (characterRange.length === 0) {
        // console.log("DOH!");
        return "Check a checkbox";
    }
    else {
        let newPassword = [];
        for (let i = 0; i < characterLength; i += 1) {
            // console.log(i);
            newPassword.push(randomCharacter());
        }
        getPasswordStrength();
        return newPassword.join("");
    }
}

function determineCharacterRange() {
    characterRange = [];
    if (uppercaseBox.checked) { characterRange.push(...alphabetUpper) };
    if (lowercaseBox.checked) { characterRange.push(...alphabetLower) };
    if (numbersBox.checked) { characterRange.push(...numbers) };
    if (symbolsBox.checked) { characterRange.push(...symbols) };
    if (characterRange.length === 0) {
        characterRange = [...alphabetLower, ...alphabetUpper, ...numbers, ...symbols];
    };
}

function getPasswordStrength() {
    passwordStrength = 0;
    // console.log(
    //     !uppercaseBox.checked + !lowercaseBox.checked + !numbersBox.checked + !symbolsBox.checked
    // );
    // console.log(
    //     !uppercaseBox.checked);

    if (!uppercaseBox.checked && !lowercaseBox.checked && !numbersBox.checked && !symbolsBox.checked) {
        passwordStrength = 40;
    } else {
        if (uppercaseBox.checked) { passwordStrength += 10 };
        if (lowercaseBox.checked) { passwordStrength += 10 };
        if (numbersBox.checked) { passwordStrength += 10 };
        if (symbolsBox.checked) { passwordStrength += 10 };
    }
    passwordStrength = passwordStrength * (characterLength/6);
    console.log("StrengthLevel: " + passwordStrength);
    indicatePasswordStrength();
};

function indicatePasswordStrength() {

    bar1.classList.remove("red", "orange", "yellow", "green", "black");
    bar2.classList.remove("red", "orange", "yellow", "green", "black");
    bar3.classList.remove("red", "orange", "yellow", "green", "black");
    bar4.classList.remove("red", "orange", "yellow", "green", "black");

    if (passwordStrength >= 80) {
        strengthLevel.textContent = "Strong";
        bar1.classList.add("green");
        bar2.classList.add("green");
        bar3.classList.add("green");
        bar4.classList.add("green");
    } else if (passwordStrength >= 60) {
        strengthLevel.textContent = "Medium";
        bar1.classList.add("yellow");
        bar1.classList.add("yellow");
        bar2.classList.add("yellow");
        bar3.classList.add("yellow");

    } else if (passwordStrength >= 40) {
        strengthLevel.textContent = "Weak";
        bar1.classList.add("orange");
        bar2.classList.add("orange");

    }
    else if (passwordStrength >= 20) {
        strengthLevel.textContent = "Awful";
        bar1.classList.add("red");

    } else {
        strengthLevel.textContent = "Suicidal";

    }

};


form.addEventListener("submit", (event) => {
    event.preventDefault();
    determineCharacterRange();
    password.textContent = generatePassword();
    // password.textContent = Math.floor(Math.random()*alphabetLower.length);
}
)

updateSlider();

slider.addEventListener('input', (event) => {
    characterLengthText.textContent = event.target.value;
    characterLength = event.target.value;
    updateSlider();
}
)

// #a3ffae

function updateSlider() {
  const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, #a3ffae 0%, #a3ffae ${value}%, #191820 ${value}%, #191820 100%)`;
}

copyBtn.addEventListener("click", (event) => {
    console.log("copy btn clicked");
    copyTxt.style.display = "inline";
    navigator.clipboard.writeText(password.textContent);
}
)