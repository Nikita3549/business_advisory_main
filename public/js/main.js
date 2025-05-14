//canvas line
var sketch = function(t) {
    t.vertexCount = 8, t.cVBodies = [], t.springs = [], t.bobs = [], t.bg = t.color(255, 255, 255), t.strC = t.color(0, 0, 0), t.parentContainer = "", t.setup = function() {
        t.cnv = t.createCanvas(t.windowWidth, 100), t.cnv.parent(t.myContainer);
        for (let s = 0; s < t.vertexCount; s++) t.spring = new Spring(s * (t.width / (t.vertexCount - 1)), t.height / 2, 0, t), t.springs.push(t.spring), t.bob = new Bob(s * (t.width / (t.vertexCount - 1)), t.height / 2, t), t.bobs.push(t.bob), t.curveVert = new cVBody(t.bob.position.x, t.bob.position.y, t), t.cVBodies.push(t.curveVert);
        t.bobs[t.round(t.vertexCount / 2) - 1].position.y += 20
    }, t.draw = function() {
        t.background(t.bg), t.stroke(t.strC), t.beginShape(), t.noFill(), t.vertex(0, t.bobs[0].position.y), t.curveTightness(-.4), t.cVBodies.forEach(function(s, o) {
            t.strokeWeight(2), t.springs[o].connect(t.bobs[o]), t.springs[o].constrainLength(t.bobs[o], 0, 200), t.bobs[o].update(), t.bobs[o].moving(t.mouseX, t.mouseY, o, t.bobs.length, t), t.curveVert.pos.set(t.bobs[o].position), t.curveVert.show(t)
        }), t.vertex(t.width, t.bobs[0].position.y), t.endShape(), (t.mouseX > t.width || t.mouseX < 0) && t.bobs.forEach(function(s, o) {
            t.bob.stopMoving()
        })
    }, t.mouseMoved = function() {
        t.bobs.forEach(function(s, o) {
            s.snap(t.mouseX, t.mouseY, t.vertexCount, t)
        })
    }, t.windowResized = function() {
        t.resizeCanvas(t.windowWidth, 100), t.bobs.splice(0, t.bobs.length), t.springs.splice(0, t.springs.length), t.cVBodies.splice(0, t.cVBodies.length), t.setup()
    }
};
class cVBody {
    constructor(t, s, o) {
        this.pos = o.createVector(t, s)
    }
    show(t) {
        t.curveVertex(this.pos.x, this.pos.y)
    }
}
class Spring {
    constructor(t, s, o, i) {
        this.anchor = i.createVector(t, s), this.len = o, this.k = .2
    }
    connect(t) {
        let s = p5.Vector.sub(t.position, this.anchor),
            o = s.mag() - this.len;
        s.normalize(), s.mult(-1 * this.k * o), t.applyForce(s)
    }
    constrainLength(t, s, o) {
        let i = p5.Vector.sub(t.position, this.anchor),
            e = i.mag();
        e < s ? (i.normalize(), i.mult(s), t.position = p5.Vector.add(this.anchor, i), t.velocity.mult(0)) : e > o && (i.normalize(), i.mult(o), t.position = p5.Vector.add(this.anchor, i), t.velocity.mult(0))
    }
}
class Bob {
    constructor(t, s, o) {
        this.position = o.createVector(t, s), this.velocity = o.createVector(), this.acceleration = o.createVector(), this.mass = 18, this.damping = .955, this.moveOffset = o.createVector(), this.snapped = !1
    }
    update() {
        this.velocity.add(this.acceleration), this.velocity.mult(this.damping), this.position.add(this.velocity), this.acceleration.mult(0)
    }
    applyForce(t) {
        let s = t;
        s.div(this.mass), this.acceleration.add(s)
    }
    display() {
        stroke(0), strokeWeight(2), fill(175), this.dragging && fill(50), ellipse(this.position.x, this.position.y, 2 * this.mass, 2 * this.mass)
    }
    snap(t, s, o, i) {
        let e = t - this.position.x;
        e > -i.width / o && e < i.width / o && this.velocity.y < .1 && this.velocity.y > -.1 ? (this.snapped = !0, this.moveOffset.y = this.position.y - s) : this.stopMoving()
    }
    moving(t, s, o, i, e) {
        let n = e.height / 2 - e.mouseY;
        this.snapped && this.position.y < e.height / 2 + 25 && this.position.y > e.height / 2 - 25 && (n < 10 && n > 0 && 0 != o && o != i - 1 && (this.acceleration.y += 1), n > -10 && n < 0 && 0 != o && o != i - 1 && (this.acceleration.y -= 1))
    }
    stopMoving() {
        this.snapped = !1
    }
}

//spinning gears
var canvases = [],
    $ = jQuery;
$(".p5canvas").each(function(t) {
    $(this).attr("id", "p5C#" + t);
    var s = new p5(sketch, "p5C#" + t);
    $(this).hasClass("dark") && (console.log(s.bg), s.bg = s.color(0, 0, 0), s.strC = s.color(255, 255, 255))
});

var $gear1 = $('.gear1'),
    $gear2 = $('.gear2'),
    $gear3 = $('.gear3'),
    $body = $('body'),
    bodyHeight = $body.height();

function getScrollTop() {
    if (typeof pageYOffset != 'undefined') {
        //most browsers except IE before #9
        return pageYOffset;
    } else {
        var B = document.body; //IE 'quirks'
        var D = document.documentElement; //IE with doctype
        D = (D.clientHeight) ? D : B;
        return D.scrollTop;
    }
}

$(window).scroll(function() {
    var scroll = getScrollTop();
    $gear1.css({
        'transform': 'rotate(' + (scroll / bodyHeight * 800) + 'deg)',
    });
    $gear2.css({
        'transform': 'rotate(' + (scroll / bodyHeight * ("-1000")) + 'deg)',
        '-moz-transform': 'rotate(' + (scroll / bodyHeight * ("-1000")) + 'deg)',
        '-ms-transform': 'rotate(' + (scroll / bodyHeight * ("-1000")) + 'deg)',
        '-o-transform:rotate': 'rotate(' + (scroll / bodyHeight * ("-1000")) + 'deg)'

    });
    $gear3.css({
        'transform': 'rotate(' + (scroll / bodyHeight * ("-1000")) + 'deg)',
        '-moz-transform': 'rotate(' + (scroll / bodyHeight * ("-1000")) + 'deg)',
        '-ms-transform': 'rotate(' + (scroll / bodyHeight * ("-1000")) + 'deg)',
        '-o-transform:rotate': 'rotate(' + (scroll / bodyHeight * ("-1000")) + 'deg)'
    });
});

//Horizontal slider
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray("section");
let maxWidth = 0;

const getMaxWidth = () => {
    maxWidth = 0;
    sections.forEach((section) => {
        maxWidth += section.offsetWidth;
    });
};
getMaxWidth();
ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

gsap.to(sections, {
    x: () => `-${maxWidth - window.innerWidth}`,
    ease: "power",
    scrollTrigger: {
        trigger: ".slider",
        pin: true,
        scrub: true,
        markers: false,
        end: () => `+=${maxWidth}`,
        invalidateOnRefresh: true
    }
});

sections.forEach((sct, i) => {
    ScrollTrigger.create({
        trigger: sct,
        start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
        end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
        toggleClass: { targets: sct, className: "active" }
    });
});

//rotating image in bottom of main page
gsap.to("#abstract", {
    scrollTrigger: {
        trigger: '.main__bottom_image',
        start: "top bottom",
        markers: false,
        scrub: 0.5

    },
    rotate: "+=65",
    scale: 1.4

})

//let aside language selector slide right
var pointSetter = document.querySelector('.point');

const mediaQuery = window.matchMedia('(max-width: 1024px) and (max-height: 900px) ')
    // Check if the media query is true
if (mediaQuery.matches) {
    // Then trigger an alert
    gsap.to("aside", {
        scrollTrigger: {
            trigger: '.point',
            start: "bottom bottom",
            markers: false,
            scrub: 0.5

        },
        right: -70
    })
}


//language selector accordeon

let flags = document.querySelector('.lang__selector');

let dropdown = document.querySelector('.flag__handler')
dropdown.addEventListener('click', (e) => {
    if (flags.classList.contains('closed')) {
        flags.classList.remove('closed')
    } else {
        flags.classList.add('closed')
    }
})


const textarea1 = document.getElementById('txtBox1')
const textarea2 = document.getElementById('message')
textarea1.addEventListener('input', function(e) {
    textarea2.value = textarea1.value
});

const textarea3 = document.getElementById('name')
const textarea4 = document.getElementById('notify_name')
textarea3.addEventListener('input', function(e) {
    textarea4.textContent = textarea3.value
});

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    backscroll: false,
    closeOnEsc: true
});

function send(event, php) {
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
            json = JSON.parse(this.response); // Ебанный internet explorer 11
            console.log(json);

            // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
            if (json.result == "success") {

                // Если сообщение отправлено
                document.getElementById("form").reset();
                // alert("Message is sent, thank you!");
                document.getElementById("not_button").click()


            } else {
                // Если произошла ошибка
                alert("Error. Message not sent.");
            }
            // Если не удалось связаться с php файлом
        } else { alert("Ошибка сервера. Номер: " + req.status); }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function() { alert("Request sending error"); };
    req.send(new FormData(event.target));
}

const notify = new HystModal({
    linkAttributeName: "data-hystmodal",
    backscroll: false,
    closeOnEsc: true
});