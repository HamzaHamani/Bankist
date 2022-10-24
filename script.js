'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnscrollto.addEventListener('click', function () {
  let s1cords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// const ranodmNum = max => Math.floor(Math.random() * max + 1);
// const randomcolor = `rgb (${ranodmNum(255)},${ranodmNum(255)},${ranodmNum(
//   255
// )})`;

// document.body.addEventListener('click', function (e) {
//   const ranodmNum = max => Math.floor(Math.random() * max + 1);
//   const randomcolor = `rgb(${ranodmNum(255)},${ranodmNum(255)},${ranodmNum(
//     255
//   )})`;
//   console.log('h');
//   document.body.style.backgroundColor = randomcolor;
//   console.log(randomcolor);
// });

// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', e => {
//     e.preventDefault();
//     let id = el.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// -------------------------  tabs container  ----

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabscontent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  // show and hide button
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  let num = clicked.dataset.tab;
  console.log(num);
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // show and hide text
  tabscontent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${num}`)
    .classList.add('operations__content--active');
});

// nav  effects
// blur others items
document.querySelector('.nav').addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    let item = e.target;
    let siblings = document.querySelectorAll('.nav__link');
    siblings.forEach(s => {
      if (s !== item) {
        s.style.opacity = 0.5;
        document.querySelector('img').style.opacity = 0.5;
      }
    });
  }
});
// remove blur other items
document.querySelector('.nav').addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    let item = e.target;
    let siblings = document.querySelectorAll('.nav__link');
    siblings.forEach(s => {
      if (s !== item) {
        s.style.opacity = 1;
        document.querySelector('img').style.opacity = 1;
      }
    });
  }
});

// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1.offsetTop) {
//     document.querySelector('.nav').classList.add('sticky');
//   } else document.querySelector('.nav').classList.remove('sticky');
// });

// sticky nbnav

let options = {
  root: null,
  threshold: 0,
  rootMargin: `-${
    document.querySelector('.nav').getBoundingClientRect().height
  }px`,
};

let callback = function (entries, observer) {
  let [entrie] = entries;
  console.log(entrie);
  if (!entrie.isIntersecting) {
    document.querySelector('.nav').classList.add('sticky');
  } else document.querySelector('.nav').classList.remove('sticky');
};

let observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.header'));

// revealing eleemnts while scrolling

const sections = document.querySelectorAll('.section');
let secallback = function (entries, observer) {
  let [e] = entries;
  if (!e.isIntersecting) return;
  e.target.classList.remove('section--hidden');
  observer.unobserve(e.target);
};
let secobserver = new IntersectionObserver(secallback, {
  root: null,
  threshold: 0.15,
});
sections.forEach(sec => {
  secobserver.observe(sec);
  sec.classList.add('section--hidden');
});
//  img lazzy lod

const lazyimg = document.querySelectorAll('img[data-src]');

let lazycall = function (entries, observer) {
  let [entrie] = entries;
  if (!entrie.isIntersecting) return;
  entrie.target.src = entrie.target.dataset.src;
  entrie.target.addEventListener('load', () => {
    entrie.target.classList.remove('lazy-img');
  });
  observer.unobserve(entrie.target);
};

let lazyobserver = new IntersectionObserver(lazycall, {
  root: null,
  threshold: 0,
});

lazyimg.forEach(i => lazyobserver.observe(i));

// swiper
