// var axios = new axios();
// axios.get('https://opentdb.com/api.php?amount=10')
//   .then(function(response){
//     console.log(response.data);
//   });
var store = {};
function fetchOpenTrivia() {
  window.fetch('https://opentdb.com/api.php?amount=30')
    .then(function(response){
      console.log(response)
      return response.data;
  });
}

// Paginate results
function Paginator(results, resultsPerPage){
  this.results = results;
  this.resultsPerPage = resultsPerPage;
  this.pages = results.length / resultsPerPage;
  this.currentPage=null;
  this.previousButton = document.getElementById('previous-page');
  this.nextButton = document.getElementById('next-page');
  this.content = document.getElementById('content');
  this.previousButton.addEventListener('click', function(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.content.innterHTML = showResultsOnPage(currentPage);
    }
  })

  this.nextButton.addEventListener('click', function(){
    if(this.currentPage < this.pages){
      this.currentPage++;
      this.content.innterHTML = showResultsOnPage(currentPage);
    }
  })
}

Paginator.prototype.showResultsOnPage = function(number){
  var start = number * this.resultsPerPage;
  return store.slice(start, this.resultsPerPage);
};
console.log("hello world");
var store = {};
store.results = fetchOpenTrivia();

var paginator = new Paginator(store,5);


// todo: finish general method to sort on all data fields
function sort(dataType, key){
  return sort(function(a,b){return a - b})
};
function showResultsWhenReady(){
  var elements = [];
  for(result in store.resutls){
    var item = document.createElement('div');
    item.setAttribute('class', 'container');
    elements.push(item);
    console.log("hello")
  }
}
window.onLoad = showResultsWhenReady();