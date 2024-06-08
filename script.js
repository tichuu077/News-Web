//constants and variables
var bigdata = [];
const countrybox = document.querySelector('.contbox');
const countries = document.querySelector('.countries_box');
const statebox = document.querySelector('.stabox');
const states = document.querySelector('.state_box');
const citybox = document.querySelector('.ctbox');
const cities = document.querySelector('.city_box');
const search = document.querySelector('.search');
const search_box = document.querySelector('.search_box');
const loadmore = document.querySelector('.loadmore')
const loadmorebtn = document.getElementById('btn');
const footer = document.getElementById('footer_box');
const current_date = document.querySelector('.date');
var current_time = document.querySelector('.time');
let apiarr=[
  'pub_43852bf24ffca0ba8d2af1fc14abff306aa71',
  'pub_418750f317b788b466d0b520693b6a9429bc4',
  'pub_43822a112cf6e6ac3924eb640e808fe155508',
  'pub_4410606a6be384c147aef388c8dc83c72edef',
  'pub_444277ccbc735f57e8bed24fdebdd9d91051d'
];
let api=apiarr.pop();
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
 
const date = new Date();
const get_key = document.querySelectorAll('.get_key');
// Function to format the current time
function gettime(date) {
  let ch = date.getHours();
  let cm = date.getMinutes();
  let dn = 'AM';

  if (ch > 12) {
    ch = ch - 12;
    if (ch < 10) {
      ch = '0' + ch;
    }
    dn = 'PM';
  }
  if (cm < 10) {
    cm = '0' + cm;
  }
  return `${ch}:${cm} ${dn}`;
}

const month = date.getMonth();
current_date.innerHTML = `${date.getDate()} ${months[month]} ${date.getFullYear()}`;

// Set interval to update current time every second
setInterval(() => {
  current_time.innerHTML = gettime(new Date());
}, 1000);

// Function to display a dropdown and hide others
function displaybox(main, mainbox, first, firstbox, second, secondbox) {
  first.style.display = "none";
  firstbox.classList.remove('fa-caret-up');
  firstbox.classList.add('fa-caret-down')
  second.style.display = "none";
  secondbox.classList.remove('fa-caret-up');
  secondbox.classList.add('fa-caret-down')
  main.style.display = "block";
  mainbox.classList.remove('fa-caret-down');
  mainbox.classList.add('fa-caret-up')
}
// Function to hide a dropdown
function removebox(main, mainbox) {
  main.style.display = "none";
  mainbox.classList.remove('fa-caret-up');
  mainbox.classList.add('fa-caret-down')
}
// Event listeners for dropdowns
countrybox.addEventListener('click', () => {
  if (countrybox.classList.contains('fa-caret-down')) {
    displaybox(countries, countrybox, cities, citybox, states, statebox);
  }
  else {
    removebox(countries, countrybox);
  }
})
statebox.addEventListener('click', () => {
  if (statebox.classList.contains('fa-caret-down')) {
    displaybox(states, statebox, countries, countrybox, cities, citybox);
  }
  else {
    removebox(states, statebox);
  }
})
citybox.addEventListener('click', () => {
  console.log(citybox.classList.contains('fa-caret-up'))
  if (citybox.classList.contains('fa-caret-down')) {
    displaybox(cities, citybox, countries, countrybox, states, statebox);
  }
  else {
    removebox(cities, citybox);
  }
})
// Event listeners for search keywords
search.addEventListener('click', () => {
  console.log('clicked');
  console.log(window.getComputedStyle(search_box).display)
  if (window.getComputedStyle(search_box).display == 'none') {
    search_box.style.display = 'block';
  }
  else {
    search_box.style.display = 'none';
  }
})
 //Event for display perticular image
get_key.forEach((e) => {
  e.addEventListener('click', () => {
   let keyword = e.innerText;
    let back_loc='index.html';
    sessionStorage.setItem('back_loc',JSON.stringify(back_loc));
    if(e.classList.contains('nav_boxs')){
      let search={
        category:'category',
        value:keyword
      }
      sessionStorage.setItem('search',JSON.stringify(search))
       window.location.href='newscategory.html';
    }
    else{
    let parent=e.parentElement;
    let bigparent=parent.parentElement;
     let firstchild=bigparent.children[2];
     let secondchild=bigparent.children[1];
     let secondchildi=secondchild.getElementsByTagName('i');
      let search={
        category:'q',
        value:keyword
      }
      sessionStorage.setItem('search',JSON.stringify(search))
      removebox(firstchild,secondchildi[0])
     window.location.href='newscategory.html';
    }
  })
})
// Search box enter key event
const stext = document.getElementById('stext');
stext.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let keyword = e.target.value;
    console.log(keyword);
    let search={
      category:'q',
      value:keyword
    }
    let back_loc='index.html';
    sessionStorage.setItem('back_loc',JSON.stringify(back_loc));
    sessionStorage.setItem('search',JSON.stringify(search));
    e.target.value='';
    window.getComputedStyle(search_box).display;
    search_box.style.display = 'none';
    window.location.href='newscategory.html';
  }
});
 
var firstvisit=false;
var page=null;
const main = document.getElementById('main')
let changeresults;
// Function to fetch news data from the API
const getNews = async (sub, arr = null) => {

  try {
    let response=null;
    let count = Math.floor(Math.random() * 100);
    if(page===null){
      if(firstvisit===true){
    const url = `https://newsdata.io/api/1/news?apikey=${api}&q=${sub}$page=${count}&image=1&language=en`;
    response = await fetch(url);
      }
      else{
        const url = `https://newsdata.io/api/1/news?apikey=${api}&category=${sub}&image=1&language=en`;
        response = await fetch(url);
        firstvisit=true;
      }
    }
    else{
      const url = `https://newsdata.io/api/1/news?apikey=${api}&page=${page}&image=1&language=en`;
      response = await fetch(url);
    }

    const data = await response.json();
    page=data.nextPage;
   let results = data.results;
     results = results.filter(obj => obj.description !== null && obj.title !== null&&obj.image_url!==null);

    results = results.filter((article, index, self) =>
      index === self.findIndex((a) => (
        a.image_url === article.image_url || a.title === article.title
      ))
    );
     
    if (arr !== null) {
      results = results.filter(obj => !arr.some(a => a.image_url === obj.image_url || a.title === obj.title));
    }
    return results;
  } catch (error) {
   if(apiarr.length>0){
       firstvisit=false;
       page=null;
       api=apiarr.pop();
     changeresults = await getNews(sub,arr);
      return  changeresults;
    }
  else{
    const section1 = document.createElement('section');
    section1.classList.add('section_margin');
    section1.id = 'first_box';
   section1.innerHTML = `
          <h1>Server Problem</h1>
          <p>We're having trouble fetching the news right now. Please try again later.</p>
      `;
        section1.style.display = 'flex';
      section1.style.flexDirection='column';
        section1.style.justifyContent = 'center';
        section1.style.alignItems = 'center';
    main.appendChild(section1);
    loadmore.style.display='flex';
    footer.style.display='flex';
    return null;
  }
  }
}
// function for get image_src of clicked box 
function news_page(image_src) {
  let news_object = bigdata.filter(obj => obj.image_url === image_src);
  let data = JSON.stringify(news_object)
  sessionStorage.setItem('news_page_data', data);
  let predata = sessionStorage.getItem('predata');
  if (!predata) {
    predata = JSON.stringify(bigdata);
    sessionStorage.setItem('predata', predata);
  }
  let back_loc='index.html';
  sessionStorage.setItem('back_loc',JSON.stringify(back_loc));
 window.location.href = "newspage.html";
}

//function for decrise description
function get_description(string, range) {
  if (string.length > range) {
    string = string.substring(0, range) + '...';
    return string;
  }
  else {
    return string;
  }
}
//function for create news section for top stories
function createsection1(arr) {
  console.log(arr);
  var data = arr;
  function getmaxobj(data) {
    const maxLength = Math.max(...data.map(item => item.description.length));
    const maxDescriptionData = data.filter(item => item.description.length === maxLength && maxLength > 0);
    data = data.filter(item => item.description.length !== maxLength || maxLength === 0);
    let max = maxDescriptionData[0];
    return max;
  }
  const mainobj = getmaxobj(data);
  data = data.filter(item => item !== mainobj);
  const leftobj = getmaxobj(data);
  data = data.filter(item => item !== leftobj);
  const rightobj = getmaxobj(data);
  data = data.filter(item => item !== rightobj);
  let titlesamilength=leftobj.title.length<rightobj.title.length ? leftobj.title.length : rightobj.title.length;
  let dessamilength=leftobj.description.length<rightobj.description.length ? leftobj.description.length : rightobj.description.length;
  const main_s_obj = getmaxobj(data);
  data = data.filter(item => item !== main_s_obj);
  loadmore.style.display='flex';
  footer.style.display='flex';
  const section1 = document.createElement('section');
  section1.classList.add('section_margin');
  section1.id = 'first_box';
  section1.innerHTML = ` <div class="type first_box_type">
       <div class="type_in"><splan><i class="fa-regular fa-star"></i></splan> <span>Top Stories</span></div>
      </div>
      <div class="first_box_news_box">
        <div class="left normal_box">
          <div class="first select_box">
            <div class="img_box">
              <img src="${leftobj.image_url}">
            </div>
            <div class="news_type">
              <splan><i class="fa-regular fa-star"></i></splan> <span class="typekey">${leftobj.category[0]}</span>
            </div>
            <div class="news_title">
              <h2>${get_description(leftobj.title, titlesamilength)}</h2>
            </div>
            <div class="news_para">
              <p>${get_description(leftobj.description, dessamilength)}</p>
            </div>
          </div>
        <div class="second">
          <div class="part1 boxes select_box">
            <div class="img_box">
              <img src="${data[0].image_url}">
            </div>
            <div class="news_title">
              <h3>${get_description(data[0].title,80)}</h3>
            </div>
          </div>
            <div class="part2 boxes select_box">
              <div class="img_box">
                <img src="${data[1].image_url}">
              </div>
              <div class="news_title">
                <h3>${get_description(data[1].title,80)}</h3>
              </div>
            </div>
            <div class="part3 boxes select_box">
              <div class="img_box">
                <img src="${data[2].image_url}">
              </div>
              <div class="news_title">
                 <h3>${get_description(data[2].title,80)}</h3>
              </div>
            </div>
          </div>
          </div>
           <div class="mbar"></div>
        <div class="main">
          <div class="main_first select_box">
            <div class="img_box">
        <img src=" ${mainobj.image_url}">
            </div>
            <div class="news_type">
              <splan><i class="fa-regular fa-star"></i></splan> <span class="typekey">${mainobj.category[0]}</span>
            </div>
            <div class="news_title">
          <h1>${get_description(mainobj.title, 140)}</h1>
            </div>
            <div class="news_para">
          <p class="main_p">${get_description(mainobj.description, 569)}</p>
            </div>
          </div>
          <div class="main_second select_box">
            <div class="part1">
              <div class="img_box">
                <img src="${main_s_obj.image_url}">
              </div>
            </div>
            <div class="part2">
            <div class="news_type">
              <splan><i class="fa-regular fa-star"></i></splan> <span class="typekey">${main_s_obj.category[0]}</span>
            </div>
              <div class="news_title">
                <h3>${get_description(main_s_obj.title, 120)}</h3>
              </div>
              <div class="news_para">
                <p class="s_main_p">${get_description(main_s_obj.description, 150)}</p>
              </div>
            </div>
          </div>
        </div>
         <div class="mbar"></div>
    <div class="right normal_box">
      <div class="first select_box">
        <div class="img_box">
          <img src="${rightobj.image_url}">
        </div>
        <div class="news_type">
          <splan><i class="fa-regular fa-star"></i></splan> <span class="typekey">${rightobj.category[0]}</span>
        </div>
        <div class="news_title">
    <h2>${get_description(rightobj.title, titlesamilength)}</h2>
        </div>
        <div class="news_para">
    <p>${get_description(rightobj.description, dessamilength)}</p>
        </div>
      </div>
      <div class="second">
        <div class="part1 boxes select_box">
          <div class="img_box">
            <img src="${data[3].image_url}">
          </div>
          <div class="news_title">
              <h3> ${get_description(data[3].title,80)}</h3>
          </div>
        </div>
          <div class="part2 boxes select_box">
            <div class="img_box">
              <img src="${data[4].image_url}">
            </div>
            <div class="news_title">
               <h3>${get_description(data[4].title,80)}</h3>
            </div>
          </div>
          <div class="part3 boxes select_box">
            <div class="img_box">
              <img src=" ${data[5].image_url}">
            </div>
            <div class="news_title">
               <h3>${get_description(data[5].title,80)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>`;
  main.appendChild(section1);

   r_click();
}
//function for add event listeners on news title
function r_click() {
  const reletedtitle = document.querySelectorAll('.news_title');
  reletedtitle.forEach((e) => {
    e.addEventListener('click', () => {
     let parent=e.parentElement;
      if(parent.classList.contains('select_box')){
        let image = parent.querySelector('img');
        let src = image.src;
        news_page(src);
      }
      else{
    let  bigparent=parent.parentElement;
      let image = bigparent.querySelector('img');
      let src = image.src;
      news_page(src);
      }
    });
  });
}
//function for get news data
async function get_section1() {
  let originalData = await getNews("top");
  while (originalData.length <= 10) {
    originalData = originalData.concat(await getNews('top', originalData));
  }
  if (originalData.length > 10) {
    originalData = originalData.slice(0, 10);
  }
  bigdata = originalData;
  let predata = JSON.stringify(bigdata);
  sessionStorage.setItem('predata', predata);
  createsection1(bigdata);
}
//function for load page
const onPageLoad = () => {
  let predata = sessionStorage.getItem('predata');
  if (predata) {
    bigdata = JSON.parse(predata);
     sessionStorage.clear();
    createsection1(bigdata);

  }
  else {
    get_section1();
  }
}
//main logic start 
window.onload = onPageLoad;
loadmorebtn.addEventListener('click',()=>{
  get_section1();
})
