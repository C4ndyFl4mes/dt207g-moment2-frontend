
/**
 * Ett interface för att hantera CV-poster.
 */

export interface ICVItem {
    id?: number;
    companyname: string;
    jobtitle: string;
    location: string;
    startdate: string;
    enddate: string;
    description: string;
}