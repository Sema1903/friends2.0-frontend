let text = document.getElementById('text');
let submit = document.getElementById('submit');
let back = document.getElementById('back_button');
let f = 'no';
let money = document.getElementById('money');
function w(){
    money.style.display = 'none';
    text.value = '';
    window.location.href = 'chats.html';
}
function q(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    money.appendChild(p);
    money.style.display = 'block';
    setTimeout(w, 1000);
};
document.querySelector('input[type=file]').onchange = (event) => {
    let reader = new FileReader();
    reader.onload = () => f = reader.result;
    reader.readAsDataURL(event.target.files[0]);
}
let params = {id: localStorage.getItem('hash')};
let url = new URL('http://127.0.0.1:5000/pub');
url.search = new URLSearchParams(params);
function to_main(){
    window.location.href = 'opti.html';
}
function publicate(){
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        fetch('http://127.0.0.1:5000/publicate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'text': text.value, 'file': f, 'hash': localStorage.getItem('hash')})
        })
            .then(res => res.json())
            .then(data => {
                if (data['answer'] == 'yes'){
                    q('Публикация опубликована');
                }
            })
            .catch(error => console.error('Ошибка:', error));
    })
}
submit.addEventListener('click', publicate);
back.addEventListener('click', to_main);