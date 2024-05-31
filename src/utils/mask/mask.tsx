export const maskCepNumber = (value: String | undefined) => {
    if (!value) return ''
    return value.replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, '$1')    
}

export const maskLoteNumber = (value: String | undefined) => {
    if (!value) return ''
    return value.replace(/\D/g, '').slice(0, 4);
}

export const UpperCase = (value: string | undefined) => {
    if (!value) return '';
  
    const capitalizeWords = (str: string) => {
      return str.replace(/\b\w/g, char => char.toUpperCase());
    };
  
    return capitalizeWords(value);
  };
  