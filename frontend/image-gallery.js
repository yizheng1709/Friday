slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function createInitialContact() {
  mainContainer.innerHTML += `
  <div class="gallery-container" id="gallery-container">
  <div class="slideshow-container responsive shadow center" 
  id="initial-contact">

  <div class="mySlides fade">
    <img src="images/one.png" class="gallery-image responsive">
  </div>

  <div class="mySlides fade">
    <img src="images/two.png" class="gallery-image responsive">
  </div>

  <div class="mySlides fade">
    <img src="images/three.png" class="gallery-image responsive">
  </div>

  <div class="mySlides fade">
    <img src="images/four.png" class="gallery-image responsive">
  </div>

  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<div id="dots" style="text-align:center" class="responsive">
  <span class="dot" onclick="currentSlide(1)" id="first-click"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
  <span class="dot" onclick="currentSlide(4)"></span>
</div>
<div class="center initial-div" id="initial-div">
  <br><br><br>
<button class="initial-button" id="initial-button">
  <strong>Continue</strong>
</button>
<br><br><br>
</div>
</div>
<br><br>
`
}