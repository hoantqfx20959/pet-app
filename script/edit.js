'use strict';

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
    <td><i class="bi ${
      petArr[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
    <td><i class="bi ${petArr[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
    <td scope="col" class="hide">${petArr[i].bmi}</td>
    <td>${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}</td>
    <td><button class="btn btn-warning" onclick="editPet('${petArr[i].id}')">Edit</button></td>
    `;

    tableBodyEl.appendChild(row);
  }
}

// Edit một pet
function editPet(id) {
  // Hiện array edit
  formEl.classList.remove('hide');

  // Xác định thông tin pet
  const petInfo = petArr.find(pet => pet.id === id);

  // Hiện thông tin pet
  idInput.value = id;
  nameInput.value = petInfo.name;
  ageInput.value = petInfo.age;
  typeInput.value = petInfo.type;
  weightInput.value = petInfo.weight;
  lengthInput.value = petInfo.length;
  colorInput.value = petInfo.color;
  vaccinatedInput.checked = petInfo.vaccinated;
  dewormedInput.checked = petInfo.dewormed;
  sterilizedInput.checked = petInfo.sterilized;

  // Gọi hàm breed theo type
  renderBreed();

  // Xuất data vừa gọi
  breedInput.value = `${petInfo.breed}`;
}

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
  };

  // Validate data
  const validate = validateData(data);

  if (validate) {
    // Xác định pet
    const editInput = petArr.findIndex(pet => pet.id === data.id);

    // Giữ nguyên ngày nhập data
    data.date = petArr[editInput].date;

    // Lưu data vừa chỉnh sửa vào array
    petArr[editInput] = data;

    // Lưu data vào storage
    saveToStorage('petArr', petArr);

    // Ẩn array edit
    formEl.classList.add('hide');

    // Hiển thị danh sách pet
    renderTableData(petArr);
  }
});

// Validate data hợp lệ
function validateData(data) {
  let validateCheck = true;
  // Không có trường nào bị nhập thiếu data.
  if (
    data.id.trim() === '' ||
    data.name.trim() === '' ||
    isNaN(data.age) ||
    isNaN(data.weight) ||
    isNaN(data.length)
  ) {
    alert(`Cannot leave blank`);
    validateCheck = false;
  }

  // Trường Age chỉ được nhập giá trị trong khoảng 1 đến 15. Nếu không hợp lệ, hãy đưa ra thông báo "Age must be between 1 and 15!".
  if (data.age < 1 || data.age > 15) {
    alert('Age must be between 1 and 15!');
    validateCheck = false;
  }

  // Trường Weight chỉ được nhập giá trị trong khoảng 1 đến 15. Nếu không hợp lệ, hãy đưa ra thông báo "Weight must be between 1 and 15!".
  if (data.weight < 1 || data.weight > 15) {
    alert('Weight must be between 1 and 15!');
    validateCheck = false;
  }

  // Trường Length chỉ được nhập giá trị trong khoảng 1 đến 100. Nếu không hợp lệ, hãy đưa ra thông báo "Length must be between 1 and 100!".
  if (data.length < 1 || data.age > 15) {
    alert('Length must be between 1 and 15!');
    validateCheck = false;
  }

  // Bắt buộc phải chọn giá trị cho trường Type. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Type!".
  if (data.type === 'Select Type') {
    alert('Please select Type!');
    validateCheck = false;
  }

  // Bắt buộc phải chọn giá trị cho trường Breed. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Breed!".
  if (data.breed === 'Select Breed') {
    alert('Please select Breed!');
    validateCheck = false;
  }

  return validateCheck;
}

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
