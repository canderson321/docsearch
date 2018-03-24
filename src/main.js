import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DocSearch } from './docSearch.js';
import { Doctor } from './doctor.js';

function showDoctors(response) {
  let header = $('#table-header');
  let results = $('#results');
  let meta = response.meta;
  let data = response.data;

  results.text('');
  if (meta.total > 0) {
    let headerString = `Showing results ${meta.skip + 1} through ${meta.skip + meta.count} (${meta.total} total)`;
    header.text(headerString);

    data.forEach((docData) => {
      let doctor = new Doctor(docData);
      let row = '<tr>';
        row += `<td>${doctor.name}</td>`;
        row += `<td>${doctor.address}</td>`;
        row += `<td>${doctor.phone}</td>`;
        row += `<td><a href='${doctor.website}'>${doctor.website}</a></td>`;
        row += `<td>${doctor.available}</td>`;
      row += `</tr>`;
      results.append(row);
    });
  } else {
    header.text('Sorry, no results found. Try another search');
  }
  $('.hidden').fadeIn();

  let prev = $('#prev');
  let next = $('#next');
  console.log(meta.skip);
  if (meta.skip <= 0)prev.children('button').prop('disabled', true);
  else prev.children('button').prop('disabled', false);

  if (meta.skip + meta.count >=  meta.total) next.children('button').prop('disabled', true);
  else next.children('button').prop('disabled', false);

  prev.unbind('submit');
  prev.submit(meta.skip - 25, searchSubmit);
  next.unbind('submit');
  next.submit(meta.skip + 25, searchSubmit);
}

function handleError(error) {
  let header = $('#table-header');
  $('.hidden').hide();
  header.fadeIn();
  header.text(error);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = $('#search-city').val().toLowerCase().replace(' ', '-');
  let state = $('#search-state').val().toLowerCase();
  let name = $('#search-name').val().toLowerCase();
  let query = $('#search-query').val().toLowerCase();

  let search = new DocSearch();
  if (state.length == 2) {
    let location = city.length > 0 ? state + '-' + city : state;
    search.addField('location', location);
  }

  if (name.length > 0) search.addField('name', name);
  if (query.length > 0) search.addField('query', query);
  if (event.data < 0) event.data = 0;
  search.addField('skip', event.data);

  search.makeCall(showDoctors, handleError);
}


$(document).ready(function() {
  $('#search-form').submit(0, searchSubmit);
});
