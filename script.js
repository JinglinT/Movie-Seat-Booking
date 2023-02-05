const movieSelect = document.getElementById('movie');
const seatContainer = document.querySelector('.seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const seatCount = document.getElementById('count');
const totalPrice = document.getElementById('total');
let selectedSeatIndice = [];

populateUI();

function storeSelectedSeatIndice() {
  localStorage.setItem('selectedSeatIndice', JSON.stringify(selectedSeatIndice));
}

function storeSelectedMovieIndex() {
  localStorage.setItem('selectedMovieIndex', movieSelect.selectedIndex);
}

function populateUI() {
  selectedSeatIndice = JSON.parse(localStorage.getItem('selectedSeatIndice'));
  selectedSeatIndice.forEach((i) => {
    seats[i].classList.add('selected');
  });

  selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  movieSelect.selectedIndex = selectedMovieIndex;

  updateCountAndTotal();
}

function updateSelectedSeatIndice() {
  selectedSeatIndice = [];
  for (let i = 0; i < seats.length; i++) {
    if (seats[i].classList.contains('selected')) {
      selectedSeatIndice.push(i);
    }
  }
}

function updateCountAndTotal() {
  seatCount.innerText = selectedSeatIndice.length;
  totalPrice.innerText = selectedSeatIndice.length * +movieSelect.value;
}

movieSelect.addEventListener('change', (e) => {
  storeSelectedMovieIndex();
  updateCountAndTotal();
});

seatContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedSeatIndice();
    storeSelectedSeatIndice();
    updateCountAndTotal();
  }
});
