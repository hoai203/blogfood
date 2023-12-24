import { Line, Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS } from 'chart.js/auto';
import { commentsRequest } from '../../../sagas/comments/commentsSlice';
import { getPostsAdminRequest } from '../../../sagas/admin/adminSlice';
const TopCustomerInteract = () => {
    const { posts } = useSelector((state) => state.admin);
    const { comments } = useSelector((state) => state.comments);
    const dispatch = useDispatch();
    const [sortedPosts, setSortedPosts] = useState([]);
    useEffect(() => {
        dispatch(commentsRequest());
        dispatch(getPostsAdminRequest());
    }, [dispatch]);
    const listPostComment = []
    posts?.map((post) => {
        const totalComment = comments?.filter((comment) => comment?.id_post === post._id)?.length;
        listPostComment.push({ ...post, totalComment })
    })
    const dataSort = listPostComment.sort((a, b) => b.totalComment - a.totalComment)
    const labels = dataSort.slice(0, 5).map(item => item.title)
    const values = dataSort.slice(0, 5).map(item => item.totalComment)
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Số lượng bình luận',
                data: values,
                backgroundColor: 'rgba(245,96,45, 0.6)',
                borderColor: 'rgba(245,96,45,1)',
                borderWidth: 1,
            },
        ],
    };
    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: Math.max(...values) + 1,
            },
        },
    };
    return (
        <div>
            <h2>Top bài viết nhiều tương tác</h2>
            <div className='w-full'>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default TopCustomerInteract;