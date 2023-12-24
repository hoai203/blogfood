import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    NewspaperIcon,
    Square3Stack3DIcon,
    UserIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import StatisticsCard from '../../layout/adminLayout/chart/statistics-card';
import StatisticsChart from '../../layout/adminLayout/chart/statistics-chart';
import TopCustomerInteract from '../../layout/adminLayout/chart/TopCustomerInteract';
import { statisticalCategoriesRequest, statisticalCustomersRequest, statisticalFeedbacksRequest, statisticalPostsRequest } from '../../sagas/admin/adminSlice';
import useSetTitle from '../../hooks/useSetTitle';
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
const HomeAdmin = () => {
    const { statistical_customers, statistical_feedbacks, statistical_posts,
        statistical_categories, posts, categories, customers } =
        useSelector((state) => state.admin);
    const { feedback } = useSelector((state) => state.feedback)
    const statisticalByDayCustomer = statistical_customers?.statisticalByMonth
    const statisticalByDayFeedback = statistical_feedbacks?.statisticalByMonth
    const statisticalByDayPost = statistical_posts?.statisticalByMonth
    const statisticalByDayCategory = statistical_categories?.statisticalByMonth
    const totalPosts = posts?.length || 0
    const totalPostApproved = posts?.filter((post) => post?.status === 'approved').length
    const totalPostPending = posts?.filter((post) => post?.status === 'pending').length
    const totalPostDestroy = posts?.filter((post) => post?.status === 'destroy').length
    const totalCategories = categories?.length || 0
    const totalCategoriesApproved = categories?.filter((category) => category?.status === 'approved').length
    const totalCategoriesPending = categories?.filter((category) => category?.status === 'pending').length
    const totalCategoriesDestroy = categories?.filter((category) => category?.status === 'destroy').length
    const totalFeedbacks = feedback?.length || 0
    const totalFeedbacksApproved = feedback?.filter((fb) => fb?.status === 'approved').length
    const totalFeedbacksPending = feedback?.filter((fb) => fb?.status === 'pending').length
    const totalFeedbacksDestroy = feedback?.filter((fb) => fb?.status === 'destroy').length
    const totalCustomers = customers?.length || 0
    const totalCustomersApproved = customers?.filter((cus) => cus?.status === 'approved').length
    const totalCustomersPending = customers?.filter((cus) => cus?.status === 'pending').length
    const totalCustomersDestroy = customers?.filter((cus) => cus?.status === 'destroy').length
    let dayByCustomer = []
    let dataByCustomer = []
    let dayByFeedback = []
    let dataByFeedback = []
    let dayByPost = []
    let dataByPost = []
    let dayByCategory = []
    let dataByCategory = []
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
    pushData(statisticalByDayCustomer, dayByCustomer, dataByCustomer)
    pushData(statisticalByDayFeedback, dayByFeedback, dataByFeedback)
    pushData(statisticalByDayPost, dayByPost, dataByPost)
    pushData(statisticalByDayCategory, dayByCategory, dataByCategory)
    function pushData(statiscal, day, data) {
        statiscal?.map((item) => {
            day.push(item?._id?.slice(5))
        })
        statiscal?.map((item) => {
            data.push(item?.count)
        })
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(statisticalCustomersRequest({ model: 'customer' }))
        dispatch(statisticalFeedbacksRequest({ model: 'feedback' }))
        dispatch(statisticalPostsRequest({ model: 'post' }))
        dispatch(statisticalCategoriesRequest({ model: 'category' }))
    }, []);
    const feedbackChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Phản hồi",
                data: dataByFeedback,
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["#fff"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: months,
            },
        },
    };
    const customerChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Người dùng",
                data: dataByCustomer,
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["#fff"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: months,
            },
        },
    };
    const postChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Bài viết",
                data: dataByPost,
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["#fff"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: months,
            },
        },
    };
    const categoryChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Danh mục",
                data: dataByCategory,
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["#fff"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: months,
            },
        },
    };
    const statisticsChartsData = [
        {
            color: "blue",
            title: "Thống kê bài viết",
            chart: postChart,
        },
        {
            color: "pink",
            title: "Thống kê người dùng",
            chart: customerChart,
        },
        {
            color: "green",
            title: "Thống kê danh mục",
            chart: categoryChart,
        },
        {
            color: "orange",
            title: "Thống kê phản hồi",
            chart: feedbackChart,
        },
    ];
    const statisticsCardsData = [
        {
            link: '/admin/posts',
            color: "blue",
            icon: NewspaperIcon,
            title: "Bài viết",
            value: totalPosts,
            footer: {
                approved: totalPostApproved,
                pending: totalPostPending,
                destroy: totalPostDestroy,
            },
        },
        {
            link: '/admin/customers',
            color: "pink",
            icon: UserIcon,
            title: "Người dùng",
            value: totalCustomers,
            footer: {
                approved: totalCustomersApproved,
                pending: totalCustomersPending,
                destroy: totalCustomersDestroy,
            },
        },
        {
            link: '/admin/categories',
            color: "green",
            icon: Square3Stack3DIcon,
            title: "Danh mục",
            value: totalCategories,
            footer: {
                approved: totalCategoriesApproved,
                pending: totalCategoriesPending,
                destroy: totalCategoriesDestroy,
            },
        },
        {
            link: '/admin/feedback',
            color: "orange",
            icon: ChatBubbleLeftRightIcon,
            title: "Phản hồi",
            value: totalFeedbacks,
            footer: {
                approved: totalFeedbacksApproved,
                pending: totalFeedbacksPending,
                destroy: totalFeedbacksDestroy,
            },
        },
    ];
    useSetTitle('Thống kê')
    return (
        <div className="mt-12">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {statisticsCardsData.map(({ icon, title, footer, link, ...rest }) => (
                    <Link key={title} to={link}>
                        <StatisticsCard

                            {...rest}
                            title={title}
                            icon={React.createElement(icon, {
                                className: "w-6 h-6 text-white",
                            })}
                            footer={
                                <Typography className="font-normal text-xs  text-blue-gray-600">
                                    <div className='flex items-center justify-between'>
                                        <div className='flex flex-col gap-y-2'>
                                            <div>Đã duyệt</div>
                                            <div>Chờ duyệt</div>
                                            <div>Vô hiệu hóa</div>
                                        </div>
                                        <div className='flex flex-col gap-y-2'>
                                            <div>{footer?.approved || 0}</div>
                                            <div>{footer?.pending || 0}</div>
                                            <div>{footer?.destroy || 0}</div>
                                        </div>
                                    </div>
                                </Typography>
                            }
                        />
                    </Link>
                ))}
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 ">
                {statisticsChartsData.map((props) => (
                    <StatisticsChart
                        key={props.title}
                        {...props}
                    />
                ))}
            </div>
            <TopCustomerInteract></TopCustomerInteract>
        </div>
    );
}

export default HomeAdmin;

const chartsConfig = {
    chart: {
        toolbar: {
            show: false,
        },
    },
    title: {
        show: "",
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        axisTicks: {
            show: true,
        },
        axisBorder: {
            show: true,
        },
        labels: {
            style: {
                colors: "#fff",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 300,
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
            },
        },
    },
    grid: {
        show: true,
        borderColor: "#ffffff40",
        strokeDashArray: 5,
        xaxis: {
            lines: {
                show: true,
            },
        },
        padding: {
            top: 5,
            right: 20,
        },
    },
    fill: {
        opacity: 0.8,
    },
    tooltip: {
        theme: "dark",
    },
};
