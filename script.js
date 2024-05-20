let form1 = document.querySelector('#form1');
let form2 = document.querySelector('#form2');
let backBtn = document.getElementById('back');
let nextBtn = document.getElementById('next');

//////////////////////////////////////////////////////
//CHANGE PAGES
let nextShow = () => {
    form1.style.display = 'none';
    form2.style.display = 'flex';
}

let prevShow = () => {
    form2.style.display = 'none';
    form1.style.display = 'flex';
}

nextBtn.addEventListener('click', () => {
    if (validation()) {
        nextShow();
    }
});
backBtn.addEventListener('click', prevShow);

/////////////////////////////////////////////////////
//FORM VALIDATION
let errorObj = {
    emplyError: "This field shouldn't be emply",
    nameError: "Name should contain 2 characters at least ",
    phoneError: 'You number should contain 10 characters',
    emailError: 'Invalid email',
    selectError: 'Please select one of the options'
}

/////////////////////////////////////////////////////////////
//IF ANY INPUT OR SELECT DON'T PAST VALIDATION THEN CREATE ERROR SPAN
let createError = (item, errorTxt) => {
    let parent = item.parentElement;
    let errorSpan = document.createElement('span');
    errorSpan.classList.add('error');
    errorSpan.innerText = errorTxt;
    parent.append(errorSpan);
}

///////////////////////////////////////////////////////
//IF INPUTS OR SELECTS ARE NOT EMPTY THEN REMOVE ERROR SPAN
let removeError = (item) => {
    let parent = item.parentElement;
    let errorSpan = item.nextElementSibling;
    if (parent.contains(errorSpan) && errorSpan.classList.contains('error')) {
        errorSpan.remove();
    }
}

//////////////////////////////////////////////////////////
//VALIDATION OF 1 PAGE
let validation = () => {
    let flag = true;
    let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let inputs = Array.from(form1.querySelectorAll('input'));
    inputs.forEach(el => {
        removeError(el);
        if (el.value === '') {
            createError(el, errorObj.emplyError);
            flag = false;
        } else {
            if (el.value.length < el.dataset.length) {
                createError(el, errorObj.nameError);
                flag = false;
            }
            if (el.hasAttribute('data-phone') && el.value.length != el.dataset.phone) {
                createError(el, errorObj.phoneError);
                flag = false;
            }
            if (el.hasAttribute('data-email') && !emailRegEx.test(el.value)) {
                createError(el, errorObj.emailError);
                flag = false;
            }
        }

    });
    return flag;
}

//////////////////////////////////////////////////////////
//VALIDATION OF SECOND PAGE
let validationSecondPage = () => {
    let inputs = Array.from(form2.querySelectorAll('input'));
    let flag = true;
    inputs.forEach(el => {
        removeError(el);
        if (el.value === '') {
            createError(el, errorObj.emplyError);
            flag = false;
        }

    });
    let selects = form2.querySelectorAll('select');
    selects.forEach(el => {
        removeError(el);
        if (el.value === '') {
            createError(el, errorObj.emplyError);
            flag = false;
        }
    })
    return flag;
}

////////////////////////////////////////////////////////////
//CREAtE OUTPUT OBJECT WHICH INCLUDES INPUTS AND SELECTS VALUES
//INSTEAD OF THIS OBJECT WE ALSO CAN YOU FORMDATA
let outputResult= ()=>{
    let obj={};
    let forms=Array.from(document.querySelectorAll('form'));
    forms.forEach(form=>{
        let inputs=Array.from(form.querySelectorAll('input'));
        inputs.forEach(el=>{
            obj[el.id]=el.value;
        });
        let selects=Array.from(form.querySelectorAll('select'));
        selects.forEach(el=>{
            obj[el.id]=el.value;
        });
    });
    console.log(obj);
}


///////////////////////////////////////////////////////
//If BOTH PAGES PAST VALIDATION THEN CALL OUTPUTHRESULT() FUNCTION
let submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', () => {
    validationSecondPage();
    if (validationSecondPage()) {
       outputResult();
    }
})