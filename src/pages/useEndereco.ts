import axios from "axios"
import { AddressProps, CooProps } from "pages/types"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { maskCepNumber } from "utils/images/mask/mask"

export const useEndereco = () => {
    const [ErroViaCep, setErroViaCep] = useState<string>('')
    const [ErroCoordenadas, setErroCoordenadas] = useState<string>('')
    const [LoadingCoordendas, setLoadingCoordendas] = useState<boolean>(false)

    const { register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm(({
        defaultValues: {
            cep: '',
            cidade: '',
            estado: '',
            logradouro: '',
            numero: '',
            bairro: '',
            complemento: '',
            pais: ''
        }
    }))

    const setData = useCallback((data: AddressProps) => {
        setValue('cidade', data.localidade)
        setValue('logradouro', data.logradouro)
        setValue('estado', data.uf)
        setValue('bairro', data.bairro)
        setValue('complemento', data.complemento)
    }, [setValue])

    const BuscaEndereco = useCallback(async (cep: string) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            console.log(response)
            setData(response.data)
        } catch (error) {
            console.log(error);
            setErroViaCep('Endereço não encontrado.');
        }
    }, []);

    const cep = watch('cep')
    const pais = watch('pais')

    useEffect(() => {
        setValue('cep', maskCepNumber(cep))
        if (pais == 'Brasil' && cep.length == 9) {
            BuscaEndereco(cep)
        } else {
            return
        }
    }, [BuscaEndereco, cep, setValue, pais])


    const apikey = 'AIzaSyDAJ40ypx302SUKYMrry1NYS6P3jWAo9P8'
    const BuscaCoordenadas = async (data: CooProps) => {
        setLoadingCoordendas(true)
        let EnderecoCompleto = `${data.logradouro}, ${data.numero}- ${data.bairro}, ${data.cidade}- ${data.estado}`;
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${EnderecoCompleto}&key=${apikey}`
            );
            const data = response.data;
            if (data.results.length > 0) {
                const location = data.results[0].geometry?.location;
                if (location) {
                    setLoadingCoordendas(false)
                    return {
                        CoordenadasX: location.lat.toString(),
                        CoordenadasY: location.lng.toString(),
                    }
                }
            }
        } catch (error) {
            setLoadingCoordendas(false)
            setErroCoordenadas('Erro ao encontrar as coordenadas, por favor, verifique o endereço!')
        }

    }

    const onSubmit = async (data: CooProps) => {
        const cadastros = localStorage.getItem('cadastros');
        let cadastrosParse: CooProps[] = cadastros ? JSON.parse(cadastros) : [];
        const response = await BuscaCoordenadas(data);
        data.coordenadasX = response?.CoordenadasX
        data.coordenadasY = response?.CoordenadasY
        let id = 0
        if (cadastros) {
            id = cadastrosParse.length
            cadastrosParse.map((cadastro: CooProps) => {
                if (cadastro.id === id) id += 1
            })
            data.id = id
            cadastrosParse.push(data)
            localStorage.setItem('cadastros', JSON.stringify(cadastrosParse))
        } else {
            id = 1
            data.id = id
            cadastrosParse.push(data)
            localStorage.setItem('cadastros', JSON.stringify(cadastrosParse))
        }
    }

    return {
        errors,
        ErroViaCep,
        ErroCoordenadas,
        register,
        onSubmit,
        handleSubmit,
        LoadingCoordendas
    }

}