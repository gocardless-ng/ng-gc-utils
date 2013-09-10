'use strict';

angular.module('gc.utils.validDateFormat', [])
.factory('validDateFormat', [
  '$window',
  function validDateFormatFactory($window) {

    var FORMATS = ['YYYYMMDD', 'DDMMYYYY', 'DDMMYY', 'DMMMYYYY', 'MMMDYYYY'];

    function validDateFormat(dateStr) {
      if (!dateStr) { return false; }
      var isValid = FORMATS.some(function(format) {
        return $window.moment(dateStr, format).isValid();
      });
      if (!isValid) {
        return false;
      }
      return $window.moment(dateStr);
    }

    return {
      validDateFormat: validDateFormat
    };

  }
]);
