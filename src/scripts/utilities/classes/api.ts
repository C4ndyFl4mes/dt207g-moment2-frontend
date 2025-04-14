import { ICVItem } from "../../interfaces/cvitem";
import { IError } from "../../interfaces/error";

/**
 * En utility klass för att hantera REST API:n för CV.
 */


export class API {
    private static URL: string = "https://dt207g-moment2-backend.onrender.com/cv"; // Samma URL oavsett metod.
    private static header: HeadersInit = {"content-type": "application/json"}; // Samma header oavsett metod.

    public static async read(): Promise<Array<ICVItem> | IError> {
        const resp: Response | null = await fetch(this.URL, {
            method: "GET",
            headers: this.header
        });
        if (!resp) {
            return {valid: false, message: "Fick ingen respons."};
        }
        const data: Array<ICVItem> | IError = await resp.json();
        return data;
    }

    public static async write(item: ICVItem): Promise<IError> {
        const resp: Response | null = await fetch(this.URL, {
            method: "POST",
            headers: this.header,
            body: JSON.stringify(item)
        });
        if (!resp) {
            return {valid: false, message: "Fick ingen respons."};
        }
        const validation: IError = await resp.json();
        return validation;
    }

    public static async edit(item: ICVItem): Promise<IError> {
        const resp: Response | null = await fetch(this.URL, {
            method: "PUT",
            headers: this.header,
            body: JSON.stringify(item)
        });
        if (!resp) {
            return {valid: false, message: "Fick ingen respons."};
        }
        const validation: IError = await resp.json();
        return validation;
    }

    public static async remove(id: number): Promise<IError> {
        const resp: Response | null = await fetch(this.URL, {
            method: "DELETE",
            headers: this.header,
            body: JSON.stringify(id)
        });
        if (!resp) {
            return {valid: false, message: "Fick ingen respons."};
        }
        const validation: IError = await resp.json();
        return validation;
    }

    public static isError(data: any): data is IError {
        return (
            typeof data === "object" &&
            data !== null &&
            "valid" in data &&
            typeof data.valid === "boolean" &&
            "message" in data &&
            typeof data.message === "string"
          );
    }
}