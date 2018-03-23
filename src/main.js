import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DocSearch } from './docSearch.js';

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


  search.makeCall(
    (response) => {console.log(response.meta.total);},
    (error) => {console.log(error);}
  );
}


$(document).ready(function() {
  $('#search-form').submit(searchSubmit);
});
