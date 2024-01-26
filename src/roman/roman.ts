const unitMap: any = {
  0: "",
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
};

const tensMap: any = {
  0: "",
  1: "X",
  2: "XX",
  3: "XXX",
  4: "XL",
  5: "L",
  6: "LX",
  7: "LXX",
  8: "LXXX",
  9: "XC",
}

const hundredsMap: any = {
  0: "",
  1: "C",
  2: "CC",
  3: "CCC",
  4: "CD",
  5: "D",
  6: "DC",
  7: "DCC",
  8: "DCCC",
  9: "CM",
}


const tMap: any = {
  0: "",
  1: "M",
  2: "MM",
  3: "MMM",
}

const getRoman = (number: number) => {
  let digits = getDigits(number).reverse();
  let output = '';


  if (digits.length > 3) {
    output += tMap[digits[3]];
  }
  
  if (digits.length > 2) {
    output += hundredsMap[digits[2]];
  }

  if (digits.length > 1) {
    output += tensMap[digits[1]];
  }

  output += unitMap[digits[0]];

  return output;
};

export const getDigits = (number: number) => {
  return number.toString().split('').map((char : string) => parseInt(char));
};

export default getRoman;
