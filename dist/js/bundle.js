(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var keys = document.querySelectorAll('#calculator span:not(.empty)');
var op = ['+', '-', 'x', '÷'];
var decAdded = false;
var screen = document.querySelector('.screen');
var history = document.querySelector('.history');
var url = ''; // URL for API call

init();

function init() {
  for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function (e) {
      e.preventDefault();
      var input = history.innerHTML;
      var btnVal = this.innerHTML;
      var lChar = input[input.length - 1];

      if (btnVal === 'AC') {
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
    };
  }
}

function reset() {
  screen.innerHTML = '';
  history.innerHTML = '';
  decAdded = false;
} // Bit confused here, should it be API call or just a file on PC
// if file, PHP won't work without a server
// if API, don't know how to make APIs in PHP


function callPhp(result) {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  }).then(function (res) {
    return res.json();
  }).then(function (resJson) {
    return screen.innerHTML = 'Saved';
  }).catch(function (err) {
    return console.log(err);
  });
}

function evaluate(val, lChar) {
  var eq = val;
  history.innerHTML = eq + '=';
  eq = eq.replace(/x/g, '*').replace(/÷/g, '/');
  if (op.indexOf(lChar) > -1 || lChar === '.') eq = eq.replace(/.$/, ''); // remove operators and decimal from end

  if (eq) screen.innerHTML = eval(eq).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // add comma

  decAdded = false;
}

function calculate(val, btn, lChar) {
  if (val !== '' && op.indexOf(lChar) === -1) history.innerHTML += btn; // if val not empty and operators not in end add operators
  else if (val === '' && btn === '-') history.innerHTML += btn; // if val empty and btn minus add -

  if (op.indexOf(lChar) > -1 && val.length > 1) history.innerHTML = val.replace(/.$/, btn);
  decAdded = false;
}

},{}]},{},[1]);
