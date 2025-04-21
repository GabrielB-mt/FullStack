function random(){
    r = Math.floor(Math.random()*100)
    console.log(r)
}

function teste(){
    let n = parseInt(document.getElementById('num').value)

    if (n > r){
            document.getElementById('verificacao').innerHTML = "Número Maior";
            document.getElementById("verificacao").style.setProperty("background-color", "#db0000")}
            
    else if(n < r){
        document.getElementById('verificacao').innerHTML = "Número Menor";
        document.getElementById("verificacao").style.setProperty("background-color", "#db0000")}
    else if(n === r){
        document.getElementById('verificacao').innerHTML = "Número Igual";
        document.getElementById("verificacao").style.setProperty("background-color", "#086300")}
    }         
