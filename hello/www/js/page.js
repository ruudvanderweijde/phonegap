var allCountries = new Array();
var country = new Array();

function loadAllCountries() {
  initCountries();
  var end = ((allCountries.length)-1)
  for (var i=0; i < end; i++) {
      addCountry(allCountries[i]);
  }
  $("#countryContainer").listview('refresh');
}

function loadCountry(name) {
   
   initCountry(name);
   console.log(country);debugger;
   $("#countryItem").append(
      $('<li>').text("Name: "       + country[name].name),
      $('<li>').text("Currency: "   + country[name].currency),
      $('<li>').text("Callingcode: "+ country[name].callingcode),
      $('<li>').text("Capital: "    + country[name].capital),
      $('<li>').text("Region: "     + country[name].region)
  );
  $("#countryItem").listview('refresh');
}


function addCountry(item) {
  $("#countryContainer").append(
      $('<li>')
         .text(item.name).append(
            $('<a>')
            .on('click', function () {
               $.mobile.changePage("country.html", {data:{name:item.name, transition: "slide"}});
            })
            .data('transition', 'slide')
         )
  );
}

function initCountries() {
  if (allCountries.length > 0) {
      return allCountries;
  }

  $.mobile.loading("show", { text: "Loading data..." });

  $.ajax({ url: 'http://restcountries.eu/rest/', dataType: 'json', async: false, })
     .done(function(items) { allCountries = items; })
     .fail(function() {
         navigator.notification.alert(
             'Unable to load data!',  // message
             function () {},         // callback
             'Fatal error',            // title
             'Ok'                  // buttonName
         );
     })
     .always(function() { $.mobile.loading("hide"); });
}

function initCountry(name) {
  if (country[name] && country[name].length > 0) {
      return country[name];
  }
  country[name] = new Array();

  $.mobile.loading("show", { text: "Loading data..." });

  $.ajax({ url: 'http://restcountries.eu/rest/name/' + name, dataType: 'json', async: false, })
     .done(function(items) { country[name] = items[0]; })
     .fail(function() {
         navigator.notification.alert(
             'Unable to load data!',  // message
             function () {},         // callback
             'Fatal error',            // title
             'Ok'                  // buttonName
         );
     })
     .always(function() { $.mobile.loading("hide"); });
}
