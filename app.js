let ipadMQ = window.matchMedia("(min-width: 768px)");

ipadMQ.onchange = (e) => {
  if (e.matches) {
    let slidesNum = 4;
    let spaceNum = 30;
    useSwiper(slidesNum, spaceNum);
  } else {
    let slidesNum = 3;
    let spaceNum = 15;
    useSwiper(slidesNum, spaceNum);
  }
};

function useSwiper(slidesNum, spaceNum) {
  const swiperResults = new Swiper("#search-results .swiper", {
    direction: "horizontal",
    slidesPerView: slidesNum,
    spaceBetween: spaceNum,
    loop: false,
    navigation: {
      nextEl: "#search-results .swiper-btn-next",
      prevEl: "#search-results .swiper-btn-prev",
    },
  });

  const swiperLatest = new Swiper("#latest-releases .swiper", {
    direction: "horizontal",
    slidesPerView: slidesNum,
    spaceBetween: spaceNum,
    loop: false,
    navigation: {
      nextEl: "#latest-releases .swiper-btn-next",
      prevEl: "#latest-releases .swiper-btn-prev",
    },
  });

  const swiperGenres = new Swiper("#movies-genres .swiper", {
    direction: "horizontal",
    slidesPerView: slidesNum,
    spaceBetween: spaceNum,
    loop: false,
    navigation: {
      nextEl: "#movies-genres .swiper-btn-next",
      prevEl: "#movies-genres .swiper-btn-prev",
    },
  });
}

if (ipadMQ.matches) {
  let slidesNum = 4;
  let spaceNum = 30;
  useSwiper(slidesNum, spaceNum);
} else {
  let slidesNum = 3;
  let spaceNum = 15;
  useSwiper(slidesNum, spaceNum);
}

/* -------------- -------------- -------------- VARS -------------- -------------- --------------  */
let genre = ""
let movieDetails = {}
let moviePoster = ""
let movieTitle = ""
let movieGenres = ""
let movieReleaseDate = ""
let movieReviewAverage = ""
let movieSummary = ""
let movieCredits = {}
let searchSwiperWrapper = document.querySelector("#search-results .swiper .swiper-wrapper")
let latestSwiperWrapper = document.querySelector("#latest-releases .swiper .swiper-wrapper")
let genresSwiperWrapper = document.querySelector("#movies-genres  .swiper .swiper-wrapper")

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzRlYWU0MDhiMjdmYmNiMWJjMzQ1YmIxNjQ2OWM3YiIsInN1YiI6IjY1MzI3ZmNlYjI2ODFmMDBlMTNhYzhkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hQFb9K0pDhp3mgpQdDReQSXCtksiA-k2YCox4YySk50'
  }
};
const currentDate = new Date().toISOString().split('T')[0];
const newReleasesUrl = `https://api.themoviedb.org/3/discover/movie?&sort_by=release_date.desc&include_adult=false&include_video=false&language=en-US&release_date.lte=${currentDate}&language=en-US`;
const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]

// ROUND THE REVIEWS

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// SORT RESULTS FUNCTION :

const sortByPopularity = (data) => {
  data.results.sort((a, b) => b.popularity - a.popularity);
  return data.results;
}

// CREATE MOVIE CARD FUNCTION :

const createCard = (imgUrl, movieTitle, date, genre, rating, summary) => {
  if (imgUrl === "https://image.tmdb.org/t/p/originalnull") {
  }
  else {
    let newCard = document.createElement('div');
    newCard.classList.add(`swiper-slide`)
    let newCardPicture = document.createElement('img');
    let newCardHover = document.createElement('div');

    let newCardHoverTitle = document.createElement('h4')
    newCardHoverTitle.innerText = movieTitle
    newCardHoverTitle.classList.add("movie-card-title")
    newCardHover.appendChild(newCardHoverTitle)

    let newCardHoverDate = document.createElement('h3')
    newCardHoverDate.innerText = date;
    newCardHoverDate.classList.add("movie-card-date")
    newCardHover.appendChild(newCardHoverDate)

    let newCardHoverGenre = document.createElement('span')
    newCardHoverGenre.innerText = genre;
    newCardHoverGenre.classList.add("movie-card-genre")
    newCardHover.appendChild(newCardHoverGenre)

    let newCardHoverStar = document.createElement('div')
    newCardHoverStar.innerText = ""
    newCardHoverStar.classList.add("movie-card-star")
    newCardHover.appendChild(newCardHoverStar)

    let newCardHoverRating = document.createElement('span')
    newCardHoverRating.innerText = rating
    newCardHoverRating.classList.add("movie-card-rating")
    newCardHover.appendChild(newCardHoverRating)

    newCardHover.setAttribute('data-summary', summary);
    newCardHover.setAttribute('data-img', imgUrl);
    newCardHover.classList.add("card-hover")
    newCardPicture.src = imgUrl;
    newCard.appendChild(newCardHover);
    newCard.appendChild(newCardPicture);
    return newCard
  }
}

// FIND MOVIE GENRES

const genreIdToText = (num) => {
  for (let genre of genres) {
    if (num === genre.id) {
      return genre.name;
    }
    else {
    }
  }
}

const genreTextToID = (str) => {
  for (let genre of genres) {
    if (str === genre.name) {
      return genre.id;
    }
    else {
    }
  }
}

const findMovieGenres = (movie) => {
  let genresArray = []
  movie.genre_ids.forEach(element => {
    genresArray.push(genreIdToText(element))
  })
  return genresArray
}


/* -------------- SEARCH FUNCTION --------------  */

document.querySelector("#search-results").classList.add("inactive")
document.querySelector("#search form button").addEventListener("click", async (e) => {
  e.preventDefault()
  let searchValue = document.getElementById("search-input").value
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?&include_adult=false&include_video=false&language=en-US&query=${searchValue}&sort_by=popularity.desc`, options)

    if (response.ok) {
      cardArray = []
      searchSwiperWrapper.innerHTML = ""
      const data = await response.json();
      const sortedResults = sortByPopularity(data)
      for (let element of sortedResults) {
        moviePoster = `https://image.tmdb.org/t/p/original${element.poster_path}`;
        movieTitle = element.original_title;
        movieGenres = findMovieGenres(element);
        movieReleaseDate = element.release_date;
        movieReviewAverage = round(element.vote_average, 2);
        movieSummary = element.overview;
        // FIRST WE CREATE THE CARDS
        let newCard = createCard(moviePoster, movieTitle, movieReleaseDate, movieGenres.join(" / "), movieReviewAverage, movieSummary)
        // WE PUSH THE CARD TO AN ARRAY
        cardArray.push(newCard)
      }
      // WE DISPLAY THE ARRAY
      cardArray.forEach(e => {
        searchSwiperWrapper.appendChild(e)
        document.querySelector("#search-results").classList.remove("inactive")
      })

    }
    else {
      console.log("oopsie")
    }
  }

  catch (error) {
    console.log(error, "error retrieving search results")
  }
});

/* -------------- POPULAR RELEASES FUNCTION --------------  */
document.querySelector("#latest-releases").classList.add("inactive")
document.querySelector("#movies-genres").classList.add("inactive")
document.addEventListener("DOMContentLoaded", async () => {
  const genreSearchURL = `https://api.themoviedb.org/3/discover/movie?&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35`
  try {
    const response = await fetch(genreSearchURL, options)
    if (response.ok) {
      cardArray = []
      genresSwiperWrapper.innerHTML = ""
      const data = await response.json();
      const sortedResults = sortByPopularity(data)
      for (let element of sortedResults) {
        moviePoster = `https://image.tmdb.org/t/p/original${element.poster_path}`;
        movieTitle = element.original_title;
        movieGenres = findMovieGenres(element);
        movieReleaseDate = element.release_date;
        movieReviewAverage = round(element.vote_average, 2);
        movieSummary = element.overview;
        // FIRST WE CREATE THE CARDS
        let newCard = createCard(moviePoster, movieTitle, movieReleaseDate, movieGenres.join(" / "), movieReviewAverage)
        // WE PUSH THE CARD TO AN ARRAY
        cardArray.push(newCard)
      }
      // WE DISPLAY THE ARRAY
      cardArray.forEach(e => {
        genresSwiperWrapper.appendChild(e)
        document.querySelector("#movies-genres").classList.remove("inactive")
      })

    }
    else {
      console.log("oopsie")
    }
  }

  catch (error) {
    console.log(error, "error retrieving search results")
  }
  try {
    const response = await fetch(newReleasesUrl, options)
    if (response.ok) {
      cardArray = []
      latestSwiperWrapper.innerHTML = ""
      const data = await response.json();
      const sortedResults = sortByPopularity(data)
      for (let element of sortedResults) {
        moviePoster = `https://image.tmdb.org/t/p/original${element.poster_path}`;
        movieTitle = element.original_title;
        movieGenres = findMovieGenres(element);
        movieReleaseDate = element.release_date;
        movieReviewAverage = round(element.vote_average, 2);
        movieSummary = element.overview;
        // FIRST WE CREATE THE CARDS
        let newCard = createCard(moviePoster, movieTitle, movieReleaseDate, movieGenres.join(" / "), movieReviewAverage, movieSummary)
        // WE PUSH THE CARD TO AN ARRAY
        cardArray.push(newCard)
      }
      // WE DISPLAY THE ARRAY
      cardArray.forEach(e => {
        if (e) {
          latestSwiperWrapper.appendChild(e);
        }
        document.querySelector("#latest-releases").classList.remove("inactive");
      })

    }
    else {
      console.log("oopsie")
    }
  }

  catch (error) {
    console.log(error, "error retrieving search results")
  }
});

/* -------------- MOVIE BY GENRE FUNCTION --------------  */


document.querySelector("#genres-list ul").addEventListener("click", async (e) => {
  genre = genreTextToID(e.target.innerHTML);
  const genreSearchURL = `https://api.themoviedb.org/3/discover/movie?&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`
  document.getElementById("selected-genre").innerHTML = e.target.innerHTML

  try {
    const response = await fetch(genreSearchURL, options)
    if (response.ok) {
      cardArray = []
      genresSwiperWrapper.innerHTML = ""
      const data = await response.json();
      const sortedResults = sortByPopularity(data)
      for (let element of sortedResults) {
        moviePoster = `https://image.tmdb.org/t/p/original${element.poster_path}`;
        movieTitle = element.original_title;
        movieGenres = findMovieGenres(element);
        movieReleaseDate = element.release_date;
        movieReviewAverage = round(element.vote_average, 2);
        movieSummary = element.overview;
        // FIRST WE CREATE THE CARDS
        let newCard = createCard(moviePoster, movieTitle, movieReleaseDate, movieGenres.join(" / "), movieReviewAverage)
        // WE PUSH THE CARD TO AN ARRAY
        cardArray.push(newCard)
      }
      // WE DISPLAY THE ARRAY
      cardArray.forEach(e => {
        genresSwiperWrapper.appendChild(e)
      })

    }
    else {
      console.log("oopsie")
    }
    // ON VEUT AUSSI AJOUTER UNE CLASSE ACTIVE A L'ELEMENT CLIQUE.
    const allGenreItems = document.querySelectorAll("#genres-list ul a");
    allGenreItems.forEach(item => item.classList.remove("active"));
    e.target.classList.add("active");
  }

  catch (error) {
    console.log(error, "error retrieving search results")
  }
})

// QUAND JE CLIQUE SUR UNE CARTE

document.querySelectorAll(".swiper-wrapper").forEach((e) => {
  e.addEventListener("click", (event) => {
    let clickedCard = event.target.closest(".card-hover")
    console.log(clickedCard)
    if (clickedCard) {
      const cardTitle = clickedCard.querySelector('.movie-card-title').textContent;
      const cardDate = clickedCard.querySelector('.movie-card-date').textContent;
      const cardGenre = clickedCard.querySelector('.movie-card-genre').textContent;
      const cardRating = clickedCard.querySelector('.movie-card-rating').textContent;
      const cardSummary = clickedCard.getAttribute('data-summary');
      const cardImg = clickedCard.getAttribute('data-img')
      // APPEND LE CONTENU DU MODAL
      appendModal(cardTitle, cardGenre, cardDate, cardRating, cardSummary, cardImg)
      // TOGGLE LE MODAL

      document.querySelector(".modal").classList.toggle("inactive")

    }
  });
})

document.querySelector(".close-modal").addEventListener("click", () => {
  document.querySelector(".modal").classList.toggle("inactive")
})

/* FONCTION APPENDMODAL */
const appendModal = (title, genre, date, rating, summary, img) => {
  document.querySelector(".modal-title").innerHTML = title
  document.querySelector(".modal-year").innerHTML = date
  document.querySelector(".modal-rating").innerHTML = rating
  document.querySelector(".modal-genre").innerHTML = genre
  document.querySelector(".modal-image img").src = img
  document.querySelector(".modal-description").innerHTML = summary
}

// OPEN LOGIN AND REGISTER MODALS

//OPEN MODAL ON REGISTER TAB

document.querySelectorAll(".nav-register").forEach((e) => {
  e.addEventListener("click", () => {
    document.querySelector(".open-signup").classList.add("active");
    document.querySelector(".open-login").classList.remove("active");
    document.querySelector(".modal-signup-login").classList.toggle("inactive");
    document.querySelector("#form-login").classList.add("inactive");
    document.querySelector("#form-register").classList.remove("inactive");
  })
})

//OPEN MODAL ON SIGNIN TAB

document.querySelectorAll(".nav-signin").forEach((e) => {
  e.addEventListener("click", () => {
    document.querySelector(".open-login").classList.add("active");
    document.querySelector(".open-signup").classList.remove("active");
    document.querySelector(".modal-signup-login").classList.toggle("inactive");
    document.querySelector("#form-register").classList.add("inactive");
    document.querySelector("#form-login").classList.remove("inactive");
  })
})

//CLOSE MODAL WHEN CLICKING ON CROSS AND BACKGROUND

document.querySelector(".modal-signup-login .close-modal").addEventListener("click", () => {
  document.querySelector(".modal-signup-login").classList.toggle("inactive");
})

document.querySelector(".modal").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    document.querySelector(".modal").classList.toggle("inactive");
  }
})

document.querySelector(".modal-signup-login").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-signup-login")) {
    document.querySelector(".modal-signup-login").classList.toggle("inactive");
  }
})

//SWITCH TABS  

document.querySelector(".open-signup").addEventListener("click", () => {
  document.querySelector(".open-signup").classList.add("active");
  document.querySelector(".open-login").classList.remove("active");
  document.querySelector("#form-login").classList.add("inactive");
  document.querySelector("#form-register").classList.remove("inactive");
})

document.querySelector(".open-login").addEventListener("click", () => {
  document.querySelector(".open-login").classList.add("active");
  document.querySelector(".open-signup").classList.remove("active");
  document.querySelector("#form-register").classList.add("inactive");
  document.querySelector("#form-login").classList.remove("inactive");
})












// GET MOVIE CREDITS

/* const getMovieCredits = async (id) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&page=1`, options);

    if (response.ok) {
      const data = await response.json();
      let castArray = data.cast;
      let cleanArray = []
      castArray.forEach(element => {
        cleanArray.push(element.name)
      })
      return cleanArray.splice(0, 10);

    } else {
      console.log("Oops, something went wrong with fetching movie credits.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching movie credits:", error);
    return [];
  }
} */