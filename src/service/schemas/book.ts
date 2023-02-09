import { Schema, model, Document } from "mongoose";

export interface IBook {
	isbn: string;
	title: string;
	subtitle?: string;
	authors: string;
	pages: number;
	description: string;
}

const bookSchema = new Schema(
	{
		isbn: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 13,
		},
		title: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 120,
		},
		subtitle: {
			type: String,
			minlength: 1,
			maxlength: 120,
		},
		authors: [
			{
				type: Schema.Types.ObjectId,
				ref: "Author",
			},
		],
		pages: {
			type: Number,
			min: 1,
			max: 2000,
		},
		description: {
			type: String,
			minlength: 1,
			maxlength: 500,
		},
	},
	{ versionKey: false, timestamps: true }
);

export const Book = model<IBook & Document>("Book", bookSchema);
