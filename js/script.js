///////////////////////general variables

let nameInput = document.getElementById('name');
nameInput.focus();

let form = document.querySelector('form');

let jobRole = document.getElementById('title');
let otherJob = document.getElementById('other-job-role');

let design = document.getElementById('design');
let color = document.getElementById('color');
let optionColor = color.children;

let activities = document.getElementById('activities-box')
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

design.addEventListener('change', function (e) { ////// when a change happens on design we enable the color option
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
activities.addEventListener('change', function (e) { /// when there is a "change/check" on activities we add the datacost to the totalcost var, subtract when opposite
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

payPal.style.display = 'none'; // hide paypal and bitcoin by default
bitcoin.style.display = 'none';
payment.children[1].setAttribute('selected', 'true'); // always show credit card 


// Event listener for choosing between diffrent payment methods 
payment.addEventListener('change', function (e) { /////// toggle between payment options if an option is displayed we hide the others

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

function isValid(element) { /// validate the inputs elements
    let parentOfElement = element.parentElement;
    parentOfElement.classList.add('valid');
    parentOfElement.classList.remove('not-valid');
    parentOfElement.lastElementChild.style.display = 'none';
}

function isNotValid(element) { // invalidate the inputs elements
    let parentOfElement = element.parentElement;
    parentOfElement.classList.add('not-valid');
    parentOfElement.classList.remove('valid');
    parentOfElement.lastElementChild.style.display = 'block';
}
/////////////////////
const nameValidator = () => {
    let nameValue = nameInput.value;
    let nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);

    if (nameIsValid) {
        isValid(nameInput);
    } else {
        isNotValid(nameInput);
    }
    return nameIsValid
}
/////////////////////
const emailValidator = () => {
    let emailValue = email.value;
    let emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

    if (emailIsValid) {
        isValid(email);
    } else {
        isNotValid(email);
    }
    return emailIsValid;
}
/////////////////////
const languageValidator = () => {
    let languageIsValid = totalCost > 0;

    if (languageIsValid) {
        isValid(activities);
    } else {
        isNotValid(activities);
    }
    return languageIsValid;
}
/////////////////////
const cardValidator = () => {
    let cardValue = cardNumber.value;
    let cardValid = /^\d{13,16}$/.test(cardValue);

    if (cardValid) {
        isValid(cardNumber);
    } else {
        isNotValid(cardNumber);
    }
    return cardValid;
}
////////////////////////
const zipValidator = () => {
    let zipValue = zipCode.value;
    let zipIsValid = /^[0-9][0-9][0-9][0-9][0-9]$/.test(zipValue);

    if (zipIsValid) {
        isValid(zipCode);
    } else {
        isNotValid(zipCode);
    }
    return zipIsValid;
}
////////////////////////
const cvvValidator = () => {
    let cvvValue = cvv.value;
    let cvvIsValid = /^[0-9][0-9][0-9]$/.test(cvvValue);

    if (cvvIsValid) {
        isValid(cvv);
    } else {
        isNotValid(cvv);
    }
    return cvvIsValid;
}



form.addEventListener('submit', function (e) { ///// call all above functions (if true validate) if not (prevent the browser from reloading)

    if (!nameValidator()) {
        e.preventDefault()
    }
    if (!emailValidator()) {
        e.preventDefault()
    }
    if (!languageValidator()) {
        e.preventDefault()
    }
    if (payment.value === 'credit-card') {
        if (!cardValidator()) {
            e.preventDefault()
        }
        if (!zipValidator()) {
            e.preventDefault()
        }
        if (!cvvValidator()) {
            e.preventDefault()
        }
    }
})

///// Accessibility 

let inputCheckbox = document.querySelectorAll('input[type="checkbox"]')

inputCheckbox.forEach((element) => {
    element.addEventListener('focus', function () {
        element.parentElement.classList.add('focus');
    });
    element.addEventListener('blur', function () {
        element.parentElement.classList.remove('focus');
    });
})