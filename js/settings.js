const formInput = document.querySelectorAll('.settings__form__input')
const formChangeBtn = document.querySelectorAll('.settings__form__change-btn');
const cancelBtn = document.querySelector('.settings__form__cancel-btn');
const form = document.querySelector('.settings__form');
const screens_btns = document.querySelectorAll('.screen');

formInput.forEach(item => {
    item.readOnly = true;
    item.value = Cookies.get(item.getAttribute('data-name'));
});
let flag = true;
formChangeBtn.forEach(btn => {
    btn.addEventListener('click', (e)=> {
        flag = false;
        console.log(e.target);
        console.log(e.target.previousElementSibling);
        e.target.previousElementSibling.readOnly = false;
        e.target.classList.remove('fa-pen');
        e.target.classList.add('fa-lock-open');
    });
});

cancelBtn.addEventListener('click', ()=>{
    formInput.forEach(item => {
        item.readOnly = true;
        item.value = Cookies.get(item.getAttribute('data-name'));
    });
    formChangeBtn.forEach(btn => {
        btn.classList.add('fa-pen');
        btn.classList.remove('fa-lock-open');
    })
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
});
    
screens_btns.forEach(item => {
    item.addEventListener('click', ()=>{
        if(flag == false) {
            cancelBtn.click();
        }
    });
})


function setUserDataToCookies(data) {
    const userData = JSON.parse(data);
    console.log(userData);    
    Cookies.set('surname', userData.surname, { expires: 7 });    
    Cookies.set('name', userData.name, { expires: 7 });    
    Cookies.set('date_of_birth', userData.date_of_birth, { expires: 7 });
    Cookies.set('country', userData.country, { expires: 7 });
    Cookies.set('gender', userData.gender, { expires: 7 });
    Cookies.set('bio', userData.bio, { expires: 7 });
    Cookies.set('game_platforms', userData.game_platforms, { expires: 7 });
    Cookies.set('discord_url', userData.discord_url, { expires: 7 });
    Cookies.set('platforms_url', userData.platforms_url, { expires: 7 });
}



function newUserCredentialsFormPostData(form, url){
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
                setUserDataToCookies(dataJson)
                formInput.forEach(item => {
                    item.readOnly = true;                    
                });
                formChangeBtn.forEach(btn => {
                    btn.classList.add('fa-pen');
                    btn.classList.remove('fa-lock-open');
                })
                
            } else {
                throw new Error();
            }
            
        }).catch(()=>{
            showError(form);
        }).finally(()=>{

        });
    });
}
newUserCredentialsFormPostData(form, '../api/settings.php');
