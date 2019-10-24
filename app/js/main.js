const currentCourseFee = 8000
// const borrowAmountMin = 1
// const borrowAmountMax = currentCourseFee
// const adminFee = 0.05
//
// let extraFeeTiers: {
//     tier0: {
//         thresholdPercent: 0,
//         threshold: currentCourseFee * this.thresholdPercent,
//         extraFeeAmount: 0
//     },
//     tier1: {
//         thresholdPercent: 0.8,
//         threshold: currentCourseFee * this.thresholdPercent,
//         extraFeeAmount: 500
//     },
//     tier2: {
//         thresholdPercent: 0.9,
//         threshold: currentCourseFee * this.thresholdPercent,
//         extraFeeAmount: 1000
//     }
// }



let form = document.querySelector('#borrow-repay-form')
let formInputs = document.querySelectorAll('#borrow-repay-form input')


formInputs.forEach(function(inputField) {
    inputField.addEventListener('input' , function() {
        validateInput(inputField)
    })
    inputField.addEventListener('blur' , function() {
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
        inputField.classList.add('true')
        inputField.classList.remove('false')
        document.querySelector('#' + inputField.id + '-error').innerHTML = ''
    }
}

function handleErrors(inputField, errorMessage) {
    inputField.classList.add('false')
    inputField.classList.remove('true')
    document.querySelector('#' + inputField.id + '-error').className = 'alert-danger'
    document.querySelector('#' + inputField.id + '-error').innerHTML = errorMessage
}


// let borrowInputValue = document.querySelector('#borrow-input').value
// let adminFeeAmount = calculateAdminFee(borrowInputValue)
// let tierFee = calculateExtraFee(borrowInputValue)
// let totalRepaymentAmount = calculateTotalRepay(borrowInputValue, adminFee)
//
//
//
//
//
// let salaryInputValue = document.querySelector('#salary-input').value
// let rateInputValue = document.querySelector('#rate-input').value
// let monthlyRepayAmount = 0
// let repayDuration = 0
//
//
// function calculateAdminFee(borrowAmount, adminFee) {
//     let result = borrowAmount * adminFee
//     return result
// }
//
// function calculateExtraFee(borrowAmount, feeTiers) {
//     let result
//     feeTiers.forEach(function(tier) {
//         if (borrowAmount > tier.threshold) {
//             result = tier.extraFeeAmount
//         }
//     })
//     return result
// }
//
// function calculateTotalRepay(borrowAmount, adminFee, tierFee) {
//     let adminFeeAmount = borrowAmount * adminFee
//     let result = borrowAmount + adminFeeAmount + tierFee
//     return result
// }
//































// let inputs = document.querySelectorAll('#borrow-repay-form input')
// let values = {}
// inputs.forEach(function(input) {
//     input.addEventListener('input', function () {
//         if (!numberInputValidation(input.value) && numberInputValidation(input.value) > 0) {
//             input.dataset.valid = true
//             values[input.id] = input.value
//         } else {
//             input.dataset.valid = false
//         }
//     })
// })
//
//
//
//
// let borrowAmountInput = document.querySelector('#borrow-input').value
//
// function numberInputValidation(input) {
//     let parsedInput
//     parsedInput = parseInt(input)
//     if (isNaN(parsedInput)) {
//         return true
//     } else {
//         return false
//     }
// }
//
//
//
// if (parsedInput > 0 && parsedInput <= currentCourseFee) {
//     = parsedInput
//     return borrowAmount
// } else if (parsedInput < 1 || parsedInput > currentCourseFee) {
//     // produce error message - the borrowed amount must be between 1 and {{current course fee}}
//
// }
//
// let totalRepaymentAmount