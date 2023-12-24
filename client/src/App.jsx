import { RouterProvider } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { router } from "./routes";
import { setSocket } from "./sagas/global/globalSlice";
import socketIOClient from "socket.io-client";
import BASE_URL from "./connect";
import { customersRequest } from "./sagas/customers/customersSlice";
import { ThemeProvider } from "@material-tailwind/react";
import LoadingPage from "./layout/loading/LoadingPage";
function App() {
  const { token, infoAuth } = useSelector((state) => state.auth);
  const { errorGlobal, notifyGlobal, socket } = useSelector(
    (state) => state.global
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (errorGlobal) toast.error(errorGlobal);
  }, [errorGlobal]);
  useEffect(() => {
    if (notifyGlobal) toast.success(notifyGlobal);
  }, [notifyGlobal]);
  useEffect(() => {
    if (token && infoAuth) {
      dispatch(setSocket(socketIOClient(BASE_URL)));
    } else {
      dispatch(setSocket(null));
    }
  }, [token, infoAuth]);
  useEffect(() => {
    if (infoAuth && socket) {
      socket.emit("addUser", infoAuth?._id, "customer");
    }
  }, [socket, infoAuth]);
  useEffect(() => {
    dispatch(customersRequest());
  }, []);
  return (
    <ThemeProvider>
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
