//constants and variables
const countrybox = document.querySelector('.contbox');
const countries = document.querySelector('.countries_box');
const statebox = document.querySelector('.stabox');
const states = document.querySelector('.state_box');
const citybox = document.querySelector('.ctbox');
const cities = document.querySelector('.city_box');
const search = document.querySelector('.search');
const search_box = document.querySelector('.search_box');
const loadmore = document.querySelector('.loadmore');
const footer = document.getElementById('footer_box');
let apiarr=[
  'pub_43852bf24ffca0ba8d2af1fc14abff306aa71',
  'pub_418750f317b788b466d0b520693b6a9429bc4',
  'pub_43822a112cf6e6ac3924eb640e808fe155508',
  'pub_4410606a6be384c147aef388c8dc83c72edef',
  'pub_444277ccbc735f57e8bed24fdebdd9d91051d'
];
let api=apiarr.pop();
const current_date = document.querySelector('.date');
const current_time = document.querySelector('.time');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
const get_key = document.querySelectorAll('.get_key');

function gettime(date) {
  let ch = date.getHours();
  let cm = date.getMinutes();
  const dn = ch >= 12 ? 'PM' : 'AM';
  ch = ch % 12 || 12;
  cm = cm < 10 ? '0' + cm : cm;
  return `${ch}:${cm} ${dn}`;
}
 // Function to format the current time
const month = date.getMonth();
current_date.innerHTML = `${date.getDate()} ${months[month]} ${date.getFullYear()}`;

// Set interval to update current time every second
setInterval(() => {
  current_time.innerHTML = gettime(new Date());
}, 1000);

// Function to display a dropdown and hide others
function displaybox(main, mainbox, first, firstbox, second, secondbox) {
  first.style.display = "none";
  firstbox.classList.replace('fa-caret-up', 'fa-caret-down');
  second.style.display = "none";
  secondbox.classList.replace('fa-caret-up', 'fa-caret-down');
  main.style.display = "block";
  mainbox.classList.replace('fa-caret-down', 'fa-caret-up');
}

// Function to hide a dropdown
function removebox(main, mainbox) {
  main.style.display = "none";
  mainbox.classList.replace('fa-caret-up', 'fa-caret-down');
}
// Event listeners for dropdowns
function toggleDropdown(main, mainbox, otherBoxes) {
  if (mainbox.classList.contains('fa-caret-down')) {
    displaybox(main, mainbox, ...otherBoxes);
  } else {
    removebox(main, mainbox);
  }
}

countrybox.addEventListener('click', () => {
  toggleDropdown(countries, countrybox, [cities, citybox, states, statebox]);
});

statebox.addEventListener('click', () => {
  toggleDropdown(states, statebox, [countries, countrybox, cities, citybox]);
});

citybox.addEventListener('click', () => {
  toggleDropdown(cities, citybox, [countries, countrybox, states, statebox]);
});

search.addEventListener('click', () => {
  search_box.style.display = search_box.style.display === 'none' ? 'block' : 'none';
});

//Event for display perticular image
get_key.forEach((e) => {
  e.addEventListener('click', () => {
   let keyword = e.innerText;
    if(e.classList.contains('nav_boxs')){
      let search={
        category:'category',
        value:keyword
      }
      let back_loc='newspage.html';
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
      sessionStorage.setItem('search',JSON.stringify(search))
      removebox(firstchild,secondchildi[0])
      let back_loc='newspage.html';
      sessionStorage.setItem('back_loc',JSON.stringify(back_loc));
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
    let back_loc='newspage.html';
    sessionStorage.setItem('back_loc',JSON.stringify(back_loc));
    sessionStorage.setItem('search',JSON.stringify(search));
    e.target.value='';
    window.getComputedStyle(search_box).display;
    search_box.style.display = 'none';
    window.location.href='newscategory.html';
  }
});
let bigdata = [];
let mainnewsobj = [];
const main = document.getElementById('main');
const news_page_main = document.createElement('div');
news_page_main.classList.add('container');
news_page_main.id = 'news_page_main';
function news_page(image_src) {
  const news_object = bigdata[bigdata.length - 1].find(obj => obj.image_url === image_src);
  if (!news_object) {
    return;
  }
  mainnewsobj.push(news_object);
  get_section1(news_object);
}

//function for create news section for top stories
function displayNewsPage(news_object) {
  console.log(bigdata[bigdata.length-1])
  loadmore.style.display='flex';
  footer.style.display='flex';
   news_page_main.innerHTML='';
  news_page_main.innerHTML = `
    <div class="main-news">
      <div class="main-item">
        <div class="main-image">
          <img src="${news_object.image_url}" alt="Main News Image">
        </div>
        <div class="main-details">
          <div class="main_title news_title">
            <h2>${news_object.title}</h2>
          </div>
          <div class="creater">Creator: <span>${checknull(news_object.creator, 'creator')}</span></div>
          <div class="publish">Publish Date: <span>${news_object.pubDate.substring(0, 10).split('-').reverse().join('-')}</span></div>
          <div class="keywords"><span>Keywords: ${checknull(news_object.keywords, 'keywords')}</span></div>
          <p class="main_description">${(news_object.description)?news_object.description : ''}</p>
        </div>
      </div>
    </div>
    <div class="related-news">
      <div class="related_news_title">
        <h2>More News</h2>
      </div>
      <div class="related_news_items">
        ${bigdata[bigdata.length - 1].map(news => `
          <div class="news-item">
            <div class="r-image">
              <img src="${news.image_url}" alt="Related News Image">
            </div>
            <div class="r-details">
              <div class="r_title news_title">
                <h3>${get_title(news.title, 110)}</h3>
              </div>
              <div class="r_publish">
                <p>Publish Date: ${news.pubDate.substring(0, 10).split('-').reverse().join('-')}</p>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  `;
  main.appendChild(news_page_main);
  
  r_click();
}

//function for add event listener on back button
function forback() {
  const back = document.getElementById('back');
  back.addEventListener('click', () => {
    bigdata.pop();
    mainnewsobj.pop();
    if (mainnewsobj.length !== 0) {
      displayNewsPage(mainnewsobj[mainnewsobj.length - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
     window.location.href = 'index.html';
    }
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}
//main logic start
const onPageLoad = () => {
  const newspagedata = sessionStorage.getItem('news_page_data');
  const data = JSON.parse(newspagedata);
  if (data && data.length) {
    mainnewsobj.push(data[0]);
    const object_data = mainnewsobj[mainnewsobj.length - 1];
    if (object_data) {
   get_section1(object_data);
    } else {
      return;
    }
  }
};

window.onload = onPageLoad;
forback();
function get_title(string, range) {
  return string.length > range ? string.substring(0, range) + '...' : string;
}
var page=null;
var firstvisit=null;
let changeresults;
// Function to fetch news data from the API
const getNews = async (sub, arr = null) => {
        try {
          let response=null;
          let count = Math.floor(Math.random() * 100);
          if(page===null){
            if(firstvisit===true){
          const url = `https://newsdata.io/api/1/news?apikey= ${api}&q=${sub}$page=${count}&image=1&language=en`;
          response = await fetch(url);
            }
            else{
              const url = `https://newsdata.io/api/1/news?apikey= ${api}&q=${sub}&image=1&language=en`;
              response = await fetch(url);
              firstvisit=true;
            }
          }
          else{
            const url = `https://newsdata.io/api/1/news?apikey= ${api}&page=${page}&image=1&language=en`;
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

    if (arr) {
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
     news_page_main.innerHTML = `
          <h1>Server Problem</h1>
          <p>We're having trouble fetching the news right now. Please try again later.</p>
      `;
        news_page_main.style.display = 'flex';
      news_page_main.style.flexDirection='column';
        news_page_main.style.justifyContent = 'center';
        news_page_main.style.alignItems = 'center';
           main.appendChild(news_page_main)
    loadmore.style.display='flex';
    footer.style.display='flex';
    return ;
  }
  }
}

//function for check null add return proper string
function checknull(value, name) {
  return value ? value : 'no ' + name;
}

//function for get news data
async function get_section1(object_data) {
  const sub = object_data.keywords ? object_data.keywords[0] : object_data.category;
  let originalData = await getNews(sub);
  while (originalData.length < 3) {
    originalData = originalData.concat(await getNews(sub, originalData));
  }
  if (originalData.length > 3) {
    originalData = originalData.slice(0, 3);
  }
  bigdata.push(originalData);
  displayNewsPage(object_data);
}
