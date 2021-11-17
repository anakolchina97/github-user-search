import axios from 'axios';

export const getDataUser = async (username) => {
  return await axios.get(`https://api.github.com/users/${username}`).then(({data}) => data);
}
