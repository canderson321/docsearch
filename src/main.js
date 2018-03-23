import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DocSearch } from './docSearch.js';

function showDoctors(response) {
  let header = $('#table-header');
  let results = $('#results');
  let meta = response.meta;
  let data = response.data;

  results.text('');
  if (meta.total > 0) {
    let headerString = `Showing results ${meta.skip + 1} through ${meta.count} (${meta.total} total)`;
    header.text(headerString);

    data.forEach((doctor) => {
      let name = `${doctor.profile.last_name}, ${doctor.profile.first_name}`;
      let number = doctor.practices[0].phones[0].number;
      let available =  doctor.practices[0].accepts_new_patients ? "Yes" : "No";
      let row = `<tr><td>${name}</td><td>${number}</td><td>${available}</td></tr>`
      results.append(row);
    });
  } else {
    header.text('Sorry, no results found. Try another search');
  }
  $('.table').fadeIn();
}

function handleError(error) {
  let header = $('#table-header');
  $('.table').hide();
  header.fadeIn();
  header.text(error);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = $('#search-city').val().replace(' ', '-');
  let state = $('#search-state').val();
  let name = $('#search-name').val();
  let query = $('#search-query').val();

  let search = new DocSearch();
  if (city.length > 0 && state.length == 2) search.addLocation(`${state}-${city}`);
  if (name.length > 0) search.addName(name);
  if (query.length > 0) search.addQuery(query);

  search.makeCall(showDoctors, handleError);
}


$(document).ready(function() {
  $('#search-form').submit(searchSubmit);
});
