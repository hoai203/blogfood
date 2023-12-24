import { useEffect, useState } from "react";
import { getDetailCustomer } from "../sagas/customers/request";

export default function useGetDetailCustomer(token, id) {
    const [dataCustomer, setDataCustomer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataDetailCustomer = async () => {
        setIsLoading(true)
        try {
            if (id) {
                const response = await getDetailCustomer(token, id);
                if (!response) return setDataCustomer([])
                setDataCustomer(response.data)
            } else {
                return setDataCustomer([])
            }
        } catch (error) {
            console.log('err', error);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataDetailCustomer()
    }, [id]);
    return { dataCustomer, handleGetDataDetailCustomer, isLoading }
}