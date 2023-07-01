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
            createAnkets(anket);
            
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
            // if(res.status == 230){
            //     console.log('ok');
            //     res.json();
            //     removeAll(anketsLayout);
            // } else {
            //     throw new Error();
            // }
        )
        .then(jsonData => {
            console.log(jsonData.status);
            removeAll(anketsLayout);
            createAnkets(jsonData);            
        })
        .catch(()=>{
            console.log('error');
        });
    }


    //Create ankets in layout
    function createAnkets(anket){        
        anket.forEach(element => {             
            // const currentDate = new Date();        
            // const birth = element.date_of_birth;
            // const age = currentDate.getFullYear() - birth.getFullYear();
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
                    <div class="anket__item__more__name">${element.name}</div>
                    <div class="anket__item__more__surname">${element.surname}</div>
                    <div class="anket__item__more__age">Возраст: ${element.age}</div>
                    <div class="anket__item__more__gender">${element.gender}</div>
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
                <button class="anket__button__close grid-6">Скрыть анкету</button>
            </div>
            <button class="anket__button">Показать больше</button>
            `;            
            anketsLayout.insertAdjacentElement('beforeend', anketItem);
        });
        openAndCloseAnkets();
    }
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
                console.log(e.target.parentElement.parentElement.lastElementChild);
                e.target.parentElement.classList.remove('more');
                e.target.parentElement.parentElement.classList.remove('big');
                e.target.parentElement.parentElement.lastElementChild.classList.remove('hide');
            });
        })
    };

    //Test
    // const btn1 = document.querySelectorAll('.anket__button');
    // const close = document.querySelectorAll('.anket__button__close');
    
    // btn1.forEach(btn=>{
    //     btn.addEventListener('click', (e)=>{
    //         e.target.parentElement.children[1].classList.add('more');
    //         e.target.parentElement.classList.add('big');
    //         e.target.classList.add('hide');
    //     });
    // })
    // close.forEach(btn=>{
    //     btn.addEventListener('click', (e)=>{
    //         console.log(e.target.parentElement.parentElement.lastElementChild);
    //         e.target.parentElement.classList.remove('more');
    //         e.target.parentElement.parentElement.classList.remove('big');
    //         e.target.parentElement.parentElement.lastElementChild.classList.remove('hide');
    //     });
    // })
    
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
});