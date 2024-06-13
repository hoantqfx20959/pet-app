'use strict';

const findBtn = document.getElementById('find-btn');

// Hiển thị danh sách pet
renderTableData(petArr);

function renderTableData(petArr) {
  tableBodyEl.innerHTML = '';

  for (let i = 0; i < petArr.length; i++) {
    // data ngày tháng
    const inputDate = new Date(petArr[i].date);

    // Tạo array
    const row = document.createElement('tr'); // Add <tr>
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td>${petArr[i].breed}</td>
    <td><i class="bi ${petArr[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
    <td><i class="bi ${petArr[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
    <td><i class="bi ${petArr[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
    <td scope="col" class="hide">${petArr[i].bmi}</td>
    <td>${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}</td>
    `;

    tableBodyEl.appendChild(row);
  }
}

// Bắt sự kiện Click vào nút "Find"
findBtn.addEventListener('click', function () {
  let finded = petArr;

  // find theo id
  if (idInput.value) {
    finded = finded.filter(pet => pet.id.includes(idInput.value));
  }

  // find theo name
  if (nameInput.value) {
    finded = finded.filter(pet => pet.name.includes(nameInput.value));
  }

  // find theo type
  if (typeInput.value !== 'Select Type') {
    finded = finded.filter(pet => pet.type === typeInput.value);
  }

  // find theo breed
  if (breedInput.value !== 'Select Breed') {
    finded = finded.filter(pet => pet.breed === breedInput.value);
  }

  // find theo vaccinated
  if (vaccinatedInput.checked === true) {
    finded = finded.filter(pet => pet.vaccinated === true);
  }

  // find theo dewormed
  if (dewormedInput.checked === true) {
    finded = finded.filter(pet => pet.dewormed === true);
  }

  // find theo sterilized
  if (sterilizedInput.checked === true) {
    finded = finded.filter(pet => pet.sterilized === true);
  }

  renderTableData(finded);
});

// Gọi hàm breed (không theo style)
renderBreed();

function renderBreed() {
  breedInput.innerHTML = '<option>Select Breed</option>';

  breedArr.forEach(function (breedItem) {
    const option = document.createElement('option');
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
