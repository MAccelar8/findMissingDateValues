/**
 * This test input contains days from month of JAN(31 day month) from year 1970 (in the past)
 */
var test1 = {
  "1970-1-28": 100,
  "1970-2-2": 115,
  "1970-2-3": 130,
  "1970-2-5": 140,
  "1970-2-8": 155,
};

/**
 * This test input contains days from month of JUNE(30 day month) from year 1970 (in the past)
 */
var test2 = {
  "1970-6-28": 100,
  "1970-7-2": 115,
  "1970-7-3": 130,
  "1970-7-5": 140,
  "1970-7-8": 155,
};

/**
 * This test input contains days from month of JAN(31 day month) from year 2070 (in the Future)
 */
var test3 = {
  "2070-1-28": 100,
  "2070-2-2": 115,
  "2070-2-3": 130,
  "2070-2-5": 140,
  "2070-2-8": 155,
};

/**
 * This test input contains days from month of JUNE(30 day month) from year 2070 (in the Future)
 */
var test4 = {
  "1970-6-28": 100,
  "1970-7-2": 115,
  "1970-7-3": 130,
  "1970-7-5": 140,
  "1970-7-8": 155,
};

/**
 * This test input contains days from month of FEBRUARY with a LEAP year
 */
var test5 = {
  "2016-2-28": 100,
  "2016-3-2": 115,
  "2016-3-3": 130,
  "2016-3-5": 140,
  "2016-3-8": 125,
};

/**
 * This test input contains days from month of FEBRUARY without a LEAP year
 */
var test6 = {
  "1991-2-28": 100,
  "1991-3-2": 115,
  "1991-3-3": 130,
  "1991-3-5": 140,
  "1991-3-8": 155,
};

var output1 = getOutput(test1);
var output2 = getOutput(test2);
var output3 = getOutput(test3);
var output4 = getOutput(test4);
var output5 = getOutput(test5);
var output6 = getOutput(test6);

console.log("INPUT", test1);
console.log("OUTPUT", output1);
console.log("---------------------------");
console.log("INPUT", test2);
console.log("OUTPUT", output2);
console.log("---------------------------");
console.log("INPUT", test3);
console.log("OUTPUT", output3);
console.log("---------------------------");
console.log("INPUT", test4);
console.log("OUTPUT", output4);
console.log("---------------------------");
console.log("INPUT", test5);
console.log("OUTPUT", output5);
console.log("---------------------------");
console.log("INPUT", test6);
console.log("OUTPUT", output6);

function getDateFormat(tempdate) {
  return (
    tempdate.getFullYear() +
    "-" +
    (tempdate.getMonth() + 1) +
    "-" +
    tempdate.getDate()
  );
}

function getOutput(d) {
  var resultant = {};
  var keys = Object.keys(d);

  keys.reduce(
    (function (hash) {
      return function (p, c) {
        if (hash.prev) {
          var prevDate = getDateFormat(new Date(hash.prev));
        } else {
          resultant[c] = d[c];
        }

        /**
         * Finding missing days between current and previous dates
         */
        var missingDaysNo = (Date.parse(c) - hash.prev) / (1000 * 3600 * 24);

        if (hash.prev && missingDaysNo > 1) {
          let additor = (d[c] - d[prevDate]) / missingDaysNo;
          let initial = d[prevDate];
          /**
           * iterating over each missing days to add average value to result
           */
          for (var i = 1; i < missingDaysNo; i++) {
            initial += additor;
            let tempdate = new Date(hash.prev + i * (1000 * 3600 * 24));
            let date = getDateFormat(tempdate);

            resultant[date] = initial;
          }
          resultant[c] = d[c];
        }

        if (hash.prev && missingDaysNo <= 1) {
          resultant[c] = d[c];
        }
        hash.prev = Date.parse(c);
      };
    })(Object.create(null)),
    []
  );

  return resultant;
}
