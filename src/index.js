module.exports = function check(str, bracketsConfig) {
  let openList = [];
  let closeList = {};

  //step first: create paired list of brackets & open list
  bracketsConfig.forEach(el => {
    openList.push(el[0]);
    closeList[el[1]] = el[0];
  });
  
  //step second: start check loop of $str
  let pull = [];
  for (let i = 0; i <str.length; i++) {
    let current = str[i];
    let topOfPull = pull[pull.length-1]

    //step three: 
    if(openList.includes(current)) {
      pull.push(str[i]);
    } else {
      if (pull.length == 0) {
        return false
      } 

      if (closeList[current] === topOfPull) {
        pull.pop()
      } else {
        return false
      }
    }
  }
  return pull.length == 0;
}