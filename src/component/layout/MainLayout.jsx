import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../../redux/action/settingAction";
import { useEffect } from "react";
import { getCartList } from "../../redux/action/cartAction";
import { getWishlistList } from "../../redux/action/wishlistAction";
import MainProvider from "../../context/MainProvider";
import { userDetail } from "../../redux/action/authAction";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserLogin } = useSelector((state) => state.auth);

 useEffect(() => {
  dispatch(getSetting({ navigate }))
    .unwrap()
    .then(() => {
      dispatch(getCartList({ navigate }));
      dispatch(getWishlistList({ navigate }));
    })
    .catch((err) => {
      console.error("Setting fetch failed:", err);
    });
}, [dispatch]);

  if (!localStorage.getItem("BLOSSOMBAKES_LOCAL_ID")) {
    localStorage.setItem("BLOSSOMBAKES_LOCAL_ID", crypto.randomUUID());
  }


  

  useEffect(() => {
    if(isUserLogin){
      dispatch(userDetail({navigate}))
    }
  },[isUserLogin])

  return (
    <>
     <MainProvider>
      <div className="admin-main-layout">
        <div className="dashbord-page-content">
          <Header />
          <div className="all-router-data">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      </MainProvider>
    </>
  );
};

export default MainLayout;
