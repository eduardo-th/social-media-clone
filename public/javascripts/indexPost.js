import { createCard } from './createCard.js';


const path = window.location.pathname
let tagUrl = null;

if ( path.split('/').includes('tag') ){  
tagUrl = path+'/feed'
}


let currentPage = 0;
let moreData = true;
const url = tagUrl || '/posts/feed';

async function getPosts(url, params) {
  const response = await axios.get(url, { params });
  return response.data.foundPost;
}

window.onscroll = infiniteScroll
function  infiniteScroll(ev) {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight-5 && moreData) {
    let params = { page: currentPage + 1 };
    window.onscroll=null
    getPosts(url, params)
      .then((posts) => {
        posts.forEach((post) => {
          createCard(post);
        });
        if (posts.length < 10) {
          showAlertData();
          moreData = false;
        }
        currentPage++;
        window.onscroll = infiniteScroll
      })
      .catch((err) => console.log(err.message));
  }
};
const showAlertData = () => {
  document.querySelector('.alert-secondary').classList.remove('d-none');
};
