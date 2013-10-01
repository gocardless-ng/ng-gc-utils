'use strict';

angular.module('gc.utils.getFormattedDateTime', [
  'gc.utils.validDateFormat'
])
.factory('getFormattedDateTime', [
  '$window', 'validDateFormat',
  function getFormattedDateTimeFactory($window, validDateFormat) {

    function getFormattedDateTime(dateStr, endOfDay) {
      var date = validDateFormat.validDateFormat(dateStr);
      if (date) {
        if (endOfDay) { date.endOf('day'); }
        return date.utc().format('YYYY-MM-DDTHH:mm:ssZ');
      } else {
        return '';
      }
    }

    return {
      getFormattedDateTime: getFormattedDateTime
    };

  }
]);
