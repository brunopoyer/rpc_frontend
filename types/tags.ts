export interface ITag {
    id: number | undefined;
    name: string;
    color: string;
}


export class Tag implements ITag {
    id: number | undefined;
    name: string;
    color: string;
    constructor(name: string, color: string, id?: number) {
        this.name = name;
        this.color = color;
        this.id = id;
    }
}
