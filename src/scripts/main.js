/* eslint-disable max-len */
'use strict';

// Чекаємо подію на елементі і повертаємо проміс
// function waitFor(element, eventName) {
//   return new Promise((resolve) => {
//     const handler = () => {
//       resolve(
//         `It was ${eventName} on the element: ${element.nodeName}, id: ${element.id}`,
//       );
//       // Відписуємось після першого виклику
//       element.removeEventListener(eventName, handler);
//     };

//     element.addEventListener(eventName, handler);
//   });
// }

function waitFor(element, eventName) {
  return new Promise((resolve) => {
    const handler = (ev) => {
      if (eventName === 'contextmenu') {
        ev.preventDefault();
      }

      // або ev.target === element, якщо дочірні не враховуємо
      if (ev.currentTarget === element) {
        resolve(
          `It was ${eventName} on the element: ${element.nodeName}, id: ${element.id}.`,
        );
        element.removeEventListener(eventName, handler);
      }
    };

    element.addEventListener(eventName, handler);
  });
}

function printMessage(message) {
  const div = document.createElement('div');

  div.className = 'message';
  div.textContent = message;
  document.body.appendChild(div);
}

// робимо функції доступними для тестів
window.waitFor = waitFor;
window.printMessage = printMessage;

const loginField = document.getElementById('login');
const passwordField = document.getElementById('password');
const button = document.getElementById('submit');

waitFor(loginField, 'click').then(printMessage);
waitFor(passwordField, 'click').then(printMessage);
waitFor(button, 'click').then(printMessage);

waitFor(loginField, 'input').then(printMessage);
waitFor(passwordField, 'input').then(printMessage);

waitFor(loginField, 'blur').then(printMessage);
waitFor(passwordField, 'blur').then(printMessage);
waitFor(button, 'blur').then(printMessage);
