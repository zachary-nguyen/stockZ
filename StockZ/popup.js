$(document).ready(function(){

  //Add actionListener
  document.getElementById("addNewStockButton").addEventListener("click",addNewStock);
  document.getElementById("cancelButton").addEventListener("click",cancel);

  function cancel(){
    document.getElementById("searchNewStock").style.display = "none";
    document.getElementById("cancelSearch").style.display = "none";

    document.getElementById("emptyList").style.display = "block";
    document.getElementById("searchSubStock").style.display = "block";
    document.getElementById("addNewStock").style.display = "block";
  }

  function addNewStock(){
    //hide other divs
    document.getElementById("emptyList").style.display = "none";
    document.getElementById("searchSubStock").style.display = "none";
    document.getElementById("addNewStock").style.display = "none";

    document.getElementById("searchNewStock").style.display = "block";
    document.getElementById("cancelSearch").style.display = "block";
  }

  function search(){
    var url = "https://api.iextrading.com/1.0/stock/shop/book";

  }
});
