const getDate = () => {
  const nowDate = new Date();
  const formattedDate = nowDate.toString().slice(4, 10);
  const formattedTime = nowDate.toLocaleTimeString();

  const currentDateHtml = `<span>${formattedDate} ${formattedTime}</span>`;

  return currentDateHtml;
};

module.exports = { getDate };
