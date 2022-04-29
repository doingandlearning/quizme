#!/Users/kevin/.nvm/versions/node/v17.9.0/bin/node

import inquirer from "inquirer";
import fs from "fs";

const add = process.argv.includes("--add");

if (add) {
  addQuestion();
} else {
  askQuestion();
}

function askQuestion() {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  const filteredQuestions = data.filter((question) => !question.lastAnswer);

  let question;

  if (filteredQuestions.length > 0) {
    question =
      filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
  } else {
    question = data[Math.floor(Math.random() * data.length)];
  }

  inquirer
    .prompt([{ type: "input", name: "answer", message: question.question }])
    .then((result) => {
      if (result.answer.toLowerCase() === question.answer.toLowerCase()) {
        question.lastAnswer = true;
        console.log("This was right");
      } else {
        question.lastAnswer = false;
        console.log("No dice sucker!");
      }
      question.lastAsked = new Date();

      const newArray = data.filter((item) => item.id !== question.id);
      newArray.push(question);

      fs.writeFileSync("./data.json", JSON.stringify(newArray));
    })
    .catch((error) => console.error(error));
}

function addQuestion() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "question",
        message: "What is your question?",
      },
      {
        type: "input",
        name: "answer",
        message: "What is the answer?",
      },
    ])
    .then((answers) => {
      if (!answers.question || !answers.answer) {
        console.log("You need to give me something!");
        return;
      }
      const currentData = JSON.parse(fs.readFileSync("./data.json"));

      const newQuestion = {
        id: getNewId(currentData),
        question: answers.question,
        answer: answers.answer,
        created: new Date(),
        lastAnswer: null,
        lastAsked: null,
      };
      currentData.push(newQuestion);
      fs.writeFileSync("./data.json", JSON.stringify(currentData));
      console.log("Thanks for your question!");
    })
    .catch((error) => {
      console.error(error);
    });
}

function getNewId(data) {
  return Math.max(data.map((item) => item.id)) + 1;
}
