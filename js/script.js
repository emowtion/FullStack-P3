///////////////////////general variables

let nameInput = document.getElementById('name')
nameInput.focus()

let jobRole = document.getElementById('title')
let otherJob = document.getElementById('other-job-role')
let design = document.getElementById('design')
let color = document.getElementById('color');
let optionColor = color.children
let activities = document.getElementById('activities')
let total = document.getElementById('activities-cost')
let totalCost = 0
let payment = document.getElementById('payment')
let creditCard = document.getElementById('credit-card')
let payPal = document.getElementById('paypal')
let bitcoin = document.getElementById('bitcoin')
let email = document.getElementById('email')
let cardNumber = document.getElementById('cc-num')
let zipCode = document.getElementById('zip')
let cvv = document.getElementById('cvv')
let form = document.querySelector('form')

////////////// hide the job role text field
otherJob.style.display = 'none'

jobRole.addEventListener('change', function (e) {
    if (e.target.value !== 'other') {
        otherJob.style.display = 'none'
    } else {
        otherJob.style.display = 'block'
    }
})

///////////////// tee-shirt section
color.disabled = true

design.addEventListener('change', function (e) {
    color.disabled = false
    for (let i = 0; i < optionColor.length; i++) {
        let value = e.target.value
        let data = optionColor[i].getAttribute('data-theme')
        if (value === data) {
            optionColor[i].hidden = false
            optionColor[i].selected = true
        } else {
            optionColor[i].hidden = true
            optionColor[i].selected = false
        }
    }
})

////////////////// Activities section
activities.addEventListener('change', function (e) {
    let dataCost = +e.target.getAttribute('data-cost')
    if (e.target.checked) {
        totalCost += dataCost
        total.innerHTML = totalCost
    } else {
        totalCost -= dataCost
    }
    total.innerHTML = `Total: $${totalCost}`
})

/////////////// payment section

payPal.style.display = 'none'
bitcoin.style.display = 'none'
let optionPayment = payment.children

for (let i = 0; i < 2; i++) {
    optionPayment[i].setAttribute('selected', '')
}

payment.addEventListener('change', function (e) {
    creditCard.style.display = 'none'
    payPal.style.display = 'none'
    bitcoin.style.display = 'none'
    if (e.target.value === 'credit-card') {
        creditCard.style.display = 'block'
    } else if (e.target.value === 'paypal') {
        payPal.style.display = 'block'
    } else {
        bitcoin.style.display = 'block'
    }
})

///////////////// form validation

/* helper functions*/

const nameValidator = () => {
    let nameValue = nameInput.value
    let nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue)
    return nameIsValid
}

const emailValidator = () => {
    let emailValue = email.value
    let emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)
    return emailIsValid
}

const languageValidator = () => {
    let languageIsValid = totalCost > 0
    return languageIsValid
}

form.addEventListener('submit', function (e) {
    nameValidator()
    emailValidator()
    languageValidator()

    if (!nameValidator()) {
        e.preventDefault()
        nameInput.parentElement.classList.add('not-valid')
        nameInput.parentElement.classList.remove('valid')
        nameInput.parentElement.lastElementChild.style.display = 'block'
    }
    if (!emailValidator()) {
        e.preventDefault()
        email.parentElement.classList.add('not-valid')
        email.parentElement.lastElementChild.style.display = 'block'
    }
    if (!languageValidator()) {

        e.preventDefault()
    } else {
        /*nameInput.parentElement.classList.add('valid')
        nameInput.parentElement.classList.remove('not-valid')
        nameInput.parentElement.lastElementChild.style.display = 'block'*/

    }
})

///// Accessibility 


let inputCheckbox = document.querySelectorAll('input[type="checkbox"]')

inputCheckbox.forEach((element) => {
    element.addEventListener('focus', function () {
        element.parentElement.classList.add('focus')
    })
    element.addEventListener('blur', function () {
        element.parentElement.classList.remove('focus')
    })
})