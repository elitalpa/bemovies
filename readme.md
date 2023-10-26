# bemovies

Compile to sass :
```bash
sass --watch sass/style.scss css/style.css
```

example of `app.js` file :
```js
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

```

not done yet:
- [ ] mobile hamburger menu
- [ ] popup signin/register form
- [ ] movie info popup
- [ ] movie card back info
- [ ] list of movie genres
