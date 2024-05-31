import axios from "axios"
import { AddressProps, FormProps } from "pages/Home/types"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { UpperCase, maskCepNumber, maskLoteNumber } from "utils/mask/mask"

type CadastroSuccessCallback = () => void;

interface Props {
    onCadastroSuccess: CadastroSuccessCallback; // Propriedade onCadastroSuccess do tipo CadastroSuccessCallback
}

export const useCadastro = ({onCadastroSuccess}:Props) => {
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
            cep: '',
            cidade: '',
            estado: '',
            logradouro: '',
            numero: '',
            bairro: '',
            complemento: '',
            pais: '',
            lote: ''
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
            setData(response.data)
        } catch (error) {
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
       useEffect(() => {
        setValue('pais', UpperCase(pais))
    }, [pais])

   
    const apikey ='AIzaSyDAJ40ypx302SUKYMrry1NYS6P3jWAo9P8'
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
        let id = 0;
        if (cadastros) {
            id = cadastrosParse.length;
            cadastrosParse.map((cadastro: FormProps) => {
                if (cadastro.id === id) id += 1;
            });
            filteredData.id = id;
            cadastrosParse.push(filteredData);
            localStorage.setItem('cadastros', JSON.stringify(cadastrosParse));
            onCadastroSuccess()
        } else {
            id = 1;
            filteredData.id = id;
            cadastrosParse.push(filteredData);
            localStorage.setItem('cadastros', JSON.stringify(cadastrosParse));
            onCadastroSuccess()
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
    };
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