const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.anket__form');
const modalBtn = document.querySelector('.ankets__upload__choice__button');
const modalCancel = document.querySelector('.anket__form__cancel-btn');
modalBtn.addEventListener('click', ()=>{
    modal.classList.toggle('modal_active');
});

modalCancel.addEventListener('click', ()=>{
    modal.classList.toggle('modal_active');
    modalForm.reset();
});