window.addEventListener('DOMContentLoaded', () => {

async function getAnkets(){
    const anketsLayout = document.querySelector('.ankets__manager__layout__wrapper');
    removeAll(anketsLayout);
    const data = new FormData();
    data.append('username', Cookies.get('username'));
    const dataJson = JSON.stringify(Object.fromEntries(data.entries()));
    await fetch('../api/get_usr_ankets_data.php', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: dataJson
    }).then(res=> res.json()).then((anket)=>{        
            anket.forEach(element => {              
                
                const anketItem = document.createElement("div");
                anketItem.classList.add('anket__item');
                anketItem.innerHTML = 
                `
                    <i class="fa-solid fa-id-badge anket__logo" data-id=${element.id}></i>
                    <div class="anket__item__game">Игра:${element.game_name}</div>
                    <button class="anket__button">Показать больше</button>
                `;
                anketsLayout.insertAdjacentElement('beforeend', anketItem);
            });
    }).catch(()=>{
    });
}
getAnkets();
function removeAll(element) {
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }
}
});