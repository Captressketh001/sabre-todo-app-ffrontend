export interface ApiResponse<T> {
    status: number,
    response: T,
    msg: string
}
export interface ErrorResponse {
    status: string,
    response: null,
    msg: string | null
}
export interface TodoList {
    _id: string
    text: string
    completed: boolean
}