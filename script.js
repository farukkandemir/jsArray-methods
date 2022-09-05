"use strict";

const main = document.querySelector(".main");
const addUserBtn = document.querySelector(".add");
const doubleMoneyBtn = document.querySelector(".double");
const showMilBtn = document.querySelector(".only-mil");
const sortBtn = document.querySelector(".sort");
const calculateBtn = document.querySelector(".calculate");

let data = [];

async function createRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDom();
}

function doubleMoney() {
  data = data.map((user) => {
    user.money *= 2;
    return user;
  });
  updateDom();
}

function sortMoney() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

function showMillionaire() {
  data = data.filter((user) => user.money > 1000000);
  updateDom();
}

function calculateEntireWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Weight : <strong>${formatMoney(
    wealth
  )}</strong> </h3>`;

  main.appendChild(wealthEl);
}

function updateDom(providedData = data) {
  main.innerHTML = ` <h2><strong>Person</strong>Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");

    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;

    main.appendChild(element);
  });
}

function formatMoney(number) {
  return `$` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

createRandomUser();
createRandomUser();
createRandomUser();

addUserBtn.addEventListener("click", createRandomUser);

doubleMoneyBtn.addEventListener("click", doubleMoney);

sortBtn.addEventListener("click", sortMoney);

showMilBtn.addEventListener("click", showMillionaire);

calculateBtn.addEventListener("click", calculateEntireWealth);
