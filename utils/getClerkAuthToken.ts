import { getClerkInstance } from "@clerk/clerk-expo";

export const getClerkAuthToken = async() => {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || ""
    const clerkInstance = getClerkInstance({publishableKey})
    return await clerkInstance.session?.getToken({ template: "supabase" })
}