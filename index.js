var paginator = null;
var filter = new Filter();
var sortedState = {
  isSorted: null,
  sortType: '',
};

function fetchOpenTrivia() {
  window.fetch('https://opentdb.com/api.php?amount=25')
    .then(function(response){
      return response.json();
    }).then(function(json){
      paginator = new Paginator(json.results, 5);
      paginator.totalPageNumberElement.innerHTML = paginator.pages;
      paginator.pageNumberElement.innerHTML = paginator.currentPage+1;
      console.log(json.results);
      var page = paginator.showResultsOnPage(0, paginator.results);
      formatPage(page);
      addEventListeners(paginator)
  }
  );
}  

function formatPage(page){
  paginator.content.innerHTML = '';
  for(var i = 0; i < page.length; i++){
    var item = document.createElement('div');
    item.setAttribute("class", "item");
    item.innerHTML = `
    <div class="list-item">
        <p class="category">Category ${page[i].category}</p>
        <p class="difficulty">difficulty ${page[i].difficulty}</p>
        <p class="type">type ${page[i].type}</p>
        <p class="question">question <b><a href="${googleHref(page[i].question)}">${page[i].question}</a></b></p>
        </div>
        `
      this.content.appendChild(item);
  }
}

function googleHref (query) {
  return `https://www.google.com/search?q=${query.split(' ').join('+')}`
}

function Paginator(results, resultsPerPage){
  this.results = results;
  this.resultsPerPage = resultsPerPage;
  this.pages = results.length / resultsPerPage;
  this.currentPage=0;
  this.previousButton = document.getElementById('previous-page');
  this.nextButton = document.getElementById('next-page');
  this.content = document.getElementById('content');
  this.pageNumberElement = document.getElementById('current-page');
  this.totalPageNumberElement = document.getElementById('total-pages');
  
}

Paginator.prototype.showResultsOnPage = function(number, results){
  var start = number * this.resultsPerPage;
  return results.slice(start, start + this.resultsPerPage);
};


function updatePageNumber(paginator) {
  paginator.pageNumberElement.innerHTML = paginator.currentPage+1;
}

function Filter(){
  this.toggleCategory = document.getElementById('group-by-category');
  this.toggleDifficulty = document.getElementById('group-by-difficulty');
  this.toggleType = document.getElementById('group-by-type');
}

function group(property, collection){
  var val, index, finalArray = [];
        values = [], result = [];
  function reduceGroups(total, current, index, arr){
    if(index === 0){
      return current;
    } else {
      return total.concat(current);
    }
  
  }
  for (var i = 0; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1){
          result[index].push(collection[i]);
      }else {
          values.push(val);
          result.push([collection[i]]);
      }
  }
  finalArray = result.reduce(reduceGroups, []);

  return finalArray;
};

function addEventListeners(paginator) {
  paginator.previousButton.addEventListener('click', function(){
    if(paginator.currentPage > 0){
      paginator.currentPage--;
      var newPage = paginator.showResultsOnPage(paginator.currentPage, paginator.results);
      formatPage(newPage);
      updatePageNumber(paginator, 0)
    }
  })
  paginator.nextButton.addEventListener('click', function(){
    if(paginator.currentPage+1 < paginator.pages){
      paginator.currentPage++;
      var newPage = paginator.showResultsOnPage(paginator.currentPage, paginator.results);
      formatPage(newPage);
      updatePageNumber(paginator)
    }
  })
  filter.toggleCategory.addEventListener('click', function(){
    console.log('toggle')
    var sortedResults = group("category", paginator.results);
    var paginatorByCategory = new Paginator(sortedResults, 5);
    paginatorByCategory.currentPage = 0;
    var newPage = paginatorByCategory.showResultsOnPage(paginator.currentPage, sortedResults);
    formatPage(newPage);
    sortedState.sortType = 'CATEGORY'
    sortedState.isSorted = true;
  })
  filter.toggleDifficulty.addEventListener('click', function(){
    console.log('toggle')
    var sortedResults = group("difficulty", paginator.results);
    var paginatorByDifficulty = new Paginator(sortedResults, 5);
    paginator.currentPage = 0;
    var newPage = paginatorByDifficulty.showResultsOnPage(paginator.currentPage, sortedResults);
    formatPage(newPage);
    sortedState.sortType = 'DIFFICULTY'
    sortedState.isSorted = true;
  })
  filter.toggleType.addEventListener('click', function(){
    console.log('toggle')
    var sortedResults = group("type", paginator.results);
    var paginatorByType = new Paginator(sortedResults, 5);
    paginatorByType.currentPage = 0;
    var newPage = paginatorByType.showResultsOnPage(paginatorByType.currentPage, sortedResults);
    formatPage(newPage);
    sortedState.sortType = 'TYPE'
    sortedState.isSorted = true;
  })
}

fetchOpenTrivia();
