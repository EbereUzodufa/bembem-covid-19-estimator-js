const covid19ImpactEstimator = (data) => {
  const fatObj = {};
  const dayPeriodFn = (periodType, periodQty) => {
    // Infection doubles every three days
    // I used the modulus to be ensure it is exactly 3 days
    // eslint-disable-next-line no-nested-ternary
    const days = (periodType === 'days') ? periodQty : (periodType === 'weeks') ? periodQty * 7 : periodQty * 30;
    return days;
  };

  const infectionsByRequestedTimeFn = (currentlyInfected, days) => {
    const doubledFactor = (days - (days % 3)) / 3;
    return currentlyInfected * 2 * doubledFactor * doubledFactor;
  };

  function impactFn(params) {
    const objImpact = {};
    const impactDays = dayPeriodFn(params.periodType, params.timeToElapse);
    objImpact.currentlyInfected = params.reportedCases * 10;
    objImpact.infectionsByRequestedTime = infectionsByRequestedTimeFn(
      objImpact.currentlyInfected, impactDays
    );
    return objImpact;
  }

  function severeImpactFn(params) {
    const objSevereImpact = {};
    const severeDays = dayPeriodFn(params.periodType, params.timeToElapse);
    objSevereImpact.currentlyInfected = params.reportedCases * 50;
    objSevereImpact.infectionsByRequestedTime = infectionsByRequestedTimeFn(
      objSevereImpact.currentlyInfected,
      severeDays
    );

    // 15% of infectionsByRequestedTime
    objSevereImpact.severeCasesByRequestedTime = 0.15 * objSevereImpact.infectionsByRequestedTime;

    //35% of total Hosiptal beds are free
    objSevereImpact.hospitalBedsByRequestedTime = (0.35 * params.totalHospitalBeds) - objSevereImpact.severeCasesByRequestedTime;

    return objSevereImpact;
  }
  fatObj.data = data;

  if (data) {
    fatObj.impact = impactFn(data);
    fatObj.severeImpact = severeImpactFn(data);
  }

  return fatObj;
};

export default covid19ImpactEstimator;
