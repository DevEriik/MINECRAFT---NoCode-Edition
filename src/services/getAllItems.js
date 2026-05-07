export const getAllItems = async (page=1, limit=10, search="") => {
    try {

        const baseURL = new URL("https://69ea4c0415c7e2d51269a283.mockapi.io/api/v1/Minecraft");
        baseURL.searchParams.append('page', page)
        baseURL.searchParams.append('limit', limit)
        if (search){
            baseURL.searchParams.append('search', search)
        }

        const response = await fetch(baseURL)
        if (!response.ok) throw new Error('ERROR EN EL FETCH')
        
        const data = await response.json()
        return data

    } catch (error) {
        console.error(`hubo un problema al traer los datos: `, error)
        return []
    }

}