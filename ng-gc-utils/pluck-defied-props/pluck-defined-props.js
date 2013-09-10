'use strict';

angular.module('gc.utils.pluckDefinedProps', [])
.factory('pluckDefinedProps', [
  function pluckDefinedPropsFactory() {

    function pluckDefinedProps(obj) {
      Object.keys(obj).map(function pluckDefinedPropsIteration(key) {
        var v = obj[key];
        if (v === '' || v == null) {
          delete obj[key];
        }
      });
      return obj;
    }

    return {
      pluckDefinedProps: pluckDefinedProps
    };

  }
]);
