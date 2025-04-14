import { CVList } from "./classes/cvlist";
import { ICVItem } from "./interfaces/cvitem";


/**
 * Main klassen. Allt utgår från denna klass.
 */


class Main {
    private static tableDataTBODY: HTMLElement | null = document.getElementById("table-data");
    private static popupDIV: HTMLElement | null = document.getElementById("popup");
    private static errorContainerDIV: HTMLElement | null = document.getElementById("error-container");
    private static hiddenidINPUT = document.getElementById("item-id-hidden-value") as HTMLInputElement;
    private static companyNameINPUT = document.getElementById("companyname-input") as HTMLInputElement;
    private static jobTitleINPUT = document.getElementById("jobtitle-input") as HTMLInputElement;
    private static locationINPUT = document.getElementById("location-input") as HTMLInputElement;
    private static startDateINPUT = document.getElementById("startdate-input") as HTMLInputElement;
    private static endDateINPUT = document.getElementById("enddate-input") as HTMLInputElement;
    private static descriptionINPUT = document.getElementById("description-input") as HTMLInputElement;
    private static updateBTN = document.getElementById("update-btn") as HTMLButtonElement;
    private static deleteBTN = document.getElementById("delete-btn") as HTMLButtonElement;
    private static addBTN = document.getElementById("add-btn") as HTMLButtonElement;
    private static cvList: CVList;

    /**
     * En asynkron funktion som initierar applikationens frontend logik.
     */
    public static async init(): Promise<void> {
        const list: Array<ICVItem> = [];
        this.cvList = new CVList(list, this.errorContainerDIV!);
        const inputs: Array<HTMLInputElement> = [Main.companyNameINPUT, Main.jobTitleINPUT, Main.locationINPUT, Main.startDateINPUT, Main.endDateINPUT, Main.descriptionINPUT];
        Main.popupDIV?.addEventListener('click', (e) => {
            if (e.target === Main.popupDIV) {
                Main.popupDIV!.style.display = "none";
                this.errorContainerDIV!.innerHTML = "";
                this.hiddenidINPUT.value = "";

                // Tror inte det spelar någon roll, men jag tömmer fälten när popup fältet trycks ner utifall att.
                inputs[0].value = "";
                inputs[1].value = "";
                inputs[2].value = "";
                inputs[3].value = "";
                inputs[4].value = "";
                inputs[5].value = "";
            }
        });

        await this.cvList.setList();
        
        /**
         * Renderar listan för första gången.
         */
        if (this.tableDataTBODY && this.popupDIV) {
            this.cvList.render(this.tableDataTBODY, this.popupDIV, this.hiddenidINPUT, inputs);
        }

        /**
         * Knappen för att uppdatera ett cv-item. Uppdaterar listan.
         */
        Main.updateBTN?.addEventListener("click", async () => {
            if(this.popupDIV && this.tableDataTBODY) {
                await this.cvList.updateItem(this.hiddenidINPUT, inputs, this.popupDIV);
                this.cvList.render(this.tableDataTBODY, this.popupDIV, this.hiddenidINPUT, inputs);
            } 
        });

        /**
         * Knappen för att radera ett cv-item. Uppdaterar listan.
         */
        Main.deleteBTN?.addEventListener("click", async () => {
            if(this.popupDIV && this.tableDataTBODY) {
                await this.cvList.deleteItem(this.hiddenidINPUT, this.popupDIV);
                this.cvList.render(this.tableDataTBODY, this.popupDIV, this.hiddenidINPUT, inputs);
            }
        });

        /**
         * Knappen för att lägga till ett cv-item.
         */
        Main.addBTN?.addEventListener("click", async () => {
            await this.cvList.addItem(inputs);
        });
    }
}

Main.init(); // Viktig :)