import { useEffect, useState } from "react";
import planeta_terra from "../../utils/images/planeta_terra.jpg"
export function Cadastrados() {

    const [enderecos, setEnderecos] = useState<object[]>([])
    useEffect(() => {
        const response = localStorage.getItem('cadastros')
        if (response) {
            setEnderecos(JSON.parse(response))
        }
    }, [])


    return (
        <div className="flex flex-1 p-4items-center justify-center rounded-md border-gray-950">
            {enderecos ?
                <>
                    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-centermb-4">
                            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">Endereços cadastrados</h5>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={planeta_terra} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Neil Sims
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                email@windster.com
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $320
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
                :
                <p>Nenhum Endereço cadastrado</p>
            }
        </div>
    );
}
