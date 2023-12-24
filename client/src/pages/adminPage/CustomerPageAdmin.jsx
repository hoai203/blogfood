import React, { useEffect } from "react";
import LoadingRequest from "../../layout/loading/LoadingRequest";
import { useDispatch, useSelector } from "react-redux";
import { getCustomersAdminRequest } from "../../sagas/admin/adminSlice";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { icon } from "../../ADMIN/routes";
import CustomerItemAdmin from "../../layout/adminLayout/customers/CustomerItemAdmin";
import CustomerDetailAdmin from "../../layout/adminLayout/customers/CustomerDetailAdmin";
import CustomerEditAdmin from "../../layout/adminLayout/customers/CustomerEditAdmin";
import useScrollToCenter from "../../hooks/useScrollToCenter";
import useLoadingImage from "../../hooks/useLoadingImage";
import useSetTitle from "../../hooks/useSetTitle";

const CustomersPageAdmin = () => {
  const { loading, customers } = useSelector((state) => state.admin);
  useScrollToCenter('id_customer')
  const dispatch = useDispatch();
  const handLoad = () => {
    dispatch(getCustomersAdminRequest());
  };
  useEffect(() => {
    handLoad()
  }, []);
  useLoadingImage(customers)
  useSetTitle('Quản lý người dùng')
  return (
    <div>
      <LoadingRequest show={loading}></LoadingRequest>
      <div className="relative flex flex-col gap-12 mt-12 mb-8">
        <Card>
          <CardHeader
            variant="gradient"
            className="z-10 flex items-center justify-between p-6 mb-8 bg-primary"
          >
            <Typography variant="h6" color="white">
              Danh sách người dùng
            </Typography>
            <span onClick={handLoad} className="text-white cursor-pointer">
              <ArrowPathIcon {...icon} />
            </span>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2 mt-0 overflow-x-scroll">
            <table className="w-full min-w-[840px] table-auto">
              <thead>
                <tr>
                  {[
                    "Người dùng",
                    "Thông tin",
                    "tình trạng",
                    "Ngày kích hoạt",
                    "trạng thái",
                    "",
                  ].map((el, index) => (
                    <th
                      key={index}
                      className="px-5 py-3 text-left bg-white border-b border-blue-gray-50 last:sticky last:right-0 last:shadow-inner last:md:shadow-none "
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers?.length > 0 &&
                  customers?.map((data) => (
                    <CustomerItemAdmin key={data?._id} data={data} />
                  ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      <CustomerDetailAdmin></CustomerDetailAdmin>
      <CustomerEditAdmin></CustomerEditAdmin>
    </div>
  );
};

export default CustomersPageAdmin;
