import axios from 'axios';

export const getDataUser = async (username) => {
  try {
    return await axios.get(`https://api.github.com/users/${username}`).then(({data}) => data);
  } catch (error) {
    const searchDanger = document.querySelector('.search__danger');
    searchDanger.style.opacity = 1;
    console.error(error.response.status);
  }
}
