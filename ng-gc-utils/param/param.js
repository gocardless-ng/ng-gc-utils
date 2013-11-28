'use strict';

angular.module('gc.utils.param', [])
.factory('param', [
  function paramFactory() {

    function param(obj, prefix) {
      return Object.keys(obj).map(function(key, index) {
        var value = obj[key];
        var hasIndex = Array.isArray(obj) && typeof value === 'object';
        var name = hasIndex ? index : Array.isArray(obj) ? '' : key;

        if (prefix) key = prefix + '[' + name + ']';
        if (typeof value === 'object') return param(value, key);

        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }).join('&').replace(/%20/g, '+');
    }

    return {
      param: param
    };
  }
]);


