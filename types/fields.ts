export interface IFields {
    name: string;
    label: string;
    type: string;
    required: boolean;
    default?: any;
    options?: any;
    value?: any;
    error?: string;
    multiple?: boolean;
    validate?: (value: any) => string | null;
}
