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

function validateInput(inputField) {
    let isEmptyErrorMessage = 'This must not be empty'
    let isInvalidErrorMessage = 'This must be a number'
    let borrowErrorMessage = 'There is a problem with the amount, it must be between £1 and £' + currentCourseFee + '.'
    let rateErrorMessage = 'This must be a number between 1 and 100'

    if (inputField.value.length === 0) {
        throwErrors(inputField, isEmptyErrorMessage)
    } else if (isNaN(inputField.value)) {
        throwErrors(inputField, isInvalidErrorMessage)
    } else if (inputField.id === 'borrow-input' && inputField.value > currentCourseFee) {
        throwErrors(inputField, borrowErrorMessage)
    } else if (inputField.id === 'rate-input' && inputField.value > 100) {
        throwErrors(inputField, rateErrorMessage)
    } else {
        inputField.classList.add('true')
        inputField.classList.remove('false')
        document.querySelector('#' + inputField.id + '-error').innerHTML = ''
    }
}


function throwErrors(inputField, errorMessage) {
    inputField.classList.add('false')
    inputField.classList.remove('true')
    document.querySelector('#' + inputField.id + '-error').className = 'alert-danger'
    document.querySelector('#' + inputField.id + '-error').innerHTML = errorMessage
}


function checkBorrowValid(value) {
    return (value < currentCourseFee)
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