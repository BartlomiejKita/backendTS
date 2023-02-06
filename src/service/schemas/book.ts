import { Schema, model } from "mongoose";

export interface IBook {
	isbn: string;
	title: string;
	subtitle?: string;
	author: string;
	pages: number;
	description: string;
}

const bookSchema: Schema = new Schema(
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
			type: Schema.Types.ObjectId,
			ref: "authors",
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
