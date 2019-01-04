"use strict";

$(document).ready(function(){
  var buttons = [];
  var subscribedStocks = [];
  //Add eventListener
  document.getElementById("addNewStockButton").addEventListener("click",addNewStock);
  document.getElementById("cancelButton").addEventListener("click",cancelDone);
  document.getElementById("doneButton").addEventListener("click",cancelDone);
  document.getElementById("searchBarNewStock").addEventListener("keyup",searchNewStock);
  document.getElementById("refresh").addEventListener("click",refresh);

  //populate subscribed on page load

  chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    var tr = $("#searchSubStock tr");
    if (allKeys.length == 0) {
      document.getElementById("emptyList").style.display = "block";
    }else{
      document.getElementById("emptyList").style.display = "none";
    }

    allKeys.forEach(function(symbol){
        fetchAndDisplayQuotes(symbol);
        subscribedStocks.push(items);
      });
    })
  });

  //Cancel and Done buttons
  function cancelDone(){
    //hide div
    document.getElementById("searchNewStock").style.display = "none";
    document.getElementById("cancelSearch").style.display = "none";
    document.getElementById("doneSearch").style.display = "none";

    //display div
    document.getElementById("searchSubStock").style.display = "block";
    document.getElementById("addNewStock").style.display = "block";
  }

  //Add New stock button
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

  //Search functionality for adding new stock
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
            btn.id = `${foundStocks[i]["1. symbol"]}`;
            btn.maxlength = "10";
            btn.addEventListener("click",addStockToList);
            tr.append(btn);
            $('#searchTable').append(tr);
          }
        }
      });
    }else{
      $("#searchTable tr").remove(); //clear the table
    }
  }

  function fetchAndDisplayQuotes(symbol){
    var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=YXSSDW2H1ARGQA9K";
    //get quotes from api
    $.getJSON(url,function(data){
        if(typeof data !== "undefined"){
          var tr = $('<tr/>');
          var btn = document.createElement('input');

          btn.type = "button";
          btn.className = "btn";
          btn.value = symbol + " Price: $" + data["Global Quote"]["05. price"] +
           " High: $" + data["Global Quote"]["03. high"] + " Low: $" + data["Global Quote"]["04. low"]
           + " Change: " + data["Global Quote"]["10. change percent"];
          btn.id = symbol;
          tr.append(btn);
          $('#searchSubStock').append(tr);
        }
      });
  }

  function addStockToList(){
    $("input").click(function(e){
        var idClicked = e.target.id;
        //remove from the list and add it to subscribed list
        if(idClicked !== "searchBarNewStock"){
          var elem = document.getElementById(idClicked);
          elem.parentNode.removeChild(elem);

          fetchAndDisplayQuotes(idClicked);
          //add the subscribed stock to storage
          chrome.storage.sync.set({[idClicked]: elem.value}, function() {
            console.log('Saved to storage!');
          });
        }
    });
  }

  function refresh(){
    location.reload();
  }
  //reset storage
  // chrome.storage.sync.clear(function(){
  //   console.log("success");
  // })
