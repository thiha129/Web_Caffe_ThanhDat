import React from 'react'
import '../css/Test.css';
function test() {

    const myslide1 = document.querySelectorAll('.myslide1'),
        dot = document.querySelectorAll('.dot');
    let counter = 1;
    slidefun(counter);

    let timer = setInterval(autoSlide, 8000);
    function autoSlide() {
        counter += 1;
        slidefun(counter);
    }
    function plusSlides(n) {
        counter += n;
        slidefun(counter);
        resetTimer();
    }
    function currentSlide(n) {
        counter = n;
        slidefun(counter);
        resetTimer();
    }
    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(autoSlide, 8000);
    }

    function slidefun(n) {

        let i;
        for (i = 0; i < myslide1.length; i++) {
            myslide1[i].style.display = "none";
        }
        for (i = 0; i < dot.length; i++) {
            dot[i].className = dot[i].className.replace(' active', '');
        }
        if (n > myslide1.length) {
            counter = 1;
        }
        if (n < 1) {
            counter = myslide1.length;
        }
        myslide1[counter - 1].style.display = "block";
        dot[counter - 1].className += " active";
    }
    return (
        <div class="slider1">
            <div class="myslide1 fade">
                <div class="txt">
                    <h1>IMAGE 1</h1>
                    <p>123zxc zxc zxc zxc zxc</p>
                </div>
                <div class="imgsl"><h1>IMAGE 6</h1></div>
            </div>

            <div class="myslide1 fade">
                <div class="txt">
                    <h1>IMAGE 2</h1>
                    <p>123zxc zxc zxc zxc zxc</p>
                </div>
                <div class="imgsl"><h1>IMAGE 6</h1></div>
            </div>

            <div class="myslide1 fade">
                <div class="txt">
                    <h1>IMAGE 3</h1>
                    <p>123zxc zxc zxc zxc zxc</p>
                </div>
                <div class="imgsl"><h1>IMAGE 6</h1></div>
            </div>

            <div class="myslide1 fade">
                <div class="txt">
                    <h1>IMAGE 4</h1>
                    <p>123zxc zxc zxc zxc zxc</p>
                </div>
                <div class="imgsl"><h1>IMAGE 6</h1></div>
            </div>

            <div class="myslide1 fade">
                <div class="txt">
                    <h1>IMAGE 5</h1>
                    <p>123zxc zxc zxc zxc zxc</p>
                </div>
                <div class="imgsl"><h1>IMAGE 6</h1></div>
            </div>

            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>

            <div class="dotsbox" style="text-align:center">
                <span class="dot" onclick="currentSlide(1)"></span>
                <span class="dot" onclick="currentSlide(2)"></span>
                <span class="dot" onclick="currentSlide(3)"></span>
                <span class="dot" onclick="currentSlide(4)"></span>
                <span class="dot" onclick="currentSlide(5)"></span>
            </div>



        </div>
    )
}

export default test
