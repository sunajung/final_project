const shoppingCartButton = document.getElementsByClassName('shopping-cart')[0];
const shoppingCartURL = '/detail';
shoppingCartButton.addEventListener('click', (e) => {
    if (!document.getElementsByClassName('isLogin')[0]) {
        alert('먼저 로그인 해주세요.');
        return false;
    }
    const pid = shoppingCartButton.getAttribute('value');
    const option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'pid':pid } )
    };
    fetch(shoppingCartURL, option)
        .then(res => {
            res.json().then(data => {
                if (data.res) {
                    alert("장바구니에 추가되었습니다.");
                    isPossibleID = true;
                }
                else {
                    alert("이미 장바구니에 담긴 상품입니다.")
                }
            })
        });
});


var buyButton = document.getElementsByClassName('buy-item')[0];
buyButton.addEventListener('click', (event) => {
    if (!document.getElementsByClassName('isLogin')[0]) {
        alert('먼저 로그인 해주세요.');
        return false;
    }
    const item = [Number(event.currentTarget.getAttribute('value'))];
    buy(item);
});
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
                    "[정선아]에게["+data.priceStr+"]원을 송금하시면 배송됩니다.");
                    location.reload();
                }
                else {
                    alert("구매 실패하였습니다.");
                }
            })
        });
}
