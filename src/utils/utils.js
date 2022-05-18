export class User {

    async login(data) {
        if(typeof window !== 'undefined') {
            return await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/login-inventory", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data)
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
        }
    }
}

export class Api {
    static BASE_URL = "https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1"
    async getAllInventory(params, headers) {
        console.log(`${Api.BASE_URL}/all-inventory?${params ? params : ""}`)
        return await fetch(`${Api.BASE_URL}/all-inventory?${params ? params : ""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async getMultipleInventory(params, headers) {
        console.log(`${Api.BASE_URL}/inventory-skus?${params ? params : ""}`)
        return await fetch(`${Api.BASE_URL}/inventory-skus?${params ? params : ""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async getInventory(params, headers) {
        return await fetch(`${Api.BASE_URL}/inventory?${params ? params : ""}`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Methods': 'GET',
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async getSettledInventory(params, headers) {
        return await fetch(`${Api.BASE_URL}/settled-inventory?${params ? params : ""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async getUnsettledInventory(params, headers) {
        return await fetch(`${Api.BASE_URL}/unsettled-inventory?${params ? params :""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async getAllProducts(params, headers) {
        return await fetch(`${Api.BASE_URL}/all-products-inventory?${params ? params : ""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async getMultipleProducts(params, headers) {
        return await fetch(`${Api.BASE_URL}/products-skus?${params ? params : ""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async getProduct(params, headers) {
        return await fetch(`${Api.BASE_URL}/product-inventory?${params ? params : ""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async updateInventory(data, headers) {
        console.log(data)
        return await fetch(`${Api.BASE_URL}/inventory`, {
            method: "PUT",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body:JSON.stringify(data)
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async updateProduct(data, headers) {
        console.log(data)
        return await fetch(`${Api.BASE_URL}/product-inventory`, {
            method: "PUT",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body:JSON.stringify(data)
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }

    async deleteInventory(sku, headers) {
        console.log(`${Api.BASE_URL}/inventory?sku=${sku}`)
        return await fetch(`${Api.BASE_URL}/inventory?sku=${sku}`, {
            method: "DELETE",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }

    async deleteProduct(sku, headers) {
        console.log(`${Api.BASE_URL}/product-inventory?sku=${sku}`)
        return await fetch(`${Api.BASE_URL}/product-inventory?sku=${sku}`, {
            method: "DELETE",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async getShippedOrders(params, headers) {
        return await fetch(`${Api.BASE_URL}/shipped-orders?${params ? params : ""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async getUnShippedOrders(params, headers) {
        return await fetch(`${Api.BASE_URL}/not-shipped-orders?${params ? params : ""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    async syncOrdersInventory(headers) {
        return await fetch(`${Api.BASE_URL}/sync-orders-inventory`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
    
    async getHistory(params,headers) {
        console.log(`${Api.BASE_URL}/history?${params ? params : ""}`)
        return await fetch(`${Api.BASE_URL}/history?${params ? params : ""}`, {
            method: "GET",
            headers: {
                ...headers,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => {
            if(resp.ok) return resp.json()
            else return Promise.reject(resp).catch((error) => error ? error.json() : null)
        })
    }
}

export const ISOStringToReadableDate = (isoDate) => {
    let trimmedDate = isoDate.split("T")[0].split("-")
    return `${trimmedDate[1]}/${trimmedDate[2]}/${trimmedDate[0].slice(2)}`
}

export const objectsToQueryString = (params) => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}
