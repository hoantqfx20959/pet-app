'use strict';

// Hiển thị danh sách pet
renderTableData(petArr);

// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener('click', function () {
  // Lấy được data từ các Input Form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: '',
    date: new Date(),
  };

  // Validate data
  const validate = validateData(data);

  if (validate) {
    // Thêm pet vào danh sách
    petArr.push(data);
    saveToStorage('petArr', petArr);

    // Hiển thị danh sách pet
    renderTableData(petArr);

    // Xóa các data nhập trong Form Input
    clearInput();
  }
});

// Validate data hợp lệ
function validateData(data) {
  let validateCheck = true;
  // Không có trường nào bị nhập thiếu data.
  if (data.id.trim() === '' || data.name.trim() === '' || isNaN(data.age) || isNaN(data.weight) || isNaN(data.length)) {
    alert(`Cannot leave blank`);
    validateCheck = false;
  }

  /*
  if (data.name.trim() === '') {
    alert(`Cannot leave "Pet Name" blank`);
    validateCheck = false;
  }
  if (isNaN(data.age)) {
    alert(`Cannot leave "Age" blank`);
    validateCheck = false;
  }
  if (isNaN(data.weight)) {
    alert(`Cannot leave "Weight" blank`);
    validateCheck = false;
  }
  if (isNaN(data.length)) {
    alert(`Cannot leave "Length" blank`);
    validateCheck = false;
  }
*/

  // Giá trị ID không được trùng với các pet còn lại. Nếu không hợp lệ, hãy đưa ra thông báo "ID must be unique!".
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert('ID must be unique!');
      validateCheck = false;
      break;
    }
  }

  // Trường Age chỉ được nhập giá trị trong khoảng 1 đến 15
  if (data.age < 1 || data.age > 15) {
    alert('Age must be between 1 and 15!');
    validateCheck = false;
  }

  // Trường Weight chỉ được nhập giá trị trong khoảng 1 đến 15
  if (data.weight < 1 || data.weight > 15) {
    alert('Weight must be between 1 and 15!');
    validateCheck = false;
  }

  // Trường Length chỉ được nhập giá trị trong khoảng 1 đến 100
  if (data.length < 1 || data.age > 15) {
    alert('Length must be between 1 and 15!');
    validateCheck = false;
  }

  // Bắt buộc phải chọn giá trị cho trường Type
  if (data.type === 'Select Type') {
    alert('Please select Type!');
    validateCheck = false;
  }

  // Bắt buộc phải chọn giá trị cho trường Breed
  if (data.breed === 'Select Breed') {
    alert('Please select Breed!');
    validateCheck = false;
  }

  return validateCheck;
}

// Thêm pet vào danh sách
function renderTableData(petArr) {
  // Làm trống data
  tableBodyEl.innerHTML = '';

  // Thêm array
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
    <td><button class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button></td>
    `;
    tableBodyEl.appendChild(row);
  }
}

// Xóa các data vừa nhập trên Form
function clearInput() {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = 'Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Xóa một pet
function deletePet(petId) {
  // Xác nhận
  const deleteCheck = confirm(`Are you sure?`);

  // Thực hiện xóa
  if (deleteCheck) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage('petArr', petArr);
        renderTableData(petArr);
        break;
      }
    }
  }
}

// Hiển thị các pet khỏe mạnh
let healthyCheck = false;
healthyBtn.addEventListener('click', function () {
  if (healthyCheck === false) {
    // Kiểm tra
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }

    // Hiển thị danh sách pet
    renderTableData(healthyPetArr);

    // Đổi tên nút
    healthyBtn.textContent = 'Show All Pet';

    // Gán lại giá trị
    healthyCheck = true;
  } else {
    // Hiển thị danh sách pet
    renderTableData(petArr);

    // Đổi tên nút
    healthyBtn.textContent = 'Show Healthy Pet';

    // Gán lại giá trị
    healthyCheck = false;
  }
});

// // Tính toán chỉ số BMI
// bmiBtn.addEventListener('click', function () {
//   // Lựa chọn loài + tính BMI
//   for (let i = 0; i < petArr.length; i++) {
//     petArr[i].bmi =
//       petArr[i].type === 'Dog'
//         ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2) //
//         : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
//   }

//   // Hiển thị danh sách pet
//   renderTableData(petArr);
// });

// Chỉnh lại type
typeInput.addEventListener('click', renderBreed);

// Gán thuộc tính breed theo type
function renderBreed() {
  // Thuộc tính breed ban đầu
  breedInput.innerHTML = '<option>Select Breed</option>';

  // Kiểm tra type
  const typeCheck = breedArr.filter(breedItem => breedItem.type === typeInput.value);

  // Gán breed
  typeCheck.forEach(function (breedItem) {
    const option = document.createElement('option');
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
