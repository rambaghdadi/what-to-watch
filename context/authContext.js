import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext({})

export function useAuth() {
	return useContext(UserContext)
}

export default function AuthContextProvider(props) {
	const [userToken, setUserToken] = useState(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		if (localStorage.getItem("token"))
			setUserToken(localStorage.getItem("token"))
		setLoading(false)
	}, [])

	function signin(token, userId) {
		localStorage.setItem("token", token)
		localStorage.setItem("token", userId)
		setUserToken(token)
	}

	function signout() {
		setUserToken(false)
		localStorage.removeItem("token")
		localStorage.removeItem("userId")
		router.push("/signin")
	}

	return (
		<UserContext.Provider value={{ userToken, setUserToken, signin, signout }}>
			{!loading && props.children}
		</UserContext.Provider>
	)
}
