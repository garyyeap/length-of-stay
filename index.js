var untilEl = document.getElementById('count-until');
var addEl = document.getElementById('add');
var entryExitEl = document.getElementById('entry-exit');
var countEl = document.getElementById('count');
untilEl.value = moment().format('YYYY-MM-DD');

M.Datepicker.init(untilEl, {format: 'yyyy-mm-dd'});

addEl.onclick = function () {
  entryExitEl.appendChild(createEntryAndExitElement());
};

countEl.onclick = count;

function collectionToArray (collection) {
  return Array.prototype.slice.call(collection);
}

function createEntryAndExitElement () {
  var container = document.createElement('div');
  var exit = document.createElement('input');
  var entry = document.createElement('input');

  container.className = 'input-field inline';
  exit.className = 'col s5';
  exit.placeholder = 'Exit';
  exit.type = 'text';
  entry.className = 'col s5';
  entry.placeholder = 'Entry';
  entry.type = 'text';

  container.appendChild(exit);
  container.appendChild(entry);

  M.Datepicker.init(exit, {format: 'yyyy-mm-dd'});
  M.Datepicker.init(entry, {format: 'yyyy-mm-dd'});

  return container;
}

function count () {
  var until = new moment(untilEl.value, 'YYYY-MM-DD');
  var from = new moment(untilEl.value.split('-')[0] + '-01-01', 'YYYY-MM-DD');
  var duration = moment.duration(until.diff(from, 'days'), 'd');
  var exitDays = collectionToArray(entryExitEl.children).map(function (ele) {
    var inputEls = collectionToArray(ele.children).filter(function (ele){
      return ele.tagName.toLowerCase() === 'input';
    });

    return {
      exit: inputEls[0].value,
      entry: inputEls[1].value
    };
  }).reduce(function (accu, curr) {
    var exit = new moment(curr.exit, 'YYYY-MM-DD');
    var entry = new moment(curr.entry, 'YYYY-MM-DD');
    return accu + entry.diff(exit, 'days');
  }, 0);
  exitDays = moment.duration(exitDays, 'd');
  alert(duration.as('days') - exitDays.as('days'));
}
