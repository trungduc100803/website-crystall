var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)


var fagItem    = $$('.fag-item')
var menu       = $('.header-top__menu')
var nav        = $('#navbar')

fagItem.forEach( item => {
    item.addEventListener('click', function() {
        var fagItemToggle = this.querySelector('.fag-item__toggle')
        var fagItemText   = this.querySelector('.fag-item__text')

        fagItemToggle.classList.toggle('active')
        fagItemText.classList.toggle('click')
    })
})

// console.log(nav)


menu.addEventListener('click', function() {

    // if(nav.style.display == 'block'){
    //     nav.style.display = 'none'
    // }
    // if(nav.style.display === 'none'){
    //     nav.style.display = 'block'
    // }
    nav.classList.toggle('block')
})






function validator(option) {

    // lay form
    var formElement = document.querySelector(option.form)
    var rulesElement = {}

    if(formElement){
        
        // lap va lay ra cac rule trong form
        option.rules.forEach(rule => {

            //luu lai
            if(Array.isArray(rulesElement[rule.selector])){
                rulesElement[rule.selector].push(rule.test)
            }
            else {
                rulesElement[rule.selector] = rule.test
            }



            // lay cac input
            var inputElement = formElement.querySelector(rule.selector)
            //neu blur ra khoi input thi se bao loi
            inputElement.onblur = function() {

                var errorMessage = rule.test(inputElement.value)
                var formMessage  = inputElement.parentElement.querySelector('.form-message')
                
                if(errorMessage){
                    formMessage.innerText = errorMessage
                    formMessage.parentElement.classList.add('invalid')
                }else {
                    formMessage.innerText = ''
                    formMessage.parentElement.classList.remove('invalid')
                }

            }



            inputElement.oninput = function() {
                var formMessage  = inputElement.parentElement.querySelector('.form-meesage')

                formMessage.innerText = ''
                formMessage.parentElement.classList.remove('invalid')
            }
        })

        // console.log(rulesElement)

    }

}


validator.isRequire = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : 'vui long nhap truong nay'
        }
    }
}


validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'truong nay phai la email'
        }
    }
}


validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `mat khau phai tu ${min} ki tu tro len`
        }
    }
}


validator.confirm = function(selector, confirmValue) {
    return {
        selector: selector,
        test: function(value) {  
            return value === confirmValue() ? undefined : 'gia tri khong khop'
        }
    }
}

validator({
    form: '#form4',
    rules: [
        validator.isRequire('#firstname'),
        validator.isRequire('#lastname'),
        validator.isEmail('#email'),
        validator.minLength('#password', 6),
        validator.confirm('#confirmpassword', function() {
            return  document.querySelector('#form4 #password').value
        })
    ],
    formMessage: 'form-message'
})





