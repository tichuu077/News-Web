// variables and constants
const countrybox = document.querySelector('.contbox');
const countries = document.querySelector('.countries_box');
const statebox = document.querySelector('.stabox');
const states = document.querySelector('.state_box');
const citybox = document.querySelector('.ctbox');
const cities = document.querySelector('.city_box');
const search = document.querySelector('.search');
const search_box = document.querySelector('.search_box');
const loadmore = document.querySelector('.loadmore');
const footer = document.getElementById('footer_box')
const section=document.createElement('section');
section.id='category_box';
let apiarr=[
  'pub_43852bf24ffca0ba8d2af1fc14abff306aa71',
  'pub_418750f317b788b466d0b520693b6a9429bc4',
  'pub_43822a112cf6e6ac3924eb640e808fe155508',
  'pub_4410606a6be384c147aef388c8dc83c72edef',
  'pub_444277ccbc735f57e8bed24fdebdd9d91051d'
];
let api=apiarr.pop();
const current_date = document.querySelector('.date');
var current_time = document.querySelector('.time');
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const date = new Date();
const get_key = document.querySelectorAll('.get_key');

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

 
setInterval(() => {
  current_time.innerHTML = gettime(new Date());
}, 1000);

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
function removebox(main, mainbox) {
  main.style.display = "none";
  mainbox.classList.remove('fa-caret-up');
  mainbox.classList.add('fa-caret-down')
}
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
  if (citybox.classList.contains('fa-caret-down')) {
    displaybox(cities, citybox, countries, countrybox, states, statebox);
  }
  else {
    removebox(cities, citybox);
  }
})
// Event listeners for search keywords
search.addEventListener('click', () => {
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
    if(e.classList.contains('nav_boxs')){
      let search={
        category:'category',
        value:keyword
      }
      let back_loc='newscategory.html';
      sessionStorage.setItem('back_loc',JSON.stringify(back_loc));
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
      let back_loc='newscategory.html';
      sessionStorage.setItem('back_loc',JSON.stringify(back_loc));
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
    let search={
      category:'q',
      value:keyword
    }
    sessionStorage.setItem('search',JSON.stringify(search));
    e.target.value='';
    window.getComputedStyle(search_box).display;
    search_box.style.display = 'none';
    window.location.href='newscategory.html';
  }
});
var bigdata=[];
var page=null;
var firstvisit=false;
  let changeresults; 
const main = document.getElementById('main')
// Function to fetch news data from the API
const getNews = async (category,value, arr = null) => {
  try {
    const count = Math.floor(Math.random() * 100) + 1;
    let response=null;
    if(category==='category'){
      if(page===null){
       const url = `https://newsdata.io/api/1/news?apikey=${api}&category=${value}&image=1&language=en`;
        response = await fetch(url);
    }
        else{
          const url = `https://newsdata.io/api/1/news?apikey=${api}&page=${page}&image=1`;
          response = await fetch(url);
        }}
    else{
      if(page===null){
        if(firstvisit===true){
      const url = `https://newsdata.io/api/1/news?apikey=${api}&${category}=${value}$page=${count}&image=1&language=en`;
      response = await fetch(url);
        }
        else{
          const url = `https://newsdata.io/api/1/news?apikey=${api}&${category}=${value}&image=1&language=en`;
          response = await fetch(url);
          firstvisit=true;
        }
      }
      else{
        const url = `https://newsdata.io/api/1/news?apikey=${api}&page=${page}&image=1&language=en`;
        response = await fetch(url);
      }
    }
    const data = await response.json();
    page=data.nextPage;
    let results = data.results || [];
    results = results.filter(obj =>  obj.title!==null && obj.pubDate !==null && obj.image_url!==null);
    results = results.filter((article, index, self) =>
      index === self.findIndex((a) => (
        a.image_url === article.image_url || a.title === article.title
      ))
    );
    if (arr) {
      results = results.filter(obj => !arr.some(a => a.image_url === obj.image_url || a.title === obj.title));
    }
    return results;
  } catch (error) {
    if(apiarr.length>0){
       firstvisit=false;
       page=null;
       api=apiarr.pop();
     changeresults = await getNews(category,value,arr);
      return  changeresults;
    }
  else{
   section.innerHTML = `
          <h1>Server Problem</h1>
          <p>We're having trouble fetching the news right now. Please try again later.</p>
      `;
      section.style.display = 'flex';
      section.style.flexDirection='column';
        section.style.justifyContent = 'center';
        section.style.alignItems = 'center';
      main.appendChild(section)
    loadmore.style.display='flex';
    footer.style.display='flex';
    return null;
  }
  }
}
//function for reduce title length
function get_title(string, range) {
  return string.length > range ? string.substring(0, range) + '...' : string;
}

//function for display news
function displayNewsPage(bigdata,value){
   console.log(bigdata)
  loadmore.style.display='flex';
  footer.style.display='flex';
  section.innerHTML=`
      <div class="main_box">
          <div class="category_name">
              <h1>${value}</h1>
          </div>
          <div class="main_news ">
              <div class="imgbox">
                  <img src=${bigdata[0].image_url}>
              </div> 
              <div class="news_details">
                  <div class="news_title">
                      <h1>${get_title(bigdata[0].title,150)}</h1>
                  </div>
                  <div class="pubdate">
                 <span>publish date :</span><span>${bigdata[0].pubDate.substring(0, 10).split('-').reverse().join('-')}</span>     
                  </div>
              </div>

          </div>
      </div>
      <div class="bar">
        </div>
      <div class="related_box">
          <div class="r_news_box">
              <div class="r_news">
                  <div class="img_box">
                      <img src= ${bigdata[1].image_url}>
                  </div>
                  <div class="news_details"> 
                  <div class="news_title">
                      <h3> ${get_title(bigdata[1].title,100)}</h3>
                  </div>
                  <div class="pubdate">
               <span>publish date :</span><span>${bigdata[1].pubDate.substring(0, 10).split('-').reverse().join('-')}</span>   
                  </div>

                      </div>   
              </div> 
              <div class="r_news">
                  <div class="img_box">
                      <img src=${bigdata[2].image_url}>
                  </div>
                  <div class="news_details"> 
                  <div class="news_title">
                      <h3>${get_title(bigdata[2].title,100)}</h3>
                  </div>
                  <div class="pubdate">
            <span>publish date :</span><span>${bigdata[2].pubDate.substring(0, 10).split('-').reverse().join('-')}</span> 
                  </div>

                      </div>   
              </div>
              <div class="r_news">
                  <div class="img_box">
                      <img src=${bigdata[3].image_url}>
                  </div>
                  <div class="news_details"> 
                  <div class="news_title">
                      <h3>${get_title(bigdata[3].title,100)}</h3>
                  </div>
                  <div class="pubdate">
 <span>publish date :</span><span>${bigdata[3].pubDate.substring(0, 10).split('-').reverse().join('-')}</span> 
                  </div>

                      </div>   
              </div>
      </div>
      <div class="bar">
        </div>
           <div class="r_news_box">
                   <div class="r_news">
                       <div class="img_box">
                           <img src=${bigdata[4].image_url}>
                       </div>
                       <div class="news_details"> 
                       <div class="news_title">
                           <h3>${get_title(bigdata[4].title,100)}</h3>
                       </div>
                       <div class="pubdate">
 <span>publish date :</span><span>${bigdata[4].pubDate.substring(0, 10).split('-').reverse().join('-')}</span> 
                       </div>

                           </div>   
                   </div> 
                   <div class="r_news">
                       <div class="img_box">
                           <img src=${bigdata[5].image_url}>
                       </div>
                       <div class="news_details"> 
                       <div class="news_title">
                           <h3>${get_title(bigdata[5].title,100)}</h3>
                       </div>
                       <div class="pubdate">
 <span>publish date :</span><span>${bigdata[5].pubDate.substring(0, 10).split('-').reverse().join('-')}</span> 
                       </div>

                           </div>   
                   </div>
                   <div class="r_news">
                       <div class="img_box">
                           <img src=${bigdata[6].image_url}>
                       </div>
                       <div class="news_details"> 
                       <div class="news_title">
                           <h3>${get_title(bigdata[6].title,100)}</h3>
                       </div>
                       <div class="pubdate">
 <span>publish date :</span><span>${bigdata[6].pubDate.substring(0, 10).split('-').reverse().join('-')}</span> 
                       </div>

                           </div>   
                   </div>
           </div>
      </div>
      </div>`;
  main.appendChild(section);
  r_click();
}

// function for get image_src of clicked box 
function news_page(image_src) {
  let news_object = bigdata.filter(obj => obj.image_url === image_src);
  let data = JSON.stringify(news_object)
  sessionStorage.setItem('news_page_data', data);
  window.location.href = "newspage.html";
}

//function for add event listener on back button
function forback() {
  const back = document.getElementById('back');
  back.addEventListener('click', () => {
      window.location.href = 'index.html';
  });
}

//function for add event listeners on news title
function r_click() {
  const reletedtitle = document.querySelectorAll('.news_title');
  reletedtitle.forEach((e) => {
    e.addEventListener('click', () => {
     let parent=e.parentElement;
    let  bigparent=parent.parentElement;
      const image = bigparent.querySelector('img');
      const src = image.src;
      news_page(src);
    });
  });
}
// function for get news data
async function get_section1() {
  let search =sessionStorage.getItem('search');
  let data=JSON.parse( search)
  let category=data.category;
  let value=data.value;
  let originalData = await getNews(category,value);
  while (originalData.length < 7) {
    originalData = originalData.concat(await getNews(category,value, originalData));
  }
   
  if (originalData.length > 7) {
    originalData = originalData.slice(0, 7);
  }
  bigdata=originalData;
  displayNewsPage(bigdata,value);
}

// function for page load
function pageload(){
  get_section1();
}
window.onload=pageload();
forback();
