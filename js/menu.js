const ankets = document.querySelector('.menu__items__item__ankets');
const settings = document.querySelector('.menu__items__item__settings');
const settingsScreen = document.querySelector('.settings');
const anketsScreen = document.querySelector('.ankets')

const username = document.querySelector('.menu__items__item__user__info-name');
const Name = document.querySelector('.menu__items__item__user__info-user');
username.innerHTML = Cookies.get('username');
Name.innerHTML = Cookies.get('name');

ankets.addEventListener('click', ()=>{
    settingsScreen.classList.remove('screen_active');
    anketsScreen.classList.add('screen_active');
    console.log(anketsScreen);
});
settings.addEventListener('click', ()=>{
    settingsScreen.classList.add('screen_active');
    anketsScreen.classList.remove('screen_active');
    console.log(settingsScreen);
});
