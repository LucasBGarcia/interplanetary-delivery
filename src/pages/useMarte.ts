import axios from "axios"
import { AddressProps, MarteProps, TerraProps } from "pages/types"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { maskCepNumber } from "utils/mask/mask"

export const useMarte = () => {

    const [MarteSalvando, setMarteSalvando] = useState<boolean>(false)

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm(({
        defaultValues: {
            lote: ''
        }
    }))


    const onSubmit = async (data: TerraProps) => {
        console.log(data)
        setMarteSalvando(true)
        const cadastros = localStorage.getItem('cadastros');
        let cadastrosParse: TerraProps[] = cadastros ? JSON.parse(cadastros) : [];
        let id = 0
        if (cadastros) {
            id = cadastrosParse.length
            cadastrosParse.map((cadastro: TerraProps) => {
                if (cadastro.id === id) id += 1
            })
            data.id = id
            cadastrosParse.push(data)
            localStorage.setItem('cadastros', JSON.stringify(cadastrosParse))
            setMarteSalvando(false)

        } else {
            id = 1
            data.id = id
            cadastrosParse.push(data)
            localStorage.setItem('cadastros', JSON.stringify(cadastrosParse))
            setMarteSalvando(false)
        }
    }

    return {
        errors,
        register,
        onSubmit,
        handleSubmit,
        MarteSalvando
    }

}