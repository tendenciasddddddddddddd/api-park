import { Schema, model } from "mongoose";

const reservaSchema = new Schema(
    {
        Monto:{
            type: Number,
            required: true,
        },
        Tipo_pago:{
            type: String,
            required: true,
        },
        Fecha:{
            type: String,
            required: true,
        },
        Estado:{
            type: Boolean,
            required: true,
        },
        idCliente:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        idSala:{
            type: Schema.Types.ObjectId,
            ref: "Sala",
            required: true,
        },
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Reserva", reservaSchema);