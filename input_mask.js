document.addEventListener("DOMContentLoaded", function () {
  let telInput = document.querySelectorAll("input[data-phone-input]");
  let phoneInput = document.getElementById("phone");

  let getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, ""); // Получение только числовых значений
  };

  let onTelInput = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      formattedInputValue = "";
    if (!inputNumbersValue) {
      return (input.value = "");
    }
    // Проверяем начало номера
    if (["7", "8", "9"].includes(inputNumbersValue[0])) {
      if (inputNumbersValue[0] == "9") {
        inputNumbersValue = "7" + inputNumbersValue;
      }
      let firstSymbols = inputNumbersValue[0] == "8" ? " 8" : "+7";
      formattedInputValue = firstSymbols + " ";
      // Форматируем вид номера
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue;
    }
    input.value = formattedInputValue;
    phoneInput.classList.remove("error");
  };

  // Class error при недостаточной длине номера
  let validatePhoneNumber = function (e) {
    let inputValue = e.target.value;
    if (inputValue.length > 0 && inputValue.length < 18) {
      phoneInput.classList.add("error");
    } else {
      phoneInput.classList.remove("error");
    }
  };

  // Возможность удаления первого символа в поле ввода
  let onPhoneKeyDown = function (e) {
    let inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  };
  // Обрабодка вводимых значений в поле ввода
  for (i = 0; i < telInput.length; i++) {
    let input = telInput[i];
    input.addEventListener("input", onTelInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("blur", validatePhoneNumber);
  }
});
