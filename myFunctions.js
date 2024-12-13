// دالة لإضافة الكتاب إلى السلة
function addToCart(bookName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const bookIndex = cart.findIndex(item => item.name === bookName);
    if (bookIndex !== -1) {
        cart[bookIndex].quantity += 1;
    } else {
        cart.push({
            name: bookName,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${bookName} تم إضافته إلى السلة!`);
    updateCartDisplay();
}

// دالة لإفراغ السلة
function emptyCart() {
    localStorage.removeItem("cart");
    updateCartDisplay();
}

// دالة لعرض محتويات السلة
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<li class='list-group-item'>سلتك فارغة!</li>";
        totalPriceElement.textContent = "المجموع الكلي: 0 ل.س";
        return;
    }

    let cartHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity, 10);

        if (!isNaN(price) && !isNaN(quantity)) {
            cartHTML += `
                <li class="list-group-item d-flex justify-content-between">
                    ${item.name} - ${quantity} × ${price} ل.س
                </li>
            `;
            totalPrice += quantity * price;
        }
    });

    cartItemsContainer.innerHTML = cartHTML;
    totalPriceElement.textContent = `المجموع الكلي: ${totalPrice} ل.س`;
}

// استدعاء دالة التحديث عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
});

// دالة لعرض أو إخفاء تفاصيل الكتاب
function showDetails(button) {
    // الحصول على الصف الذي يحتوي على التفاصيل المرتبطة بالكتاب
    const detailsRow = button.parentElement.parentElement.nextElementSibling;

    // التبديل بين إظهار وإخفاء التفاصيل
    if (detailsRow.style.display === "none") {
        detailsRow.style.display = "table-row";
    } else {
        detailsRow.style.display = "none";
    }
}