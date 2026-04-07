// Lấy ra data và in ra giao diện
const drawListTour = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  fetch("http://localhost:3000/cart/list-tour", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const htmlsArray = data.tours.map((item, index) => {
        return `
        <tr>
          <td>${index + 1}</td>
          <td>
            <img src="${item.image}" alt="${item.info.title}" width="80px" />
          </td>
          <td>
            <a href="/tours/detail/${item.info.slug}">${item.info.title}</a>
          </td>
          <td>${item.price_special.toLocaleString()}đ</td>
          <td>
            <input
              type="number"
              name="quantity"
              value="${item.quantity}"
              min="1"
              onchange="handleChange(${item.tourId}, this)" 
              style="width: 60px;"
            />
          </td>
          <td>${item.total.toLocaleString()}đ</td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="deleteTour(${item.tourId})">Xóa</button>
          </td>
        </tr>
      `;
      });

      const listTour = document.querySelector("[list-tour]");
      listTour.innerHTML = htmlsArray.join("");

      // Tính tổng đơn hàng
      const totalPrice = data.tours.reduce((sum, item) => sum + item.total, 0);
      const elementTotalPrice = document.querySelector("[total-price]");
      elementTotalPrice.innerHTML = totalPrice.toLocaleString();
    });
};
// Hết Lấy ra data và in ra giao diện

// Xóa sản phẩm trong giỏ hàng

const deleteTour = (tourId) => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const cartFilter = cart.filter((item) => item.tourId != tourId);

  localStorage.setItem("cart", JSON.stringify(cartFilter));

  drawListTour();
};

// Hết Xóa sản phẩm trong giỏ hàng

// Cập nhật sản phẩm

const handleChange = (tourId, e) => {
  const quantity = parseInt(e.value);

  const cart = JSON.parse(localStorage.getItem("cart"));

  const newCart = cart.map((item) => {
    if (item.tourId == tourId) {
      return {
        ...item,
        quantity: quantity,
      };
    }

    return item;
  });

  localStorage.setItem("cart", JSON.stringify(newCart));

  drawListTour();
};

// Hết cập nhật sản phẩm

// Đặt hàng

const formOrder = document.querySelector("[form-order]");

formOrder.addEventListener("submit", (e) => {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart"));

  const fullName = e.target[0].value;
  const phone = e.target[1].value;
  const note = e.target[2].value;

  const formData = {
    fullName: fullName,
    phone: phone,
    note: note,
    cart: cart,
  };

  fetch("http://localhost:3000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

// Hết Đặt hàng

drawListTour();
