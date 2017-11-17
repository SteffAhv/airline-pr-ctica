// declarar un array que represente los asientos de nuestro avion con false para indicar que estos estan vacios
// ocupado = true

var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]

//contador que nos ayudara a rastrear nuestros asientos
var takenSeats = 0;

var paintSeats = function(array) {
  var containerSeats = document.getElementById('seats');

  for(var i = 0; i < array.length; i++) {
    var seat = document.createElement('div');
    seat.className = 'seats';

    // del primer elemento al cuarto asientos de primera clase del indice 0 al 3
    if(i < 4) {
      seat.style.background = 'rgb(65, 222, 137)';
    } else {
      seat.style.background = 'rgb(72, 114, 152)';
    }
    containerSeats.appendChild(seat);
  }
};

var reserve = function(){
  var btn = document.getElementById('btn');
  btn.addEventListener('click', chooseZone);
};
var chooseZone = function() {
    var choice = prompt('En que zona prefiere reservar \n 1. Primera Clase \n 2. Económica \n \n Porfavor ingresa el número de tu preferencia');
    if (choice == 1) {
      checkFirstClassZone();
    } else if (choice == 2){
      checkEconomicZone();
    } else {
      alert('Ingrese una opción valida');
    }
};

var checkFirstClassZone = function() {
  var zone = 'Primera Clase';
  //recorre desde el asiento 1 al 4 y verifica cuales estan disponibles
  for(var index = 0; index < 4; index ++) {
    // verifica si hay asientos vacios (false)
    if(airlineSeats[index] == false) {
      // al reservar un asiento cambiara a true
      airlineSeats[index] = true;
      // al reservar un asiento no necesitamos seguir recorriendo el array
      // rompemos el ciclo con un break
      reserveSeat(index);
      printTicket(index, zone);
      takenSeats ++;
      break;
    } else if (index == 3 && airlineSeats[index] == true) {
      reasignToEconomicZone();
    }
  }
}
var checkEconomicZone = function() {
  var zone = 'Economic';
  //recorre desde el asiento 1 al 4 y verifica cuales estan disponibles
  for(var index = 4; index < 10; index ++) {
    // verifica si hay asientos vacios (false)
    if(airlineSeats[index] == false) {
      // al reservar un asiento cambiara a true
      airlineSeats[index] = true;
      // al reservar un asiento no necesitamos seguir recorriendo el array
      // rompemos el ciclo con un break
      reserveSeat(index);
      printTicket(index, zone);
      takenSeats ++;
      break;
    } else if (index == 9 && airlineSeats[index] == true) {
      reasignToFirstClassZone();
    }
  }
};

var reserveSeat = function(indexToPaint) {
  var seat = document.getElementsByClassName('seats');
  seat[indexToPaint].textContent = 'Ocupado';
};
//Reasignando asientos
var reasignToEconomicZone = function(zone) {
  if(takenSeats == 10){
    noSeats();
    nextFlight();
  } else {
      var reasign = confirm(
        'Ya no quedan mas asientos disponibles en ' + zone +
        ':( \n ¿Quieres reservar en zona Economica?'
        );

      if (reasign == true) {
        checkEconomicZone()
      } else {
        nextFlight();
      }
  }
};

var reasignToFirstClassZone = function(zone) {
  if(takenSeats == 10){
    noSeats();
    nextFlight();
  } else {

      var reasign = confirm(
        'Ya no quedan mas asientos disponibles en ' + zone +
        ':( \n ¿Quieres reservar en Primera Clase?'
      );

      if (reasign == true) {
        checkFirstClassZone()
      } else {
        nextFlight();
      }
  }
};

var printTicket = function(index, zone) {
  var containerTickets = document.getElementById('tickets');
  var ticket = document.createElement('div');
  ticket.className = 'seats';
  var title = document.createElement('p');
  var reservedSeating = document.createElement('p');
  var zoneClass = document.createElement('p');
  title.textContent = 'BOARDING PASS';
  reservedSeating.textContent  = 'N° de asiento' + (index+1);
  zoneClass.textContent = zone;
  ticket.appendChild(title);
  ticket.appendChild(reservedSeating);
  ticket.appendChild(zoneClass);
  containerTickets.appendChild(ticket);
}
var nextFlight = function() {
  alert('Nuestro proximo vuelo sale en tres horas !')
}
var noSeats = function() {
  alert('Lo sentimos,\n ya no quedan asientos disponibles en este vuelo.')
}
// invocando a la función
paintSeats(airlineSeats);
reserve();
