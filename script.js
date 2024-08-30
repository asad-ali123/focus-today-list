const checkBoxList = document.querySelectorAll(".custom-checkbox");
const errorMasg = document.querySelector(".error-masg");
const inputFields = document.querySelectorAll(".input-field");
const progressValue = document.querySelector(".progress-value");
const progressBar = document.querySelector(".progress-bar");
const progressLabel = document.querySelector(".progress-label");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressValue.style.width = `${
  (completedGoalsCount / inputFields.length) * 100
}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progressValue.style.width = `${
        (completedGoalsCount / inputFields.length) * 100
      }%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
        errorMasg.innerHTML = "Please set all the 3 goals!";
    }
  });
});

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    errorMasg.innerHTML = "";
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
