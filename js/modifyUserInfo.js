const registForm = document.getElementsByClassName('regist-container-form')[0];
var isPossibleID = false;
registForm.addEventListener('submit', (event) => {

    const passwordValue = registForm.password.value;
    const passwordCheckRes = passwordCheck(passwordValue);
    if (passwordCheckRes == 1) {
        alert('비밀번호는 8자 이상으로 입력해주세요.');
        event.preventDefault();
        return false;
    }
    if (passwordCheckRes == 2) {
        alert('비밀번호는 영문, 숫자, 특수문자 중 두가지 이상을 사용하여야 합니다.');
        event.preventDefault();
        return false;
    }

    const passwordCheckValue = registForm.passwordCheck.value;
    if (passwordValue && !passwordCheckValue) {
        alert('비밀번호 확인란을 입력해주세요.');
        event.preventDefault();
        return false;
    }

    if (passwordValue != passwordCheckValue) {
        alert('비밀번호가 일치하지 않습니다.');
        event.preventDefault();
        return false;
    }

    const phone2Value = registForm.phone2.value;
    const phone3Value = registForm.phone3.value;
    if ((phone2Value == "") ^ (phone3Value == "")) {
        alert('핸드폰 번호를 올바르게 입력해 주세요.');
        event.preventDefault();
        return false;
    }

    const addressValue = registForm.address.value;
    const addressDetailValue = registForm.addressDetail.value;
    if (addressValue ^ addressDetailValue) {
        alert('주소를 올바르게 입력해 주세요.');
        event.preventDefault();
        return false;
    }
});

function passwordCheck(passwordValue) {
    if ( passwordValue.length == 0) {
        return 0;
    }
    if (passwordValue.length < 8) {
        return 1;
    }
    var check = 0;
    if (numPattern.test(passwordValue)) {
        check += 1;
    }
    if (alphabetPattern.test(passwordValue)) {
        check += 1;
    }
    if (spePattern.test(passwordValue)) {
        check += 1;
    }
    if (check < 2) {
        return 2;
    }
    return 0;
}


var numPattern = /[0-9]/;
var alphabetPattern = /[a-zA-Z]/;
var spePattern = /[~!@\\\#$%<>^&*\(\)]/;

const passwordNoti = document.getElementsByClassName('password-noti')[0];
registForm.password.addEventListener('input', e => {
    const passwordValue = registForm.password.value;
    const passwordCheckRes = passwordCheck(passwordValue);
    switch (passwordCheckRes) {
        case 1:
            passwordNoti.innerHTML = "비밀번호는 8자리 이상이어야 합니다.";
            passwordNoti.classList.remove('noti-green');
            passwordNoti.classList.add('noti-red');
            return false;
        case 2:
            passwordNoti.innerHTML = "비밀번호는 숫자, 영문, 특수문자 중 두가지 이상을 사용하여야합니다.";
            passwordNoti.classList.remove('noti-green');
            passwordNoti.classList.add('noti-red');
            return false;
    }

    passwordNoti.innerHTML = "사용가능한 비밀번호입니다.";
    passwordNoti.classList.add('noti-green');
    passwordNoti.classList.remove('noti-red');
})

const passwordCheckNoti = document.getElementsByClassName('password-check-noti')[0];
registForm.passwordCheck.addEventListener('input', e => {
    if (registForm.password.value != registForm.passwordCheck.value) {
        passwordCheckNoti.innerHTML = "비밀번호가 다릅니다.";
        passwordCheckNoti.classList.remove('noti-green');
        passwordCheckNoti.classList.add('noti-red');
        return false;
    }

    passwordCheckNoti.innerHTML = "";
    passwordCheckNoti.classList.add('noti-green');
    passwordCheckNoti.classList.remove('noti-red');
})


const modifyButton = document.getElementsByClassName('regist-submit')[0];
modifyButton.addEventListener('click', (event) => {
    alert('회원정보 수정이 완료되었습니다.');
});



const addressSearchButton = document.getElementsByClassName('address-find')[0];
const addressText = document.getElementsByName('address')[0];   //주소 입력창. 주소입력창 클릭해도 팝업 뜨게 하기 위함.
function showPopup() {      //주소창 입력 팝업 띄우는 함수
    let windowPop = window.open("./findAddress", "도로명 주소 찾기", "width=650,height=600,top=300");    //순서대로 팝업으로 띄울 url, 팝업 이름(아무거나 상관 없음), 팝업 옵션(크기, 위치 등)
}                                                                                    //더블모니터의 경우 left가 잘 안먹을 수 있음.
addressSearchButton.addEventListener('click', showPopup);   //검색버튼에 클릭 시 발동하는 콜백(팝업 함수) 등록
addressText.addEventListener('click', showPopup);      //주소 입력창에도 클릭 시 발동하는 콜백 등록

window.addEventListener('message', function (e) {   //주소 입력 팝업에서 정보가 들어왔을 경우
    if (e.data['child'] == 'addressPopup') {      //주소 입력 팝업인지 확인.
        registForm.address.value = e.data['content'];         //맞으면 받은 정보를 주소입력창에 대입
    }
});

/* 핸드폰번호 잘라내기 */
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}