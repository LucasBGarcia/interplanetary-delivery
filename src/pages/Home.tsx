import { FormCadastro, Navbar } from "components";
import { useCadastro } from "pages/useCadastro";
import { useState } from "react";
import planeta_terra from "../utils/images/planeta_terra.jpg";
import { Cadastrados } from "components/Cadastrados";

export function HomePage() {

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
                   <FormCadastro/>
                   <Cadastrados />
                </div>
            </div>
        </div>
    )
}