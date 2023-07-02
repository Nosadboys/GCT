window.addEventListener('DOMContentLoaded', () => {
    const anketsModal = document.querySelector('.modal');
    const anketa_form = document.querySelector('.anket__form');
    const allAnketsBtn = document.querySelector('.ankets__types__all');
    const anketsLayout = document.querySelector('.ankets__manager__layout__wrapper');
    //All Ankets
    allAnketsBtn.addEventListener('click', (e)=>{
        getAnkets();
    });
    async function getAnkets(){
        removeAll(anketsLayout);
        await fetch('../api/get_all_ankets_data.php', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res=> res.json()).then(anket=>{              
            createAnkets(anket, 'hide', 'show', 'white');
            
        }).catch(()=>{
        });
    }    
    //Calling all Ankets form the server
     getAnkets();
    //Remove all ankets from layout
    function removeAll(element) {
        while (element.firstChild) {
        element.removeChild(element.firstChild);
        }
    }
    


    //My ankets show
    const myAnketsBtn = document.querySelector('.ankets__types__my');
    myAnketsBtn.addEventListener('click', (e)=>{
        myAnkets();
    });
    // Get my ankets
    async function myAnkets(){
        const username = new FormData();
        username.append('username', Cookies.get('username'));
        const usernameJson = JSON.stringify(Object.fromEntries(username.entries()));
        await fetch('../api/get_usr_ankets_data.php', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: usernameJson
        })
        .then(res=>res.json()
        )
        .then(jsonData => {
            removeAll(anketsLayout);
            createAnkets(jsonData, 'show', 'hide', 'white');            
        })
        .catch(()=>{
            console.log('error');
        });
    }
    //Liked ankets show
    const likedAnketsBtn = document.querySelector('.ankets__types__liked');
    likedAnketsBtn.addEventListener('click', ()=>{
        likedAnkets();
    });
    //Get liked anket
    async function likedAnkets(){
        await fetch('../api/get_liked_ankets_data.php')
        .then(res => res.json())
        .then((data)=>{
            removeAll(anketsLayout);
            createAnkets(data, 'hide', 'show', 'red');            
        });
        
    }
    //Create ankets in layout
    function createAnkets(anket, classForDelete, classForLike, colorForLike){        
        anket.forEach(element => {             
            const anketItem = document.createElement("div");
            anketItem.classList.add('anket__item');
            anketItem.innerHTML = 
            `
            <div class="anket__item__main">
                <i class="fa-solid fa-id-badge anket__logo" data-id="${element.id}"></i>
                <div class="anket__item__game" data-game_name="${element.game_name}">Игра: ${element.game_name}</div>
            </div>
            <div class="anket__item__more">
                <div class="grid-1">
                    <i class="fa-solid fa-id-badge anket__logo" data-id="${element.id}"></i>
                    <div class="anket__item__more__name" data-game="${element.name}">${element.name}</div>
                    <div class="anket__item__more__surname">${element.surname}</div>
                    <div class="anket__item__more__age" data-age="${element.age}">Возраст: ${element.age}</div>
                    <div class="anket__item__more__gender" data-gender="${element.gender}">${element.gender}</div>
                    <div class="anket__item__more__country">${element.country}</div>
                    <div class="anket__item__more__created">
                        <div class="anket__item__more__created__header">Анкета создана</div>
                        <div class="anket__item__more__created__text">${element.created_at}</div>
                    </div>
                </div>
                <div class="grid-2">
                    <div class="anket__item__game" data-game_name="${element.game_name}">Игра: ${element.game_name}</div>
                    <div class="anket__item__more__roleplay">
                        <div class="anket__item__more__roleplay__header">Роль:</div>
                        <div class="anket__item__more__roleplay__text">${element.role_play}</div>
                    </div>
                    <div class="anket__item__more__statistics">
                        <div class="anket__item__more__statistics__header">Статистика:</div>
                        <div class="anket__item__more__statistics__text">${element.statistics}</div>
                    </div>
                    <div class="anket__item__more__skils">
                        <div class="anket__item__more__skils__header">Топ скилы:</div>
                        <div class="anket__item__more__skils__text">${element.top_skills}</div>
                    </div>
                    <div class="anket__item__more__gender-prep">
                        <div class="anket__item__more__gender-prep__header">Предпочитаемый пол:</div>
                        <div class="anket__item__more__gender-prep__text">${element.gender_prep}</div>
                    </div>
                    <div class="anket__item__more__age-diap">
                        <div class="anket__item__more__age-diap__header">Предпочитаемый возраст:</div>
                        <div class="anket__item__more__age-diap__text">
                        ${element.age_diap}
                        </div>
                    </div>
                </div>
                <div class="grid-3">
                    <div class="anket__item__more__username">${element.username}</div>
                    <div class="anket__item__more__email">${element.email}</div>
                    <div class="anket__item__more__discord">
                        <div class="anket__item__more__discord__header">Имя в Discord:</div>
                        <div class="anket__item__more__discord__text">${element.discord_url}</div>
                    </div>
                    <div class="anket__item__more__platforms">
                        <div class="anket__item__more__platforms__header">Платформы:</div>
                        <div class="anket__item__more__platforms__text">${element.platforms_url}</div>
                    </div>
                </div>
                <div class="grid-4">
                    <div class="anket__item__more__bio">
                        <div class="anket__item__more__bio__header">Биография:</div>
                        <div class="anket__item__more__bio__text">
                        ${element.bio}
                        </div>
                    </div>
                </div>
                <div class="grid-5">
                    <div class="anket__item__more__descr">
                        <div class="anket__item__more__descr__header">Описание:</div>
                        <div class="anket__item__more__descr__text">
                        ${element.description}
                        </div>
                    </div>
                </div>
                <div class="anket__button__wrapper grid-6">
                    <button class="anket__button__delete ${classForDelete}">Удалить анкету</button>
                    <button class="anket__button__close">Скрыть анкету</button>
                    <i class="fa-solid fa-heart anket__button__like ${classForLike} ${colorForLike}"></i>
                </div>
            </div>
            <button class="anket__button">Показать больше</button>
            `;            
            anketsLayout.insertAdjacentElement('beforeend', anketItem);
        });
        openAndCloseAnkets();
        deleteAnket();
        likeAnket();
    }
    // openAndCloseAnkets();
    //Open and Close ankets
    function openAndCloseAnkets() {
        const btn1 = document.querySelectorAll('.anket__button');
        const close = document.querySelectorAll('.anket__button__close');
        btn1.forEach(btn=>{
            btn.addEventListener('click', (e)=>{
                e.target.parentElement.children[1].classList.add('more');
                e.target.parentElement.classList.add('big');
                e.target.classList.add('hide');
            });
        })
        close.forEach(btn=>{
            btn.addEventListener('click', (e)=>{
                e.target.parentElement.parentElement.classList.remove('more');
                e.target.parentElement.parentElement.parentElement.classList.remove('big');
                e.target.parentElement.parentElement.parentElement.lastElementChild.classList.remove('hide');
            });
        })
    };
    //Delete anket
    function deleteAnket(){
        const allDeleteBtns = document.querySelectorAll('.anket__button__delete');
        allDeleteBtns.forEach(btn => {
            btn.addEventListener('click', async (e)=>{
                const anketId = e.target.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute('data-id');
                console.log(anketId);
                const anket = e.target.parentElement.parentElement.parentElement;
                const dataId = new FormData();
                dataId.append('id', anketId);
                const dataIdJson = JSON.stringify(Object.fromEntries(dataId.entries()));
                await fetch('../api/delete_anket.php', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: dataIdJson
                })
                .then(resp => {
                    if(resp.status == 230){
                        anket.remove();
                    } else {
                        throw new Error();
                    }
                }).catch(()=>{
                    alert('что то пошло не так');
                });

            });
        });
    };
    // deleteAnket();
    //Лайк на анкету
    function likeAnket(){
        const allLikeBtns = document.querySelectorAll('.anket__button__like');
        allLikeBtns.forEach(btn => {
            btn.addEventListener('click', async (e)=>{
                const id = e.target.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute('data-id');
                const data = new FormData();
                data.append('id',id);
                const IdJson = JSON.stringify(Object.fromEntries(data.entries()));
                await fetch('../api/like.php', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: IdJson
                })
                .then(resp => {
                    if(resp.status == 230){
                        btn.classList.remove('white');
                        btn.classList.add('red');
                    } else if(resp.status == 237){
                        btn.classList.remove('red');
                        btn.classList.add('white');
                        
                    } else {
                        throw new Error();
                    }
                }).catch(()=>{
                    alert('Возможно анкета удалена');
                });
            });
        })
    }
    // likeAnket();
    //Вы понравились 
    const allMatchAnkets = document.querySelector('.ankets__types__match');
    allMatchAnkets.addEventListener('click', async (e)=>{
        await fetch('../api/get_likers_data.php')
        .then(res => res.json())
        .then((data)=>{
            removeAll(anketsLayout);
            createAnkets(data, 'hide', 'show', 'red');            
        });
    });
    
    //Create Anket and Update Layout
    anketa_form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const formData = new FormData(anketa_form);
        const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));
        await fetch('../api/create_anket.php', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: dataJson
        }).then((data)=>{
            if(data.status == 230) {
                alert('Анкета успешно создана!');

                // тут подождать надо и потом вернуть в блок с анкетами
                anketa_form.reset(); 
                anketsModal.classList.remove("modal_active"); 
                getAnkets();                
            }else if(data.status == 231){
                alert('Превышено максимально возможное количество создаваемых анкет - 8');
            } else {
                throw new Error();
            }
            
        }).catch(()=>{
            //showError(form);
        });
    });
    
    //Поиск анкет
    const searchBtn = document.querySelector('.ankets__search__button');
    searchBtn.addEventListener('click', (e)=>{
        const getAllAnkets = document.querySelectorAll('.anket__item');
        let ageFrom = document.querySelector('.ankets__search__ot__input').value.toLowerCase();
        let ageTo = document.querySelector('.ankets__search__do__input').value.toLowerCase();
        const gender = document.querySelector('.ankets__search__gender').value.toLowerCase();
        const game = document.querySelector('.ankets__search__game').value.toLowerCase();
        if(ageFrom == ""){
            ageFrom = 0;
        }
        if(ageTo == ""){
            ageTo = 1000;
        }
        getAllAnkets.forEach(item =>{
            const anketAge = item.querySelector('.anket__item__more__age').getAttribute('data-age').toLowerCase();
            const anketGender = item.querySelector('.anket__item__more__gender').getAttribute('data-gender').toLowerCase();
            const anketGame = item.querySelector('.anket__item__game').getAttribute('data-game_name').toLowerCase();
            item.classList.remove('hidden');
            if(gender == "не важен" && game == "нет"){
                if(anketAge <= ageTo && anketAge >= ageFrom) { //только возраст
                
                } else {
                    item.classList.add('hidden');
                }
            } else if(gender == "не важен"){
                if(anketAge <= ageTo && anketAge >= ageFrom && anketGame == game) {
                
                } else {
                    item.classList.add('hidden');
                }
            } else if(game == "нет") {
                if(anketAge <= ageTo && anketAge >= ageFrom && anketGender == gender) {
                
                } else {
                    item.classList.add('hidden');
                }
            } else if(game != 'нет' && gender != "не важен") {
                if(anketAge <= ageTo && anketAge >= ageFrom && anketGender == gender && anketGame == game) {
                
                } else {
                    item.classList.add('hidden');
                }
            } else {
                item.classList.add('hidden');
            }
        });
    });
});