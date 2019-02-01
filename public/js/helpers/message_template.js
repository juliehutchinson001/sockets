import { getDate } from './get_date';

const newMessageElement = () => {
  const li = document.createElement('li');
  li.classList.add('message');
  return li;
};

const newLocationMessageElement = location => {

};

module.exports = { newMessageElement, newLocationMessageElement };
