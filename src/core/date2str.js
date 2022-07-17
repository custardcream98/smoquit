const date2str = (date) =>
  //`${date.getFullYear()}년
  `${date.getMonth() + 1}월 ${date.getDate()}일 ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
// :${date
// .getSeconds()
// .toString()
// .padStart(2, "0")}
// `;

export default date2str;
