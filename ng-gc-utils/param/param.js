'use strict';

angular.module('gc.utils.param', [])
.factory('param', [
  function paramFactory() {

    var rbracket = /\[\]$/;
    var r20 = /%20/g;

    //Serialize an array of form elements or a set of
    //key/values into a query string
    function param(obj) {
      var s = [];

      var add = function add(key, value) {
        // If value is a function, invoke it and return its value
        value = angular.isFunction(value) ?
          value() : (value == null ? '' : value);
        var uri = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        s[s.length] = uri;
      };

      Object.keys(obj).map(function(prefix) {
        buildParams(prefix, obj[prefix], add);
      });

      // Return the resulting serialization
      return s.join('&').replace(r20, '+');
    }

    function buildParams(prefix, obj, add) {
      if (Array.isArray(obj)) {
        // Serialize array item.
        obj.map(function(v, i) {
          var prefix;
          if (rbracket.test(prefix)) {
            // Treat each array item as a scalar.
            add(prefix, v);
          } else {
            // Item is non-scalar (array or object), encode its numeric index.
            prefix = prefix + '[' + (angular.isObject(v) ? i : '') + ']';
            buildParams(prefix, v, add);
          }
        });

      } else if (angular.isObject(obj)) {
        // Serialize object item.
        Object.keys(obj).map(function(name) {
          buildParams(prefix + '[' + name + ']', obj[ name ], add);
        });
      } else {
        // Serialize scalar item.
        add(prefix, obj);
      }
    }

    return {
      param: param
    };
  }
]);


