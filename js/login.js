const changeToAuth = document.querySelector('.change_to_auth');
const changeToReg = document.querySelector('.change_to_reg');
const authForm = document.querySelector('.auth');
const regForm = document.querySelector('.registr');
// const body = document.querySelector('body');
changeToAuth.addEventListener('click', ()=>{
    authForm.classList.remove('inactive');
    regForm.classList.add('inactive');
});
changeToReg.addEventListener('click', ()=>{
    authForm.classList.add('inactive');
    regForm.classList.remove('inactive');
});

function registr(form, url){
    form.addEventListener('submit', async (e)=>{
        e.preventDefault();

        const formData = new FormData(form);
        const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: dataJson
        }).then((data)=>{                   
            if(data.status == 230) {
                Cookies(data);
                signUpForm.reset();
                window.location.href = 'account.html';
            } else {
                throw new Error();
            }
        })       
        .catch(()=>{
            err();        
        });
    });
}

registr(regForm, '../api/sign_up.php');

function Cookies(data) {
    const userData = JSON.parse(data);
    console.log(userData);    
    Cookies.set('username', userData.username, { expires: 7 });
    Cookies.set('email', userData.email, { expires: 7 });
    Cookies.set('surname', userData.surname, { expires: 7 });    
    Cookies.set('name', userData.name, { expires: 7 });    
    Cookies.set('date_of_birth', userData.date_of_birth, { expires: 7 });
    Cookies.set('country', userData.country, { expires: 7 });
    Cookies.set('gender', userData.gender, { expires: 7 });
    Cookies.set('bio', "Your description", { expires: 7 });
    Cookies.set('game_platforms', "game_platforms", { expires: 7 });
    Cookies.set('discord_url', "Discord_url", { expires: 7 });
    Cookies.set('platforms_url', "Platforms url", { expires: 7 });
}

function err() {
    if(document.querySelector('.error')){
        err.classList.add('error');
        const err = document.createElement('div');
        err.innerHTML = "Что то пошло не так попробуйте снова.";
        signUpForm.insertAdjacentElement('beforeend', err);
        setTimeout(()=>{
            err.remove();
        }, 5000);
    }
}


function auth(form, url){
    form.addEventListener('submit', async (e)=>{
        e.preventDefault();

        const formData = new FormData(form);
        const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: dataJson
        }).then((data)=>{
            console.log(data.status);
            if(data.status == 230) {
                checkData(dataJson);
                form.reset();
            } else {
                throw new Error();
            }
            
        }).catch(()=>{
            err();
        }).finally(()=>{

        });
    });
}
auth(authForm,'../api/auth.php');


function checkData(userData){
    const cookieNamesArray = ['username', 'email', 'name',  'surname', 'date_of_birth',  'country', 'gender', 'bio', 'game_platforms','discord_urd','platforms_url'];
    let iterator = 0;
    cookieNamesArray.forEach((item) => {
        const res = Cookies.get(item);
        if(res == undefined){
            iterator++;
        } 
    });
    if(iterator != 0) {
        getData(userData);
    } else {
        window.location.href = 'account.html';
    }
}

async function getData(data){
    await fetch('../api/usr_data.php', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })
    .then(data=> data.json())
    .then((res)=>{
        const dataArray = Object.entries(res);
        dataArray.forEach(item => {
            setData(item);
        });
    })
    .then(()=>{
        window.location.href = 'account.html';
    })
    .catch();
    
}

function setData(cookie) {
    Cookies.set(cookie[0], cookie[1], { expires: 7 });
}