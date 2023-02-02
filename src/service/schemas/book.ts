import { Schema, model, Document } from "mongoose";

export interface IBook {
	isbn: string;
	title: string;
	subtitle?: string;
	author: string;
	pages: number;
	description: string;
}

const bookSchema = new Schema<IBook>(
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
		author: {
			type: String,
			minlength: 1,
			maxlength: 90,
		},
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

export const Book = model<IBook>("book", bookSchema);
