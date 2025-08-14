import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSetIsLogout } from "../../../redux/slice/authSlice";
const UseProfileUtils = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(userSetIsLogout());
    navigate("/");
  };

  return { handleClick };
};

export default UseProfileUtils;
