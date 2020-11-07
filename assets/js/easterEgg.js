//easter Egg
var largememe = new Audio('https://www.myinstants.com/media/sounds/wide-poutine-walk.mp3');
var visiteur = new Audio('https://www.myinstants.com/media/sounds/visiteurdemachaine.mp3');
var never = '<iframe allowfullscreen frameborder="0" src="https://streamable.com/e/rb2bk8?autoplay=1" class="embed-responsive-item" width="100%" height="auto" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>'
var darts = '<iframe allowfullscreen="" frameborder="0" src="https://www.youtube.com/embed/JlGrBQHeUXs?autoplay=1" class="embed-responsive-item" width="100%" height="auto" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>'
var key = "";

//Meteo
var API_KEY = '84f4d8a124e56e3296afc40d310b36fc'
var icoMeteo ='http://openweathermap.org/img/w/' // + example.png

//boucle
var i = 0;  
var j = 100
var k = 100


function popup() {
    // ouvre une fenetre sans barre d'etat, ni d'ascenceur
    let  mario = open("",'popup','width=1040px,height=555px,toolbar=no,scrollbars=no,resizable=yes');	
    mario.document.write("<title>EasterEgg</title>");
    mario.document.write("<body><iframe src=\"https://funhtml5games.com/?embed=marioeditor\" style=\"width:1024px;height:540px;border:none;\" frameborder=\"0\" scrolling=\"no\"></iframe></body>");
    mario.document.close();
}

/*easter egg*/
window.addEventListener('keydown', function (event)
{
    key += event.key;
	lastEnter = event.key;
	
    if(lastEnter == "Enter") //supprimer la chaine completement
    {
        key = "";
    }
	else if(lastEnter == "Backspace")  //supprime juste le dernier caractere
    {
		key = key.substring(0, key.length - 10);
    }

    if(key == "bouns") //actif sur toutes les pages
    {
        largeMeme();
        key = "";
    }
    else if(key == "mario") //actif sur toutes les pages
    {
        popup();
        key = "";
    }
	else if(key == 'darts') //actif sur la page darts.html 
    {
        document.getElementById("VideoPresentation").innerHTML = darts;
        key = "";
    }
    else if(key == 'giveyouup') //actif sur la page darts.html
    {
        document.getElementById("VideoPresentation").innerHTML = never;
        var v = document.getElementsByTagName("video")[0];
        v.play();
        key = "";
    }
    else if(key == 'meteo') //actif sur la page sonde.html
    {
        meteo()
        key = "";
    }
    else if(key == 'job') //marche sur toute les pages
    {
        visiteur.play()
    }

}, true);

function largeMeme(){
    largememe.play()

    LoopMargin()

    setTimeout(function(){LoopScroll()},2500)

    setTimeout(function(){
        $("html, body").animate({ scrollTop: 0 });
    },21000)

i=0
j=100
k=100
}

function LoopMargin() {         //  create a loop function
    setTimeout(function() {   
      i++;                    //  increment the counter
      if (i < 20) {           //  if the counter < 20, call the loop function
        LoopMargin();             //  ..  again which will trigger another 
      }                       
    }, 50)              //  ..  setTimeout()
}

function LoopScroll() {         //  create a loop function
    setTimeout(function() {   
        k=j;
        j++;          
      //  increment the counter
      if (j < document.body.scrollHeight) {     //if the counter < body, call the loop function
        window.scrollTo(0,j);
        LoopScroll();             				//again which will trigger another 
      }                       
    }, 4.5)                 					//setTimeout()
}

//function qui fait la requete des information meteorologique en fonction de la position de la personne
function meteo()
{
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("latitude=" +position.coords.latitude)
        console.log("longitude=" +position.coords.longitude)

        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&APPID=" + API_KEY
           
        $.get(url, function(data) {
            document.getElementsByClassName("MeteoEasterEgg")[0].innerHTML = generateHtmlMeteo(data)
        })

      });
    
}

//fonction qui genere le html en fonction des informations que retourne l'api
function generateHtmlMeteo(data){
    let MeteoTemplate = '<h1 class="text-center">'+ data.name +'</h1>'+
    '<div class="container">'+
        '<div class="row">'+
            '<div class="col-md-6 text-center detail-ville">'+
                '<div>'+
                    '<p>➜ Temperature: '+ data.main.temp +'°C</p>'+
                    '<p>➜ Humidité: '+ data.main.humidity +'%</p>'+
                    '<p>➜ Vitesse vent: '+ data.wind.speed +' m/s</p>'+
                    '<p>➜ Pression: '+ data.main.pressure +' Hpa</p>'+
                '</div>'+
            '</div>'+
            '<div class="col-md-6 text-center"><img alt="title" src="http://openweathermap.org/img/w/'+ data.weather[0].icon +'.png" style="border: medium none; width: 300px; height: 300px; background: url(&quot;http://openweathermap.org/img/w/'+ data.weather[0].icon +'.png&quot;) repeat scroll 0% 0% transparent;" width="300" height="300">'+
            '<p>'+ data.weather[0].main +' </p>'+
            '</div>'+
        '</div>'+
    '</div>'
    
    return MeteoTemplate
}

