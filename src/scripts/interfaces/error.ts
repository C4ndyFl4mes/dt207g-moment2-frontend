
/**
 * Ett interface för att hantera felmeddelanden från API:et.
 */

export interface IError {
    valid: boolean;
    message: string;
}