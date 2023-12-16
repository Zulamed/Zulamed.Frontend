import { validateProfActivities, validateSpecialties, validateStages } from "$lib/utils/validateStuff";
import { writable } from "svelte/store";
import { match } from "ts-pattern";
import { z } from "zod";



const IndividualFirstStep = z.object({
    title: z.string().nonempty("Title cannot be empty"),
    name: z.string().nonempty("Name cannot be empty"),
    surname: z.string().nonempty("Surname cannot be empty"),
    gender: z.enum(['Male', 'Female', 'Other']),
    "birthday-date": z.date().refine(data => {
        const currentDate = new Date();
        const age = currentDate.getFullYear() - data.getFullYear();
        return age >= 18;
    }, "You must be at least 18 years old"),
});

type IndividualFirstStep = z.infer<typeof IndividualFirstStep>;

const IndividualSecondStep = z.object({
    email: z.string().email("Invalid email"),
    confirmEmail: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
}).refine(data => data.email === data.confirmEmail, {
    message: "Emails don't match",
    path: ["confirmEmail"]
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});


type IndividualSecondStep = z.infer<typeof IndividualSecondStep>;

const IndividualThirdStep = z.object({
    stageInCareer: z.string().refine(data => validateStages(data), "Invalid stage in career"),
    profession: z.string().refine(data => validateProfActivities(data),"Invalid profession"),
    speciality: z.string().refine(data => validateSpecialties(data),"Invalid speciality"),
    placeOfWork: z.string().nonempty("Place of work cannot be empty")
});

type IndividualThirdStep = z.infer<typeof IndividualThirdStep>;

const IndividualFourthStep = z.object({
    country: z.string().nonempty("Country cannot be empty"),
    city: z.string().nonempty("City cannot be empty"),
    institution: z.string().nonempty("Institution cannot be empty"),
    department: z.string().nonempty("Department cannot be empty"),
    role: z.string().nonempty("Role cannot be empty")
});

type IndividualFourthStep = z.infer<typeof IndividualFourthStep>;

const IndividualFifthStep = z.object({
    username: z.string().nonempty("Username cannot be empty"),
});

type IndividualFifthStep = z.infer<typeof IndividualFifthStep>;

const Data = z.discriminatedUnion("step", [
    z.object({
        step: z.literal(1),
        data: IndividualFirstStep
    }),
    z.object({
        step: z.literal(2),
        data: IndividualSecondStep
    }),
    z.object({
        step: z.literal(3),
        data: IndividualThirdStep
    }),
    z.object({
        step: z.literal(4),
        data: IndividualFourthStep
    }),
    z.object({
        step: z.literal(5),
        data: IndividualFifthStep
    }),
]);

export type IndividualData = z.infer<typeof Data>;

export type IndividualFullData = IndividualFirstStep & IndividualSecondStep & IndividualThirdStep & IndividualFourthStep & IndividualFifthStep;

export const individualData = writable<IndividualFullData>({
    "birthday-date": new Date(),
    city: "",
    confirmEmail: "",
    confirmPassword: "",
    country: "",
    department: "",
    email: "",
    gender: "Male",
    institution: "",
    name: "",
    password: "",
    placeOfWork: "",
    profession: "",
    speciality: "",
    stageInCareer: "",
    surname: "",
    title: "",
    username: "",
    role: ""
});

export function validateIndividual(data: IndividualData) {
    return match(data)
        .with({ step: 1 }, (data) => IndividualFirstStep.safeParse(data))
        .with({ step: 2 }, (data) => IndividualSecondStep.safeParse(data))
        .with({ step: 3 }, (data) => IndividualThirdStep.safeParse(data))
        .with({ step: 4 }, (data) => IndividualFourthStep.safeParse(data))
        .with({ step: 5 }, (data) => IndividualFifthStep.safeParse(data))
        .exhaustive();
}


