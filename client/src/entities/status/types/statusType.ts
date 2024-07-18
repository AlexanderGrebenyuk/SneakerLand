export type Status ={
    id: number;
    name: string;
}

export type StatusId = Status['id']

export type StatusWithoutId = Omit<Status, 'id'>