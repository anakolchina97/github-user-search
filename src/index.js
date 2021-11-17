import './sass/index.scss';
import '@babel/polyfill';

import { switchMode } from './js/switchMode';
import { getDataUser } from './js/getDataUser';

switchMode();

const mappingUser = (value) => {
  const {
    avatar_url, 
    name, 
    created_at, 
    login, 
    bio, 
    public_repos, 
    followers, 
    following, 
    location, 
    html_url, 
    twitter_username, 
    company
  } = value;  

  const userPhoto = document.querySelectorAll('.user-card__photo img').forEach((photo) => {
    photo.setAttribute('src', avatar_url);  
  });
  
  const userFirstName = document.querySelector('.user-info__name');
  userFirstName.textContent = name;
  
  const userJoined = document.querySelector('.user-info__joined');
  const date = new Date(created_at);
  userJoined.textContent = `Joined ${date.getFullYear()} ${date.toLocaleDateString('ru-RU', {month: 'long'})} ${date.getDate()}`;

  const userName = document.querySelector('.user-info__login');
  userName.textContent = `@${login}`;

  const userBio = document.querySelector('.user-info__bio');
  userBio.textContent = bio;

  const userStatistics = [public_repos, followers, following];
  document.querySelectorAll('.user-statistics-item__count').forEach((item, index) => {
    item.textContent = userStatistics[index]; 
  });

  const userFooterData = [location, twitter_username, html_url, company];
  document.querySelectorAll('.user-footer-item__title').forEach((item, index) => {
    if (userFooterData[index] === null) {
      item.textContent = 'Not Available';
      item.parentElement.classList.add('disabled');
      console.log(item.parentElement)
    } else {
      item.textContent = userFooterData[index]
      item.parentElement.classList.remove('disabled');
    }
  });
}

const getSearchValue = () => {
  const btnSearch = document.querySelector('.search__btn');

  const handledSearchValue = () => {
    const inputSearch = document.querySelector('.search__input').value;
    
    getDataUser(inputSearch).then((user) => {
      console.log(user)
      mappingUser(user);
    });  
  }

  btnSearch.addEventListener('click', handledSearchValue);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handledSearchValue();
  })
}

getSearchValue();
