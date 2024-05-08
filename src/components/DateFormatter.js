const ChangeDate = (dateString) => {
  const date = new Date(dateString);
  // 숫자를 두 자리로 만드는 함수
  const padZero = (num) => {
    return num.toString().padStart(2, '0');
  };
  const formattedDate = `${date.getFullYear()}년 ${padZero(date.getMonth() + 1)}월 ${padZero(date.getDate())}일`;

  return formattedDate;
}

const ChangeDateForPosting = (dateString) => {
  // 년, 월, 일 추출
  const year = dateString.slice(0, 4);   // "2024"
  const month = dateString.slice(4, 6);  // "05"
  const day = dateString.slice(6, 8);    // "01"

  const formattedDate = `${year}년 ${month}월 ${day}일`;
  return formattedDate;
}

export { ChangeDate, ChangeDateForPosting };