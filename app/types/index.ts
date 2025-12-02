export interface Script {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export interface Message {
    id: number;
    content: string;
    sender: 'ai' | 'user';
}

