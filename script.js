const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// 输入错误显示
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// 输入成功显示
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// 检查邮箱是否有效
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, '请输入有效邮箱');
  }
}

// 检查必填字段
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)}不能为空 `);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// 检查长度
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)}长度至少为 ${min} `
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} 长度最大为 ${max} `
    );
  } else {
    showSuccess(input);
  }
}

// 检查密码是否一致
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, '两次密码不匹配');
  }
}

// 获取字段名称
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// 时间监听
form.addEventListener('submit', function(e) {
     e.preventDefault();//阻止默认浏览器动作(W3C) 

    checkLength(username, 3, 10);
    checkLength(password, 5, 10);
    checkEmail(email);
    checkPasswordsMatch(password, password2);


});
