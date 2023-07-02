window.addEventListener('DOMContentLoaded', ()=>{
    if(Cookies.get('PHPSESSID') == undefined){
        window.location.href = "auth.html";
    }
});