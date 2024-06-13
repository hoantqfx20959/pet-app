'use strict';

renderTableData(breedArr);

// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener('click', function () {
  // Lấy được data từ các Input Form
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  // Validate data
  const validate = validateData(data);

  if (validate) {
    // Thêm vào danh sách
    breedArr.push(data);
    //
    saveToStorage('breedArr', breedArr);

    // Hiển thị danh sách
    renderTableData(breedArr);

    // Xóa các data nhập trong Form Input
    clearInput();
  }
});

// Validate data hợp lệ
function validateData(data) {
  let validateCheck = true;
  // Không có trường nào bị nhập thiếu data.
  if (data.breed.trim === '' || data.type === 'Select Type') {
    alert(`Cannot leave blank`);
    validateCheck = false;
  }

  // Giá trị Breed không được trùng với các breed còn lại.
  for (let i = 0; i < breedArr.length; i++) {
    if (data.breed === breedArr[i].breed && data.type === breedArr[i].type) {
      alert('Breed must be unique!');
      validateCheck = false;
      break;
    }
  }

  return validateCheck;
}

// Thêm vào danh sách
function renderTableData(petArr) {
  tableBodyEl.innerHTML = '';

  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement('tr'); // Add <tr>
    row.innerHTML = `
    <td scope="col">${i + 1}</td>
		<td scope="col">${breedArr[i].breed}</td>
		<td scope="col">${breedArr[i].type}</td>
		<td scope="col"><button class="btn btn-danger" onclick="deleteBreed('${breedArr[i].breed}')">Delete</button></td>
    `;

    tableBodyEl.appendChild(row);
  }
}

// Xóa các data vừa nhập trên Form
function clearInput() {
  breedInput.value = '';
  typeInput.value = '<option>Select Type</option>';
}

// Xóa một breed
function deleteBreed(breed) {
  // Xác nhận
  const deleteCheck = confirm(`Are you sure?`);

  // Thực hiện xóa
  if (deleteCheck) {
    // for (let i = 0; i < breedArr.length; i++) {
    //   if (breed === breedArr[i].breed) {
    //     breedArr.splice(i, 1);
    //     saveToStorage('breedArr', breedArr);
    //     renderTableData(breedArr);
    //     break;
    //   }
    // }

    const isBreed = breedArr.findIndex(breeds => breeds.breed === breed);
    breedArr.splice(isBreed, 1);
    saveToStorage('breedArr', breedArr);
    renderTableData(breedArr);
  }
}
