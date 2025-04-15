import { ICVItem } from "../interfaces/cvitem";
import { IError } from "../interfaces/error";
import { API } from "../utilities/classes/api";

/**
 * En klass för att hantera CV-listan.
 */

export class CVList {
    private list: Array<ICVItem>;
    private errorContainerDIV: HTMLElement;

    constructor(list: Array<ICVItem>, errorContainerDIV: HTMLElement) {
        this.list = list;
        this.errorContainerDIV = errorContainerDIV;
    }

    /**
     * Hämtar data med hjälp av utility klassen API, hanterar error och sätter värdet på list.
     */
    public async setList(): Promise<void> {
        const data: Array<ICVItem> | IError = await API.read();
        if (!API.isError(data)) {
            this.list = data;
        } else {
            this.renderError(data);
        }
    }

    /**
     * Lägger till ett cv-item till API:et med data från inmatningsfält. 
     * @param inputs - en array av inmatningsfält från "fromuläret," btw, jag använde inget riktigt formulär då jag inte vill att sidan ska laddas om.
     */
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
            this.renderError(error);
        }
    }

    /**
     * Uppdaterar ett cv-item utifrån hiddenidINPUT och inputs i API:et.
     * @param hiddenidINPUT - ett gömt element som håller reda på id:et.
     * @param inputs - en array av inmatningsfält från "formuläret."
     * @param popupDIV - popup elementet.
     */
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
            this.renderError(error);
        }
    }

    /**
     * Raderar ett cv-item med id:et från det gömda elementet.
     * @param hiddenidINPUT - ett gömt element som håller reda på id:et.
     * @param popupDIV - popup elementet.
     */
    public async deleteItem(hiddenidINPUT: HTMLInputElement, popupDIV: HTMLElement): Promise<void> {
        const error: IError = await API.remove(Number(hiddenidINPUT.value));
        if (error.valid) {
            popupDIV.style.display = "none";
            await this.setList();
        } else {
            this.renderError(error);
        }
    }

    /**
     * Läser ut felmeddelandet på skärmen.
     * @param error - tar emot ett IError objekt.
     */
    private renderError(error: IError): void {
        this.errorContainerDIV.innerHTML = "";
        const article: HTMLElement = document.createElement("article");
        article.className = "error-item";
        article.innerHTML = `
            <h3>${error.message.header}</h3>
            <p>${error.message.message}</p>
        `;
        this.errorContainerDIV.appendChild(article);
    }

    /**
     * Läser ut alla rader.
     * @param parentEL - moderelementet som är TBODY.
     * @param popupDIV - popup elementet.
     * @param hiddenidINPUT - ett gömt element som håller reda på id:et.
     * @param inputs - en array av inmatningsfält från "formuläret."
     */
    public render(parentEL: HTMLElement, popupDIV: HTMLElement, hiddenidINPUT: HTMLInputElement, inputs: Array<HTMLInputElement>): void {
        parentEL.innerHTML = "";
        this.list.forEach(item => {
            const mainTR: HTMLElement = document.createElement("tr");
            mainTR.className = "cv-item-tr";
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