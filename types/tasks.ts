export interface ITask {
    id: number | undefined;
    name: string;
    description: string;
    status: string | undefined;
    due_date: string;
    completed_at: string | undefined;
    tags: Array<{id: number}>;
}

export class Task implements ITask {
    id: number | undefined;
    name: string;
    description: string;
    status: string | undefined;
    due_date: string;
    completed_at: string | undefined;
    tags: Array<{id: number}>;
    constructor(name: string, description: string, due_date: string, tags: Array<{id: number}>, completed_at?: string, id?: number, status?: string) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.due_date = due_date;
        this.completed_at = completed_at;
        this.tags = tags;
        this.id = id;
    }
}
