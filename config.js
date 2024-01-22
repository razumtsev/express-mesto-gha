const port = process.env.PORT || 3000;
const dataBaseName = process.env.DB_NAME || 'mestodb';

const httpLinkPattern = /^https?:\/\/[w{3}.]?[\w./-]{5,}/i;
const defaultUserName = 'Жак-Ив Кусто';
const defaultUserAbout = 'Исследователь';
const defaultUserAvatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

module.exports = {
  port,
  dataBaseName,
  httpLinkPattern,
  defaultUserName,
  defaultUserAbout,
  defaultUserAvatar,
};
