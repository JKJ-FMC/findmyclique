const axios = require('axios');
const {
  db,
  models: { Trivia, Question },
} = require('../server/db');

const fetchTrivia = async(events) => {

  //get total number of trivias to load
  const totalTrivias = events.length;
  console.log('total trivias to load', totalTrivias)

  for (let i = 0; i < totalTrivias; i++) {
    let currEvent = events[i];

    //create trivia for current event
    const trivia = await Trivia.create({ eventId: currEvent.id })

    //fetch 8 questions for current event
    const questionsResp = (await axios.get(`https://opentdb.com/api.php?amount=${8}`)).data.results;

    //loop through questions, add to Question table
    const questions = await Promise.all(questionsResp.map(question => Question.create(question)));

    //set trivia ID as parent key of questions
    await Promise.all(questions.map(question => {
      Question.update({ triviumId: trivia.id }, { where: { id: question.id } })
    }));

  };
};

module.exports = fetchTrivia;
