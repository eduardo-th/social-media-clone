import { createCard } from './createCard.js';

let currentPage = 0;
let moreData = true;
const url = '/posts/feed';

async function getPosts(url, params) {
  const response = await axios.get(url, { params });
  return response.data.foundPost;
}
window.onscroll = function (ev) {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight-5 && moreData) {
    let params = { page: currentPage + 1 };

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
      })
      .catch((err) => console.log(err.message));
  }
};
const showAlertData = () => {
  document.querySelector('.alert-secondary').classList.remove('d-none');
};
