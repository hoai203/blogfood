import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux'
import { customerDetailAdminSuccess, detailCategoriesAdminSuccess, postDetailAdminSuccess } from '../../sagas/admin/adminSlice';
import { toggleDetaiPost } from '../../sagas/global/globalSlice';
const PostItemAdmin = ({ post }) => {
    const { admin, customers, categories } = useSelector((state) => state.admin);
    const dataCustomer = customers.filter(
        (cus) => cus._id === post?.id_customer
    )[0];
    const dataAdmin = admin.filter((ad) => ad._id === post?.id_customer)[0];
    const dataAuthor = dataCustomer || dataAdmin;
    const dispatch = useDispatch()
    const dataCategory = categories.filter(
        (cate) => cate._id === post?.category
    )[0];
    const handleShowDetailPost = (data) => {
        dispatch(customerDetailAdminSuccess({ ...dataAuthor }));
        dispatch(detailCategoriesAdminSuccess({ ...dataCategory }));
        dispatch(postDetailAdminSuccess(data));
        dispatch(toggleDetaiPost());
    }
    return (
        <Card key={post?._id} color="transparent" shadow={false}>
            <CardHeader
                floated={false}
                color="gray"
                className="mx-0 mt-0 mb-4 h-64 xl:h-40"
            >
                <img
                    src={post?.image}
                    alt={post?.title}
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody className="py-0 px-1">
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mt-1 mb-2 line-clamp-2 text-base md:text-lg"
                >
                    {post?.title}
                </Typography>
            </CardBody>
            <CardFooter className="mt-auto flex items-center justify-between py-0 px-1">
                <div className="mt-1">
                    <Button onClick={() => { handleShowDetailPost(post) }} variant="outlined" size="sm">
                        Xem bài viết
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PostItemAdmin;