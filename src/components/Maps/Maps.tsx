import { FormProps } from "pages"
interface MapsProps {
    latitude: string | undefined;
    longitude: string | undefined;
}
export function Maps({ latitude, longitude }: MapsProps) {

    return (
        <p>maps</p>
    )
}