//영화 API요청 코드
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWU4MmZkM2YyNmQ1MzBmNDYyMGUxYWRlYTdlNTNmYyIsInN1YiI6IjY1MzA3ZTJjYWQ1OWI1MDBlMTI5ZTMwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XDs5Jyz-CPhJWQNlUDpXWh3eXjhxYxrD6AnbdRLUB98'
  }
};

//const allList -> let allList // const는 한번 할당되고 나면 재할당할 수 없음
let allList=[];

fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1', options)
  .then(response => {
    if (!response.ok) {
      throw new Error('네트워크 오류');
    }
    return response.json(); // JSON 데이터 가져오기
  })
  .then(data => {
    console.log(data);
    const results = data.results;
     allList=results;
    const movieList = document.getElementsByClassName('item'); 

    results.forEach(movie => {
  //아래 코드를 넣었더니 영화카드1개만 불러와짐..! -> html에서 불러올 개수만큼 div입력해야했음
      // const item = document.getElementsByClassName("movieCard")[0]
      // const title = document.getElementsByClassName("card-title")[0]
      // const text = document.getElementsByClassName("card-text")[0]
      // const poster = document.getElementsByClassName("moviePoster")[0]
 
  //새로운 노드 생성하는 코드로 수정 & 클래스명 입히기    
      const item = document.createElement('div');
      item.classList.add("movieCard")
      const title = document.createElement('h2');
      title.classList.add("card-title")
      const text = document.createElement('p');
      text.classList.add("card-text")
      const poster = document.createElement('img');
      poster.classList.add("moviePoster")

      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      title.innerHTML = `${movie.title}`;
      text.innerHTML = `${movie.overview} <br><br>⭐⭐⭐<br>${movie.vote_average}`;
      
  //영화 id alert 창 띄우기...
      item.addEventListener("click",() => {
        alert("영화ID : " + movie.id);
      })

  //item안에 세가지 요소 넣기
      item.appendChild(poster)
      item.appendChild(title)
      item.appendChild(text)

      const movieListWrap = document.getElementsByClassName("movieListWrap")[0]
      movieListWrap.appendChild(item) //movieListWrap 안에 item 요소들을 넣겠다

    });
  })
  .catch(error => {
    console.error('오류 발생:', error);
  });


//input에 검색어를 입력
  const searchInput = document.querySelector("#inputValue");
  const searchForm = document.querySelector('#searchForm');
  // console.log(searchButton);

 // form태그 안에서 -> input에 엔터나, 버튼 클릭을 하면 submit 이벤트가 발생함
    const searchMovie = (event) => {
      event.preventDefault()
      let searchText = searchInput.value;
  
        console.log(searchText);
      }
//
      searchForm.addEventListener("submit", searchMovie);
  
//영화를 찾아오는 함수



//input값 출력하기
// function printMovie() {
//   const searchInputValue = 
//   document.getElementById("inputValue").value;
//   document.getElementById("result").innerText = searchInputValue;
//   document.getElementById("inputValue").value="";
// }





//   search() {
//   div.html = "";
//   let filterd = allList.filter();
//   filterd.forEach()
// }
