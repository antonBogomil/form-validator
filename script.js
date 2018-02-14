'use strict';

window.onload = function (e) {
    var sendLogin =false;
    var sendPassword = false;
    var showPasswordBtn = document.querySelector('.show-password');
    showPasswordBtn.addEventListener('click',function (e) {
        var label = showPasswordBtn.parentNode;
        var password=label.querySelector('input');
        if (password.classList.contains('showed')){
            password.classList.remove('showed');
            password.setAttribute('type','password');
        }
        else {
            password.classList.add('showed');
            password.setAttribute('type','text');
        }
    });

    function validateLogin(elem,min,max){
        var value = elem.value;
        var haveLatin = value.match(/[a-z]/gi);
        if (value.length < min || value.length > max) {
            showError(elem);
            return false;
        }
        var falseSymbols = value.match(/[^\dA-Z-]/gi);
        if (falseSymbols==null&&haveLatin){
            sendLogin = true;
            showSuccess(elem);
        }
        else {
            showError(elem);
            return false
        }
    }

    function showError(elem) {
        elem.parentNode.classList.remove('valid');
        elem.parentNode.classList.add('invalid');
        var error = document.createElement('span');
        error.classList.add('error-block');
        error.innerHTML = 'Invalid '+elem.name;
        elem.parentNode.appendChild(error);
    }
    function showSuccess(elem) {
        elem.parentNode.classList.remove('invalid');
        var error = document.querySelector('.error-block');
        elem.parentNode.classList.add('valid');
    }
    function validatePass(elem,min,max) {
        var haveUpperCase = false;
        var haveLowerCase = false;
        var haveNum = false;
        var value = elem.value;
        if (value.length < min || value.length > max) {
            showError(elem);
            return false
        }
        for (var i = 0; i<value.length;i++){
            var simbol = value[i];
            if (!haveUpperCase && isNaN(simbol)){
                haveUpperCase = simbol.toUpperCase() == simbol;
            }
            if (!haveLowerCase&&isNaN(simbol)){
                haveLowerCase = simbol.toLowerCase() == simbol;
            }
            if (!haveNum){
                haveNum = !isNaN(simbol);
            }
            if (haveLowerCase&&haveUpperCase&&haveNum){
                showSuccess(elem);
                sendPassword = true
            }
        }
        if (!haveLowerCase){
            showError(elem);
            return false
        }
        if (!haveUpperCase){
            showError(elem);
            return false

        }
        if (!haveNum){
            showError(elem);
            return false
        }
        sendPassword = true;
        showSuccess(elem);
    }




    (function formSignIn() {
        var login = document.querySelector('#login');
        var password = document.querySelector('#password');
        var submit = document.querySelector('.btn.submit');
        var form = document.querySelector('form');



        submit.addEventListener('click',function (e) {
            validateLogin(login,2,30);
            validatePass(password,8,50);
            if (sendLogin&&sendPassword){
                setTimeout(function () {
                    form.submit();
                },500);
            }
        });


        login.addEventListener('change',function (e) {
            validateLogin(login,2,30);
        });
        password.addEventListener('change',function (e) {
                validatePass(password,8,50);
        });



    }
    )();
    var login = false;
    var password = false;
    var passwordConfirm = false;
    var sendEmail = false;
    var users;

    function formUp() {
        var showPasswordBtn = document.querySelectorAll('.show-password');
        var form = document.querySelector('.sign-up-form');
        var login = document.querySelector('#login');
        var mail = document.querySelector('#mail');
        var password = document.querySelector('#password');
        var password2 = document.querySelector('#password2');
        var submit = document.querySelector('.btn.submit');
        login.addEventListener('change',function (e) {
            validateLogin(login,2,30);
            getData(login);

        });
        password.addEventListener('change',function (e) {
            validatePass(password,8,50);
        });
        password2.addEventListener('change',function (e) {
            if (password.value==password2.value&&sendPassword){
                showSuccess(password2);
                passwordConfirm = true
            }
            else {
                showError(password2)
            }

        });
        mail.addEventListener('change',function (e) {
            validateEmail(mail)
        });


        showPasswordBtn[0].addEventListener('click',function (e) {
            var label = showPasswordBtn[0].parentNode;
            var password=label.querySelector('input');
            if (password.classList.contains('showed')){
                password.classList.remove('showed');
                password.setAttribute('type','password');
            }
            else {
                password.classList.add('showed');
                password.setAttribute('type','text');
            }

        });
        showPasswordBtn[1].addEventListener('click',function (e) {
            var label = showPasswordBtn[1].parentNode;
            var password=label.querySelector('input');
            if (password.classList.contains('showed')){
                password.classList.remove('showed');
                password.setAttribute('type','password');
            }
            else {
                password.classList.add('showed');
                password.setAttribute('type','text');
            }

        });



        function validateEmail(email) {
            var value = email.value;
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            sendEmail =  re.test(String(value).toLowerCase());
            if (!sendEmail){
                showError(email);
            }
            else {
                showSuccess(email);
            }
        }

        submit.addEventListener('click',function (e) {
            validateLogin(login,2,30);
            validatePass(password,8,50);
            if (sendLogin&&sendPassword&&passwordConfirm&&sendEmail){
                setTimeout(function () {
                    form.submit();
                },500);
            }
        });

    }







    $(function(){
        $('.btn_sign-up:not(.submit)').click(function(){
            $.ajax({
                type: "POST",
                url: 'registration.html',
                success: function(data) {
                    $('.wrapper').html(data);
                    formUp();
                }
            });
        });
    });

    function loginExist(current,array) {
        console.log(array);
        if (array.indexOf(current.value)!=-1){
            showError(current)
        }
    }

    function getData(login) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/data.json');
        xhr.onload = function (evt) {
            var data=JSON.parse(evt.target.response);
            users = data.users.map(function (item) {
                 return item.login;
            });
            loginExist(login,users);
        };
        xhr.send();
    };



};

