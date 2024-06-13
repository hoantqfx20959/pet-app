'use strict';

const btnExport = document.getElementById('export-btn');
const btnImport = document.getElementById('import-btn');
const fileInput = document.getElementById('input-file');

// Bắt sự kiện Click vào nút "Export"
btnExport.addEventListener('click', saveStaticDataToFile);
// Hàm lưu file
function saveStaticDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage('petArr'), null, 2)], { type: 'application/json' });

  // Lưu file
  saveAs(blob, 'petData.json');
}

// Bắt sự kiện Click vào nút "Import"
btnImport.addEventListener('click', function () {
  // Kiểm tra input
  if (!fileInput.value) {
    alert('No files selected!');
  } else {
    const checkImport = confirm('You definitely want to import?');
    // Xác nhận
    if (checkImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Thực hiên import
      reader.addEventListener(
        'load',
        // Lưu file vào storage
        function () {
          saveToStorage('petArr', JSON.parse(reader.result));
          // Thông báo
          alert('Successfully entered.');
        },
        false
      );

      // Đọc file
      if (file) {
        reader.readAsText(file);
      }

      // Xóa trường input
      fileInput.value = '';
    }
  }
});
