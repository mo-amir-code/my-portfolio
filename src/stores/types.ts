

type AuthStoreStatesType = {
    isUserLoggedIn: boolean
}

type AuthStoreActionsType = {
    setLoggedInStatus: (status: boolean) => void
}

type AuthStoreType = AuthStoreStatesType & AuthStoreActionsType

export type {
    AuthStoreStatesType,
    AuthStoreActionsType,
    AuthStoreType
}