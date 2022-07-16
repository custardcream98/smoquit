const timeDelta2str = (delta) => {
  const year = Math.floor(delta / 31536000000);
  delta %= 31536000000;
  const month = Math.floor(delta / 2592000000);
  delta %= 2592000000;
  const day = Math.floor(delta / 86400000);
  delta %= 86400000;
  const hour = Math.floor(delta / 3600000);
  delta %= 3600000;
  const minute = Math.floor(delta / 60000);
  delta %= 60000;
  const secound = Math.floor(delta / 1000);

  return `${year ? year + "년 " : ""}${month ? month + "개월 " : ""}${
    day ? day + "일 " : ""
  }${hour ? hour + "시간 " : ""}${minute ? minute + "분 " : ""}${secound}초`;
};

export default timeDelta2str;
