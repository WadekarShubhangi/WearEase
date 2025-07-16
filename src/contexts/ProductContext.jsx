import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import { createContext } from "react";
const ProductContext = createContext();
export default ProductContext;
import { toast } from "react-toastify";

export function ProductProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryFromFilter, setSelectedCategoryFromFilter] = useState(
    []
  );
  const [formData, setFormData] = useState({
    receiverName: "",
    phoneNumber: "",
    houseNumber: "",
    apartment: "",
    city: "",
    postal: "",
    state: "",
    country: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(1100);
  const [priceTouched, setPriceTouched] = useState(false);

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useFetch("https://clothing-app-backend-peach.vercel.app/api/categories");

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useFetch("https://clothing-app-backend-peach.vercel.app/api/products");

  const {
    data: wishlistData,
    loading: wishlistLoading,
    error: wishlistError,
    refetch: reFetchWishlist,
  } = useFetch("https://clothing-app-backend-peach.vercel.app/api/wishlist");

  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
    refetch: reFetchCart,
  } = useFetch("https://clothing-app-backend-peach.vercel.app/api/cart");

  const {
    data: addressData,
    loading: addressLoading,
    error: addressError,
    refetch: reFetchAddress,
  } = useFetch("https://clothing-app-backend-peach.vercel.app/api/address");

  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
    refetch: reFetchOrders,
  } = useFetch("https://clothing-app-backend-peach.vercel.app/api/orders");

  function filteredProducts() {
    if (!productData?.data?.products) return [];
    let result = productData.data.products;

    if (selectedCategoryFromFilter.length > 0) {
      result = result.filter((item) =>
        selectedCategoryFromFilter.includes(item.category.name)
      );
    } else if (selectedCategory) {
      result = result.filter((item) => item.category.name === selectedCategory);
    }

    if (priceTouched && selectedPrice > 0) {
      result = result.filter((item) => item.discountedPrice <= selectedPrice);
    }

    if (sortOrder === "lowToHigh") {
      result = [...result].sort(
        (a, b) => a.discountedPrice - b.discountedPrice
      );
    } else if (sortOrder === "highToLow") {
      result = [...result].sort(
        (a, b) => b.discountedPrice - a.discountedPrice
      );
    }

    if (selectedRating) {
      result = result.filter((item) => item.rating >= selectedRating);
    }

    return result;
  }

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedCategoryFromFilter([]);
    setSelectedRating(0);
    setSortOrder("");
    setSelectedPrice(2000);
    setSearchQuery("");
    setPriceTouched(false);
  };

  function addToWishlist(itemId) {
    fetch("https://clothing-app-backend-peach.vercel.app/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: itemId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        reFetchWishlist();
        toast.success("Item added to wishlist");
      })
      .catch((err) => {
        console.error("Error in wishlist API:", err);
        toast.error("Failed to add");
      });
  }

  function deleteFromWishlist(itemId) {
    fetch(
      `https://clothing-app-backend-peach.vercel.app/api/wishlist/${itemId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Item removed from wishlist.");
        reFetchWishlist();
      })
      .catch((err) => console.error("Error in wishlist API:", err));
  }

  async function moveToWishlist(itemId) {
    await fetch("https://clothing-app-backend-peach.vercel.app/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: itemId }),
    })
      .then((res) => res.json())
      .then(() => {
        return fetch(
          `https://clothing-app-backend-peach.vercel.app/api/cart/${itemId}`,
          {
            method: "DELETE",
          }
        );
      })
      .then(() => {
        toast.success("Item moved to wishlist.");
        reFetchWishlist();
        reFetchCart();
      })
      .catch((err) => console.error("Error moving item to wishlist:", err));
  }

  function addToCart(itemId) {
    fetch("https://clothing-app-backend-peach.vercel.app/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: itemId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.alreadyExists) {
          toast.info("This item is already in your cart.");
        } else {
          toast.success("Item added to cart successfully.");
        }
        reFetchCart();
      })
      .catch((err) => console.error("Error in wishlist API:", err));
  }

  function deleteFromCart(itemId) {
    fetch(`https://clothing-app-backend-peach.vercel.app/api/cart/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        reFetchCart();
        toast.success("Item removed from cart.");
      })
      .catch((err) => console.error("Error in cart API:", err));
  }

  async function moveToCart(itemId) {
    try {
      const isInCart = cartData?.data?.cart?.products?.some(
        (item) => item.product._id === itemId
      );

      if (isInCart) {
        await fetch(
          "https://clothing-app-backend-peach.vercel.app/api/cart/update",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: itemId, action: "increment" }),
          }
        );
      } else {
        await fetch("https://clothing-app-backend-peach.vercel.app/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: itemId }),
        });
      }
      await fetch(
        `https://clothing-app-backend-peach.vercel.app/api/wishlist/${itemId}`,
        {
          method: "DELETE",
        }
      );
      toast.success("Item moved from cart.");
      reFetchCart();
      reFetchWishlist();
    } catch (err) {
      console.error("Error moving item to cart:", err);
    }
  }

  const clearCart = async () => {
    const products = cartData?.data?.cart?.products || [];
    for (const item of products) {
      await fetch(
        `https://clothing-app-backend-peach.vercel.app/api/cart/${item.product._id}`,
        {
          method: "DELETE",
        }
      );
    }
    reFetchCart();
  };

  const calculateTotals = () => {
    let totalOriginalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;

    cartData?.data?.cart?.products.forEach(({ product, quantity }) => {
      totalOriginalPrice += product.originalPrice * quantity;
      totalDiscountedPrice += product.discountedPrice * quantity;
      totalItems += quantity;
    });

    const discount = totalOriginalPrice - totalDiscountedPrice;
    const deliveryCharges = totalDiscountedPrice > 2000 ? 0 : 499;
    const totalAmount = totalDiscountedPrice + deliveryCharges;

    return {
      totalOriginalPrice,
      discount,
      deliveryCharges,
      totalAmount,
      totalItems,
    };
  };

  const increaseProduct = (productId) => {
    fetch("https://clothing-app-backend-peach.vercel.app/api/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, action: "increment" }),
    })
      .then(() => {
        toast.success("Item quantity increased.");
        reFetchCart();
      })
      .catch((err) => console.error("Error increasing quantity:", err));
  };

  const decreaseProduct = (productId) => {
    fetch("https://clothing-app-backend-peach.vercel.app/api/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, action: "decrement" }),
    })
      .then(() => {
        toast.success("Item quantity increased.");
        reFetchCart();
      })
      .catch((err) => console.error("Error decreasing quantity:", err));
  };

  const addressHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addressHandleSubmit = (e) => {
    e.preventDefault();

    fetch("https://clothing-app-backend-peach.vercel.app/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Address added successfully!");
        reFetchAddress();
        setFormData({
          receiverName: "",
          phoneNumber: "",
          houseNumber: "",
          apartment: "",
          city: "",
          postal: "",
          state: "",
          country: "",
        });
      })
      .catch((err) => {
        console.error("Error adding address:", err);
      });
  };

  const deleteAddress = (itemId) => {
    fetch(
      `https://clothing-app-backend-peach.vercel.app/api/address/${itemId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => reFetchAddress())
      .catch((err) => console.error("Error in address API:", err));
  };

  const updateAddress = (addressId, updatedData) => {
    fetch(
      `https://clothing-app-backend-peach.vercel.app/api/address/${addressId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Address updated successfully!");
        reFetchAddress();
        setFormData({
          receiverName: "",
          phoneNumber: "",
          houseNumber: "",
          apartment: "",
          city: "",
          postal: "",
          state: "",
          country: "",
        });
      })
      .catch((err) => {
        console.error("Error updating address:", err);
      });
  };

  const placeOrder = (addressId, navigate) => {
    const orderPayload = {
      user: "668ebf2fcdcccf48c44f9f34",
      address: addressId,
      items: cartData?.data?.cart?.products.map(({ product, quantity }) => ({
        product: product._id,
        quantity,
      })),
      totalAmount: calculateTotals().totalAmount,
    };

    fetch("https://clothing-app-backend-peach.vercel.app/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok }) => {
        if (!ok) {
          toast.error("Failed to place order.");
          return;
        }
        toast.success("Order placed successfully!");
        reFetchOrders();
        reFetchCart();
        setTimeout(() => {
          navigate("/userProfile");
        }, 1000);
      })
      .catch((error) => {
        console.error("Network error placing order:", error);
        toast.error("Failed to place order due to network error.");
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <ProductContext.Provider
      value={{
        categoryData,
        categoryLoading,
        categoryError,
        productData,
        productLoading,
        productError,
        filteredProducts,
        setSelectedCategory,
        selectedCategory,
        addToWishlist,
        wishlistData,
        deleteFromWishlist,
        addToCart,
        cartData,
        deleteFromCart,
        moveToCart,
        moveToWishlist,
        decreaseProduct,
        increaseProduct,
        addressData,
        addressHandleChange,
        addressHandleSubmit,
        updateAddress,
        setFormData,
        formData,
        deleteAddress,
        orderData,
        calculateTotals,
        placeOrder,
        clearCart,
        searchQuery,
        handleSearchChange,
        selectedPrice,
        setSelectedPrice,
        setSortOrder,
        setSelectedRating,
        selectedCategoryFromFilter,
        setSelectedCategoryFromFilter,
        clearFilters,
        setPriceTouched,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
