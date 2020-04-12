import covid19ImpactEstimator from './estimator.js';

(function () {
  const iData = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    }
  };

  const form = document.querySelector('form#frm-submit-data');
  const periodType = document.querySelector('select#periodType');
  const timeToElapse = document.querySelector('input#timeToElapse');
  const reportedCases = document.querySelector('input#reportedCases');
  const population = document.querySelector('input#population');
  const totalHospitalBeds = document.querySelector('input#totalHospitalBeds');
  const inputSect = document.querySelector('div.input-section');
  const resultSect = document.querySelector('div.result-section');
  const btnBackToInput = document.getElementById('backToInput');

  const $d = (element) => document.createElement(element);

  const validateNumber = (...val) => {
    for (let i = 0; i < val.length; i++) {
      const element = Number(val[i]);
      if (!element) {
        return false;
      }
    }
    return true;
  };

  const validateSelectPeriod = (val) => {
    const possibleValues = ['days', 'weeks', 'months'];
    return possibleValues.includes(val.toLowerCase());
  };

  const addSpace = (str) => {
    let arrCapStrPos = [];
    for (let j = 0; j < str.length; j++) {
      const character = str.charAt(j);

      if (character === character.toUpperCase()) {
        arrCapStrPos.push(j);
      }
    }
    let strChars = str;
    arrCapStrPos.forEach((p, k) => {
      const movePos = p + k;
      const space = ' ';
      const output = [strChars.slice(0, movePos), space, strChars.slice(movePos)].join('');
      strChars = output;
    });

    return strChars;
  };

  const checkIfValueIsNegative = (value) => {
    if (value < 0) {
      return '<span class = "negative-text">' + value.toLocaleString() + '</span>';
    }

    return value.toLocaleString();
  }

  const impactList = (impactObj, title) => {
    const div = $d('div');
    div.classList.add('possible-impact-container');
    const h2 = $d('h2');
    h2.innerHTML = title;
    const ul = $d('ul');
    const frag = document.createDocumentFragment();

    Object.keys(impactObj).forEach((k) => {
      const li = $d('li');
      const keyTitle = addSpace(k);
      const keyValue = checkIfValueIsNegative(impactObj[k]);
      li.innerHTML = `<strong>${keyTitle}</strong>: ${keyValue}`;
      frag.append(li);
    });
    ul.append(frag);

    div.append(h2);
    div.append(ul);

    return div;
  };

  const showResultSect = () => {
    inputSect.setAttribute('aria-hidden', true);
    resultSect.setAttribute('aria-hidden', false);
  };

  const hideResultSect = () => {
    inputSect.setAttribute('aria-hidden', false);
    resultSect.setAttribute('aria-hidden', true);
  };

  btnBackToInput.addEventListener('click', function () {
    hideResultSect();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (form.checkValidity() && validateNumber(timeToElapse.value,
      reportedCases.value,
      population.value,
      totalHospitalBeds.value) && validateSelectPeriod(periodType.value)) {
      
      iData.periodType = periodType.value;
      iData.timeToElapse = timeToElapse.value;
      iData.reportedCases = reportedCases.value;
      iData.population = population.value;
      iData.totalHospitalBeds = totalHospitalBeds.value;

      // console.log('iData', iData);
      // console.log('result', result);
      // console.log('result', impactList(result.impact, 'Possible Impacts'));
      // console.log('result', impactList(result.severeImpact, 'Possible Severe Impacts'));

      const result = covid19ImpactEstimator(iData);

      if (result) {
        const impactHTML = impactList(result.impact, 'Possible Impacts');
        const severeHTML = impactList(result.severeImpact, 'Possible Severe Impacts');
        const resHtml = document.getElementById('result');
        resHtml.innerHTML = '';
        setTimeout(() => {
          resHtml.append(impactHTML);
          resHtml.append(severeHTML);
          showResultSect();
        }, 500);
      }
    } else {
      // alert('Fill form correctly');
    }
  });
})();
