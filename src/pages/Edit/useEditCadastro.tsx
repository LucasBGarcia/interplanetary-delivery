import axios from "axios"
import { AddressProps, FormProps } from "pages/Home/types"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { maskCepNumber, maskLoteNumber } from "utils/mask/mask"

export const useEditCadastro = (dados: FormProps | undefined) => {


    const navigate = useNavigate();
    const [ErroViaCep, setErroViaCep] = useState<string>('')
    const [ErroCoordenadas, setErroCoordenadas] = useState<string>('')
    const [LoadingCoordendas, setLoadingCoordendas] = useState<boolean>(false)
    const { register,
        handleSubmit,
        watch,
        setValue,
                reset,
        formState: { errors }
    } = useForm(({
        defaultValues: {
            cep: dados?.cep ? dados.cep : '',
            cidade: dados?.cidade ? dados.cidade : '',
            estado: dados?.estado ? dados.estado : '',
            logradouro: dados?.logradouro ? dados.logradouro : '',
            numero: dados?.numero ? dados.numero : '',
            bairro: dados?.bairro ? dados.bairro : '',
            complemento: dados?.complemento ? dados.complemento : '',
            pais: dados?.pais ? dados.pais : '',
            lote: dados?.lote ? dados.lote : ''
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
    const lote = watch('lote')
    const pais = watch('pais')

    useEffect(() => {
        setValue('cep', maskCepNumber(cep))
        if (pais == 'Brasil' && cep.length == 9) {
            BuscaEndereco(cep)
        } else {
            return
        }
    }, [BuscaEndereco, cep, setValue, pais])

    useEffect(() => {
        setValue('lote', maskLoteNumber(lote))
    }, [lote])

    const apikey = 'AIzaSyDAJ40ypx302SUKYMrry1NYS6P3jWAo9P8'
    const BuscaCoordenadas = async (data: FormProps) => {
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
    const removeEmptyProperties = (obj: object) => {
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
    };

    const onSubmit = async (data: FormProps) => {
        const filteredData = removeEmptyProperties(data);
        const cadastros = localStorage.getItem('cadastros');
        let cadastrosParse: FormProps[] = cadastros ? JSON.parse(cadastros) : [];
        if (filteredData.cep) {
            const response = await BuscaCoordenadas(filteredData);
            filteredData.coordenadasX = response?.CoordenadasX;
            filteredData.coordenadasY = response?.CoordenadasY;
        }
        if (cadastros) {
            const updatedCadastros = cadastrosParse.filter(cadastro => cadastro.id !== dados?.id);
            cadastrosParse = updatedCadastros
            cadastrosParse.push(filteredData);
            localStorage.setItem('cadastros', JSON.stringify(cadastrosParse));
            navigate('/')
        }

        reset({
            cep: '',
            cidade: '',
            estado: '',
            logradouro: '',
            numero: '',
            bairro: '',
            complemento: '',
            pais: '',
            lote: ''
        });

        console.log(cadastrosParse);
    };
   
   
    const onDelete = async () => {
        const cadastros = localStorage.getItem('cadastros');
        let cadastrosParse: FormProps[] = cadastros ? JSON.parse(cadastros) : [];
       
        if (cadastros) {
            const updatedCadastros = cadastrosParse.filter(cadastro => cadastro.id !== dados?.id);
            cadastrosParse = updatedCadastros
            localStorage.setItem('cadastros', JSON.stringify(cadastrosParse));
            navigate('/')
        }

        reset({
            cep: '',
            cidade: '',
            estado: '',
            logradouro: '',
            numero: '',
            bairro: '',
            complemento: '',
            pais: '',
            lote: ''
        });

        console.log(cadastrosParse);
    };
    return {
        errors,
        ErroViaCep,
        ErroCoordenadas,
        register,
        onSubmit,
        onDelete,
        handleSubmit,
        LoadingCoordendas
    }

}