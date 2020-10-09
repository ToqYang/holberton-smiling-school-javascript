//  Dynamic quotes
$( document ).ready(function() {
    choose_carousel(".carousel-qu", ".quotesdyn", ".inner-quotes", "https://smileschool-api.hbtn.info/quotes", make_quotes, '.loader-quotes');
    choose_carousel(".carousel-pv", ".popular-videos", ".popular-inner", "https://smileschool-api.hbtn.info/popular-tutorials", make_popvideos, '.loader-popular');
    choose_carousel(".carousel-lv", ".lt-event", ".inner-lt", "https://smileschool-api.hbtn.info/latest-videos", make_popvideos, '.ld-latest');
});


function choose_carousel(carouselClass, addEvent, appendClass, urlreq, buildElemFunc, loadClass) {
    $( addEvent ).click(function() {
        let islastactive = $( appendClass ).children( ".carousel-item" ).last().hasClass( "active" );

        if (islastactive) {
            get_request(urlreq, buildElemFunc, carouselClass, loadClass);
        }
    });
}


function get_request(URL, build, carouselClass, loadClass) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", URL, true);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        loading(1, carouselClass, loadClass);
        build(JSON.parse(this.response));
        setTimeout(() => {
            loading(0, carouselClass, loadClass);
        }, 2000);
      }
    };
    xhttp.send();
}


function loading(stat, carouselClass, loadClass) {
    if (stat == 1) {
            $( carouselClass ).hide();
            $( loadClass ).show();
            $( loadClass ).css("animation-play-state", "running");
    } else {
            $( loadClass ).hide();
            $( loadClass ).css("animation-play-state", "paused");
            $( carouselClass ).show();
    }
}


function cmp_exist(name, allElements) {
    const people = document.querySelectorAll(allElements);

    for (person in people) {
        if (person.textContent == name) {
            return (0);
        }
    }

    return (1);
}


function make_popvideos(data) {
    for (let person of data) {
        if (cmp_exist(person.name, '.mcard__name')) {
            let div = `<div class="col-sm-12 col-md-6 col-lg-3 carousel-item">\
                            <div class="card mcard">\
                              <div class="mcard__video">\
                                <img class="card-img-top mcard__video" src="${person.thumb_url}" alt="Card image cap">\
                                <img class="mcard__play" src="./Images/images/play.png" alt="play">\
                              </div>\
                              <div class="card-body mcard">\
                                <h4 class="card-title mcard__title">${person.title}</h4>\
                                <p class="card-text mcard_text">${person["sub-title"]}</p>\
                                <div class="mcard__ins d-flex flex-row align-items-center mt-3 mb-2">\
                                  <img class="mcard__img" src="${person.author_pic_url}" alt="Person smiling">\
                                  <p class="mcard__name m-0 ml-2">${person.author}</p>\
                                </div>\
                                <div class="mcard__eval d-flex flex-row justify-content-between">\
                                  <div class="mcard__constarts">`;

            let onstarts = person.start;
            for (let i = 0; i < onstarts; ++i) {
                div += '<img class="mcard__starts" src="./Images/images/star_on.png" alt="Starts"></img>';
            }

            let offstarts = 5 - onstarts;

            for (let i = 0; i < offstarts; ++i) {
                div += '<img class="mcard__starts" src="./Images/images/star_off.png" alt="Starts">';
            }
            div += `</div><p class="card-text mcard__time">${person.duration}</p></div></div></div></div>`;

            $( ".popular-inner" ).append( div );
        }
    }
}


function make_quotes(data) {
    for (let person of data) {
        if (cmp_exist(person.name, '.quoute__title')) {
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

            $( ".inner-quotes" ).append( div );
        }
    }
}


