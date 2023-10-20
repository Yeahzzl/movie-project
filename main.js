//영화 API요청 코드
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWU4MmZkM2YyNmQ1MzBmNDYyMGUxYWRlYTdlNTNmYyIsInN1YiI6IjY1MzA3ZTJjYWQ1OWI1MDBlMTI5ZTMwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XDs5Jyz-CPhJWQNlUDpXWh3eXjhxYxrD6AnbdRLUB98'
  }
};

const allList=[];

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
    //  allList=results;
    const movieList = document.getElementsByClassName('item');

    results.forEach(movie => {
      // const item = document.getElementsByClassName("movieCard")[0]
      // const title = document.getElementsByClassName("card-title")[0]
      // const text = document.getElementsByClassName("card-text")[0]
      // const poster = document.getElementsByClassName("moviePoster")[0]

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
      
      //영화 id alert 창 띄우기
      item.addEventListener("click",() => {
        alert(movie.id);
      })

      item.appendChild(poster)
      item.appendChild(title)
      item.appendChild(text)

      const movieListWrap = document.getElementsByClassName("movieListWrap")[0]
      movieListWrap.appendChild(item)

    });
  })
  .catch(error => {
    console.error('오류 발생:', error);
  });

  // search() {
  //   div.html = "";
  //   let filterd = allList.filter();
  //   filterd.forEach()
  // }


 

