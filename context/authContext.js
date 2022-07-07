import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext({}) //might need curlies

export function useAuth() {
	return useContext(UserContext)
}

export default function AuthContextProvider(props) {
	const [userToken, setUserToken] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (localStorage.getItem("token"))
			setUserToken(localStorage.getItem("token"))
		setLoading(false)
	}, [])

	return (
		<UserContext.Provider value={{ userToken, setUserToken }}>
			{!loading && props.children}
		</UserContext.Provider>
	)
}
