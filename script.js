//  Dynamic quotes
$( document ).ready(function() {
    $( ".carousel-control-next" ).click(function() {
        let islastactive = $( ".carousel-inner" ).children( ".carousel-item" ).last().hasClass( "active" );

        if (islastactive) {
            get_popular()
        }
    });
});


function get_popular() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://smileschool-api.hbtn.info/quotes", true);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        loading(1);
        construct_popular(JSON.parse(this.response));
        setTimeout(() => {
            loading(0);
        }, 2000);
      }
    };
    xhttp.send();
}


function construct_popular(data) {
    for (let person of data) {
        if (there_name(person.name)) {
            let div = ` <div class="carousel-item">\
                            <div class="uno d-flex flex-md-row flex-column">\
                                <img class="img-carousel ml-5 mb-3" src=\"${person.pic_url}\" alt="Third slide">\
                                <div class="quote d-flex flex-column ml-md-5">\
                                  <div class="quote_txtc">\
                                    <p class="quoute__txt">\
                                      « ${person.text}\
                                    </p>\
                                  </div>\
                                  <h3 class="quoute__title">${person.name}</h3>\
                                  <p class="quoute__job">${person.title}</p>\
                                </div>\
                            </div>\
                        </div>`;

            $( ".carousel-inner" ).append( div );
        }
    }
}


function there_name(name) {
    const people = document.querySelectorAll('.quoute__title');

    for (person in people) {
        if (person.textContent == name) {
            return (0);
        }
    }

    return (1);
}


function loading(wait) {
    if (wait == 1) {
            $( ".carousel" ).hide();
            $( ".loader" ).show();
            $( ".loader" ).css("animation-play-state", "running");
    } else {
            $( ".loader" ).hide();
            $( ".loader" ).css("animation-play-state", "paused");
            $( ".carousel" ).show();
    }
}


/**
* Delay for a number of milliseconds
*/
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}