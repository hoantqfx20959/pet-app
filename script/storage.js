'use strict';

const petArrs = [];
const breedArrs = [];
const petArr = getFromStorage('petArr');
const breedArr = getFromStorage('breedArr');
const navEl = document.getElementById('sidebar');
const formEl = document.getElementById('container-form');

const submitBtn = document.getElementById('submit-btn');
const tableBodyEl = document.getElementById('tbody');
const healthyBtn = document.getElementById('healthy-btn');
const bmiBtn = document.getElementById('bmi-btn');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

const pet1 = {
  id: 'P001',
  name: 'Dober Mix',
  age: '3',
  type: 'Dog',
  weight: '12',
  length: '87',
  color: '#f783ac',
  breed: 'Mixed Breed',
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  bmi: '',
  date: new Date(2022, 3, 3),
};

const pet2 = {
  id: 'P002',
  name: 'Charlie Tux',
  age: '4',
  type: 'Cat',
  weight: '4',
  length: '65',
  color: '#2b8a3e',
  breed: 'Tabby',
  vaccinated: true,
  dewormed: false,
  sterilized: false,
  bmi: '',
  date: new Date(2022, 3, 3),
};

const pet3 = {
  id: 'P003',
  name: 'Sweetie Pie',
  age: '3',
  type: 'Dog',
  weight: '6',
  length: '45',
  color: '#e03131',
  breed: 'Husky',
  vaccinated: false,
  dewormed: false,
  sterilized: true,
  bmi: '',
  date: new Date(2022, 3, 3),
};

const pet4 = {
  id: 'P004',
  name: 'Chocolate And Kitten',
  age: '4',
  type: 'Cat',
  weight: '6',
  length: '87',
  color: '#ffd43b',
  breed: 'Mixed Breed',
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  bmi: '',
  date: new Date(2022, 3, 3),
};

const pet5 = {
  id: 'P005',
  name: 'Symple',
  age: '6',
  type: 'Dog',
  weight: '8',
  length: '77',
  color: '#0c8599',
  breed: 'Doberman Pinscher',
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  bmi: '',
  date: new Date(2022, 3, 3),
};

petArrs.push(pet1, pet2, pet3, pet4, pet5);

const breed1 = {
  breed: 'Doberman Pinscher',
  type: 'Dog',
};

const breed2 = {
  breed: 'Husky',
  type: 'Dog',
};

const breed3 = {
  breed: 'Tabby',
  type: 'Cat',
};

const breed4 = {
  breed: 'Mixed Breed',
  type: 'Cat',
};

const breed5 = {
  breed: 'Mixed Breed',
  type: 'Dog',
};

breedArrs.push(breed1, breed2, breed3, breed4, breed5);

// Bổ sung Animation cho Sidebar
navEl.addEventListener('click', function () {
  this.classList.toggle('active');
});

// Lưu data dưới LocalStorage
// Lưu data pet vào storage
if (!getFromStorage('petArr')) {
  saveToStorage('petArr', petArrs);
}
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lưu data breed vào storage
if (!getFromStorage('breedArr')) {
  saveToStorage('breedArr', breedArrs);
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
