const { Schema, model, Types } = require("mongoose");
const { fieldEncryption } = require("mongoose-field-encryption");

// Define your schema as before
const NoteSchema = new Schema(
  {
    owner: { type: Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body: { type: String, default: "" },
  },
  { timestamps: true }
);

// Plugin for field‐level encryption
NoteSchema.plugin(fieldEncryption, {
  fields: ["title", "body"], // encrypt/decrypt these
  secret: process.env.FIELD_ENCRYPTION_SECRET, // from your .env
  saltGenerator: (secret) => secret.substr(0, 16), // deterministic salt
});

module.exports = model("Note", NoteSchema);
