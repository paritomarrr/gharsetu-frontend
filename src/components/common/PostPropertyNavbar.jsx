import MainIcon from '../../assets/icons/MainIcon'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const PostPropertyNavbar = () => {
    const location = useLocation()

    return (
        <>
            <div className='md:px-20 px-5 py-4 border-b-[1px] flex justify-between items-center shadow-sm'>
                <Link to={'/'} className='flex items-center gap-2'>
                    <MainIcon />
                    <div className='font-MavenPro font-bold text-[30px]'> GharSetu </div>
                </Link>

                <div>
                    <Link to={'/'} className='py-3 px-6 text-sm border-[1px] border-[#D8DCE0] rounded-full'>
                        Exit
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PostPropertyNavbar