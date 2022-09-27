

// class ProductosApi {
//     constructor(){
//         this.productos = [];
//         this.id = 0;
//     }

//     listar(id){
//         const prod = this.productos.find((prod) => prod.id == id);
//         return prod || {error: "Producto no encontrado"};
//     }

//     listarAll(){
//         return [...this.productos];
//     }

//     guardar(prod){
//         const newProd= {...prod, id: ++this.id};
//         this.productos.push(newProd);
//         return newProd;
//     }

//     // actualizar(prod, id){
//     //     const newProd = {id: Number(id), ...prod}
//     //     const index = this.productos.findIndex((p)=> p.id == id);
//     //     if(index !== -1){
//     //         this.productos[index] = newProd:
//     //        
//     //     }
//     // }

//     actualizar(prod,id){
//         const newProd = this.productos.findIndex(producto => producto.id == id);
//         if(newProd != -1){
//             this.productos[newProd].title = obj.title || this.productos[newProd].title;
//             this.productos[newProd].price = obj.price || this.productos[newProd].price;
//             this.productos[newProd].thumbnail = obj.thumbnail || this.productos[newProd].thumbnail;
//             return this.productos[newProd]
//         }return false
//     }


//     borrar(id){
//         const newProd = this.productos.findIndex(prod=>prod.id ==id)
//         if(index != -1){
//             this.productos.filter((producto)=>(producto.id !=id));
//             return true
//         }return false
//     }

// }

// // const productos = new ProductosApi('./public/products.txt');

// module.exports = ProductosApi


const {promise:fs}= require('fs')

class ProductosApi{
    constructor(ruta){
        this.productos = []
        this.id = 0
        this.ruta = ruta
    }

    async listar(id){
        const products = await this.listarAll();
        const productById = products.find(p =>p.id ===id);
        console.log(`Muestro el producto id ${id}`);
        return productById
    }


    async listarAll(){
        try {
            const products = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(products)
        } catch (error) {
            console.log(this.ruta);
            console.log('hubo un error en getAll')
            return[]
        }
    }


    async guardar(obj){
        const products = await this.listarAll();

        products.push(obj);
        products.length === 0? obj.id =1: obj.id = products.length

        try {
            fs.writeFile(this.ruta,JSON.stringify(products, null, 2))
            console.log("Se agrego el item correctamente")
            console.log(obj)
        } catch (error) {
            console.log("Hubo un error en Save")
            return[]
        }        
    }


    async actualizar(prod,id){
        const products = await this.listarAll();
        let productById = products.filter(p=> p.id !== id);
        const oldProduct = products.find(p => p.id ===id);
        console.log(`Muestro el producto anterior ${JSON.stringify(oldProduct)}`);
        productById.push(prod);
        productById.sort((a,b)=> (a.id > b.id ? 1:-1))
        try{
            fs.writeFile(this.ruta, JSON.stringify(productById, null, 2))
            console.log(`Muestro el producto actualizado ${JSON.stringify(prod)}`);
            return productById;
        }catch(error){
            console.log('hubo un error en actualizar')
            return[]
        }
    }

    async borrar(id){
        try {
            const products = await this.listarAll();
            const productById = products.filter(p=> p.id !==id);
            fs.writeFile('productos.txt', JSON.stringify(productById, null, 2))
            console.log(`Se elimino el producto con id ${id} correctamente`)
            return productById;
        } catch (error) {
            console.log('hubo un error en deleteById')
            return[]
        }
    }

}


module.exports = ProductosApi