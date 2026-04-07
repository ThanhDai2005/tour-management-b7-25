// Slider Tour Detail
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
// End Slider Tour Detail

const alertAddCartSuccess = () => {
  const alert = document.querySelector("[alert-add-cart-success]");

  if (alert) {
    alert.classList.remove("alert-hidden");

    setTimeout(() => {
      alert.classList.add("alert-hidden");
    }, 3000);

    const closeAlert = alert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
      alert.classList.add("alert-hidden");
    });
  }
};

// Cart

// Nếu chưa có giỏ hàng trong localStorage thì tạo giỏ hàng mới cho người dùng
const existCart = localStorage.getItem("cart");

if (!existCart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Thêm tour vào cart
const form = document.querySelector("[form-add-to-cart]");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const quantity = parseInt(e.target[0].value);
    const tourId = parseInt(form.getAttribute("tour-id"));

    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const indexExistTour = cart.findIndex((item) => item.tourId == tourId);

      if (indexExistTour == -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity,
        });
      } else {
        cart[indexExistTour].quantity += quantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alertAddCartSuccess();
    }
  });
}

// End Cart
