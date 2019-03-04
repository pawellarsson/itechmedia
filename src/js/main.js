
const keys = document.querySelectorAll('#calculator span:not(.empty)');
const op = ['+', '-', 'x', '÷'];
let decAdded = false;
const screen = document.querySelector('.screen');
const history = document.querySelector('.history');
const url = ''; // URL for API call

init();

function init() {
  for(var i = 0; i < keys.length; i++) {
    keys[i].onclick = function(e) {
      e.preventDefault();
      let input = history.innerHTML;
      let btnVal = this.innerHTML;
      let lChar = input[input.length - 1];

      if(btnVal === 'AC') {
        reset();
      } else if (btnVal === 'SAVE') {
        callPhp(screen.innerHTML);
      } else if (btnVal === '=') {
        evaluate(input, lChar);
      } else if (op.indexOf(btnVal) > -1) {
        calculate(input, btnVal, lChar);
      } else if (btnVal === '.') {
        if (!decAdded) {
          history.innerHTML += btnVal;
          decAdded = true;
        }
      } else {
        history.innerHTML += btnVal;
      }
    }
  }
}

function reset() {
  screen.innerHTML = '';
  history.innerHTML = '';
  decAdded = false;
}

// Bit confused here, should it be API call or just a file on PC
// if file, PHP won't work without a server
// if API, don't know how to make APIs in PHP
function callPhp(result) {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result)
  })
    .then(res => res.json())
    .then((resJson) => screen.innerHTML = 'Saved')
    .catch(err => console.log(err));
}

function evaluate(val, lChar) {
  let eq = val;

  history.innerHTML = eq + '=';

  eq = eq.replace(/x/g, '*').replace(/÷/g, '/');

  if(op.indexOf(lChar) > -1 || lChar === '.') eq = eq.replace(/.$/, ''); // remove operators and decimal from end

  if(eq) screen.innerHTML = eval(eq).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // add comma

  decAdded = false;
}

function calculate(val, btn, lChar) {
  if(val !== '' && op.indexOf(lChar) === -1) history.innerHTML += btn; // if val not empty and operators not in end add operators
  else if(val === '' && btn === '-') history.innerHTML += btn; // if val empty and btn minus add -

  if(op.indexOf(lChar) > -1 && val.length > 1) history.innerHTML = val.replace(/.$/, btn);

  decAdded = false;
}