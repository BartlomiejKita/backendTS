import { Schema, model, Document } from "mongoose";

export interface IAuthor {
	name: string;
	books: string;
}

const authorSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 30,
		},
		books: [
			{
				type: Schema.Types.ObjectId,
				ref: "Book",
			},
		],
	},
	{ versionKey: false, timestamps: true }
);

export const Author = model<IAuthor & Document>("Author", authorSchema);