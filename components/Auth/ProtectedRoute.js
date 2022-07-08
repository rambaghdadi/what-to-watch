import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "../../context/authContext"

export default function ProtectedRoute(props) {
	const { userToken } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!userToken) {
			router.push("/signin")
		}
	}, [router, userToken])

	return <>{userToken && props.children}</>
}
