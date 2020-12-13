function stringToNumber(str) {
  let result = 0;
  // 二进制（前缀0b）
  if (str.startsWith("0b")) {
    let im = str.slice(2);
    for (let i = im.length; i > 0; i--) {
      result += im[i - 1] * 2 ** (im.length - i);
    }
    return result;
  }

  // 八进制（前缀0o）
  if (str.startsWith("0o")) {
    let im = str.slice(2);
    for (let i = im.length; i > 0; i--) {
      result += im[i - 1] * 8 ** (im.length - i);
    }
    return result;
  }

  // 十六进制（前缀0x）
  if (str.startsWith("0x")) {
    let im = str.slice(2);
    for (let i = im.length; i > 0; i--) {
      result += "0123456789abcdef".indexOf(im[i - 1]) * 16 ** (im.length - i);
    }
    return result;
  }

  // 默认十进制
  return Number(str);
}

function numberToString(num, mode = 10) {
  let result = "";
  let numb = Math.abs(num);
  if (isNaN(numb)) {
    return 'NaN';
  }
  if (mode === 2) {
    while (numb > 0) {
      numb % 2 ? (result = (numb % 2) + result) : (result = 0 + result);
      numb >>= 1;
    }
    return "0b" + result;
  }
  if (mode === 8) {
    while (numb > 0) {
      numb % 8 ? (result = (numb % 8) + result) : (result = 0 + result);
      numb >>= 3;
    }
    return "0o" + result;
  }
  if (mode === 16) {
    while (numb > 0) {
      numb % 16 ? (result = (numb % 16) + result) : (result = 0 + result);
      numb >>= 4;
    }
    return "0x" + result;
  }
  return String(numb);
}
console.log(stringToNumber('0b1010'));
console.log(stringToNumber('0o1010'));
console.log(stringToNumber('0x1010'));
console.log(stringToNumber('1010'));
console.log(stringToNumber('cc1010'));

console.log(numberToString(100,8));
console.log(numberToString(100,16));
console.log(numberToString(100,10));
console.log(numberToString(100,2));
console.log(numberToString('abc',2));