import {ITag} from "./types/tags";
import {ITask} from "./types/tasks";

const baseUrl = 'http://localhost/api';

export const getAllTags = async (): Promise<ITag[]> => {
    const response = await fetch(`${baseUrl}/tags`, {cache: "no-store"});
    return await response.json().then(
        (data) => {
            return data?.data;
        }
    );
};

export const getTag = async (id: number): Promise<ITag> => {
    const response = await fetch(`${baseUrl}/tags/${id}`);
    return await response.json().then(
        (data) => {
            return data.data;
        }
    );
};

export const createTag = async (tag: ITag): Promise<ITag> => {
    const response = await fetch(`${baseUrl}/tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag)
    });
    return await response.json();
};

export const updateTag = async (tag: ITag): Promise<ITag> => {
    const response = await fetch(`${baseUrl}/tags/${tag.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag)
    });
    return await response.json().then(
        (data) => {
            return data.data;
        }
    );
};

export const deleteTag = async (id: number): Promise<ITag> => {
    const response = await fetch(`${baseUrl}/tags/${id}`, {
        method: 'DELETE'
    });
    return await response.json().then(
        (data) => {
            return data.data;
        }
    );
}

export const getAllTasks = async (): Promise<ITask[]> => {
    const response = await fetch(`${baseUrl}/tasks`, {cache: "no-store"});
    return await response.json().then(
        (data) => {
            return data?.data;
        }
    );
};

export const getTask = async (id: number): Promise<ITask> => {
    const response = await fetch(`${baseUrl}/tasks/${id}`);
    return await response.json().then(
        (data) => {
            return data.data;
        }
    );
};

export const createTask = async (task: ITask): Promise<ITask> => {
    console.log(JSON.stringify(task));
    const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    return await response.json().then(
        (data) => {
            return data.data;
        }
    );
};

export const updateTask = async (task: ITask): Promise<ITask> => {
    const response = await fetch(`${baseUrl}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    return await response.json().then(
        (data) => {
            return data.data;
        }
    );
};

export const deleteTask = async (id: number): Promise<ITask> => {
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE'
    });
    return await response.json().then(
        (data) => {
            return data.data;
        }
    );
}
