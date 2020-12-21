
let communityHidden = true;
const communityButton = document.getElementsByClassName('community-button')[0];
const communitySideMenu = document.getElementById('communityMenu');

communityButton.addEventListener('click', (event) => {
    if (communityHidden) {
        communitySideMenu.classList.remove('hidden');
        musicinfoSideMenu.classList.add('hidden');
        showinfoSideMenu.classList.add('hidden');
        communityHidden = false;
        musicinfoHidden = true;
        showinfoHidden = true;
    }
    else {
        communitySideMenu.classList.add('hidden');
        communityHidden = true;
    }
});

let musicinfoHidden = true;
const musicinfoButton = document.getElementsByClassName('musicinfo-button')[0];
const musicinfoSideMenu = document.getElementById('musicinfoMenu');

musicinfoButton.addEventListener('click', (event) => {
    if (musicinfoHidden) {
        musicinfoSideMenu.classList.remove('hidden');
        communitySideMenu.classList.add('hidden');
        showinfoSideMenu.classList.add('hidden');
        musicinfoHidden = false;
        communityHidden = true;
        showinfoHidden = true;
    }
    else {
        musicinfoSideMenu.classList.add('hidden');
        musicinfoHidden = true;
    }
});

let showinfoHidden = true;
const showinfoButton = document.getElementsByClassName('showinfo-button')[0];
const showinfoSideMenu = document.getElementById('showinfoMenu');

showinfoButton.addEventListener('click', (event) => {
    if (showinfoHidden) {
        showinfoSideMenu.classList.remove('hidden');
        communitySideMenu.classList.add('hidden');
        musicinfoSideMenu.classList.add('hidden');
        showinfoHidden = false;
        communityHidden = true;
        musicinfoHidden = true;
    }
    else {
        showinfoSideMenu.classList.add('hidden');
        showinfoHidden = true;
    }
});

