module.exports = function check(str, bracketsConfig) {
  let openList = [];
  let closeList = {};
  let doubleList = [];
  let doubleListCount = {};
  //step first: create paired list of brackets & open list;
  bracketsConfig.forEach(el => {
    openList.push(el[0]);
    closeList[el[1]] = el[0];

    if (el[1] == el[0]) {
      doubleListCount[el[0]] = (str.length - str.replaceAll(el[0],'').length);
      doubleListCount[el[0] + "max"] = (str.length - str.replaceAll(el[0],'').length);
      doubleList.push(el[0]);
    }
  });
  //step second: start check loop of $str;
  let pull = [];  
  for (let i = 0; i <str.length; i++) {
    let current = str[i];

    //step three: contol of double & push/pop pull;
    if(openList.includes(current) && !doubleList.includes(current)) {
      pull.push(str[i]);
    } else if (doubleList.includes(current) && doubleListCount[current] % 2 == 0 && doubleListCount[current] > 1) {
      doubleListCount[current] = doubleListCount[current] - 1;
      pull.push(str[i]);
    } else {
      //step four: 
      if(doubleList.includes(current)) {
        doubleListCount[current] = doubleListCount[current] - 1;
      }
      if (pull.length == 0) {
        return false;
      } 
      //step five: 
      let topOfPull = pull[pull.length-1];

      if (closeList[current] === topOfPull) {
        pull.pop()
      } else {
        return false
      }
    }
  }
  return pull.length == 0;
}