
var price = document.getElementsByClassName('item-price-all')[0];
price.innerHTML = price.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

var deleteButton = document.getElementsByClassName('delete-buy-item');
var deleteItemlist = [];
for (var i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', (event) => {
        if (!confirm("입금하셨을경우 환불되지않습니다.\n" +
            "정말 삭제하시겠습니까?")) {
            return;
        }
        const item = [Number(event.currentTarget.getAttribute('value'))];
        delitem(item);
    });
}

const deleteURL = '/mypage/delete';
function delitem(item) {
    console.log(item);
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


