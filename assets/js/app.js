"use strict"

import '../node_modules/jquery/dist/jquery.js';

import '../node_modules/@jaames/iro/dist/iro.js';
import Typed from '../node_modules/typed.js/src/typed.js';

$(function () {
    clockUpdate()
    setInterval(clockUpdate, 1000)

    var hours = new Date().getHours()
    setTimeout(function () {
        if (hours >= 18 || hours < 4) {
            $('.area').toggleClass('dark')
        }
    }, 1000)

    var options = {
        strings: [`${greetings()}`],
        typeSpeed: 90
    }

    var typed = new Typed('#greetings', options)

    var colorPicker = new iro.ColorPicker('.color-picker', {
        width: 150,
        color: "#5d5d5d"
    })

    colorPicker.on('color:change', function (color) {
        $(':root').css('--square-color', color.hexString)
    })

    $(".area").click(function (e) {
        $(".color-picker").css({ top: e.clientY - 75, left: e.clientX - 75 }).show()
    })

    $(".color-picker").mouseleave(function () {
        $(this).hide()
    })
})

function greetings() {
    var name = window.location.search.slice(1),
        hours = new Date().getHours(),
        morning = ('selamat pagi'),
        afternoon = ('selamat siang'),
        evening = ('selamat sore'),
        night = ('selamat malam'),
        text

    if (hours >= 3 && hours < 12) {
        text = morning
    } else if (hours >= 12 && hours < 16) {
        text = afternoon
    } else if (hours >= 16 && hours < 18) {
        text = evening
    } else {
        text = night
    }

    return `${text} ${name}`.toUpperCase()
}

function clockUpdate() {
    var date = new Date()

    function addZero(x) {
        if (x < 10) {
            return x = '0' + x
        } else {
            return x
        }
    }

    var hours = addZero(date.getHours())
    var minutes = addZero(date.getMinutes())
    var seconds = addZero(date.getSeconds())

    $('#clock').text(`${hours}:${minutes}:${seconds}`)
}