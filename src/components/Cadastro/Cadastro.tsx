import { useCadastro } from "pages/Home/useCadastro";
import { useState } from "react";
import { useForm } from "react-hook-form"

type CadastroSuccessCallback = () => void;

interface Props {
    onCadastroSuccess: CadastroSuccessCallback; // Propriedade onCadastroSuccess do tipo CadastroSuccessCallback
}

export function FormCadastro({onCadastroSuccess}:Props) {
    const [Terra, setTerra] = useState<boolean>(true)

    // const { ErroViaCep, ErroCoordenadas, errors, onSubmit, register, handleSubmit, LoadingCoordendas } = useCadastro()
    // const { errors, onSubmit, register, handleSubmit } = useMarte()

    const {
        ErroViaCep,
        ErroCoordenadas,
        errors,
        onSubmit,
        register,
        handleSubmit,
        LoadingCoordendas
    } = useCadastro({onCadastroSuccess});


    return (
        <div className=" flex flex-col flex-1 p-4   border-gray-950 gap-3">
            <div>
                <p className="text-2xl font-bold">Cadastro de endereços</p>
            </div>
            <div className="flex mt-4 space-x-4">
                <label className="flex items-center">
                    <input type="radio" name="endereco" className="form-radio h-5 w-5 text-gray-600" checked={Terra} onChange={() => setTerra(true)} />
                    <span className="ml-2  text-gray-700">Terra</span>
                </label>
                <label className="flex items-center ">
                    <input type="radio" name="endereco" className="form-radio h-5 w-5 text-gray-600" onChange={() => setTerra(false)} />
                    <span className="ml-2 text-gray-700">Marte</span>
                </label>
            </div>
            <div>
                {Terra ?
                    <div className="gap-4 grid grid-cols-2">
                        <div className="form-group">
                            <div className="flex flex-col">
                                <label>País</label>
                                <input
                                    type="text"
                                    className="border-black border-2 rounded-md w-full pl-2"
                                    {...register('pais', { required: true })}
                                />
                                {errors?.pais?.type === 'required' && <p className="text-red-700">Campo obrigatório</p>}

                            </div>
                        </div>
                        <div className="form-group">
                            <div className="flex flex-col">
                                <label>CEP</label>
                                <input
                                    type="text"
                                    className="border-black border-2 rounded-md w-auto pl-2"
                                    {...register('cep', { maxLength: 9, required: true })}
                                />
                                {errors?.cep?.type === 'required' && <p className="text-red-700">Campo obrigatório</p>}

                            </div>
                        </div>

                        <div className="form-group">
                            <div className="flex flex-col">
                                <label>Estado</label>
                                <input
                                    type="text"
                                    className="border-black border-2 rounded-md w-full pl-2"
                                    {...register('estado', { required: true })}
                                />
                                {errors?.estado?.type === 'required' && <p className="text-red-700">Campo obrigatório</p>}

                            </div>
                        </div>
                        <div className="form-group">
                            <div className="flex flex-col">
                                <label>Cidade</label>
                                <input
                                    type="text"
                                    className="border-black border-2 rounded-md w-full pl-2"
                                    {...register('cidade', { required: true })}
                                />
                                {errors?.cidade?.type === 'required' && <p className="text-red-700">Campo obrigatório</p>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="flex flex-col">
                                <label>Logradouro</label>
                                <input
                                    type="text"
                                    className="border-black border-2 rounded-md w-full pl-2"
                                    {...register('logradouro', { required: true })}
                                />
                                {errors?.logradouro?.type === 'required' && <p className="text-red-700">Campo obrigatório</p>}

                            </div>
                        </div>
                        <div className="form-group">
                            <div className="flex flex-col">
                                <label>Número</label>
                                <input
                                    type="text"
                                    className="border-black border-2 rounded-md w-full pl-2"
                                    {...register('numero', { required: true })}
                                />
                                {errors?.numero?.type === 'required' && <p className="text-red-700">Campo obrigatório</p>}

                            </div>
                        </div>
                        <div className="form-group col-span-2">
                            <div className="flex flex-col">
                                <label>Complemento</label>
                                <input
                                    type="text"
                                    className="border-black border-2 rounded-md w-full pl-2"
                                    {...register('complemento')}
                                />
                            </div>
                        </div>
                        {ErroViaCep && <p className="text-red-700">{ErroViaCep}</p>}
                        {ErroCoordenadas && <p className="text-red-700">{ErroCoordenadas}</p>}
                        {LoadingCoordendas ? (
                            <button
                                className="py-2 px-4 rounded-md bg-primary font-bold text-white justify-center flex items-center col-span-2"
                                disabled
                            >
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Enviando...
                            </button>
                        ) : (
                            <button
                                className="py-2 px-4 rounded-md bg-primary font-bold text-white col-span-2"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Enviar
                            </button>
                        )}
                    </div>
                    :
                    <div className="gap-4 grid grid-cols-2">
                        <div className="form-group">
                            <div className="flex flex-col">
                                <label>Número do Lote</label>
                                <input
                                    type="text"
                                    className="border-black border-2 rounded-md w-full pl-2"
                                    {...register('lote', { required: true, maxLength: 4, minLength: 4 })}
                                />
                                {errors?.lote?.type === 'required' && <p className="text-red-700">Campo obrigatório</p>}

                            </div>
                        </div>
                        {LoadingCoordendas ? (
                            <button
                                className="py-2 px-4 rounded-md bg-primary font-bold text-white justify-center flex items-center col-span-2"
                                disabled
                            >
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Enviando...
                            </button>
                        ) : (
                            <button
                                className="py-2 px-4 rounded-md bg-primary font-bold text-white col-span-2"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Enviar
                            </button>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}
