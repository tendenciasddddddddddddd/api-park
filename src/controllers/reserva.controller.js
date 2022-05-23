import Reserva from "../models/Reserva";

export const createReserva = async (req,res)=>{
    const { Monto, Tipo_pago, Fecha, Estado, idCliente, idSala } = req.body;
    try {
        const newReserva = new Reserva({
            Monto, Tipo_pago, Fecha, Estado, idCliente, idSala
        });
    
        const reservaSaved = await newReserva.save();
    
        res.status(201).json(reservaSaved);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}
export const getReservas = async (req,res)=>{
    const reservas = await Reserva.find();
    return res.json(reservas);
}
export const getReservaById = async (req,res)=>{
    const { reservaId } = req.params;

  const reserva = await Reserva.findById(reservaId);
  res.status(200).json(reserva);
    
}
export const updateReservaById = async (req,res)=>{
    const updatedReserva = await Reserva.findByIdAndUpdate(
        req.params.reservaId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedReserva);
}
export const deleteReservaById = async (req,res)=>{
    const { reservaId } = req.params;

    await Reserva.findByIdAndDelete(reservaId);
  
    // code 200 is ok too
    res.status(200).json();
}