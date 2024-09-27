import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Bg from '../../images/bg.png';

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen w-full relative overflow-hidden">
            <div className="w-full p-12">
                <Link href="/">
                    <ApplicationLogo className="h-20 fill-current" />
                </Link>

                <div className="h-full flex items-center">
                    {children}
                </div>
            </div>

            <div className="bg-orange-500 fixed rounded-full w-[30rem] h-[30rem] xl:w-[40rem] w- xl:h-[40rem] -top-1/3 -right-40 xl:-right-28  hidden lg:block"></div>
            <img src={Bg} alt="" className="fixed -right-1/4 -bottom-32 xl:-bottom-1/3 rounded-full w-[50rem] xl:w-[70rem] hidden lg:block"/>
        </div>
    );
}
