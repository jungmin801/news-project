let news = [];
let menu = document.querySelectorAll(".menu button")
let searchButton = document.getElementById("search-button")
let url;

menu.forEach(item=>item.addEventListener("click",(event)=>getNewsByTopic(event)))

//뉴스 가져오기
const getNews = async() => {
    try{   
    let header = new Headers({'x-api-key':'2acd03b1ca974701af78370bc29b72e2'});
    let response = await fetch(url,{headers:header}); // ajax, fetch, http
    let data = await response.json(); // fetch한 것을 json으로 바꿔줘야 우리가 이해할 수 있는 데이터 타입으로 표현됨
    
    if(response.status == 200){
        if(data.totalResults == 0){
            throw new Error("No matches for your search.")
        }
        news = data.articles;
        console.log(news)
        render();
    } else {
        throw new Error(data.message)
    }
    }catch(error){
        errorRender(error.message)
    }
}

    

// 최신 뉴스 가져오기
const getLatestNews = async() => {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=2acd03b1ca974701af78370bc29b72e2`);
    getNews();
}

//카테고리별 클릭 시 뉴스 가져오기
const getNewsByTopic = async(event) =>{
    let topic = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${topic}&apiKey=2acd03b1ca974701af78370bc29b72e2`);
    getNews();
}


//검색 시 뉴스 가져오기
const getNewsByKeyword = async() =>{
    let searchKeyword = document.getElementById("search-input").value
    url = new URL(`https://newsapi.org/v2/everything?q=${searchKeyword}&apiKey=2acd03b1ca974701af78370bc29b72e2`);
    getNews();
}


  //뉴스 보여오기
  const render = () => {
    let newsHTML="";

    newsHTML = news.map((item) => {
        return `<div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src="${
                    item.urlToImage == null
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                    : item.urlToImage}"/>
            </div>
            <div class="col-lg-8">
                <h2 class="new-title">${item.title}</h2>
                <P>
                     ${
                        item.content == null
                        ? "내용없음"
                        : item.content.length > 200
                        ? item.content.substring(0,200) + "..."
                        : item.content
                     }
                </P>
                <div class="news-etc">
                ${  item.author == null || item.author == ''
                    ? "Unknown"
                    : item.author
                } 
                * ${
                    item.source.name == null
                    ? "no source"
                    : item.source.name
                } 
                * ${
                    moment(item.publishedAt).fromNow()
                }
                </div>
            </div>
        </div>`;
    }).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
}

// 에러 보여주기
const errorRender = (message) => {
    let errorHTML=`<div class="alert alert-danger text-center" role="alert"> ${message} </div>`
    document.getElementById("news-board").innerHTML = errorHTML;                
}

searchButton.addEventListener("click", getNewsByKeyword)
getLatestNews();

//mobile version sidenav
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

//검색아이콘 클릭
  function openSearchBox() {
    let searchInputArea = document.getElementById("input-area");
    if (searchInputArea.style.display == "none"){
        searchInputArea.style.display = "inline";
    } else {
        searchInputArea.style.display = "none";
    }
  }


