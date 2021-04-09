/*
 * Picks a question to send to question display.
 */
import questions from "../../questions.json";
import config from "../../config.json";

const N = config.boxesNumber; //Number of boxes to make
const queues = [];
/**
 * Push queues depending upon N
 * e.g N = 3
 * queues will become[[], [], []]
 */
for (let i = 0; i < N; i++) {
  queues.push([]);
}

/**
 * Push questions to different queues. For each queue to have a question,
 * number of queues < number of total questions.
 */
//
for (let i = 0; i < questions.length; i++) {
  queues[i % N].push(questions[i]);
}

/**
 * Assign timer to each queue. First queue is assigned the most time and the time
 * decreases for each queue afterwards.
 */
const queueTimes = []; //Store how much time to allow for questions from each queue
let queueTime = config.hardestBoxTime;
for (let i = 0; i < queues.length; i++) {
  queueTimes.push(queueTime);
  queueTime = queueTime - config.timeDecrement;
}

/**
 * Update the queue depending upon user response.
 *
 * @param {Object} Object with the following fields:
 *  - question: question Object that user answered.
 *  - queueIndex: the index of the queue the question needs to pushed.
 * @param {Boolean} isCorrect Did the user answer correctly.
 */
const handleQuestionQueue = ({ question, queueIndex }, isCorrect) => {
  if (isCorrect) {
    //If question is not in last queue and answered correctly, move to next queue.
    if (queueIndex !== N - 1) {
      queues[queueIndex + 1].push(question);
    }

    //If question in last queue and answered correctly, push it at end of last queue.
    else {
      queues[N - 1].push(question);
    }
  }

  //If the question was answered wrong, push it to end of queue 0.
  if (!isCorrect) {
    queues[0].push(question);
  }
};

/**
 * Pick and return the correct question based on the core algorithm
 *
 * @returns {Object} Object with the following fields:
 *  - question: the question picked
 *  - questionTime: time for the individual question
 *  - queueIndex: the index of the queue the question was picked from
 */
const questionPicker = () => {
  const queueIndex = questionProbability();

  if (queues[queueIndex].length > 0) {
    const question = queues[queueIndex].shift();
    return {
      question,
      questionTime: queueTimes[queueIndex],
      queueIndex,
    };
  } else {
    return questionPicker();
  }
};

/**
 * queue with harder questions have a higher probability of being picked.
 * @returns {Integer} the queueIndex to send to question picker.
 */
const questionProbability = () => {
  let ans = [];
  let n = queues.length;
  let count = 0;

  //Add zero to array n times, one to array n-1 times and so on until N-1
  /*
    e.g. n = 3
    them 0 will be added 3 times, 1 will bed added twice and 3 will be added once
    Resulting array: [0,0,0,1,1,2]
    Since 0 has a higher frequency, the random method will have a higher probability of picking 0.
    */
  while (n > 0) {
    for (let i = 0; i < n; i++) {
      ans.push(count);
    }
    n--;
    count++;
  }
  let index = ans[Math.floor(Math.random() * ans.length)]; //Picks a random number from the array
  return index;
};

export { handleQuestionQueue };
export default questionPicker;
