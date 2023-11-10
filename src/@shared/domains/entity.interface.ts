export interface EntityInterface<Props = any> {
    get id(): string;

    toJSON(): Required<{ id: string } & Props>
}