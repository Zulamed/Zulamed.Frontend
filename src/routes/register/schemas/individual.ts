import { writable } from "svelte/store";
import { match } from "ts-pattern";
import { z } from "zod";



const IndividualFirstStep = z.object({
    title: z.string().nonempty(),
    name: z.string().nonempty(),
    surname: z.string().nonempty(),
    gender: z.enum(['Male', 'Female', 'Other']),
    "birthday-date": z.string()
});

type IndividualFirstStep = z.infer<typeof IndividualFirstStep>;

const IndividualSecondStep = z.object({
    email: z.string().email(),
    confirmEmail: z.string(),
    password: z.string().min(8),
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
    stageInCareer: z.string().nonempty(),
    profession: z.string().nonempty(),
    speciality: z.string().nonempty(),
    placeOfWork: z.string().nonempty()
});

type IndividualThirdStep = z.infer<typeof IndividualThirdStep>;

const IndividualFourthStep = z.object({
    country: z.string().nonempty(),
    city: z.string().nonempty(),
    institution: z.string().nonempty(),
    department: z.string().nonempty(),
    role: z.string().nonempty()
});

type IndividualFourthStep = z.infer<typeof IndividualFourthStep>;

const IndividualFifthStep = z.object({
    username: z.string().nonempty(),
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
    "birthday-date": "",
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


