export const createCard = (post) => {
  const card = document.createElement('div');
  const row = document.createElement('div');
  const imgCol = document.createElement('div');
  const img = document.createElement('img');

  const bodyCol = document.createElement('div');
  const body = document.createElement('div');
  const title = document.createElement('h5');
  const link = document.createElement('a');
  const textBody = document.createElement('p');

  card.classList.add('card', 'mb-3', 'p-0');
  row.classList.add('row', 'g-0');
  imgCol.classList.add('col-md-4');
  img.classList.add('img-fluid', 'rounded','w-100');
  img.src = post.image.thumbnail;

  bodyCol.classList.add('col-md-8');
  body.classList.add('card-body', 'py-0');
  title.classList.add('card-title');
  link.innerText = post.title;
  link.href = `/posts/${post.id}`;
  textBody.classList.add('card-text', 'mb-0', 'crop-text-4lines');
  textBody.innerText = post.body;

  title.appendChild(link);
  body.append(title, textBody);
  bodyCol.appendChild(body);
  imgCol.appendChild(img);
  row.append(imgCol, bodyCol);
  card.appendChild(row);

  const cardContainer = document.querySelector('#card-container');
  cardContainer.appendChild(card);
};
