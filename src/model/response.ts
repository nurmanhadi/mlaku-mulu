export class JsonResponse<T> {
    statusCode: number
    message: string
    data: T
    metadata?: Metadata
}

export class Metadata {
    page: number
    per_page: number
    page_count: number
    total_count: number
}