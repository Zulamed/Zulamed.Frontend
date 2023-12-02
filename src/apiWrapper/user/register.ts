import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType"
import { PUBLIC_BACKEND_URL } from "$env/static/public"
import { match } from "ts-pattern"
import type { HospitalFullData } from "../../routes/register/schemas/hospital"
import type { IndividualFullData } from "../../routes/register/schemas/individual"

export type FullDataUnion =
    | { type: "individual", data: IndividualFullData }
    | { type: "hospital", data: HospitalFullData }


export type Response =
    | { status: "success" }
    | { status: "error", error: string }

function mapToRequest(dataUnion: FullDataUnion) {
    // fml
    switch (dataUnion.type) {
        case "individual":
            return {
                accountBirthDate: dataUnion.data["birthday-date"],
                accountGender: dataUnion.data.gender == "Male" ? true : false,
                accountCaeerStage: dataUnion.data.stageInCareer,
                accountTitle: dataUnion.data.title,
                accountProfessionalActivity: dataUnion.data.profession,
                accountSpecialty: dataUnion.data.speciality,
                accountDepartment: dataUnion.data.department,
                accountInstitute: dataUnion.data.institution,
                accountRole: dataUnion.data.role,
                placesOfWork: [dataUnion.data.placeOfWork],
                login: dataUnion.data.username,
                ...dataUnion.data
            }
        case "hospital":
            return {
                accountHospital: dataUnion.data.hospitalName,
                accountAddress: dataUnion.data.address,
                accountPostCode: dataUnion.data.zipCode,
                accountPhone: dataUnion.data.phoneNumber,
                name: dataUnion.data.firstName,
                surname: dataUnion.data.lastName,
                login: dataUnion.data.username,
                ...dataUnion.data
            }
    }
}


export async function register(fetch: FetchCallbackType = originalFetch, data: FullDataUnion): Promise<Response> {
    try {
        const type = match(data)
            .with({ type: "individual" }, () => "personal")
            .with({ type: "hospital" }, () => "hospital")
            .exhaustive();


        const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mapToRequest(data))
        });

        if (!response.ok) {
            return { status: "error", error: await response.text() }
        }

        return { status: "success" }
    } catch (error) {
        return { status: "error", error: (error as Error).message }
    }

}


