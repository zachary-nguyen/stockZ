"use strict";

$(document).ready(function(){
  var buttons = [];

  //Add eventListener
  document.getElementById("addNewStockButton").addEventListener("click",addNewStock);
  document.getElementById("cancelButton").addEventListener("click",cancel);
  document.getElementById("searchBarNewStock").addEventListener("keyup",searchNewStock);

  function cancel(){
    //hide div
    document.getElementById("searchNewStock").style.display = "none";
    document.getElementById("cancelSearch").style.display = "none";
    document.getElementById("doneSearch").style.display = "none";


    //display div
    document.getElementById("emptyList").style.display = "block";
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
            console.log(btn);
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
    //iterate list of buttons and check which one is hit
    $("input").click(function(e){
        var idClicked = e.target.id;
        console.log(idClicked);
    });
  }

  // var input = document.getElementById("searchText");
  // input.addEventListener("keyup",function(event){
  // if(event.keyCode == 13){
  //     $("#searchButtonId").click();
  //   }
  // });

});
