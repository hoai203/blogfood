const WrapListSearch = ({ children, title }) => {
    return (
        <div className='border w-full border-primary border-opacity-60 mt-5 rounded-xl bg-primary bg-opacity-5 p-3'>
            <h1 className='font-bold text-base  text-primary'>{title}</h1>
            {children}
        </div>
    )
}
export default WrapListSearch