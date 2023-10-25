//영화 API요청 코드
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWU4MmZkM2YyNmQ1MzBmNDYyMGUxYWRlYTdlNTNmYyIsInN1YiI6IjY1MzA3ZTJjYWQ1OWI1MDBlMTI5ZTMwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XDs5Jyz-CPhJWQNlUDpXWh3eXjhxYxrD6AnbdRLUB98"
  }
};

const movieListWrap = document.getElementsByClassName("movieListWrap")[0];
const movieList = document.getElementsByClassName("item");
//const allList -> let allList // const는 한번 할당되고 나면 재할당할 수 없음
let allList = [];

//fetch 바깥으로 빼서 여러번 적을 필요 없이 함수를 이용해서 재사용 가능
function renderMovie(results) {
  results.forEach((movie) => {
    //아래 코드를 넣었더니 영화카드1개만 불러와짐..! -> html에서 불러올 개수만큼 div입력해야했음
    // const item = document.getElementsByClassName("movieCard")[0]
    // const title = document.getElementsByClassName("card-title")[0]
    // const text = document.getElementsByClassName("card-text")[0]
    // const poster = document.getElementsByClassName("moviePoster")[0]

    //새로운 노드 생성하는 코드로 수정 & 클래스명 입히기
    const item = document.createElement("div");
    item.classList.add("movieCard");
    const title = document.createElement("h2");
    title.classList.add("card-title");
    const text = document.createElement("p");
    text.classList.add("card-text");
    const poster = document.createElement("img");
    poster.classList.add("moviePoster");

    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    title.innerHTML = `${movie.title}`;
    text.innerHTML = `${movie.overview} <br><br>⭐⭐⭐<br>${movie.vote_average}`;

    //영화 id alert 창 띄우기...
    item.addEventListener("click", () => {
      alert("영화ID : " + movie.id);
    });

    //item안에 세가지 요소 넣기
    item.appendChild(poster);
    item.appendChild(title);
    item.appendChild(text);

    movieListWrap.appendChild(item); //movieListWrap 안에 item 요소들을 넣겠다
  });
}
fetch("https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1", options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("네트워크 오류");
    }
    return response.json(); // JSON 데이터 가져오기
  })
  .then((data) => {
    console.log(data);
    const results = data.results;
    allList = results;
    renderMovie(results);
  })
  .catch((error) => {
    console.error("오류 발생:", error);
  });

//input에 검색어를 입력
const searchInput = document.querySelector("#inputValue");
const searchForm = document.querySelector("#searchForm");
// console.log(searchButton);

// form태그 안에서 -> input에 엔터나, 버튼 클릭을 하면 submit 이벤트가 발생함
const searchMovie = (event) => {
  event.preventDefault(); //submit 이벤트를 이용했을때 form 태그가 기본적으로 가지고 있는 새로고침 기능을 작동하지 않게 하는 코드
  let searchText = searchInput.value;
  if (searchText === "") {
    alert("제목을 입력해주세요"); //검색어가 없을때 창 띄우기
  }
  console.log(searchText);
  console.log(allList);

  //filter 기능을 이용해서 검색어에 맞는 영화만 남기고 지우는 과정
  const filtered = allList.filter((movie) => {
    return (
      movie.title === searchText || movie.title.replace(/ /g, "") === searchText || movie.title.includes(searchText)
    );
  });
  movieListWrap.innerHTML = ""; //영화카드 지우기
  console.log(filtered); //검색어에 맞게 필터된 영화만 남기기
  renderMovie(filtered);
};

searchForm.addEventListener("submit", searchMovie);

/*
//내가 시도했다가 실패한 코드들 어딘가 많이 부족함
//filter를 이용해 input에 해당하는 값만 불러오기(하고싶다.......)

    let filtered =  
    allList.filter(function(movie) {
      return movie.title === searchText;
    });
    console.log(filtered);
  
item.forEach((card) => {
  const title = card.querySelector(".movie-title").textContent;
  const searchValue = searchInput;

  if (title.includes(searchValue)) {
    card.style.display = "block";
  } else {
    card.style.display = "none";
  }
});

// //값이 입력되지 않았을때 제목을입력해주세요가 출력....?
let searchText = "";
if (searchText === "") {
  alert("제목을 입력해주세요");
}
*/
