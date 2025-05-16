let avatar = document.getElementById('avatar_img');
let name1 = document.getElementById('name');
let back_button = document.getElementById('back_button');
let write_input = document.getElementById('write_input');
let submit_button = document.getElementById('submit_button');
let file = document.getElementById('file_inpu');
let main = document.getElementById('main');
let head_div = document.getElementById('head_div');
f = 'no';
document.querySelector('input[type=file]').onchange = (event) => {
    let reader = new FileReader();
    reader.onload = () => f = reader.result;
    reader.readAsDataURL(event.target.files[0]);
}
write();
function write(){
    main.textContent = '';
    let params = {id: localStorage.getItem('hash') + ' ' + localStorage.getItem('id3')};
        let url = new URL('http://127.0.0.1:5000/write');
        url.search = new URLSearchParams(params);
        fetch(url, {headers: {'Accept': 'application/json'}})
            .then(response =>{return response.json()})
            .then(data => {
                name1.textContent = data['name'];
                if(data['avatar'] != ''){
                    avatar.src = data['avatar'];
                }else{
                    avatar.src = 'images/unknown.png';
                }
                for(let i = 0; i < data['messages'].length; i++){
                    let main_div = document.createElement('div');
                    let text_p = document.createElement('p');
                    let file_img = document.createElement('img');
                    text_p.className = 'text_p';
                    file_img.className = 'file_img'
                    if(data['messages'][i]['autor_id'] == localStorage.getItem('hash')){
                        main_div.className = 'my_main_div'
                    }else{
                        main_div.className = 'main_div';
                    }
                    if(data['messages'][i]['file'] != 'no'){
                        file_img.src = data['messages'][i]['file'];
                    }
                    text_p.textContent = data['messages'][i]['text'];
                    main_div.appendChild(text_p);
                    main_div.appendChild(file_img);
                    if(i == data['messages'].length - 1){
                        main_div.style.marginBottom = '150px';
                    };
                    if(data['messages'][i]['special'] == 'friend'){
                        if(data['messages'][i]['autor_id'] == localStorage.getItem('hash')){
                            text_p.textContent = 'Ответа пока не было';
                        }else{
                            let answer_button = document.createElement('button');
                            answer_button.textContent = 'Добавить';
                            answer_button.addEventListener('click', ()=>{
                                fetch('http://127.0.0.1:5000/yes_friend', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({'id1': localStorage.getItem('hash'), 'id2': localStorage.getItem('id3')})
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if(data['answer'] == 'yes'){
                                            write();
                                        }
                            })});
                            main_div.appendChild(answer_button);
                        }
                    };
                    if(data['messages'][i]['special'] == 'ice'){
                        file_img.src = 'images/icon.jpeg'
                    };
                    if(data['messages'][i]['special'] == 'nft'){
                        let dop = document.createElement('div');
                        dop.className = 'dop';
                        main_div.appendChild(dop);
                    }
                    main.appendChild(main_div);
                    window.scrollBy(0, innerHeight);
                }
            })
        }
submit_button.addEventListener('click', ()=>{
    fetch('http://127.0.0.1:5000/writes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'autor_id': localStorage.getItem('hash'), 'giver_id': localStorage.getItem('id3'), 'text': write_input.value, 'file': f})
    })
        .then(res => res.json())
        .then(data => {
            file.value = null;
            write_input.value = null;
            write();
        }
)})
back_button.addEventListener('click', () =>{
    window.location.href = 'chat.html';
});
head_div.addEventListener('click', ()=>{
    localStorage.setItem('id2', localStorage.getItem('id3'));
    localStorage.setItem('action', 'write');
    window.location.href = 'account.html';
})