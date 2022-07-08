import "../styles/globals.css"
import Footer from "../components/Footer"
import { useRouter } from "next/router"
import AuthContextProvider from "../context/authContext"
import ProtectedRoute from "../components/Auth/ProtectedRoute"

function MyApp({ Component, pageProps }) {
	const router = useRouter()
	const protectedRoutes = ["/watchlist"]

	return (
		<AuthContextProvider>
			{protectedRoutes.includes(router.asPath) ? (
				<ProtectedRoute>
					<Component {...pageProps} />
					<Footer />
				</ProtectedRoute>
			) : (
				<>
					<Component {...pageProps} />
					<Footer />
				</>
			)}
		</AuthContextProvider>
	)
}

export default MyApp
