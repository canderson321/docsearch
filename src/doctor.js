class Doctor {
  constructor(data) {
    this.name = `${data.profile.last_name}, ${data.profile.first_name}`;
    this.address = '';
    this.phone = '';
    this.website = '';
    this.available = 'No';

    if (data.practices.length > 0) {
      let practice = data.practices[0];
      if (practice.phones.length > 0) this.phone = practice.phones[0].number;
      if (practice.website != undefined) this.website = practice.website;
      this.available =  practice.accepts_new_patients ? "Yes" : "No";

      let addressData = practice.visit_address;
      this.address += addressData.street;
      this.address += ' ' + addressData.city;
      this.address += ', ' + addressData.state_long;
      this.address += ' ' + addressData.zip;
    }
  }
}

export {Doctor};
