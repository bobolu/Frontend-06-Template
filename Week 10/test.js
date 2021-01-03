/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */
var minPatches = function(nums, n) {

};

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
  stones.sort((a,b) => {return a - b})
  while(stones.length > 1) {
    for(let i = 0; i < stones.length; i++) {
      if(stones[stones.length - 1] == stones[stones.length - 2]) {
        stones = stones.slice(0, stones.length - 2)
      } else {
        let tmp = stones[stones.length - 1] - stones[stones.length - 2]
        stones = stones.slice(0, stones.length - 2)
        stones.push(tmp)
        stones.sort((a,b) => {return a - b})
      }
    }
  }
    return stones[0] || 0
};
// lastStoneWeight([2,7,4,1,8,1])

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
  intervals.sort((a,b) => {return a[0]-b[0]})
  console.log(intervals)
  for(let i = 0;i<intervals.length -1;i++){
    if(intervals[i+1][0] >= intervals[i][1]) {

    } else {

    }
  }
};

// eraseOverlapIntervals([ [1,2], [2,3], [3,4], [1,3] ])

function testSet() {
  for(let i = 0;i<10;i++) {
    setTimeout(()=> console.log(i),1000)
  }  
}
// testSet()