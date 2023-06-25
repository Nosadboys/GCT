const exitBtn = document.querySelector('.menu__items__item__logout');

exitBtn.addEventListener('click', async (e)=>{
    const data = new FormData();
    data.append('session', Cookies.get('PHPSESSID'));
    await fetch('../api/log_out.php', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        }, 
        body: data
    })
    .then(data => {
        console.log(data)
        if(data.status == 230) {
            deleteAllUserDataFromCookies();
            window.location.href = "login.html";
        }
    })
    .catch();
});

function deleteAllUserDataFromCookies(){
    const cookieNamesArray = ['username', 'email', 'name',  'surname', 'date_of_birth',  'country', 'gender'];
    cookieNamesArray.forEach(cookie => {
        Cookies.remove(cookie);
    });
}
