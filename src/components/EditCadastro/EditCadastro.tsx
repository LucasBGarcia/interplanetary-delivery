import { FormProps, useEditCadastro } from "pages";
import { useState } from "react";

export function EditCadastro({ dados }: { dados: FormProps | undefined }) {
    const {
        ErroViaCep,
        ErroCoordenadas,
        errors,
        onSubmit,
        onDelete,
        register,
        handleSubmit,
        LoadingCoordendas
    } = useEditCadastro(dados);

    return (
        <div className=" flex flex-col flex-1 p-4  border-gray-950 gap-3">
            <div>
                <p className="text-2xl font-bold">Edição de endereço</p>
            </div>

            <div>
                {!dados?.lote ?
                    <div className="gap-4 grid grid-cols-2 ">
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
                                Editando...
                            </button>
                        ) : (
                            <>
                                <button
                                    className="py-2 px-4 rounded-md bg-blue-500 hover:bg-primary font-bold text-white col-span-1"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 font-bold text-white col-span-1"
                                    onClick={onDelete}
                                >
                                    Deletar
                                </button>
                            </>
                        )}
                    </div>
                    :
                    <div className="gap-4 grid grid-cols-2">
                        <div className="form-group col-span-2">
                            <div className="flex flex-col">
                                <label>Número do Lote</label>
                                <input
                                    type="text"
                                    className="border-black border-2 rounded-md w-full pl-2"
                                    {...register('lote', { required: true, maxLength: 4, minLength: 4 })}
                                />
                                {errors?.lote?.type === 'required' && <p className="text-red-700">Campo obrigatório</p>}
                                {errors?.lote?.type === 'minLength' && <p className="text-red-700">Mínimo 4 digitos</p>}
                                {errors?.lote?.type === 'maxLength' && <p className="text-red-700">Máximo 4 digitos</p>}
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
                                Editando...
                            </button>
                        ) : (
                            <>
                            <button
                                className="py-2 px-4 rounded-md bg-blue-500 hover:bg-primary font-bold text-white col-span-1"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Editar
                            </button>
                            <button
                                className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 font-bold text-white col-span-1"
                                onClick={onDelete}
                            >
                                Deletar
                            </button>
                        </>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}
