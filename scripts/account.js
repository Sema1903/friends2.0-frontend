let name_p = document.getElementById('name_p');
let back_button = document.getElementById('back_button');
let buy_button = document.getElementById('buy_button');
let avatar = document.getElementById('avatar');
let params = {id: localStorage.getItem('id2')};
let id_p = document.getElementById('id_p');
let about_p = document.getElementById('about_p');
let balance = document.getElementById('balance');
let nfts = document.getElementById('nfts');
let friend_button = document.getElementById('friend_button');
let reduct_button = document.getElementById('reduct_button');
let url = new URL('http://127.0.0.1:5000/your_iceberg');
url.search = new URLSearchParams(params)
fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response => {return response.json()})
        .then(data =>{
            console.log(data);
            balance.textContent = 'Баланс: ' + data['balance'] + ' ICE';
        })
url = new URL('http://127.0.0.1:5000/account');
url.search = new URLSearchParams(params);
fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        name_p.textContent = 'Имя: ' + data['name'];
        id_p.textContent = 'ID: ' + localStorage.getItem('id2');
        if(data['about'] != ''){
            about_p.textContent = 'Обо мне: ' + data['about'];
        }else{
            about_p.textContent = 'Обо мне: Привет всем! Я использую Друзья 2.0!';
        }
        if(data['avatar'] != ''){
            avatar.src = data['avatar'];
        }else{
            avatar.src = 'images/unknown.png'; 
        };
        for(let i = 1; i < data['nft'].split(' ').length; i++){
            let nft = document.createElement('img');
            nft.className = 'nft_img';
            nft.src = data['nft'].split(' ')[i]
            nfts.appendChild(nft);
        }
});
url = new URL('http://127.0.0.1:5000/your_friends');
url.search = new URLSearchParams(params);
fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => { 
        console.log(data);
        for(let i = 0; i < data.length; i++){
            let friend = document.createElement('div');
            friend.className = 'friend';
            let favatar = document.createElement('img');
            favatar.id = 'favatar';
            if(data[i]['avatar'] != ''){
                favatar.src = data[i]['avatar'];
            }else{
                favatar.src = 'images/unknown.png';
            }
            let fname = document.createElement('p');
            fname.textContent = data[i]['name'];
            friend.appendChild(favatar);
            friend.appendChild(fname);
            friend.addEventListener('click', ()=>{
                localStorage.setItem('id2', data[i]['id']);
                window.location.href = 'account.html';
            });
            friends.appendChild(friend);
        }
});
let params2 = {id: localStorage.getItem('id2')};
let url1 = new URL('http://127.0.0.1:5000/your_lent');
url1.search = new URLSearchParams(params2);
fetch(url1, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        console.log(data);
        for(let i = 0; i < data.length; i++){
            if(data[i]['number'] != 0){
                let autor_h3 = document.createElement('h3');
                let text_p = document.createElement('p');
                let main_div = document.createElement('div');
                let head_div = document.createElement('div');
                let avatar = document.createElement('img');
                let file_name = data[i]['file']
                autor_h3.className = 'autor_h3';
                avatar.className = 'avatar';
                text_p.className = 'text_p';
                main_div.className = 'main_div';
                head_div.className = 'head_div';
                autor_h3.innerText = data[i]['autor'];
                if(data[i]['avatar'] != ''){
                    avatar.src = data[i]['avatar'];
                }else{
                    avatar.src = 'images/unknown.png';
                }
                text_p.innerText = data[i]['text'];
                head_div.appendChild(avatar);
                head_div.appendChild(autor_h3);
                main_div.appendChild(head_div);
                main_div.appendChild(text_p);
                main.appendChild(main_div);
                if (file_name != 'no'){
                    let file = document.createElement('img');
                    file.src = file_name;
                    file.className = 'file';
                    main_div.appendChild(file);
                }
        }        
}});
back_button.addEventListener('click', () => {
    window.location.href = localStorage.getItem('action') + '.html';
});
write_button.addEventListener('click', () =>{
    localStorage.setItem('id3', localStorage.getItem('id2'));
    window.location.href = 'write.html'
});
let url2 = new URL('http://127.0.0.1:5000/your_nft');
url2.search = new URLSearchParams(params2);
fetch(url2, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        for(let i = 0; i < data.length; i++){
            let popup = document.createElement('div');
            popup.id = 'popup';
            let nft_number = document.createElement('h2');
            nft_number.id = 'nft_number';
            let nft_author = document.createElement('p');
            nft_author.id = 'nft_author';
            let nft_img = document.createElement('img');
            nft_img.id = 'nft_img';
            let nft_cost = document.createElement('p');
            nft_cost.id = 'nft_cost';
            let dop_nft = document.createElement('div')
            dop_nft.className = 'dop_div';
            popup.appendChild(nft_img);
            popup.appendChild(nft_number);
            popup.appendChild(dop_nft);
            popup.appendChild(nft_author);
            popup.appendChild(nft_cost);
            let popupest = document.getElementById('popupest');
            popupest.appendChild(popup);
            let nft_button = document.createElement('img');
            nft_button.className = 'nft_img';
            nft_button.src = data[i]['nft'];
            let dopest = document.createElement('div');
            dopest.className = 'dopest';
            dopest.addEventListener('click', ()=>{
                nft_img.src = data[i]['nft'];
                nft_author.textContent = 'Создатель: ' + data[i]['creator'];
                nft_cost.textContent = 'Стоимость: ' + data[i]['cost'] + ' ICE';
                nft_number.textContent = 'Номер NFT: ' + data[i]['ip'];
                popup.style.display = 'block';
            });
            popup.addEventListener('click', ()=>{
                popup.style.display = 'none';
            });
            dopest.style.left = String((i % 4)*190) + 'px';
            dopest.style.top = String(Math.trunc((i) / 4) * 180) + 'px';
            dopest.style.zIndex = String(i + 3);
            popup.style.zIndex = String(i + 4);
            nfts.appendChild(dopest);
            nfts.appendChild(nft_button);
        }
    });
friend_button.addEventListener('click', ()=>{
    fetch('http://127.0.0.1:5000/friend', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'hash': localStorage.getItem('hash'), 'id': localStorage.getItem('id2')})
    })
        .then(res => res.json())
        .then(data => {
            if(data['answer'] == 'yes'){
                friend_button.disabled = true;
                friend_button.style.background = 'green';
            }
})});