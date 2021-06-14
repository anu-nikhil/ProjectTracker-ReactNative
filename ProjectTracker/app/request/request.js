import NetInfo from '@react-native-community/netinfo';
import { GLOBAL_DATA } from '../globals/globalData';
import { CustomToast } from '../globals/components//customToast/CustomToast';
import { strings } from '../globals/localisation';

var serverURL, service;

// serverURL = GLOBAL_DATA.devURL;
// serverURL = GLOBAL_DATA.serverURL;
serverURL = GLOBAL_DATA.productionUrl;
service = {
  userDetails: 'userdetails',
};

export function handleApiError(error) {
  switch (error) {
    case 'No_INTERNET':
      CustomToast(strings.checkNetwork);
      break;
    case 'Request failed.Please try again':
      CustomToast(strings.checkNetwork);
      break;
    default:
      CustomToast(strings.commonErrorMsg);
      break;
  }
}

export function handleValidationError(error, params) {
  let dataParams = Object.keys(params);
  for (i = 0; i < dataParams.length; i++) {
    if (
      error &&
      error.data &&
      error.data.errors &&
      error.data.errors[dataParams[i]]
    ) {
      if (error.data.errors[dataParams[i]].length) {
        CustomToast(error.data.errors[dataParams[i]][0]);
      } else {
        CustomToast(strings.commonErrorMsg);
      }
      break;
    }
  }
}

export function setSubUrlWithId(type, id) {
  switch (type) {
    default: {
      break;
    }
  }
}
var defaultheader = function () {
  return {
    method: null,
    body: null,
    crossDomain: true,
    cache: false,
    async: false,
    timeout: 40000,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

function transformRequest(obj) {
  var str = [];
  for (var p in obj)
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
  return str.join('&');
}

export function request(method, params, serviceName, urlParams) {
  return new Promise(function (resolve, reject) {
    const timeoutId = setTimeout(() => {
      reject(strings.requestFailed);
    }, 40000);
    NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          var header = defaultheader(),
            url = serverURL + service[serviceName];
          if (GLOBAL_DATA.token) {
            header.headers.Authorization = GLOBAL_DATA.token;
          }
          header.method = method;
          switch (method) {
            case 'POST':
              header.body = JSON.stringify(params);
              if (urlParams) {
                let tempstr = transformRequest(urlParams);
                if (tempstr) tempstr = '?' + tempstr;
                url = url + tempstr;
              }
              break;
            case 'PUT':
            case 'PATCH':
              if (params) {
                header.body = JSON.stringify(params);
              }
              if (urlParams) {
                let tempstr = transformRequest(urlParams);
                if (tempstr) tempstr = '?' + tempstr;
                url = url + tempstr;
              }
              break;
            case 'DELETE':
              if (params) {
                // header.body = JSON.stringify(params);
                url = url + '/';
                if (urlParams) {
                  let tempstr = transformRequest(urlParams);
                  if (tempstr) tempstr = '?' + tempstr;
                  url = url + tempstr;
                }
              }
              break;
            case 'GET':
              if (params) {
                var tempstr = transformRequest(params);
                url = url + '?' + tempstr;
              }
              break;
          }
          let tempHeader = header;
          let tempUrl = url;
          console.log(tempHeader)
          console.log(tempUrl)
          fetch(url, header)
            .then(response => {
              return Promise.all([response.status, response.json()]);
            })
            .then(responseJson => {
              resolve({
                statusCode: responseJson[0],
                data: responseJson[1],
              });
              clearTimeout(timeoutId);
            })
            .catch(error => {
              clearTimeout(timeoutId);
              reject(error);
            });
        } else {
          clearTimeout(timeoutId);
          reject('No_INTERNET');
        }
      })
      .catch(error => {
        clearTimeout(timeoutId);
        reject('No_INTERNET');
      });
  });
}
