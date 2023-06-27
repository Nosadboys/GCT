const anketa_form = document.querySelector('.anket__form');
const cancelBatton = document.querySelector('.anket__form__cancel-btn');

anketa_form.addEventListener('submit', (e)=>{
    e.preventDefault();
});
cancelBatton.addEventListener('click', ()=>{
    formInput.forEach(item => {
        anketa_form.reset;
    });   
});
  
function create_anket(form, url){
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
                alert('Анкета успешно создана!');
                // тут подождать надо и потом вернуть в блок с анкетами
                form.reset();                  
            }else if(data.status == 231){
                alert('Превышено максимально возможное количество создаваемых анкет - 7');
            } else {
                throw new Error();
            }
            
        }).catch(()=>{
            //showError(form);
        }).finally(()=>{

        });
    });
}
create_anket(anketa_form, '../api/create_anket.php');