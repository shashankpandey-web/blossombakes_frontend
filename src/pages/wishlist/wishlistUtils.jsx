import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/action/wishlistAction";


export const useWishlistUtils = () => {
  const dispatch = useDispatch();
   
  const { wishlist_list, loading } = useSelector((state) => state.wishlist);

  const handleRemoveItem = (slug) => {
    dispatch(removeFromWishlist({ slug, navigate: null }));
  };

  return {
    wishlist_list,
    loading,
    handleRemoveItem,
  };
};