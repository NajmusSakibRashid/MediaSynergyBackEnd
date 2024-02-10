const getNextScheduleMS = () => {
  const date = new Date();
  const minutes = date.getMinutes();
  let nextRoundMinute = Math.ceil(minutes / 10) * 10;
  if(nextRoundMinute === date.getMinutes()) {
    nextRoundMinute += 10;
  }
  date.setMinutes(nextRoundMinute);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime() - Date.now();
}

module.exports = getNextScheduleMS;
