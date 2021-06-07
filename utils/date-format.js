/* eslint-disable */
Date.prototype.format = function(pattern) {
  let pad = function(source, length) {
    let pre = '',
      negative = source < 0,
      string = String(Math.abs(source));

    if (string.length < length) {
      pre = new Array(length - string.length + 1).join('0');
    }

    return (negative ? '-' : '') + pre + string;
  };

  if (typeof pattern !== 'string') {
    return this.toString();
  }

  let replacer = function(patternPart, result) {
    pattern = pattern.replace(patternPart, result);
  };

  let year = this.getFullYear(),
    month = this.getMonth() + 1,
    date2 = this.getDate(),
    hours = this.getHours(),
    minutes = this.getMinutes(),
    seconds = this.getSeconds(),
    milliSec = this.getMilliseconds();

  replacer(/yyyy/g, pad(year, 4));
  replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
  replacer(/MM/g, pad(month, 2));
  replacer(/M/g, month);
  replacer(/dd/g, pad(date2, 2));
  replacer(/d/g, date2);

  replacer(/HH/g, pad(hours, 2));
  replacer(/H/g, hours);
  replacer(/hh/g, pad(hours % 12, 2));
  replacer(/h/g, hours % 12);
  replacer(/mm/g, pad(minutes, 2));
  replacer(/m/g, minutes);
  replacer(/ss/g, pad(seconds, 2));
  replacer(/s/g, seconds);
  replacer(/SSS/g, pad(milliSec, 3));
  replacer(/S/g, milliSec);
  return pattern;
};
