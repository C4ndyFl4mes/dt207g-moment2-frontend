import { ICVItem } from "../interfaces/cvitem";
import { IError } from "../interfaces/error";
import { API } from "../utilities/classes/api";

/**
 * En klass för att hantera CV-listan.
 */

export class CVList {
    private list: Array<ICVItem>;

    constructor(list: Array<ICVItem>) {
        this.list = list;
    }

    public async setList(): Promise<void> {
        const data: Array<ICVItem> | IError = await API.read();
        if (!API.isError(data)) {
            this.list = data;
        }
    }

    public async addItem(inputs: Array<HTMLInputElement>): Promise<void> {
        const error: IError = await API.write({
            companyname: inputs[0].value,
            jobtitle: inputs[1].value,
            location: inputs[2].value,
            startdate: inputs[3].value,
            enddate: inputs[4].value,
            description: inputs[5].value
        });

        if (error.valid) {
            await this.setList();
            location.href = "/index.html";
        } else {
            console.log(error);
        }
    }

    public async updateItem(hiddenidINPUT: HTMLInputElement, inputs: Array<HTMLInputElement>, popupDIV: HTMLElement): Promise<void> {
        const item: ICVItem = {
            id: Number(hiddenidINPUT.value),
            companyname: inputs[0].value,
            jobtitle: inputs[1].value,
            location: inputs[2].value,
            startdate: inputs[3].value,
            enddate: inputs[4].value,
            description: inputs[5].value
        }
        const error: IError = await API.edit(item);
        if (error.valid) {
            popupDIV.style.display = "none";
            await this.setList();
        } else {
            console.log(error);
        }
    }

    public async deleteItem(hiddenidINPUT: HTMLInputElement, popupDIV: HTMLElement): Promise<void> {
        const error: IError = await API.remove(Number(hiddenidINPUT.value));
        if (error.valid) {
            popupDIV.style.display = "none";
            await this.setList();
        } else {
            console.log(error);
        }
    }

    public render(parentEL: HTMLElement, popupDIV: HTMLElement, hiddenidINPUT: HTMLInputElement, inputs: Array<HTMLInputElement>): void {
        parentEL.innerHTML = "";
        console.log(this.list);
        this.list.forEach(item => {
            const mainTR: HTMLElement = document.createElement("tr");
            mainTR.className = "cv-item-maintr";
            const formattedStartDate = (new Date(item.startdate)).toISOString().split("T")[0];
            const formattedEndDate = (new Date(item.enddate)).toISOString().split("T")[0];
            mainTR.innerHTML = `
                <td>${item.companyname}</td>
                <td>${item.jobtitle}</td>
                <td>${item.location}</td>
                <td>${formattedStartDate}</td>
                <td>${formattedEndDate}</td>
                <td>${item.description}</td>
            `;

            mainTR.addEventListener("click", () => {
                popupDIV.style.display = "flex";
                hiddenidINPUT.value = String(item.id);

                inputs[0].value = item.companyname;
                inputs[1].value = item.jobtitle;
                inputs[2].value = item.location;
                inputs[3].value = formattedStartDate;
                inputs[4].value = formattedEndDate;
                inputs[5].value = item.description;
            });
            parentEL.appendChild(mainTR);
        });
    }
}