
export type AddressProps = {
    bairro: string,
    complemento: string,
    uf: string,
    logradouro: string,
    localidade: string,
}


export type TerraProps = {
    id?:number,
    cep?: string,
    cidade?: string,
    estado?: string,
    logradouro?: string,
    numero?: string,
    bairro?: string,
    complemento?: string,
    pais?: string,
    coordenadasX?:string,
    coordenadasY?:string,
    lote?: string

}

export type MarteProps = {
    id?:number,
    lote: string
}