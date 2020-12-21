var buyButton = document.getElementsByClassName('buy-item');
for (var i = 0; i < buyButton.length;i++) {
    buyButton[i].addEventListener('click', (event) => {
        const item = [Number(event.currentTarget.getAttribute('value'))];
        buy(item);
    });
}
const buyAllButton = document.getElementsByClassName('buy-all')[0];
if (buyAllButton) {
    buyAllButton.addEventListener('click', (event) => {
        const items = [];
        for (var i = 0; i < buyButton.length; i++) {
            items.push(Number(buyButton[i].getAttribute('value')));
        }
        buy(items);
    });
}
const buyURL = '/buy';
function buy(items) {
    if (!confirm('정말구매하시겠습니까? 이가격에요..?')) {
        return false;
    }
    const option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ buys: items }),
    }
    fetch(buyURL, option)
        .then(res => {
            res.json().then(data => {
                if (data.res) {
                    alert("구매 완료하였습니다.\n" +
                        "[정선아]에게[" + data.priceStr + "]원을 송금하시면 배송됩니다.");
                    location.reload();
                }
                else {
                    alert("구매 실패하였습니다.");
                }
            })
        });
}


var deleteButton = document.getElementsByClassName('delete-item');
var deleteItemlist = [];
for (var i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', (event) => {
        const item = Number(event.currentTarget.getAttribute('value'));
        delitem(item);
    });
}
const deleteURL = '/buy/delete';
function delitem(item) {
    const option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deletes: item }),
    }
    fetch(deleteURL, option)
        .then(res => {
            res.json().then(data => {
                if (data.res) {
                    alert("삭제 완료하였습니다.");
                    location.reload();
                }
                else {
                    alert("삭제 실패하였습니다.");
                }
            })
        });
}



var price = document.getElementsByClassName('item-price-all')[0];
if (price) {
    price.innerHTML = price.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}