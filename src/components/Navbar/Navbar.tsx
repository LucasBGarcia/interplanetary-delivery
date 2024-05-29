import { Button } from "components/Button";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="w-full h-12 bg-slate-800">
            <div className="w-full h-full max-w-7xl m-auto flex items-center justify-between">
                <p className="text-2xl text-white">
                    Interplanetary<span className="font-bold">Delivery</span>
                </p>
               <Link to="https://github.com/LucasBGarcia/interplanetary-delivery">
                <Button>Ver github</Button>
               </Link>
            </div>
        </nav>
    )
}