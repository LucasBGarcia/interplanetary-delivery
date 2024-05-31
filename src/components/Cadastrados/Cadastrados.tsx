import { FormProps } from "pages/Home/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import marte from "../../utils/images/marte.svg";
import terra from "../../utils/images/terra.svg";

export function Cadastrados({ atualizarListagem }: any) {
    const [enderecos, setEnderecos] = useState<FormProps[]>([])
    useEffect(() => {
        const response = localStorage.getItem('cadastros')
        if (response) {
            setEnderecos(JSON.parse(response))
        }
    }, [])
    useEffect(() => {
        const response = localStorage.getItem('cadastros')
        if (response) {
            setEnderecos(JSON.parse(response))
        }
    }, [atualizarListagem])


    return (
        <div className="flex flex-1 p-4 items-center justify-center  border-gray-950 ">
            {enderecos.length > 0 ?
                <>
                    <div className=" max-h-96 overflow-y-auto w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-centermb-4">
                            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">Endereços cadastrados</h5>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {enderecos.map((item, index) => (
                                    <li key={index} className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            {item.lote ?
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={marte} alt="Imagem do planeta Terra" />
                                                </div>
                                                :
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={terra} alt="Imagem do planeta Terra" />
                                                </div>
                                            }

                                            <div className="flex-1 min-w-0 ms-4">
                                                {item.lote ?
                                                    <>
                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {item.lote}
                                                        </p>
                                                        <Link to={`./Edit/${item.id}`} className="mt-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            Editar
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" className="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </Link>
                                                    </>
                                                    :
                                                    <>
                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {item.logradouro}, {item.numero}
                                                            {item.complemento && `, ${item.complemento}`}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {item.cidade} - {item.estado}, {item.cep}, {item.pais}
                                                        </p>
                                                        <Link to={`./Edit/${item.id}`} className="mt-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            Editar
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" className="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </Link>
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </>
                :
                <>
                    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">Nenhum endereço cadastrado</h5>
                        </div>

                    </div>
                </>
            }
        </div>
    );
}
