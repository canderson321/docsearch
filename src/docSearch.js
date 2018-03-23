class DocSearch {
  constructor() {
    this.fields = [];
  }

  addField(fieldName, value) {
    this.fields.push(`${fieldName}=${value}`);
  }

  buildURL() {
    let url = 'https://api.betterdoctor.com/2016-03-01/doctors?'
    this.fields.forEach((field) => {
      url += field + '&';
    });
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
    this.addField('sort', 'last-name-asc');
    this.addField('fields', 'profile(first_name,last_name),practices(accepts_new_patients,visit_address,website,phones(number))');
    this.addField('limit', '25');
    this.addField('user_key', `${process.env.exports.apiKey}`);
    let url = this.buildURL();
    let promise = this.getPromise(url);
    promise.then(resolve, reject);
  }
}

export {DocSearch};
