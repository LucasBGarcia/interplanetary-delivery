import { useForm } from "react-hook-form"

export function FormTerra() {
    const { register } = useForm()
    const onSubmit = () => {

    }
    return (
        <div className="gap-10 flex flex-row">
            <div className="form-group">
                <div>
                    <label>CEP</label>
                    <input
                        type="text"
                        className="border-black rounded-full"
                        {...register('cep')}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>CEP</label>
                <input
                    type="text"
                    className="border-black rounded-full border-1"
                    {...register('cep')}
                />
            </div>

            <div className="form-group">
                <label>CEP</label>
                <input
                    type="text"
                    className="border-black rounded-full"
                    {...register('cep')}
                />
            </div>

            <button className="py-2 px-4 rounded-md bg-primary font-bold text-white" onClick={onSubmit}>
                Enviar
            </button>
        </div>
    );
}
