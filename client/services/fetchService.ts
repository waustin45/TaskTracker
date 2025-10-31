const getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}
const postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

export async function FetchPost<T>(url: string, body: any) {
    const response = await fetch(url, {
        ...postOptions,
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json() as Promise<T>
}

export async function FetchGet<T>(url: string) {
    const response = await fetch(url, getOptions)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json() as Promise<T>
}