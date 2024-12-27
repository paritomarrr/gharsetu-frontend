import { Dot, Facebook, Globe, Instagram, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="bg-[#F9FAFB] pt-[56px] md:px-[71px] px-5 py-5 md:pb-[21px]">
            <div className="flex gap-5 w-full justify-between border-b-[1px] pb-[42px]">
                <div className="w-1/3 flex flex-col gap-[14px]">
                    <div className="text-sm font-semibold"> Support </div>
                    <div className="flex flex-col gap-[14px]">
                        <Link to="/" className="text-xs text-[#4B5563]"> Help Center </Link>
                        {/* <Link to="/" className="text-xs text-[#4B5563]"> Safety information </Link> */}
                        {/* <Link to="/" className="text-xs text-[#4B5563]"> Cancellation options </Link> */}
                        {/* <Link to="/" className="text-xs text-[#4B5563]"> Our COVID-19 Response</Link> */}
                        {/* <Link to="/" className="text-xs text-[#4B5563]"> Supporting people with disabilities </Link> */}
                        {/* <Link to="/" className="text-xs text-[#4B5563]"> Report a neighborhoood concern </Link> */}

                    </div>
                </div>
                {/* <div className="w-full flex flex-col gap-[14px]">
                    <div className="text-sm font-semibold"> Community </div>
                    <div className="flex flex-col gap-[14px]">
                        <Link to="/" className="text-xs text-[#4B5563]"> Airbnb.org: disaster relief housing </Link>
                        <Link to="/" className="text-xs text-[#4B5563]"> Support: Afghan refugees </Link>
                        <Link to="/" className="text-xs text-[#4B5563]"> Support: Afghan refugees </Link>
                        <Link to="/" className="text-xs text-[#4B5563]"> Combating discriminatinon </Link>

                    </div>
                </div> */}
                {/* <div className="w-full flex flex-col gap-[14px]">
                    <div className="text-sm font-semibold"> Hosting </div>
                    <div className="flex flex-col gap-[14px]">
                        <Link to="/" className="text-xs text-[#4B5563]"> Try hosting </Link>
                        <Link to="/" className="text-xs text-[#4B5563]"> AirCover: protection for Hosts </Link>
                        <Link to="/" className="text-xs text-[#4B5563]"> Explore hosting resources </Link>
                        <Link to="/" className="text-xs text-[#4B5563]"> Visit our community forum</Link>
                        <Link to="/" className="text-xs text-[#4B5563]"> How to host responsibly </Link>
                    </div>
                </div> */}
                <div className="w-full flex flex-col gap-[14px]">
                    <div className="text-sm font-semibold"> About </div>
                    <div className="flex flex-col gap-[14px]">
                        <Link to="/about-us" className="text-xs text-[#4B5563]"> About</Link>
                        <Link to="/contact-us" className="text-xs text-[#4B5563]"> Contact Us </Link>
                        <Link to="/articles" className="text-xs text-[#4B5563]"> Articles </Link>
                        {/* <Link to="/" className="text-xs text-[#4B5563]"> Careers</Link> */}
                        {/* <Link to="/" className="text-xs text-[#4B5563]"> Investors </Link> */}
                        {/* <Link to="/" className="text-xs text-[#4B5563]"> gharsetu Luxe </Link> */}

                    </div>
                </div>
            </div>

            <div className="pt-[21px] flex justify-between flex-col md:flex-row gap-5">
                <div className="flex items-center text-xs">
                    <Link to={'/'}> © 2024 Gharsetu, Inc </Link>
                    <Dot />
                    <Link to={'/privacy-policy'} target="_blank">Privacy</Link>
                    <Dot />
                    <Link to={'terms-of-use'} target="_blank">Terms</Link>
                    <Dot />
                    <Link to={'/'}>Sitemap</Link>
                </div>

                <div className="text-xs flex gap-8">
                    <div className="flex gap-1">
                        <Globe size={16}/>
                        <div>English (US)</div>
                    </div>
                    <div className="flex gap-[14px]">
                        <Link to="https://www.facebook.com/profile.php?id=61563651175703" target="_blank"><Facebook size={16}/></Link>
                        <Link to="https://x.com/gharsetu" target="_blank"><Twitter size={16}/></Link>
                        <Link to="https://www.instagram.com/gharsetu/" target="_blank"><Instagram size={16}/></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer