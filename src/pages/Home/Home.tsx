import { FormCadastro, Navbar } from "components";
import { Cadastrados } from "components/Cadastrados";
import planeta_terra from "../../utils/images/planeta_terra.jpg";
import { useState } from "react";

export function HomePage() {
    const [atualizarListagem, setAtualizarListagem] = useState<boolean>(false);
    const handleAtualizarListagem = () => {
        setAtualizarListagem(prevState => !prevState);
    }

    return (
        <div className="h-screen">
            <Navbar />
            <div className="w-full">
                <img
                    src={planeta_terra}
                    alt="Planeta"
                    className="w-full h-16 object-cover"
                />
            </div>
            <div className="container mx-auto  p-4">
                <div className="flex flex-col md:flex-row gap-3">
                <FormCadastro onCadastroSuccess={handleAtualizarListagem} /> 
                   <Cadastrados atualizarListagem={atualizarListagem} />
                </div>
            </div>
        </div>
    )
}