
function twoDigit(number)
{
  if (number > 9)
    return "" + number;

  return "0" + number;
}

function showTime(dateTime)
{
  return twoDigit(dateTime.getHours()) + ":" + twoDigit(dateTime.getMinutes());
}

export { showTime };

