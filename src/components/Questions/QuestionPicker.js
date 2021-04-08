//Picks a question to send to question display
import questions from "../../questions.json";

const N = 3;
const queues = [];
const score = 0;
//Push queues depending upon N
// [[], [], []]
for (let i = 0; i < N; i++) {
  queues.push([]);
}

// TODO could shuffle questions before inserting into queues

//Push questions to different queues
for (let i = 0; i < questions.length; i++) {
  queues[i % N].push(questions[i]);
}

/*
0 -> California, Miami, 10-6 //Higest frequency
1 -> Microsoft, Mars, 10/2
2 -> Iphone, 2+4, 15*2
*/

/**
 * Manage or update data structures for algorithm for question picking
 *
 * @param {Object} question Question that user answered. It's format is that of that coming from questions
 *  input source
 * @param {Boolean} isCorrect Did the user answer correctly
 */
const handleQuestionQueue = ({ question, queueIndex }, isCorrect) => {
  if (isCorrect) {
    //TODO: increase score if answered correctly
    //If question is not in last queue and answered correctly, move to next queue
    if (queueIndex != N - 1) {
      queues[queueIndex + 1].push(question);
    }

    //If question in last queue and answered correctly, push it at end of last queue
    else {
      queues[N - 1].push(question);
    }
  }
  if (!isCorrect) {
    queues[0].push(question);
  }

  // debugger;
};

/**
 * Pick and return the correct question based on the core algorithm
 *
 * @param {Number} currentQuestionNumber the quiz question number
 * @returns {Object} Object with the following fields:
 *  - question: the question object
 *  - queueIndex: the index of the queue the question was picked from
 */

//Decides what queue to pick the question from
const QuestionPicker = () => {
  const queueIndex = QuestionProbability();

  console.log("Index received: " + queueIndex);
  if (queues[queueIndex].length > 0) {
    const question = queues[queueIndex].shift();
    return { question, queueIndex };
  } else {
    return QuestionPicker();
  }
};

//Sends queueIndex to question picker
const QuestionProbability = () => {
  let ans = []; //Final array
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
  console.log("Index sent: " + index);
  return index;
};

export { handleQuestionQueue };
export default QuestionPicker;
