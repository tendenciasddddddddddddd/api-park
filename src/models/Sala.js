import { Schema, model } from "mongoose";

const salaSchema = new Schema(
    {
        Direccion: {
            type: String,
            required: true,
        },
        capacidad:{
            type: Number,
            default: 25
        },
        Estado:{
            type: Boolean,
            default: true,
            required: true
        },
        Precio: {
            type: Number,
            default: 0
        }
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Sala", salaSchema);