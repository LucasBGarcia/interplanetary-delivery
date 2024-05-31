import { Button } from "components/Button";
import { Link } from "react-router-dom";
import logo from "../../utils/images/logo.png"

export function Navbar() {
    return (
        <nav className="w-full h-12 bg-slate-800">
            <div className="w-full h-full pl-4 pr-4 max-w-7xl m-auto flex items-center justify-between">
                <div className="flex items-center">

                    <img
                        src={logo}
                        alt="Planeta"
                        className="w-14 h-14 object-cover"
                    />
                    <p className="text-2xl text-white">
                        Interplanetary<span className="font-bold text-logo">Delivery</span>
                    </p>
                </div>
                <Link to="https://github.com/LucasBGarcia/interplanetary-delivery">
                    <Button>Ver github</Button>
                </Link>
            </div>
        </nav>
    )
}