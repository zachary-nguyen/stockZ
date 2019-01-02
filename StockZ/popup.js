$(document).ready(function(){

  //Add actionListener
  document.getElementById("addNewStockButton").addEventListener("click",addNewStock);


  function addNewStock(){
    //hide other divs
    document.getElementById("emptyList").style.display = "none";
    document.getElementById("searchSubStock").style.display = "none";
    document.getElementById("addNewStock").style.display = "none";

    document.getElementById("searchNewStock").style.display = "block";
    document.getElementById("cancelButton").style.display = "block";
  }

  function search(){
    var url = "https://api.iextrading.com/1.0/stock/shop/book";

  }
});
