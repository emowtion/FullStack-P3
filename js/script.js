document.getElementById('name').focus()

////////////// hide the job role text field

let jobRole = document.getElementById('title')
let otherJob = document.getElementById('other-job-role')
otherJob.style.display = 'none'

jobRole.addEventListener('change', function (e) {
    if (e.target.value !== 'other') {
        otherJob.style.display = 'none'
    } else {
        otherJob.style.display = 'block'
    }
})

///////////////// tee-shirt section

let design = document.getElementById('design')
let color = document.getElementById('color');
let optionColor = color.children

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

let activities = document.getElementById('activities')
let total = document.getElementById('activities-cost')
let totalCost = 0

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

let payment = document.getElementById('payment')
let creditCard = document.getElementById('credit-card')
let payPal = document.getElementById('paypal')
let bitcoin = document.getElementById('bitcoin')
payPal.style.display = 'none'
bitcoin.style.display = 'none'

let optionPayment = payment.children

for (let i = 0; i < 2; i++) {
    optionPayment[i].setAttribute('selected', '')
}

payment.addEventListener('change', function (e) {
    if (e.target.value === 'credit-card') {
        creditCard.style.display = 'block'
        payPal.style.display = 'none'
        bitcoin.style.display = 'none'

    } else if (e.target.value === 'paypal') {
        payPal.style.display = 'block'
        creditCard.style.display = 'none'
    } else {
        bitcoin.style.display = 'block'
        payPal.style.display = 'none'
        creditCard.style.display = 'none'
    }
})