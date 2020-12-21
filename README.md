# **Animation Practical Page** - by suna jung
---
<br>

## **프로젝트 설명**

> transition, transform, animation에 관한 수업을 듣고 만든 실습 페이지입니다.<br>
> 4주차 실습 페이지에 애니메이션을 활용하여 홈페이지를 업그레이드 했습니다.<br> 
> 업데이트한 항목은 다음과 같습니다. <br>
> - `첫 구동 시 헤더 애니메이션` : 사이트 첫 접속 시 헤더가 위에서 아래로 내려오도록 애니메이션을<br> 적용했습니다.
> - `side menu` : nav 메뉴 중 커뮤니티, 음악정보, 공연정보를 클릭하면 각각에 해당하는 사이드 메뉴바가<br> 생깁니다.
> - `계열사 아이콘 확대` : 12 개의 계열사 아이콘 각각에 마우스를 갖다대면 사진이 확대됩니다.
> - `상영중 3D화` : 강의에서 배운 내용 중 3D Transform- 정육면체를 제작하여 각각의 면에 포스터를 삽입하고,<br> 여기에 애니메이션을 주어 자동으로 회전하도록 했습니다. 
> - `개발자 사진 layer` : 개발자 사진에 마우스를 갖다대면, 아래 쌓인 이미지들이 나타납니다.
> - `css 파일 추출` : 기존 html 코드속에 삽입되어 있는 <script></script> 을 css 파일로 모두 추출하였습니다.<br> 이 때 적용된 css는 first (4주차), second(5주차)로 나누어 기록했습니다.

<br>

## **주요 코드 설명** 
---
<br>

> 업데이트한 항목들의 주요 코드를 설명해드리겠습니다.<br>
> 크게 **`Header animation, Side menu, 계열사, 상영중, 개발자`** 로 구성됩니다. <br>

### **[ Header animation ]**

<br>

- 위에서 부터 내려오는 애니메이션을 적용했습니다.
- 헤더에만 적용하니 side menu가 보여서, side menu가 hidden일 때 -80px에 위치하도록 수정했습니다.

``` html
<script>
    @keyframes headerAppear{
	from{
	   top: -80px;
	}
	to{
	   top:0px;
	}
 }
</script>
```

### **[ Side menu ]**

<br>

- 교수님이 수업시간에 알려주신 햄버거 메뉴바를 만드는 법을 응용했습니다.
- 커뮤니티, 음악정보, 공연정보를 클릭하면 각각에 해당하는 side menu가 내려오도록 구현했습니다.<br> 이 때, 3개의 사이드바를 만들기 위해 3개의 자바 스크립트가 필요했습니다.

``` javascript
let communityHidden=true;
      const communityButton = document.getElementsByClassName('community-button')[0];
      const communitySideMenu = document.getElementById('communityMenu');
      
      communityButton.addEventListener('click',(event)=>{
         if(communityHidden){
            communitySideMenu.classList.remove('hidden');
            musicinfoSideMenu.classList.add('hidden');
            showinfoSideMenu.classList.add('hidden');
            communityHidden=false;
            musicinfoHidden=true;
            showinfoHidden=true;
         }
         else{
            communitySideMenu.classList.add('hidden');
            communityHidden=true;
         }
      });
      
      let musicinfoHidden=true;
      const musicinfoButton = document.getElementsByClassName('musicinfo-button')[0];
      const musicinfoSideMenu = document.getElementById('musicinfoMenu');
      
      musicinfoButton.addEventListener('click',(event)=>{
         if(musicinfoHidden){
            musicinfoSideMenu.classList.remove('hidden');
            communitySideMenu.classList.add('hidden');
            showinfoSideMenu.classList.add('hidden');
            musicinfoHidden=false;
            communityHidden=true;
            showinfoHidden=true;
         }
         else{
            musicinfoSideMenu.classList.add('hidden');
            musicinfoHidden=true;
         }
      });
      
      let showinfoHidden=true;
      const showinfoButton = document.getElementsByClassName('showinfo-button')[0];
      const showinfoSideMenu = document.getElementById('showinfoMenu');
      
      showinfoButton.addEventListener('click',(event)=>{
         if(showinfoHidden){
            showinfoSideMenu.classList.remove('hidden');
            communitySideMenu.classList.add('hidden');
            musicinfoSideMenu.classList.add('hidden');
            showinfoHidden=false;
            communityHidden=true;
            musicinfoHidden=true;
         }
         else{
            showinfoSideMenu.classList.add('hidden');
            showinfoHidden=true;
         }
      });
```

-  <응용> 으로 알려주셨던 코드를 붙여넣기하여, 각각의 side bar에 한개씩 총 3개를 붙여넣었습니다.<br> 여러번 본 끝에 이해한 바로는 hidden 속성이 있으면 안보인다는 것이기 때문에, hidden 속성이 있을 때 클릭했다면 hidden을 제거하여 보이도록, 없을 때 클릭했다면 hidden을 추가해 안보이도록 하는 자바스크립트 코드라고 이해했습니다.<br><br> 따라서 이를 응용해 menu를 3개로 늘리고, 한개의 menu에 hidden 속성이 제거될 때. 즉 보일 때 나머지는 추가하여 안보이도록, 한개의 menu에 hidden 속성이 추가될 때. 즉 안보일 때 hidden 값에 true를 주도록 하여 코드를 구성했습니다.  

- cubic-bezier(0.0, 0.0, 0.1, 1.0)를 통해 side menu가 내려오는 속도를 조절했습니다. <br>

- 이외에도 미적요소를 위해 테두리를 추가하고, 호버됐을 경우 배경색이 바뀌도록 해주었습니다.


<br><br>

### **[ 계열사 ]**

<br>

- 수업 중 배운 [사진첩] 처럼, 계열사에 마우스를 호버했을 때 커지는 애니메이션을 추가했습니다.

``` html
<style>
 .container :hover{
	transition:1s;
	transform:tranlate(-20,-20);
	transform:scale(1.1, 1.1);
	border:1px solid #eaeaea;
 }
</style>
```

- 축을 -20, -20으로 고정하여 가운데부터 커지도록 했고, 기존 크기보다 1.1배 커지게 transform을 적용했습니다.
<br><br>

### **[ 상영중 ]**

<br>

- 수업 중에 배운 코드를 활용하여 정육면체를 구성하고, 각각의 면에 이미지를 채워넣었습니다.
- 원하는 각도만큼 회전시키기 위해 아래와 같은 keyframes을 삽입하였습니다.

``` html
<style>
@keyframes rollingPoster{
	from{}
	8%{
	   transform:rotateX(86deg) rotateZ(-4deg) ;
	}
	16%{
	   transform:rotateX(86deg)  rotateZ(-4deg) ;
	}
	24%{
	   transform:rotateX(86deg) rotateZ(86deg);
	}
	32%{
	   transform:rotateX(86deg) rotateZ(86deg);
	}
	41%{
	   transform:rotateX(86deg) rotateZ(86deg) rotateY(-90deg);
	}
	50%{
	   transform:rotateX(86deg) rotateZ(86deg) rotateY(-90deg);
	}
	58%{
	   transform:rotateX(86deg) rotateZ(176deg) rotateY(-90deg);
	}
	66%{
	   transform:rotateX(86deg) rotateZ(176deg) rotateY(-90deg);
	}
	74%{
	   transform:rotateX(176deg) rotateZ(180deg) rotateY(-86deg);
	}
	82%{
	   transform:rotateX(176deg) rotateZ(180deg) rotateY(-86deg);
	}
	91%{
	   transform:rotateX(176deg) rotateZ(180deg) rotateY(-176deg);
	}
	to{
	   transform:rotateX(176deg) rotateZ(180deg) rotateY(-176deg);
	}
 }
</style>
```

- 처음에는 입체적 요소를 생각하지 않고 90도씩 회전하는 것을 목표로 일일이 구성한 뒤,<br> 큐브 모양을 생각해 입체모양을 생기도록 +- 4도씩을 해주었습니다.
<br><br>

### **[ 개발자 ]**

<br>

- 이미지 크기를 profile-img-wrapper로 잡아준 뒤, 그 공간만큼 텍스트를 밀어내게했습니다.
- profile 자식요소 2,3에 z-index를 뒤로갈수록 작게 설정해주었고 각각의 위치를 %로 적용했습니다.
- 마우스가 호버되면 width가 커지게 되어, 겹쳐있다가 퍼지는 것처럼 보이는 효과를 주었습니다.

``` html
<style>
.profile-img-wrapper{
	float:left;
	position:relative;
	width:300px;
	height:250px;
	
}
.img-wrapper{
	position:absolute;
	width:30px;
	transition:0.5s;
}
.img-wrapper:hover{
	width:800px;
	transition:0.5s;
}
.profile{
	position:absolute;
	z-index:3;
}
.profile:nth-child(2){
	left:35%;
	z-index:2;
}
.profile:nth-child(3){
	z-index:1;
	left:70%;
}
</style>
```
<br><br>


## **비고 및 고찰** 
---
<br>
배운 내용을 모두 적용하려고 하다보니 고민이 많았습니다. 배운걸 모두 적용하면서, 사이트의 미관도 해치지 않아야 했기 때문에 어떤 요소들을 추가 할 지 결정하는데만 며칠을 고민했습니다.  <br><br>
특히 3D Transform의 경우 어떻게 이용해야 사이트의 미관을 업그레이드하면서도 적용시킬 수 있을지 고민하다가,<br>큐브모양으로 상영중을 표시하면 괜찮겠단 생각이 들어 제작했는데, 결과물이 만족스러워 좋았습니다 :)
<br><br>
애니메이션을 추가하는 것 자체는 어렵지 않았지만, 이를 응용 및 결합하여 사용할 때 고민한 문제가 몇가지 있었습니다. 자세한 사항은 다음과 같습니다!. <br><br>

### **제작 시 주요사항** <br>

**1. 사이드 메뉴 제작 시 스크립트가 3개 필요함.** <br>
=> 강의 시간에 배운 햄버거 메뉴를 응용해서, 각각 메뉴를 클릭했을 때 하위 메뉴가 나오도록 구성하고 싶었습니다. '커뮤니티' 메뉴 한 개에 적용하는 것 자체는 쉬웠으나, 3개의 메뉴에 각각 적용하려고하니 스크립트가 3개 필요하다는 것을 깨달았습니다.<br><br> 자바스크립트를 배워본 적이 없어서 어렵고 다소 해맸으나, 결국 hidden을 3개로 나누고 복사-붙여넣기하여 한 요소가 hidden을 추가할 때 나머지를 제거하는 식으로 코드를 짜니, 생각한대로 작동했습니다.

**2. 정육면체 보이는 각도 조절** <br>
=> 강의에서 알려주신 대로 정육면체는 제작했으나, 큐브 형식으로 입체감있게 보여지길 원했습니다.<br> 원하는대로 x, y, z축을 조절하기 위해 머릿속으로 시뮬레이션도 많이 돌려보고 테스트도 많이해서 최적의 각도를 찾아냈습니다.

**3. 정육면체에 애니메이션 추가.** <br>
=> 정육면체가 자연스럽게 움직이면서 상영중인 포스터를 보여주면 미적으로 좋을 것 같다는 생각이 들어, 정육면체에 ` @keyframes rollingPoster `를 적용했습니다. 8% 범위에 맞추어 애니메이션을 추가하였더니, 적당한 속도로 보여지기가 가능했습니다.

**4. 애니메이션, z-index 응용 - 사진 layer 만들기.** <br>
=> 사진을 쌓아놓고, 마우스를 올렸을 때 옆으로 퍼지게 만들고 싶었습니다. 우선 z-index를 이용해 순서대로 쌓이게했는데, 이를 어떻게 겹칠지 고민을 많이했습니다. 스크립트를 사용하지 않고 가능할까에대해 많은 생각을 하다가, 문득 absolute 속성이 생각났습니다.<br><br> 위치를 %로 지정해놓고, 처음 크기를 작게 잡은 후 마우스가 호버 되었을 때 너비자체를 늘려버리면, %대로 위치하기 때문에 원하는 장소에 위치시킬 수 있을 거란 생각이 들었고, 몇번의 시도 끝에 30px -> 800px 정도 변환하면 원하는 만큼의 애니메이션이 이루어진다는 사실을 알게되었습니다.


<br><br>

## **Java Script를 배우고 추가하고 싶은 요소들** 
---
<br>
이번 사이트 제작 시 떠오른 아이디어지만, 아직 스크립트를 배우지 않아 아이디어로만 남긴 부분입니다. 이 부분들은 다음 수업을 배우고 업데이트 하려고 합니다. <br><br>

> - 사이트 내 이스터에그 추가 ( 특정 행위 시 사이트가 90도 돌거나 하는 이스터에그 추가)
> - 배너 그리드(3개짜리)에 마우스 갖다대면 해당 광고로 변하게 하기