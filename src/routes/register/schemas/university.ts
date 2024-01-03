import { writable } from "svelte/store";
import { match } from "ts-pattern";
import { z } from "zod";


const UniversityFirstStep = z.object({
    universityName: z.string().nonempty("University name cannot be empty"),
    firstName: z.string().nonempty("First name cannot be empty"),
    lastName: z.string().nonempty("Last name cannot be empty")
});

type UniversityFirstStep = z.infer<typeof UniversityFirstStep>;



const UniversitySecondStep = z.object({
    email: z.string().email("Invalid email"),
    confirmEmail: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8)
}).refine(data => data.email === data.confirmEmail, {
    message: "Emails must match",
    path: ["repeatEmail"]
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"]
});

type UniversitySecondStep = z.infer<typeof UniversitySecondStep>;


const UniversityThirdStep = z.object({
    address: z.string().nonempty("Address cannot be empty"),
    city: z.string().nonempty("City cannot be empty"),
    country: z.string().nonempty("Country cannot be empty"),
    zipCode: z.string().nonempty("Zip code cannot be empty"),
    phoneNumber: z.string().nonempty("Phone number cannot be empty"),
});

type UniversityThirdStep = z.infer<typeof UniversityThirdStep>;


const UniversityFourthStep = z.object({
    username: z.string().nonempty("Username cannot be empty"),
});

type UniversityFourthStep = z.infer<typeof UniversityFourthStep>;


const Data = z.discriminatedUnion("step", [
    z.object({
        step: z.literal(1),
        data: UniversityFirstStep
    }),
    z.object({
        step: z.literal(2),
        data: UniversitySecondStep
    }),
    z.object({
        step: z.literal(3),
        data: UniversityThirdStep,
    }),
    z.object({
        step: z.literal(4),
        data: UniversityFourthStep
    }),
])

export type UniversityData = z.infer<typeof Data>;

export type UniversityFullData = UniversityFirstStep & UniversitySecondStep & UniversityThirdStep & UniversityFourthStep;

export const universityData = writable<UniversityFullData>({
    universityName: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
    username: ""
});



export function validateUniversity(data: UniversityData) {
    return match(data)
        .with({ step: 1 }, (data) => UniversityFirstStep.safeParse(data))
        .with({ step: 2 }, (data) => UniversitySecondStep.safeParse(data))
        .with({ step: 3 }, (data) => UniversityThirdStep.safeParse(data))
        .with({ step: 4 }, (data) => UniversityFourthStep.safeParse(data))
        .exhaustive();
}

