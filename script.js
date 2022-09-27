//--------------------- Variables and Constants -----------------------------------------------------------------------

const allOfSections = [];
const winnerArrange = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const circles = [];
let clickCounter = 0;
let crossCounter = 0;
let circleCounter = 0;
const crosses = [];
const crossInsertable = `<div class="cross element">
    <svg
      class="svg-icon"
      style="
    width: 5em;
    height: 5em;
    vertical-align: middle;
    fill: white;
    overflow: hidden;
  "
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1014.643493 822.632271c0 0 0 0-0.020479 0l-310.629747-310.629747 310.629747-310.629747c0 0 0 0 0.020479 0 3.338123-3.338123 5.754678-7.249666 7.311104-11.40696 4.239211-11.366001 1.822656-24.677535-7.331583-33.831774l-146.734054-146.734054c-9.154239-9.154239-22.445293-11.570794-33.831774-7.311104-4.157294 1.556425-8.068837 3.972981-11.427439 7.311104 0 0 0 0 0 0l-310.629747 310.650226-310.629747-310.629747c0 0 0 0 0 0-3.338123-3.338123-7.249666-5.754678-11.40696-7.311104-11.386481-4.239211-24.677535-1.822656-33.831774 7.311104l-146.734054 146.734054c-9.154239 9.154239-11.570794 22.445293-7.331583 33.831774 1.556425 4.157294 3.972981 8.068837 7.311104 11.40696 0 0 0 0 0 0l310.629747 310.629747-310.629747 310.650226c0 0 0 0 0 0-3.338123 3.338123-5.754678 7.249666-7.311104 11.40696-4.239211 11.366001-1.822656 24.677535 7.331583 33.831774l146.734054 146.734054c9.154239 9.154239 22.445293 11.570794 33.831774 7.331583 4.157294-1.556425 8.068837-3.972981 11.40696-7.311104 0 0 0 0 0 0l310.629747-310.629747 310.629747 310.629747c0 0 0 0 0.020479 0 3.338123 3.338123 7.249666 5.754678 11.40696 7.311104 11.386481 4.239211 24.677535 1.822656 33.831774-7.331583l146.734054-146.734054c9.154239-9.154239 11.570794-22.445293 7.331583-33.831774-1.556425-4.157294-3.972981-8.068837-7.311104-11.40696z" />
    </svg>
  </div>`;
const circleInsertable = `<div class="circle element">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  </div>`;
let leftOver;
let cross;
let circle;
let crossSectionNums = [];
let circleSectionNums = [];
let pureCrossSectionNums;
let pureCircleSectionNums;
const ground = document.querySelector(".ground");
const body = document.querySelector("body");
const crossWinningMessage = document.querySelector(".crossWinningMessage");
const circleWinningMessage = document.querySelector(".circleWinningMessage");
const gameExplain = document.querySelector(".gameExplain");
const button = document.querySelector("button");
let winnerArrangeCells;
let elements;
let clickedSection;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//--------------------- Functions -----------------------------------------------------------------------

//each section of game ground, is a 'div'; . . .
//so we should have these sections in an array, named to 'allOfSections', using a loop and 'push' method.
for (i = 1; i < 10; i++) {
  const section = document.querySelector(`.g${i}`);
  allOfSections.push(section);
}
//console.log(allOfSections);

//.......................................................................

//if a click is even:
//1. a 'circle' svg (with a 'div' which has wrapped it) inserts in the clicked section's div.
//2. so, something is added to our 'index.html' file virtually, . . .
// so we must put it on a variable to use it, in the rest of the code.
//3. 'clickCounter' increases by 1(because we 'clicked' to make these things happen).
//else, if a click is odd:
//1. a 'cross' svg (with a 'div' which has wrapped it) inserts in the clicked section's div.
//2. so, something is added to our 'index.html' file virtually, . . .
// so we must put it on a variable to use it, in the rest of the code.
//3. 'clickCounter' increases by 1(because we 'clicked' to make these things happen).
const crossORcircle = function () {
  if (leftOver == 0) {
    clickedSection.insertAdjacentHTML("beforeend", `${circleInsertable}`);
    circle = document.querySelectorAll(".circle");
    circleCounter += 1;
    //console.log(circleCounter);
  } else {
    clickedSection.insertAdjacentHTML("beforeend", `${crossInsertable}`);
    cross = document.querySelectorAll(".cross");
    crossCounter += 1;
    //console.log(crossCounter);
  }
};

//.......................................................................

//we can get all of the crosses and their section div classes, using 'parentElement', loop and 'classlist' . . .
//then we push each 'cross' section, in the array 'crossSectionNums' . . .
//then we use 'Set' and change it into 'pureCrossSectionNums', to delete repeated sections(because of loop fault).
const crossSections = function () {
  for (j = 0; j < cross.length; j++) {
    let crossSectionNum = Number(cross[j].parentElement.classList[0].slice(-1));
    crossSectionNums.push(crossSectionNum);
    pureCrossSectionNums = [...new Set(crossSectionNums)];
  }
  //console.log(pureCrossSectionNums);
};

//.......................................................................

//when this function is run:
//1. it defines the variable 'winnerArrangeCells'; . . .
//it's name of each cell of the array 'winnerArrange', which was defined on top of the code(in Variables and Constants) . . .
// (it dose it using loop in 'winnerArrange' array)
//2. if there was each of winning arranges (that are defined in array 'winnerArrange'), in 'pureCrossSectionNums'(the ultimate sections which there is cross in them), the 'cross' wins . . .
//notice: 'winnerArrange' includes cells defined as 'winnerArrangeCells' . . .
// each 'winnerArrangeCells' is an array itself, that includes 3 numbers, that are numbers of sections you must fill by your mark, to win . . .
//it is checked in 'if' block that all of three numbers of each 'winnerArrangeCells' exist in 'pureCrossSectionNums'(look! there are '&&' between includes).
//then if the condition is right, the 'cross' player wins, and to show the wining, some styles will be changed to show the winning message and so on.
const crossWinning = function () {
  for (j = 0; j < winnerArrange.length; j++) {
    winnerArrangeCells = winnerArrange[j];
    //console.log(winnerArrangeCells)
    if (
      pureCrossSectionNums.includes(winnerArrangeCells[0]) &&
      pureCrossSectionNums.includes(winnerArrangeCells[1]) &&
      pureCrossSectionNums.includes(winnerArrangeCells[2])
    ) {
      ground.style.display = "none";
      gameExplain.style.display = "none";
      body.style.flexDirection = "column";
      body.style.justifyContent = "center";
      body.style.alignItems = "center";
      crossWinningMessage.style.display = "flex";
    }
    //console.log(winnerArrange0[k])
  }
};

//.......................................................................

//we can get all of the circles and their section div classes, using 'parentElement', loop and 'classlist' . . .
//then we push each 'circle' section, in the array 'circleSectionNums' . . .
//then we use 'Set' and change it into 'pureCircleSectionNums', to delete repeated sections(because of loop fault).
const circleSections = function () {
  for (j = 0; j < circle.length; j++) {
    let circleSectionNum = Number(
      circle[j].parentElement.classList[0].slice(-1)
    );
    circleSectionNums.push(circleSectionNum);
    pureCircleSectionNums = [...new Set(circleSectionNums)];
  }
  //console.log(pureCircleSectionNums);
};

//.......................................................................

//when this function is run:
//1. it defines the variable 'winnerArrangeCells'; . . .
//it's name of each cell of the array 'winnerArrange', which was defined on top of the code(in Variables and Constants) . . .
// (it dose it using loop in 'winnerArrange' array)
//2. if there was each of winning arranges (that are defined in array 'winnerArrange'), in 'pureCircleSectionNums'(the ultimate sections which there is circle in them), the 'circle' wins . . .
//notice: 'winnerArrange' includes cells defined as 'winnerArrangeCells' . . .
// each 'winnerArrangeCells' is an array itself, that includes 3 numbers, that are numbers of sections you must fill by your mark, to win . . .
//it is checked in 'if' block that all of three numbers of each 'winnerArrangeCells' exist in 'pureCircleSectionNums'(look! there are '&&' between includes).
//then if the condition is right, the 'circle' player wins, and to show the wining, some styles will be changed to show the winning message and so on.
const circleWinning = function () {
  for (j = 0; j < winnerArrange.length; j++) {
    winnerArrangeCells = winnerArrange[j];
    //console.log(winnerArrange0)
    if (
      pureCircleSectionNums.includes(winnerArrangeCells[0]) &&
      pureCircleSectionNums.includes(winnerArrangeCells[1]) &&
      pureCircleSectionNums.includes(winnerArrangeCells[2])
    ) {
      ground.style.display = "none";
      gameExplain.style.display = "none";
      body.style.flexDirection = "column";
      body.style.justifyContent = "center";
      body.style.alignItems = "center";
      circleWinningMessage.style.display = "flex";
    }
    //console.log(winnerArrange0[k])
  }
};

//.......................................................................

//when the 'New Game' button is pressed:
//1. some styles must be change to remove the winning message and show the game table and the game explanation.
//2. we use a loop with 'element' variable which has been made above, . . .
//to choose and remove all of marks that has been inserted('cross' marks and 'circle' marks.).
//3. the data saved in variable 'element', will be removed.
//4. the 'clickCounter' variable, will change into its initial value(=0).
//5. 'pureCrossSectionNums', 'pureCircleSectionNums', 'crossSectionNums' and 'circleSectionNums' variables' datas  will be removed, . . .
//and the become empty arrays,  as their initial values.
//all of wining messages will be removed.
const NewGame = function () {
  button.addEventListener("click", function () {
    ground.style.display = "grid";
    gameExplain.style.display = "flex";
    body.style.flexDirection = "row";
    body.style.justifyContent = "space-between";
    body.style.alignItems = "center";
    circleWinningMessage.style.display = "none";
    crossWinningMessage.style.display = "none";
    for (i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
    elements = null;
    clickCounter = 0;
    pureCrossSectionNums = [];
    crossSectionNums = [];
    pureCircleSectionNums = [];
    circleSectionNums = [];
    circleWinningMessage.style.display = "none";
    crossWinningMessage.style.display = "none";
  });
};

//.......................................................................

//we use a loop to consider each section;
for (i = 0; i < allOfSections.length; i++) {
  //when players click on each section:
  //1. number of clicks are counted since start of the game, by 'clickCounter' variable: . . .
  // initial value of this variable is 0, and it will increase '1', every click.
  //2.'leftOver' variable is leftover of click numbers, divided by 2, . . .
  //  if it's 0, click numbers are even, anf if leftover is 1, click numbers are odd.
  allOfSections[i].addEventListener("click", function (e) {
    clickedSection = e.target;
    clickCounter += 1;
    leftOver = clickCounter % 2;
    //console.log(leftOver)
    //console.log(e.target);
    //console.log(Number(e.target.classList[0].slice(-1))),
    //console.log(clickCounter);

    //.....................

    crossORcircle();

    //.....................

    crossSections();

    //.....................

    circleSections();

    //.....................

    //we don't want winning functions be run immediately after filling on of winning arrange, . . .
    //we wanna see the filling for a short time, then winning message will be shown on the page.
    setTimeout(circleWinning, 300);
    setTimeout(crossWinning, 300);

    //.....................

    //the 'element' variable is defined, to choose all of 'cross' and 'circle' marks on the table(by this common class '.element') . . .
    //to change their 'display' into 'none' in the rest of the code.
    elements = document.querySelectorAll(".element");
    //console.log(elements);
    //console.log(pureCircleSectionNums);
    //console.log("crosses" + pureCrossSectionNums);
  });
}

//.......................................................................

NewGame();
