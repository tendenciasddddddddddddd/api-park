import Sala from "../models/Sala";

export const createSala = async (req,res)=>{
    const { Direccion, capacidad, Estado, Precio } = req.body;
    try {
        const newSala = new Sala({
            Direccion, capacidad, Estado, Precio
        });
    
        const salaSaved = await newSala.save();
    
        res.status(201).json(salaSaved);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}
export const getSalas = async (req,res)=>{
    const salas = await Sala.find();
    return res.json(salas);
}
export const getSalaById = async (req,res)=>{
    const { salaId } = req.params;

  const sala = await Sala.findById(salaId);
  res.status(200).json(sala);
    
}
export const updateSalaById = async (req,res)=>{
    const updatedSala = await Sala.findByIdAndUpdate(
        req.params.salaId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedSala);
}
export const deleteSalaById = async (req,res)=>{
    const { salaId } = req.params;

    await Sala.findByIdAndDelete(salaId);
  
    // code 200 is ok too
    res.status(200).json();
}