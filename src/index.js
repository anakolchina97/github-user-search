import './sass/index.scss';
import '@babel/polyfill';

import { switchMode } from './js/switchMode';
import { getDataUser } from './js/getDataUser';

switchMode();

const mappingUser = (value) => {
  const {
    avatar_url: avatarUrl,
    name,
    created_at: createdAt,
    login,
    bio,
    public_repos: publicRepos,
    followers,
    following,
    location,
    html_url: htmlUrl,
    twitter_username: twitterUserName,
    company,
  } = value;

  document.querySelectorAll('.user-card__photo img').forEach((photo) => {
    photo.setAttribute('src', avatarUrl);
  });

  const userFirstName = document.querySelector('.user-info__name');
  userFirstName.textContent = name;

  const userJoined = document.querySelector('.user-info__joined');
  const date = new Date(createdAt);
  userJoined.textContent = `
    Joined ${date.getDate()} 
    ${date.toLocaleDateString('default', { month: 'short' })}
    ${date.getFullYear()}
  `;

  document.querySelectorAll('.user-info__login').forEach((username) => {
    username.textContent = `@${login}`;
  });

  const userBio = document.querySelector('.user-info__bio');
  userBio.textContent = bio;

  const userStatistics = [publicRepos, followers, following];
  // eslint-disable-next-line max-len
  document.querySelectorAll('.user-statistics-item__count').forEach((item, index) => {
    item.textContent = userStatistics[index];
  });

  const userFooterData = [location, twitterUserName, htmlUrl, company];
  // eslint-disable-next-line max-len
  document.querySelectorAll('.user-footer-item__title').forEach((item, index) => {
    if (userFooterData[index] === null) {
      item.textContent = 'Not Available';
      item.parentElement.classList.add('disabled');
    } else {
      item.textContent = userFooterData[index];
      item.parentElement.classList.remove('disabled');
    }
  });
};

const getSearchValue = () => {
  const btnSearch = document.querySelector('.search__btn');

  const handledSearchValue = () => {
    const searchDanger = document.querySelector('.search__danger');
    const inputSearch = document.querySelector('.search__input').value;

    if (!inputSearch) {
      searchDanger.style.opacity = 1;
    } else {
      getDataUser(inputSearch).then((user) => {
        mappingUser(user);
        searchDanger.style.opacity = 0;
      });
    }

    document.querySelector('.search__input').value = '';
  };

  btnSearch.addEventListener('click', handledSearchValue);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handledSearchValue();
  });
};

getSearchValue();
