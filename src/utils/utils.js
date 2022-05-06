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
    async getAllInventory(params) {
        return await fetch(`${Api.BASE_URL}/all-inventory?${params ? params : ""}`, {
            method: "GET",
            headers: {
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
    async getMultipleInventory(params) {
        console.log(`${Api.BASE_URL}/inventory-skus?${params ? params : ""}`)
        return await fetch(`${Api.BASE_URL}/inventory-skus?${params ? params : ""}`, {
            method: "GET",
            headers: {
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
    async getInventory(param) {
        return await fetch(`${Api.BASE_URL}/inventory?${Object.keys(param)[0]}=${Object.values(param)[0]}`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Methods': 'GET',
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
    async getSettledInventory(params) {
        return await fetch(`${Api.BASE_URL}/settled-inventory?${params ? params : ""}`, {
            method: "GET",
            headers: {
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
    async getUnsettledInventory(params) {
        return await fetch(`${Api.BASE_URL}/unsettled-inventory?${params ? params :""}`, {
            method: "GET",
            headers: {
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
    async updateInventory(data) {
        return await fetch(`${Api.BASE_URL}/inventory`, {
            method: "PUT",
            headers: {
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

    async deleteInventory(sku) {
        return await fetch(`${Api.BASE_URL}/inventory?sku=${sku}`, {
            method: "DELETE",
            headers: {
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
}

export const ISOStringToReadableDate = (isoDate) => {
    let trimmedDate = isoDate.split("T")[0].split("-")
    return `${trimmedDate[1]}/${trimmedDate[2]}/${trimmedDate[0].slice(2)}`
}

export const objectsToQueryString = (params) => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}