class DocSearch {
  constructor() {
    this.fields = [];
  }

  addLocation(cityPlug) {
    this.fields.push(`location=${cityPlug}`);
  }

  addQuery(query) {
    this.fields.push(`query=${query}`);
  }

  addName(name) {
    this.fields.push(`name=${name}`);
  }

  buildURL() {
    let url = 'https://api.betterdoctor.com/2016-03-01/doctors?'
    this.fields.forEach((field) => {
      url += field + '&';
    });
    url += `user_key=${process.env.exports.apiKey}`
    return url;
  }

  getPromise(url) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          let response = JSON.parse(request.response);
          resolve(response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  makeCall(resolve, reject) {
    let url = this.buildURL();
    let promise = this.getPromise(url);
    promise.then(resolve, reject);
  }
}

export {DocSearch};
