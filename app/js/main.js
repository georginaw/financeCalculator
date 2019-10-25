const currentCourseFee = 8000
const adminFee = 0.05
const tierThreshold1 = currentCourseFee * 0.8
const tierExtraFee1 = 500
const tierThreshold2 = currentCourseFee * 0.9
const tierExtraFee2 = 1000
let salaryAmount = 25000
let rateAmount
let borrowAmount
let adminFeeAmount
let extraFeeAmount
let totalRepay
let monthlyAmount
let durationInMonths
// let extraFeeTiers = {
//     tier0: {
//         thresholdPercent: 0,
//         extraFeeAmount: 0
//         getThreshold() = {
//             currentCourseFee * .thresholdPercent,
// }
//     },
//     tier1: {
//         tierName: 1,
//         thresholdPercent: 0.8,
//         threshold: currentCourseFee * this.thresholdPercent,
//         extraFeeAmount: 500
//     },
//     tier2: {
//         tierName: 2,
//         thresholdPercent: 0.9,
//         threshold: currentCourseFee * this.thresholdPercent,
//         extraFeeAmount: 1000
//     }
// }


let errorMessages = {
    isEmpty: "This must not be empty",
    isInvalid: 'This must be a number',
    borrowInput: 'There is a problem with the amount, it must be between £1 and £' + currentCourseFee + '.',
    rateInput: 'This must be a number between 1 and 100'
}

let form = document.querySelector('#borrow-repay-form')
let formInputs = document.querySelectorAll('#borrow-repay-form input')

document.querySelector('#borrow-input').placeholder = '1 - ' + currentCourseFee
document.querySelector('#salary-input').placeholder = 25000
document.querySelector('#salary-input').value = 25000
document.querySelector('#rate-input').placeholder = 10
document.querySelector('#rate-input').value = 10

formInputs.forEach(function(inputField) {
    inputField.dataset.check = 'invalid'
})

form.addEventListener('click', function() {
    let errors = document.querySelectorAll('#borrow-repay-form [data-check="invalid"]')
    if (errors.length === 0) {
        borrowAmount = parseInt(document.querySelector('#borrow-input').value)
        salaryAmount = parseInt(document.querySelector('#salary-input').value)
        rateAmount = (parseInt(document.querySelector('#rate-input').value) / 100) / 12

        adminFeeAmount = calculateAdminFee(borrowAmount)
        extraFeeAmount = calculateExtraFee(borrowAmount)

        totalRepay = calculateTotalRepay(borrowAmount, adminFeeAmount, extraFeeAmount)
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


function calculateAdminFee(borrowAmount) {
    return borrowAmount * adminFee
}


function calculateExtraFee(borrowAmount) {
    let result
    if (borrowAmount > tierThreshold2) {
        result = tierExtraFee2
    } else if (borrowAmount > tierThreshold1) {
        result = tierExtraFee1
    } else {
        result = 0
    }
    return result
}

function calculateTotalRepay(borrowAmount, adminFeeAmount, extraFeeAmount) {
    return borrowAmount + adminFeeAmount + extraFeeAmount
}


function calculateMonthlyAmount(totalRepayment, salaryAmount, rateAmount) {
    return salaryAmount * rateAmount
}


function calculateDurationInMonths(totalRepayment, monthlyAmount) {
    return totalRepayment / monthlyAmount
}





















