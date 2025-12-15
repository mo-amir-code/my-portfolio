

type JWTTokenVerifierType = {
    valid: boolean
    expired?: boolean
    payload?: { email: string }
}

export type { JWTTokenVerifierType }