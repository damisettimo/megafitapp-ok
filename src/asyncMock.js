

const products =  [
  
    { id: '1', name: 'Xtrenght', price: 3800, category: 'proteina', img:'https://http2.mlstatic.com/D_NQ_NP_947978-MLA48169894202_112021-V.webp', stock: 16, description:'1kg, PROTEINA ISOLADA + HYDROLIZADA + CONCENTRADA'},
    { id: '2', name: 'Star Nutrition', price: 4500, category: 'proteina', img:'https://http2.mlstatic.com/D_NQ_NP_738057-MLA48946238081_012022-V.webp', stock: 10, description:'1kg, ULTRA PREMIUM WHEY PROTEIN CON PERFIL DE AMINOACIDOS REFORZADOS'},
    { id: '3', name: 'Nutrilab', price: 2600, category: 'proteina', img:'https://http2.mlstatic.com/D_NQ_NP_641484-MLA43464750851_092020-V.webp', stock: 10, description:'1kg, CLASICA CON AMINOACIDOS'},
    { id: '4', name: 'ENA', price: 1200, category: 'creatina', img:'https://http2.mlstatic.com/D_NQ_NP_772770-MLA49211946466_022022-V.webp', stock: 10, description:'300gr, MICRONIZADA SIN SABOR'},
    { id: '5', name: 'Xtrenght', price: 1700, category: 'creatina', img:'https://http2.mlstatic.com/D_NQ_NP_873839-MLA31100150508_062019-V.webp', stock: 10, description:'250gr, MICRONIZADA SIN SABOR'},
    { id: '6', name: 'Star Nutrition', price: 1700, category: 'pre-entrenamiento', img:'https://http2.mlstatic.com/D_NQ_NP_961323-MLA49074183833_022022-V.webp', stock: 10, description:'285gr, 8 INGREDIENTES PARA EL MEJOR ENTRENAMIENTO'},
    
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}

export const getProductById = (id) => {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === id))
        }, 500)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 500)
    })
}