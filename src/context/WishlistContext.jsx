import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => String(item.id) === String(product.id)
      );

      if (exists) {
        return prev.filter(
          (item) => String(item.id) !== String(product.id)
        );
      }

      return [...prev, product];
    });
  };

  const isWishlisted = (id) => {
    return wishlist.some(
      (item) => String(item.id) === String(id)
    );
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}