import Skeleton from "react-loading-skeleton"

const PostItemSketeton = () => {

    return (
        <div className={`overflow-hidden border shadow-soft rounded-xl grid grid-rows-2 relative h-full`}>
            <div
                className=' w-full group-first:h-[200px] h-[160px] md:h-[200px] flex-1 overflow-hidden'>
                <Skeleton className='w-full h-full !block' />
            </div>
            <div className="post_item-content flex-1 h-full">
                <div className=" flex flex-col w-full flex-1 h-full ">
                    <div className='m-2 lg:m-5 flex-1 flex flex-col h-full'>
                        <div className='h-full'>
                            <div className="h-5 md:h-7 w-full ">
                                <Skeleton className='w-full h-full ' count={2} />
                            </div>
                        </div>
                        <div className='flex items-center gap-x-2 lg:gap-x-4 mt-auto group-first:justify'>
                            <div className=" w-10 h-10">
                                <Skeleton className='w-full h-full !rounded-full' />
                            </div>
                            <div className="w-full h-5 md:h-7 flex-1">
                                <Skeleton className='w-full h-full' />
                            </div>
                        </div>
                    </div>
                    <div className=" w-2/3  group-first:w-1/2 h-5 md:h-7 mb-2 ml-auto mr-2 md:mr-5 md:mb-5">
                        <Skeleton className='w-full h-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostItemSketeton

{/* <div className='flex text-[12px] lg:text-base items-center text-yellow-600 gap-1 mb-1'>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                        </div> */}