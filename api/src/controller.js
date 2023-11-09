import {pool} from './database.js';

class ProductoController{
   async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM Productos');
        res.json(result);
    }

    async getOne(req, res) {
        const producto= req.body;
        try {
            const [result] = await pool.query(`SELECT * FROM Productos WHERE id=(?)`, [producto.id]);
            if (result.length > 0) {
                res.json({"Datos del producto": result});
            } else {
                res.status(404).json({ "Mensaje": "No se encontró el producto con el ID especificado" });
            }
        } catch (error) {
            console.error("Error al buscar el producto por ID:", error);
            res.status(500).json({ "Mensaje": "Error en el servidor" });
            }   
        }

    async add(req,res){
        const producto = req.body;
        try { 
            if (producto.nombre  && producto.marca  && producto.cantidad && producto.descripcion  && producto.id_categoria && producto.precio && producto.baja ) 
            {
                const [result] = await pool.query(`INSERT INTO Productos(nombre , marca ,cantidad ,descripcion, id_categoria, precio, baja) VALUES (? ,?, ?, ?, ?, ?, ?)`, [producto.nombre, producto.marca, producto.cantidad, producto.descripcion,producto.id_categoria,producto.precio,producto.baja, ]);
                res.json({"id insert": result.insertId});
            } else {
                res.status(404).json({ "Mensaje": "No se puede registrar campos vacios" });
            }
        }
        catch (error){
            console.error("Error al agregar producto", error);
            res.status(500).json({ "Mensaje": "Error en el servidor" });
        }
        
    }

    async delete(req, res){
        const producto = req.body;
        try{
            const [result] = await pool.query(`SELECT * FROM Productos WHERE id=(?)`, [producto.id]);
            if (result.length > 0) {
                const [result] = await pool.query(`DELETE FROM Productos WHERE id=(?)`, [producto.id]);
                res.json({"Registros eliminados": result.affectedRows});
            } else {
                res.status(404).json({ "Mensaje": "No se encontró el producto con el id especificado" });
            }}
        catch (error){ 
            console.error("Error al eliminar el producto por id:", error);
            res.status(500).json({ "Mensaje": "Error en el servidor" });
        }
        
    }

    async update(req,res){
        const producto = req.body;
        try {
            const [result] = await pool.query(`SELECT * FROM Productos WHERE id=(?)`, [producto.id]);
            if (result.length > 0) {
                const [result] = await pool.query(`UPDATE Productos SET nombre=(?), marca=(?), cantidad=(?), descripcion=(?), id_categoria=(?), precio=(?), baja=(?) WHERE id=(?)`, [producto.nombre, producto.marca, producto.cantidad, producto.descripcion,producto.id_categoria, producto.precio, producto.baja, producto.id]);
                res.json({"Registros Actualizados": result.affectedRows});
            } else {
                res.status(404).json({ "Mensaje": "No se encontró el producto con el id especificado" });
            }}
        catch (error){
            console.error("Error al actualizar el producto por id:", error);
            res.status(500).json({ "Mensaje": "Error en el servidor" });
        }
    }   
}


export const producto = new ProductoController();