import { z } from "zod";

// Custom file validation (e.g., checks file is provided)
const fileSchema = z.any().optional();

// Zod schema for the form
const formSchema = z.object({
	first_name: z
		.string()
		.min(1, { message: "First name is required." })
		.max(50, { message: "First name must not exceed 50 characters." }),

	last_name: z
		.string()
		.min(1, { message: "Last name is required." })
		.max(50, { message: "Last name must not exceed 50 characters." }),

	email: z.string().email({ message: "Invalid email address." }),

	phone: z
		.string()
		.max(15, { message: "Ensure this field has no more than 15 characters." }),

	address: z.string().optional(),

	school: z.string().optional(),

	degree: z.string().optional(),

	major: z.string().optional(),

	gpa: z
		.string()
		.refine((val) => !isNaN(Number(val)), {
			message: "GPA must be a number.",
		})
		.refine((val) => Number(val) >= 0 && Number(val) <= 4, {
			message: "GPA must be between 0 and 4.",
		}),

	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: "Invalid date format (YYYY-MM-DD).",
	}),

	duration: z
		.string()
		.refine((val) => parseInt(val, 10) >= 1, {
			message: "Duration must be at least 1 month.",
		})
		.transform((val) => parseInt(val, 10))
		.optional(),

	department: z.string().optional(),

	resume: fileSchema,

	cover_letter: fileSchema,
});

export default formSchema;
