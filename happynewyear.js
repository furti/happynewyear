(function(window, document) {
  "use strict";

  var digitSigns = [
    [ //0
      ['🍀', '🍀', '🍀'],
      ['🍀', ' ', '🍀'],
      ['🍀', ' ', '🍀'],
      ['🍀', ' ', '🍀'],
      ['🍀', '🍀', '🍀']
    ],
    [ //1
      [' ', ' ', '🍀'],
      [' ', ' ', '🍀'],
      [' ', ' ', '🍀'],
      [' ', ' ', '🍀'],
      [' ', ' ', '🍀']
    ],
    [ //2
      ['🍀', '🍀', '🍀'],
      [' ', ' ', '🍀'],
      ['🍀', '🍀', '🍀'],
      ['🍀', ' ', ' '],
      ['🍀', '🍀', '🍀']
    ],
    [ //3
      ['🍀', '🍀', '🍀'],
      [' ', ' ', '🍀'],
      ['🍀', '🍀', '🍀'],
      [' ', ' ', '🍀'],
      ['🍀', '🍀', '🍀']
    ],
    [ //4
      ['🍀', ' ', '🍀'],
      ['🍀', ' ', '🍀'],
      ['🍀', '🍀', '🍀'],
      [' ', ' ', '🍀'],
      [' ', ' ', '🍀']
    ],
    [ //5
      ['🍀', '🍀', '🍀'],
      ['🍀', ' ', ' '],
      ['🍀', '🍀', '🍀'],
      [' ', ' ', '🍀'],
      ['🍀', '🍀', '🍀']
    ],
    [ //6
      ['🍀', '🍀', '🍀'],
      ['🍀', ' ', ' '],
      ['🍀', '🍀', '🍀'],
      ['🍀', ' ', '🍀'],
      ['🍀', '🍀', '🍀']
    ],
    [ //7
      ['🍀', '🍀', '🍀'],
      [' ', ' ', '🍀'],
      [' ', ' ', '🍀'],
      [' ', ' ', '🍀'],
      [' ', ' ', '🍀']
    ],
    [ //8
      ['🍀', '🍀', '🍀'],
      ['🍀', ' ', '🍀'],
      ['🍀', '🍀', '🍀'],
      ['🍀', ' ', '🍀'],
      ['🍀', '🍀', '🍀']
    ],
    [ //9
      ['🍀', '🍀', '🍀'],
      ['🍀', ' ', '🍀'],
      ['🍀', '🍀', '🍀'],
      [' ', ' ', '🍀'],
      ['🍀', '🍀', '🍀']
    ]
  ];

  function calculateYearDigits() {
    var currentYear = new Date().getFullYear();
    var digits = [];

    while (currentYear > 0) {
      var digit = currentYear % 10;

      digits.push(digit);

      currentYear -= digit;
      currentYear /= 10;
    }

    return digits.reverse();
  }

  function createDigit(signs) {
    var digit = '',
      digitIndex = 0;

    signs.forEach(function(line) {
      digit += '<div class="line">';

      line.forEach(function(sign) {
        digit += '<div class="sign sign-' + digitIndex + '">' + sign + '</div>';
        digitIndex++;
      });

      digit += '</div>';
    });

    return digit;
  }

  var yearContainer = document.getElementsByClassName('year')[0];
  var yearDigits = calculateYearDigits();
  var htmlContent = '';

  yearDigits.forEach(function(currentDigit) {
    htmlContent += '<div class="digit">';
    htmlContent += createDigit(digitSigns[currentDigit]);
    htmlContent += '</div>';
  });

  yearContainer.innerHTML = htmlContent;

  window.setTimeout(function() {
    yearContainer.className += ' ' + ' show';
  }, 200);

})(window, document);
