"use strict";

$(document).ready(function(){
  var buttons = [];
  var subscribedStocks = [];

  //populate subscribed on page load
  chrome.storage.sync.get('foo', function(result) {
    console.log('value fetched is ' + result.foo );
  });


  //Add eventListener
  document.getElementById("addNewStockButton").addEventListener("click",addNewStock);
  document.getElementById("cancelButton").addEventListener("click",cancelDone);
  document.getElementById("doneButton").addEventListener("click",cancelDone);
  document.getElementById("searchBarNewStock").addEventListener("keyup",searchNewStock);

  function cancelDone(){
    //hide div
    document.getElementById("searchNewStock").style.display = "none";
    document.getElementById("cancelSearch").style.display = "none";
    document.getElementById("doneSearch").style.display = "none";


    //display div
    var tr = $("#searchSubStock tr");
    console.log(tr.children().length);
    if (tr.children().length == 0) {
      document.getElementById("emptyList").style.display = "block";
    }
    document.getElementById("searchSubStock").style.display = "block";
    document.getElementById("addNewStock").style.display = "block";
  }

  function addNewStock(){
    //hide other divs
    document.getElementById("emptyList").style.display = "none";
    document.getElementById("searchSubStock").style.display = "none";
    document.getElementById("addNewStock").style.display = "none";

    //display divs
    document.getElementById("searchNewStock").style.display = "block";
    document.getElementById("cancelSearch").style.display = "block";
    document.getElementById("doneSearch").style.display = "block";

  }

  function searchNewStock(){
    var searchValue = document.getElementById("searchBarNewStock").value;

    if(searchValue !== ""){
      var url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchValue + "&apikey=YXSSDW2H1ARGQA9K";
      console.log(url);
      var foundStocks = [];
      //fetch data
      $.getJSON(url,function(data){
        if(data !== ""){
          for(var i = 0; i<10;i++){
            foundStocks.push(data.bestMatches[i]);
          }
          //populate table
          $("#searchTable tr").remove(); //clear the table

          for(var i = 0; i<foundStocks.length;i++){
            var tr = $('<tr/>');
            var btn = document.createElement('input');

            btn.type = "button";
            btn.className = "btn";
            btn.value = foundStocks[i]["1. symbol"] + " " + foundStocks[i]["2. name"] + " " + "(" + foundStocks[i]["4. region"] + ")";
            btn.id = `button${i}`;

            buttons.push(btn);
            btn.addEventListener("click",addStockToList);
            tr.append(btn);
            $('#searchTable').append(tr);
          }
        }

      });
      console.log(foundStocks);
    }else{
      $("#searchTable tr").remove(); //clear the table
    }

  }


  function addStockToList(){
    $("input").click(function(e){
        var idClicked = e.target.id;
        //remove from the list and add it to subscribed list
        if(idClicked !== "searchBarNewStock"){
          var elem = document.getElementById(idClicked);
          elem.parentNode.removeChild(elem);

          var tr = $('<tr/>');
          tr.append(elem);
          $('#searchSubStock').append(tr);

          //add the subscribed stock to storage
          chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
            console.log('Settings saved');
          });

        }
    });
  }

  // var input = document.getElementById("searchText");
  // input.addEventListener("keyup",function(event){
  // if(event.keyCode == 13){
  //     $("#searchButtonId").click();
  //   }
  // });

});
