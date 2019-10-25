const currentCourseFee = 8000
const adminFee = 0.05
let salaryAmount = 25000
let rateAmount = 10
let borrowAmount
let adminFeeAmount
let extraFeeAmount
let totalRepay
let monthlyAmount
let durationInMonths

let extraFeeTiers = {
    tier0: {
        thresholdPercent: 0,
        threshold: currentCourseFee * this.thresholdPercent,
        extraFeeAmount: 0
    },
    tier1: {
        thresholdPercent: 0.8,
        threshold: currentCourseFee * this.thresholdPercent,
        extraFeeAmount: 500
    },
    tier2: {
        thresholdPercent: 0.9,
        threshold: currentCourseFee * this.thresholdPercent,
        extraFeeAmount: 1000
    }
]}

let form = document.querySelector('#borrow-repay-form')
let formInputs = document.querySelectorAll('#borrow-repay-form input')

document.querySelector('#borrow-input').placeholder = '£1 - ' + currentCourseFee
document.querySelector('#salary-input').placeholder = '£' + 25000
document.querySelector('#rate-input').placeholder = 10 + '%'
document.querySelector('#salary-input').value = 25000
document.querySelector('#rate-input').value = 10


form.addEventListener('mouseover', function() {
    let errors = document.querySelectorAll('#borrow-repay-form [data-check="invalid"]')
    if (errors.length === 0) {
        borrowAmount = getAmount('#borrow-input')
        console.log(borrowAmount)

        salaryAmount = getAmount('#salary-input')
        console.log(borrowAmount)

        rateAmount = getAmount('#rate-input') * 0.01
        console.log(borrowAmount)

        adminFeeAmount = calculateAdminFee(borrowAmount, adminFee)
        console.log(adminFeeAmount)

        extraFeeAmount = calculateExtraFee(borrowAmount, extraFeeTiers)
        console.log(extraFeeAmount)

        totalRepay = calculateTotalRepay(borrowAmount, adminFee, extraFeeTiers)
        console.log(totalRepay)

        monthlyAmount = calculateMonthlyAmount(borrowAmount, salaryAmount, rateAmount)
        console.log(monthlyAmount)

        durationInMonths = calculateDurationInMonths(totalRepay, monthlyAmount)
        console.log(durationInMonths)
    }
})

formInputs.forEach(function(inputField) {
    inputField.addEventListener('click' , function() {
        validateInput(inputField)
    })
    inputField.addEventListener('input' , function() {
        validateInput(inputField)
    })
    inputField.addEventListener('blur' , function() {
        validateInput(inputField)
    })
    inputField.addEventListener('change' , function() {
        validateInput(inputField)
    })
})

// form.addEventListener('submit', function(e) {
//     let errors = 0
//     formInputs.forEach(function(inputField) {
//         if (inputField.classList === 'false') {
//             errors += 1
//         }
//     })
//     if (errors > 0) {
//         e.preventDefault()
//         console.log('error with form submission, check you have filled the form out correctly')
//     }
// })

let errorMessages = {
    isEmpty: "This must not be empty",
    isInvalid: 'This must be a number',
    borrowInput: 'There is a problem with the amount, it must be between £1 and £' + currentCourseFee + '.',
    rateInput: 'This must be a number between 1 and 100'
}

function validateInput(inputField) {
    if (inputField.value.length === 0) {
        handleErrors(inputField, errorMessages.isEmpty)
    } else if (isNaN(inputField.value)) {
        handleErrors(inputField, errorMessages.isInvalid)
    } else if (inputField.id === 'borrow-input' && inputField.value > currentCourseFee) {
        handleErrors(inputField, errorMessages.borrowInput)
    } else if (inputField.id === 'rate-input' && inputField.value > 100) {
        handleErrors(inputField, errorMessages.rateInput)
    } else {
        inputField.dataset.check = 'valid'
        document.querySelector('#' + inputField.id + '-error').innerHTML = ''
    }
}


function handleErrors(inputField, errorMessage) {
    inputField.dataset.check = 'invalid'
    document.querySelector('#' + inputField.id + '-error').className = 'alert-danger'
    document.querySelector('#' + inputField.id + '-error').innerHTML = errorMessage
}


function getAmount(id) {
    formInputs.forEach(function(input) {
        if (input.id === id && input.id.dataset.check) {
            return input.value
        }
    })
}


function calculateAdminFee(borrowAmount, adminFee) {
    let result = borrowAmount * adminFee
    return result
}


// function calculateExtraFee(borrowAmount, extraFeeTiers) {
//     let result
//     extraFeeTiers.forEach(function (tier) {
//         if (borrowAmount > tier.threshold) {
//             result = tier.extraFeeAmount
//         }
//         return result
//     })
// }

function calculateTotalRepay(borrowAmount, adminFee, tierFee) {
    let adminFeeAmount = borrowAmount * adminFee
    return borrowAmount + adminFeeAmount + tierFee
}


function calculateMonthlyAmount(totalRepayment, salaryAmount, rateAmount) {
    return totalRepayment/(salaryAmount * rateAmount)
}


function calculateDurationInMonths(totalRepayment, monthlyAmount) {
    return totalRepayment / monthlyAmount
}




























