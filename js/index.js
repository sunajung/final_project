
let bannerNum = 1;
const banner = document.getElementsByClassName('banner-section')[0];
const bannerButton1 = document.getElementsByClassName('banner1')[0];
const bannerButton2 = document.getElementsByClassName('banner2')[0];
const bannerButton3 = document.getElementsByClassName('banner3')[0];

bannerButton1.addEventListener('click', (e) => { changeBanner(1); e.stopPropagation(); });
bannerButton2.addEventListener('click', (e) => { changeBanner(2); e.stopPropagation(); });
bannerButton3.addEventListener('click', (e) => { changeBanner(3); e.stopPropagation(); });

function getButton(num) {
    switch (num) {
        case 1: return bannerButton1;
        case 2: return bannerButton2;
        case 3: return bannerButton3;
    }
}

function changeBanner(num) {
    if (num == 4) num = 1;
    nowBanner = num;
    for (var i = 1; i <= 3; i++) {
        if (i == num) {
            var bannerButton = getButton(i);
            bannerButton.classList.add('clicked');
            continue;
        }
        var bannerButton = getButton(i);
        bannerButton.classList.remove('clicked');
        banner.classList.remove('banner-bg' + i);
    }
    counter = 0;
    banner.classList.add('banner-bg'+num);
}

var nowBanner = 1;
var counter = 0;
setInterval(() => {
    counter += 30;
    if (counter > 3000) {
        counter -= 3000;
        changeBanner(nowBanner+1);
    }
}, 30);

var bannerSection = document.getElementsByClassName('banner-section')[0];
bannerSection.addEventListener('click', (e) => {
    var eventPost = 0;
    switch (nowBanner) {
        case 1: eventPost = 48; break;
        case 2: eventPost = 49; break;
        case 3: eventPost = 50; break;
    }
    location.href = "/post/" + eventPost + "/1";
});

document.addEventListener('scroll', setAside);
var asideElement = document.getElementsByTagName('aside')[0];
function setAside() {
    var asideTop = 540 - document.documentElement.scrollTop;
    if (asideTop < 140) asideTop = 140;
    asideElement.style.top = asideTop + 'px';
}
setAside();


var section = document.getElementsByClassName('best-product-contanier')[0];
setInterval(() => {
    var asideLeft = (section.clientWidth + window.innerWidth) / 2;
    asideLeft += 15;
    if (asideLeft < 1415) asideLeft = 1415;
    asideElement.style.left = asideLeft + 'px';
}, 16)