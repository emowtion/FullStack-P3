///////////////////////general variables

let nameInput = document.getElementById('name');
nameInput.focus();

let jobRole = document.getElementById('title');
let otherJob = document.getElementById('other-job-role');
let design = document.getElementById('design');
let color = document.getElementById('color');
let optionColor = color.children;
let total = document.getElementById('activities-cost');
let totalCost = 0;
let payment = document.getElementById('payment');
let creditCard = document.getElementById('credit-card');
let payPal = document.getElementById('paypal');
let bitcoin = document.getElementById('bitcoin');
let email = document.getElementById('email');
let cardNumber = document.getElementById('cc-num');
let zipCode = document.getElementById('zip');
let cvv = document.getElementById('cvv');
let form = document.querySelector('form');
let activities = document.getElementById('activities-box')
////////////// hide the job role text field
otherJob.style.display = 'none';

jobRole.addEventListener('change', function (e) {
    if (e.target.value !== 'other') {
        otherJob.style.display = 'none';
    } else {
        otherJob.style.display = 'block';
    }
})

///////////////// tee-shirt section
color.disabled = true;

design.addEventListener('change', function (e) {
    color.disabled = false;
    for (let i = 0; i < optionColor.length; i++) {
        let value = e.target.value;
        let data = optionColor[i].getAttribute('data-theme');
        if (value === data) {
            optionColor[i].hidden = false;
            optionColor[i].selected = true;
        } else {
            optionColor[i].hidden = true;
            optionColor[i].selected = false;
        }
    }
})

////////////////// Event listener for Register for Activities section
activities.addEventListener('change', function (e) {
    let dataCost = +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        totalCost += dataCost;
        total.innerHTML = totalCost;
    } else {
        totalCost -= dataCost;
    }
    total.innerHTML = `Total: $${totalCost}`;
})

/////////////// payment section

payPal.style.display = 'none';
bitcoin.style.display = 'none';
payment[1].setAttribute('selected', ''); // always show credit card 

// Event listener for choosing between diffrent payment methods 
payment.addEventListener('change', function (e) {
    creditCard.style.display = 'none';
    payPal.style.display = 'none';
    bitcoin.style.display = 'none';
    if (e.target.value === 'credit-card') {
        creditCard.style.display = 'block';
    } else if (e.target.value === 'paypal') {
        payPal.style.display = 'block';
    } else {
        bitcoin.style.display = 'block';
    }
})

///////////////// form validation

/* helper functions*/

function isValid(element) {
    let parentOfElement = element.parentElement;
    parentOfElement.classList.add('valid');
    parentOfElement.classList.remove('not-valid');
    parentOfElement.lastElementChild.style.display = 'none';
}

function isNotValid(element) {
    let parentOfElement = element.parentElement;
    parentOfElement.classList.add('not-valid');
    parentOfElement.classList.remove('valid');
    parentOfElement.lastElementChild.style.display = 'block';
}

const nameValidator = () => {
    let nameValue = nameInput.value;
    let nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    return nameIsValid;
}

const emailValidator = () => {
    let emailValue = email.value;
    let emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
}

const languageValidator = () => {
    let languageIsValid = totalCost > 0;
    return languageIsValid;
    
}

const cardValidator = () => {
    let cardValue = cardNumber.value;
    let cardValid = /^\d{13,16}$/.test(cardValue);
    return cardValid;
}

const zipValidator = () => {
    let zipValue = zipCode.value;
    let zipIsValid = /^[0-9][0-9][0-9][0-9][0-9]$/.test(zipValue);
    return zipIsValid;
}

const cvvValidator = () => {
    let cvvValue = cvv.value;
    let cvvIsValid = /^[0-9][0-9][0-9]$/.test(cvvValue);
    return cvvIsValid;
}



form.addEventListener('submit', function (e) {

    if (nameValidator()) {
        isValid(nameInput)
    } else {
        e.preventDefault();
        isNotValid(nameInput);
    }

    if (emailValidator()) {
        isValid(email);
    } else {
        e.preventDefault();
        isNotValid(email);
    }

    if (languageValidator()) {
        isValid(activities);
    } else {
        e.preventDefault();
        isNotValid(activities);
    }

    if (cardValidator()) {
        isValid(cardNumber);
    } else {
        e.preventDefault()
        isNotValid(cardNumber);
    }

    if (zipValidator()) {
        isValid(zipCode);
    } else {
        e.preventDefault();
        isNotValid(zipCode);
    }

    if (cvvValidator()) {
        isValid(cvv);
    } else {
        e.preventDefault();
        isNotValid(cvv);
    }

    // check credit card if selected 

    let pay = false;
    if (payment[1].value === "credit-card") {
        if (cardValidator() && zipValidator() && cvvValidator()) {
            pay = true;
        } else {
            pay = false
        }
    } else {
        pay = true;
    }

    if (!nameValidator() || !emailValidator() || !languageValidator() || !pay) {
         e.preventDefault()
     } //  THIS PIECE OF CODE IS CAUSING THE SUBMIT PROBLEM
     console.log(pay)
})

///// Accessibility 

let inputCheckbox = document.querySelectorAll('input[type="checkbox"]')


inputCheckbox.forEach((element) => {
    element.addEventListener('focus', function () {
        element.parentElement.classList.add('focus')
    });
    element.addEventListener('blur', function () {
        element.parentElement.classList.remove('focus')
    });
})